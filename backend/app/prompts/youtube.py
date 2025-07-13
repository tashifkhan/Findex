from langchain.prompts import PromptTemplate
from app.core.llm import LargeLanguageModel

from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_community.vectorstores import Chroma
from langchain_core.prompts import PromptTemplate
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_core.documents import Document
from langchain.schema.runnable import RunnableLambda ,RunnableBranch, RunnableParallel, RunnablePassthrough
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
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
load_dotenv()


llm= LargeLanguageModel()
parser= StrOutputParser()

def format_docs(retrieved_docs):
  return "\n".join(doc.page_content for doc in retrieved_docs)
        
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

def create_chunks(transcript):
    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    text_chunks = splitter.split_text(transcript)
    
    doc_chunks = [Document(page_content=chunk) for chunk in text_chunks]
    return doc_chunks

embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

def embedding_generation(chunks):
    vector_store = Chroma.from_documents(documents=chunks, embedding=embeddings)
    return vector_store


branch_chain = RunnableBranch(
    (
        lambda x: x is None or x.strip() == '',  RunnablePassthrough()             
    ),
    RunnableLambda(create_chunks) | RunnableLambda(embedding_generation)
)
initial_chain= RunnableLambda(fetch_transcript) | branch_chain

url_to_retriever_chain = (
    RunnableLambda(lambda d: d["url"])      
    | initial_chain                          
)


parallel_chain = RunnableParallel(
    {
        "vector_store": (
            url_to_retriever_chain
        ),
        "question": RunnableLambda(lambda d: d["question"]) 
    }
)

main_chain = parallel_chain | RunnableLambda(lambda d: d["vector_store"].as_retriever(search_type="mmr",search_kwargs={"k": 2}).invoke(d["question"]))| RunnableLambda(format_docs) #| prompt | llm | parser

prompt= PromptTemplate(
    template="You are a helpful assistant. Answer in detail from the provided transcript context of the YouTube video. If the context is insufficient, just say you dont know. Context: {context} Question:{question}",
    input_variables=['context','question']
)

main_chain2= RunnableParallel({
    'context': main_chain,
     "question": RunnableLambda(lambda d: d["question"])

})

youtube_chain= main_chain2 | prompt | llm.client | parser

def get_chain():
    return youtube_chain

def get_answer(chain, question, url=None):
    return chain.invoke({"question": question, "url": url})