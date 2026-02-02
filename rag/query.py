from typing import Dict
from pathlib import Path
import os

# Try new imports first, fallback to old
try:
    from langchain_community.vectorstores import Chroma
except ImportError:
    from langchain.vectorstores import Chroma

try:
    from langchain_openai import OpenAIEmbeddings, ChatOpenAI
except ImportError:
    try:
        from langchain.embeddings import OpenAIEmbeddings
        from langchain.chat_models import ChatOpenAI
    except ImportError:
        from langchain_openai import OpenAIEmbeddings, ChatOpenAI

# Try new prompt imports first, fallback to old
PromptTemplate = None
LLMChain = None

try:
    from langchain.prompts import PromptTemplate
except Exception:
    try:
        from langchain_core.prompts import PromptTemplate
    except Exception:
        pass

try:
    from langchain.chains import LLMChain
except Exception:
    try:
        from langchain_core.chains import LLMChain
    except Exception:
        pass

# If we still don't have PromptTemplate and LLMChain, create simple versions
if not PromptTemplate:
    class PromptTemplate:
        def __init__(self, input_variables, template):
            self.input_variables = input_variables
            self.template = template
        
        def format(self, **kwargs):
            result = self.template
            for key, value in kwargs.items():
                result = result.replace("{" + key + "}", str(value))
            return result

if not LLMChain:
    class LLMChain:
        def __init__(self, llm, prompt):
            self.llm = llm
            self.prompt = prompt
        
        def invoke(self, inputs):
            formatted_prompt = self.prompt.format(**inputs)
            result = self.llm.invoke(formatted_prompt)
            if hasattr(result, 'content'):
                return {"text": result.content}
            return {"text": str(result)}
        
        def run(self, **kwargs):
            formatted_prompt = self.prompt.format(**kwargs)
            result = self.llm.invoke(formatted_prompt)
            if hasattr(result, 'content'):
                return result.content
            return str(result)

# Use free sentence-transformers if no OpenAI key
try:
    from langchain_community.embeddings import HuggingFaceEmbeddings
except ImportError:
    HuggingFaceEmbeddings = None


ROOT_DIR = Path(__file__).resolve().parent.parent
DB_DIR = ROOT_DIR / "rag" / "db"


def get_embeddings():
    """Return embeddings - use HuggingFace free embeddings first, then try OpenAI if configured."""
    # Try free HuggingFace embeddings first (more reliable for embeddings task)
    if HuggingFaceEmbeddings:
        try:
            return HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
        except Exception as e:
            print(f"HuggingFace embeddings failed: {e}, falling back to OpenAI")
    
    # Fall back to OpenAI if key exists
    if os.getenv("OPENAI_API_KEY"):
        try:
            return OpenAIEmbeddings()
        except Exception as e:
            print(f"OpenAI embeddings failed: {e}")
    
    # Last resort: try OpenAI anyway (will fail if no key)
    try:
        return OpenAIEmbeddings()
    except Exception:
        # If all else fails, return HuggingFace even if it seemed to fail
        if HuggingFaceEmbeddings:
            return HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
        raise RuntimeError("No embeddings provider available")


def query_doc(doc_id: str, question: str, k: int = 4, persist_dir: str = None) -> Dict:
    """Load a persisted Chroma collection by `doc_id`, run similarity search and ask an LLM.

    This is lightweight and should be called for every user question.
    """
    if persist_dir is None:
        persist_dir = str(DB_DIR)
    
    # Check if collection directory exists
    collection_dir = Path(persist_dir)
    if not collection_dir.exists():
        return {
            "answer": "Document not yet processed. Please wait for processing to complete.",
            "sources": []
        }
    
    try:
        embeddings = get_embeddings()
        vectordb = Chroma(
            persist_directory=persist_dir,
            embedding_function=embeddings,
            collection_name=doc_id,
        )

        docs = vectordb.similarity_search(question, k=k)
        
        if not docs:
            return {
                "answer": "No relevant information found in the document for this question.",
                "sources": []
            }
        
        context = "\n\n".join([d.page_content for d in docs])

        # If OpenAI key exists, use LLM for answer generation
        api_key = os.getenv("OPENAI_API_KEY")
        api_base = os.getenv("OPENAI_API_BASE")
        if api_key and PromptTemplate and LLMChain:
            try:
                # Use Featherless model
                if api_base:
                    llm = ChatOpenAI(
                        temperature=0,
                        model="openai/gpt-oss-120b",
                        base_url=api_base,
                        api_key=api_key
                    )
                else:
                    llm = ChatOpenAI(temperature=0, model="openai/gpt-oss-120b", api_key=api_key)
                
                prompt = PromptTemplate(
                    input_variables=["context", "question"],
                    template="Based on the following context, answer the question concisely.\n\nContext:\n{context}\n\nQuestion: {question}\n\nAnswer:",
                )
                chain = LLMChain(llm=llm, prompt=prompt)
                answer = chain.run({"context": context, "question": question})
                return {"answer": answer, "sources": [d.metadata for d in docs]}
            except Exception as e:
                # Fallback if LLM fails
                pass
        
        # Fallback: return context directly (no LLM)
        answer = f"Based on your document, here's what I found:\n\n{context[:1500]}"
        return {"answer": answer, "sources": [d.metadata for d in docs]}
        
    except Exception as e:
        return {
            "answer": f"Error querying document: {str(e)}",
            "sources": []
        }
