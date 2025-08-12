from langchain.prompts import PromptTemplate
from app.core.llm import LargeLanguageModel

from langchain_core.runnables import RunnableLambda, RunnableParallel
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import PromptTemplate
from langchain_core.documents import Document

# RAG imports commented out - using plain text instead
# from langchain_huggingface import HuggingFaceEmbeddings
# from langchain.text_splitter import RecursiveCharacterTextSplitter
# from langchain_community.vectorstores import Chroma
from app.core.llm import LargeLanguageModel

llm = LargeLanguageModel()
parser = StrOutputParser()


# RAG functions commented out - using plain text approach
# def format_docs(retrieved_docs):
#     return "\n".join(doc.page_content for doc in retrieved_docs)


# def create_chunks(text):
#     splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
#     text_chunks = splitter.split_text(text)
#     doc_chunks = [Document(page_content=chunk) for chunk in text_chunks]
#     return doc_chunks


# embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")


# def embedding_generation(chunks):
#     vector_store = Chroma.from_documents(documents=chunks, embedding=embeddings)
#     return vector_store


# RAG chain components commented out - using plain text instead
# text_to_vectorstore = RunnableLambda(create_chunks) | RunnableLambda(
#     embedding_generation
# )

# parallel_chain = RunnableParallel(
#     {
#         "vector_store": RunnableLambda(lambda d: d["text"]) | text_to_vectorstore,
#         "question": RunnableLambda(lambda d: d["question"]),
#     }
# )

# main_chain = (
#     parallel_chain
#     | RunnableLambda(
#         lambda d: d["vector_store"]
#         .as_retriever(search_type="mmr", search_kwargs={"k": 3})
#         .invoke(d["question"])
#     )
#     | RunnableLambda(format_docs)
# )

prompt_template_str = """
System:
You are "WebCrawlerChat," a specialized assistant designed to answer questions using data from multiple web pages crawled from search results. You have access to web page data in the format "=== SOURCE X: URL ===" followed by the content. Use ONLY the provided data to answer questions. Never hallucinate or invent details. If a user's question cannot be answered from the crawled data, reply "Data not available from crawled sources."

---
Context:
{context}

---
Chat History (if available):
{chat_history}

---

CRITICAL REQUIREMENTS FOR SOURCE CITATIONS:
• ALWAYS cite the exact URL from the source headers when referencing information
• Use format: "According to [EXACT_URL]..." or "Source: [EXACT_URL]"
• Never say "No URL available" - the URLs are clearly marked in the source headers
• For each piece of information, cite the specific URL where it was found
• When combining info from multiple sources, list all relevant URLs

Guidelines:
1. Multi-source analysis:
   • Analyze content from all provided URLs to give comprehensive answers.
   • When information differs between sources, mention the discrepancy and cite sources.
   • Prioritize more authoritative or recent sources when available.

2. Source attribution (MANDATORY):
   • ALWAYS cite which URL(s) your information comes from using the URLs in the source headers
   • Use format: "According to [URL]..." or "Source: [URL]"
   • When combining info from multiple sources, list all relevant URLs.
   • NEVER omit source citations or say "No URL available"

3. Content synthesis:
   • Combine relevant information from multiple sources for comprehensive answers.
   • Identify common themes and patterns across sources.
   • Highlight unique insights from individual sources.

4. Summaries and overviews:
   • Provide consolidated summaries drawing from all relevant sources.
   • Structure information logically, not just source by source.
   • Limit to 200 words unless user requests more detail.

5. Fact-checking and comparison:
   • Compare information across sources to identify consensus or conflicts.
   • Note when sources contradict each other.
   • Mention if information is only found in one source vs. multiple sources.

6. Links and references:
   • Extract and compile relevant external links from all sources.
   • Organize references by topic or relevance.
   • Include the source URL where each link was found.

7. Code and technical content:
   • Combine code examples from multiple sources when relevant.
   • Note differences in approaches between sources.
   • Preserve source attribution for each code snippet.

8. Data limitations:
   • If asked about information not covered in any of the crawled pages, respond "Data not available from crawled sources."
   • Be transparent about the scope and limitations of the crawled data.

Response formatting:
• Use bullet points for lists and comparisons.
• Use tables for organizing information from multiple sources.
• Use clear headings to structure complex answers.
• Always include source citations.
• Keep answers clear, comprehensive, and well-organized.

---
User Question: {question}
---

REMEMBER: You MUST cite the exact URLs from the source headers (=== SOURCE X: URL ===) for every piece of information. Never say "No URL available" as all URLs are clearly provided in the source headers.

Provide your answer in plain markdown format, making sure to cite sources appropriately using the exact URLs from the source headers.

"""

prompt = PromptTemplate(
    template=prompt_template_str,
    input_variables=[
        "context",
        "question",
        "chat_history",
    ],
)

# RAG-based chain commented out - using simple plain text chain
# main_chain2 = RunnableParallel(
#     {
#         "context": main_chain,
#         "question": RunnableLambda(lambda d: d["question"]),
#         "chat_history": RunnableLambda(lambda d: d.get("chat_history", "")),
#     }
# )

# Simple plain text chain instead of RAG
simple_chain = RunnableParallel(
    {
        "context": RunnableLambda(lambda d: d["text"]),
        "question": RunnableLambda(lambda d: d["question"]),
        "chat_history": RunnableLambda(lambda d: d.get("chat_history", "")),
    }
)

text_chain = simple_chain | prompt | llm.client | parser


def get_chain():
    return text_chain


def get_answer(
    chain,
    question,
    text,
    chat_history="",
):
    # Simple plain text approach - no RAG/chunking/embedding
    prompt_input = {
        "context": text,
        "question": question,
        "chat_history": str(chat_history),
    }
    # Generate answer using the simple chain
    answer = prompt | llm.client | parser
    return answer.invoke(prompt_input)

    # RAG implementation commented out
    # return chain.invoke(
    #     {
    #         "question": question,
    #         "text": text,
    #         "chat_history": str(chat_history),
    #     }
    # )
