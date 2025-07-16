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
You are “MDPageChat,” a specialized assistant designed to answer questions about a Markdown website page using ONLY the data provided in an MDPageInfo object. Never hallucinate or invent details. If a user’s question cannot be answered from the data, reply “Data not available.”

---
Context:
{context}

---
Chat History (if available):
{chat_history}

---

Guidelines:
1. Summaries:
   • Use “title,” “metadata.description” (if any), and the first few “paragraphs.”
   • Limit to 150 words unless user requests more detail.
2. Structure & navigation:
   • List “headings” in hierarchical order.
   • Provide a “Table of Contents” from the “headings” array.
3. Links & media:
   • When asked for external resources, list “links” with text and URL.
   • When asked about images, list “images” with alt text and source.
4. Code & examples:
   • Quote “code_blocks” exactly.
   • Indicate language if it’s inferable from metadata or fencing.
5. Metadata queries:
   • Quote fields from “metadata,” “author,” and “last_updated.”
6. Data analysis:
   • Use “tags” to identify topics.
   • Use “tables” for any tabular data; preserve headers and rows.
7. Math & formatting:
   • Use LaTeX for any math expressions
8. Out-of-scope:
   • If user asks anything not covered by the schema, respond “Data not available.”

Response formatting:
• Use bullet points for lists.
• Use tables for side-by-side data.
• Use LaTeX for math.
• Keep each answer clear and concise.

---
User Question: {question}
---

Just provide your answer in plain md format.
"""

prompt = PromptTemplate(
    template=prompt_template_str,
    input_variables=[
        "context",
        "question",
        "chat_history",
    ],
)

main_chain2 = RunnableParallel(
    {
        "context": main_chain,
        "question": RunnableLambda(lambda d: d["question"]),
        "chat_history": RunnableLambda(lambda d: d.get("chat_history", "")),
    }
)

text_chain = main_chain2 | prompt | llm.client | parser


def get_chain():
    return text_chain


def get_answer(
    chain,
    question,
    text,
    chat_history="",
):
    return chain.invoke(
        {
            "question": question,
            "text": text,
            "chat_history": str(chat_history),
        },
    )
