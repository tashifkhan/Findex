from app.prompts.crawller import prompt_template_str
from langchain.prompts import PromptTemplate
from app.core.llm import LargeLanguageModel

from langchain_core.runnables import RunnableLambda, RunnableParallel
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import PromptTemplate
from langchain_core.documents import Document
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma

llm = LargeLanguageModel()
parser = StrOutputParser()


def format_docs(retrieved_docs):
    return "\n".join(doc.page_content for doc in retrieved_docs)


def create_chunks(text):
    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    text_chunks = splitter.split_text(text)
    doc_chunks = [Document(page_content=chunk) for chunk in text_chunks]
    return doc_chunks


embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")


def embedding_generation(chunks):
    vector_store = Chroma.from_documents(documents=chunks, embedding=embeddings)
    return vector_store


text_to_vectorstore = RunnableLambda(create_chunks) | RunnableLambda(
    embedding_generation
)

parallel_chain = RunnableParallel(
    {
        "vector_store": RunnableLambda(lambda d: d["text"]) | text_to_vectorstore,
        "question": RunnableLambda(lambda d: d["question"]),
    }
)

main_chain = (
    parallel_chain
    | RunnableLambda(
        lambda d: d["vector_store"]
        .as_retriever(search_type="mmr", search_kwargs={"k": 3})
        .invoke(d["question"])
    )
    | RunnableLambda(format_docs)
)


prompt_template_str = """
System:
You are a “GitHub Coding Assistant.” Your purpose is to answer questions about a GitHub repository, explain code, and solve coding problems.
You must base your answers *only* on the provided repository context, which includes file content, structure, and summaries.
Do not invent information or use external knowledge. If the answer is not in the provided context, reply “Data not available.”

---
Repository Summary:
{summary}

---
Repository File Structure (Tree):
{tree}

---
Relevant File Content:
{content}

---
Chat History (if available):
{chat_history}

---

Guidelines:
1.  **Be Concise and Relevant**: Provide direct answers to the user's question using only the information from the context.
2.  **Code Explanations**: When explaining code, be clear and reference the specific file or code block.
3.  **File Navigation**: Use the file structure (`tree`) to answer questions about where files are located or how the project is organized.
4.  **Summaries**: Use the repository summary to provide high-level overviews when asked.
5.  **No External Data**: Do not use any information beyond the provided context. If the context does not contain the answer, state "I cannot answer this question with the provided information."
6.  **Code Generation/Modification**: If asked to write or modify code, base it on the patterns and libraries already present in the repository context.

Response Formatting:
- Use Markdown for all responses.
- Use code blocks with language identifiers for code snippets.
- Use bullet points for lists to improve readability.

---
User Question: {question}
---

Answer:
"""

prompt = PromptTemplate(
    template=prompt_template_str,
    input_variables=[
        "tree",
        "summary",
        "content",
        "question",
        "chat_history",
    ],
)
final_chain = RunnableParallel(
    {
        "content": main_chain,
        "question": RunnableLambda(lambda d: d["question"]),
        "chat_history": RunnableLambda(lambda d: d.get("chat_history", "")),
        "tree": RunnableLambda(lambda d: d["tree"]),
        "summary": RunnableLambda(lambda d: d["summary"]),
    }
)

text_chain = final_chain | prompt | llm.client | parser


def get_chain():
    return text_chain


def get_answer(
    chain,
    question,
    text,
    tree,
    summary,
    chat_history="",
):
    # 1. Chunk the text
    chunks = create_chunks(text)

    # 2. Create the vector store
    vector_store = embedding_generation(chunks)

    try:
        # 3. Retrieve relevant docs
        retrieved_docs = vector_store.as_retriever(
            search_type="mmr", search_kwargs={"k": 3}
        ).invoke(question)

        # 4. Format docs
        content = format_docs(retrieved_docs)

        # 5. Prepare prompt
        prompt_input = {
            "content": content,
            "question": question,
            "chat_history": str(chat_history),
            "tree": tree,
            "summary": summary,
        }

        # 6. Generate answer
        answer_chain = prompt | llm.client | parser
        return answer_chain.invoke(prompt_input)

    finally:
        # 7. Delete the vector DB
        if hasattr(vector_store, "delete_collection"):
            vector_store.delete_collection()
