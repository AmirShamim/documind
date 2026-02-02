from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings
from langchain.chat_models import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from typing import Dict


def query_doc(doc_id: str, question: str, k: int = 4, persist_dir: str = "rag/db") -> Dict:
    """Load a persisted Chroma collection by `doc_id`, run similarity search and ask an LLM.

    This is lightweight and should be called for every user question.
    """
    vectordb = Chroma(
        persist_directory=persist_dir,
        embedding_function=OpenAIEmbeddings(),
        collection_name=doc_id,
    )

    docs = vectordb.similarity_search(question, k=k)
    context = "\n\n".join([d.page_content for d in docs])

    llm = ChatOpenAI(temperature=0)
    prompt = PromptTemplate(
        input_variables=["context", "question"],
        template="Answer from context:\n{context}\n\nQuestion: {question}",
    )
    chain = LLMChain(llm=llm, prompt=prompt)
    answer = chain.run({"context": context, "question": question})

    return {"answer": answer, "sources": [d.metadata for d in docs]}
