from langchain.prompts import PromptTemplate
from app.core.llm import LargeLanguageModel
from app.core.llm import LargeLanguageModel

from langchain_core.runnables import RunnableLambda, RunnableParallel
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import PromptTemplate
from langchain_core.documents import Document
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from app.core.llm import LargeLanguageModel 

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

text_to_vectorstore = RunnableLambda(create_chunks) | RunnableLambda(embedding_generation)

parallel_chain = RunnableParallel({
    "vector_store": RunnableLambda(lambda d: d["text"]) | text_to_vectorstore,
    "question": RunnableLambda(lambda d: d["question"])
})

main_chain = (
    parallel_chain
    | RunnableLambda(lambda d: d["vector_store"]
                     .as_retriever(search_type="mmr", search_kwargs={"k": 3})
                     .invoke(d["question"]))
    | RunnableLambda(format_docs)
)

prompt = PromptTemplate(
    template=(
        "You are a helpful assistant. The transcript provided is the information present on a webpage. Answer the questions from it "
        "If the context is insufficient, just say you don't know.\n\n You may be given chat history at times"
        "Context:\n{context}\n\nQuestion:\n{question}"
    ),
    input_variables=["context", "question"]
)

main_chain2 = RunnableParallel({
    "context": main_chain,
    "question": RunnableLambda(lambda d: d["question"])
})

text_chain = main_chain2 | prompt | llm.client | parser

def get_chain():
    return text_chain

def get_answer(chain, question, text):
    return chain.invoke({"question": question, "text": text})