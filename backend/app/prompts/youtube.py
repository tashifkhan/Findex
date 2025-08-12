from langchain.prompts import PromptTemplate
from app.core.llm import LargeLanguageModel

# RAG imports commented out - using plain text instead
# from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import ChatGoogleGenerativeAI

# from langchain_community.vectorstores import Chroma
from langchain_core.prompts import PromptTemplate

# from langchain_huggingface import HuggingFaceEmbeddings
from langchain_core.documents import Document
from langchain.schema.runnable import (
    RunnableLambda,
    RunnableBranch,
    RunnableParallel,
    RunnablePassthrough,
)
from langchain_core.output_parsers import StrOutputParser
import sys
import os

try:
    from youtube_utils.transcript_generator import processed_transcript
    from youtube_utils.get_subs import get_subtitle_content

except ImportError:
    sys.path.append(
        os.path.dirname(
            os.path.dirname(os.path.abspath(__file__)),
        ),
    )
    from youtube_utils.transcript_generator import processed_transcript
    from youtube_utils.get_subs import get_subtitle_content

from dotenv import load_dotenv

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
load_dotenv()


llm = LargeLanguageModel()
parser = StrOutputParser()


# RAG functions commented out - using plain text approach
# def format_docs(retrieved_docs):
#     return "\n".join(doc.page_content for doc in retrieved_docs)


def fetch_transcript(video_url):
    raw_transcript = get_subtitle_content(video_url, lang="en")

    known_error_messages = [
        "Video unavailable.",
        "Subtitles not available for the specified language.",
        "Subtitles were requested but could not be retrieved from file.",
        "Subtitles not available for the specified language or download failed.",
    ]
    known_error_prefixes = [
        "Error downloading subtitles:",
        "An unexpected error occurred while fetching subtitles:",
    ]

    is_actual_error = False
    if raw_transcript in known_error_messages:
        is_actual_error = True
    else:
        if raw_transcript:
            for prefix in known_error_prefixes:
                if raw_transcript.startswith(prefix):
                    is_actual_error = True
                    break

    if raw_transcript and not is_actual_error:
        cleaned_transcript = processed_transcript(raw_transcript)

    else:
        cleaned_transcript = ""

    return cleaned_transcript


# RAG functions commented out - using plain text approach
# def create_chunks(transcript):
#     splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
#     text_chunks = splitter.split_text(transcript)
#
#     doc_chunks = [Document(page_content=chunk) for chunk in text_chunks]
#     return doc_chunks


# embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")


# def embedding_generation(chunks):
#     vector_store = Chroma.from_documents(documents=chunks, embedding=embeddings)
#     return vector_store


# RAG chain commented out - using simple text processing
# branch_chain = RunnableBranch(
#     (lambda x: x is None or x.strip() == "", RunnablePassthrough()),  # type: ignore
#     RunnableLambda(create_chunks) | RunnableLambda(embedding_generation),
# )
# initial_chain = RunnableLambda(fetch_transcript) | branch_chain

# url_to_retriever_chain = RunnableLambda(lambda d: d["url"]) | initial_chain


# RAG parallel chain commented out - using simple text processing
# parallel_chain = RunnableParallel(
#     {
#         "vector_store": (url_to_retriever_chain),
#         "question": RunnableLambda(lambda d: d["question"]),
#     }
# )


def get_context(d):
    """Get context from transcript or return empty string if no transcript available"""
    # RAG processing commented out - using direct transcript
    url = d.get("url", "")
    transcript = fetch_transcript(url) if url else ""
    return transcript  # Return direct transcript text

    # RAG code commented out
    # if hasattr(vector_store, "as_retriever"):
    #     retriever = vector_store.as_retriever(search_type="mmr", search_kwargs={"k": 2})
    #     retrieved_docs = retriever.invoke(d["question"])
    #     return format_docs(retrieved_docs)
    # else:
    #     return "No transcript available for this video."


# RAG main chain commented out - using simple processing
# main_chain = parallel_chain | RunnableLambda(get_context)

prompt_templet_string = """
System:
You are “YTVideoChat,” a specialized assistant designed to answer questions about a YouTube video using ONLY the data provided in a YTVideoInfo object. Never hallucinate or invent details. If a user’s question cannot be answered from the data, reply “Data not available.”

Guidelines:
1. When asked for a summary:
   • Use “description” and “transcript” (if present).
   • Keep summaries under 150 words unless more detail is requested.
2. When asked about length:
   • Convert “duration” from seconds to “X min Y sec.”
3. When asked for statistics:
   • Quote “view_count,” “like_count,” “upload_date,” and “uploader.”
4. When asked for themes, topics or keywords:
   • Analyze “tags,” “categories,” and “transcript.”
5. When asked for sentiment or tone:
   • Base analysis solely on “captions” or “transcript.”
6. When asked for related videos or recommendations:
   • Suggest topics or tags; do NOT invent other video titles.
7. If user asks anything outside the scope of the schema:
   • Respond “Data not available.”

---
Context:
{context}

---
Chat History (if available):
{chat_history}

---

Response formatting:
• Use bullet points for lists.
• Use tables for side-by-side comparisons.
• Use LaTeX for any math expressions, e.g.
• Keep each answer clear and concise.

---
User Question: {question}
---

Just provide your answer in plain md format.
"""

prompt = PromptTemplate(
    template=prompt_templet_string,
    input_variables=[
        "context",
        "question",
        "chat_history",
    ],
)

main_chain2 = RunnableParallel(
    {
        "context": RunnableLambda(get_context),  # Direct transcript processing
        "question": RunnableLambda(lambda d: d["question"]),
        "chat_history": RunnableLambda(lambda d: d.get("chat_history", "")),
    }
)

youtube_chain = main_chain2 | prompt | llm.client | parser


def get_chain():
    return youtube_chain


def get_answer(
    chain,
    question,
    url=None,
    chat_history="",
):
    return chain.invoke(
        {
            "question": question,
            "url": url,
            "chat_history": str(chat_history),
        }
    )
