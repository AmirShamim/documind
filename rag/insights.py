from pathlib import Path
from typing import Dict, Optional
import json
import re
import os

# Try new imports first, fallback to old
try:
    from langchain_openai import ChatOpenAI
except ImportError:
    try:
        from langchain.chat_models import ChatOpenAI
    except Exception:
        ChatOpenAI = None

# Try to import PromptTemplate and LLMChain with multiple fallbacks
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

from .ingest import get_embeddings, ingest_pdf
from .loader import load_pdf_text

INSIGHTS_DIR = Path(__file__).resolve().parent / 'insights_cache'
INSIGHTS_DIR.mkdir(parents=True, exist_ok=True)


def extract_insights(pdf_path: str, doc_id: str, persist_dir: str = "rag/db") -> Dict:
    """Ingest the document, persist the vectors, and extract AI insights."""
    ingestion = ingest_pdf(pdf_path, doc_id, persist_dir)
    full_text = load_pdf_text(pdf_path)

    insights_payload = _analyze_document_content(full_text)

    payload = {
        "doc_id": doc_id,
        "num_chunks": ingestion.get("num_chunks"),
        "page_count": ingestion.get("page_count"),
        "word_count": len(full_text.split()),
        "insights": insights_payload,
    }

    _save_insights(doc_id, payload)
    return payload


def get_saved_insights(doc_id: str) -> Optional[Dict]:
    path = INSIGHTS_DIR / f"{doc_id}.json"
    if not path.exists():
        return None
    with path.open('r', encoding='utf-8') as fh:
        return json.load(fh)


def _save_insights(doc_id: str, payload: Dict) -> None:
    path = INSIGHTS_DIR / f"{doc_id}.json"
    with path.open('w', encoding='utf-8') as fh:
        json.dump(payload, fh, indent=2, ensure_ascii=False)


def _analyze_document_content(text: str) -> Dict:
    # Ensure environment is configured
    try:
        from backend.core.config import configure_api_env
        configure_api_env()
    except:
        try:
            from core.config import configure_api_env
            configure_api_env()
        except:
            pass
    
    # Check if LLM is available and API key exists
    api_key = os.getenv("OPENAI_API_KEY")
    api_base = os.getenv("OPENAI_API_BASE")
    has_llm = ChatOpenAI and PromptTemplate and LLMChain and api_key
    
    if not has_llm:
        print(f"LLM not available. ChatOpenAI={bool(ChatOpenAI)}, PromptTemplate={bool(PromptTemplate)}, LLMChain={bool(LLMChain)}, API_KEY={bool(api_key)}")
        return _smart_insights(text)

    try:
        # Try Featherless model first (openai/gpt-oss-120b)
        model_names = ["openai/gpt-oss-120b", "gpt-4-turbo", "gpt-4", "claude-3.5-sonnet", "mistral-large"]
        llm = None
        for model_name in model_names:
            try:
                if api_base:
                    llm = ChatOpenAI(
                        temperature=0.1,
                        model=model_name,
                        base_url=api_base,
                        api_key=api_key
                    )
                else:
                    llm = ChatOpenAI(temperature=0.1, model=model_name, api_key=api_key)
                print(f"Using model: {model_name}")
                break
            except Exception as e:
                print(f"Model {model_name} setup failed: {str(e)[:80]}")
                continue
        
        if not llm:
            print("No LLM model available, falling back to text analysis")
            return _smart_insights(text)

        summary_prompt = PromptTemplate(
            input_variables=["text"],
            template="""Provide a concise 2-3 sentence summary of the following document:

{text}

Summary:"""
        )

        topics_prompt = PromptTemplate(
            input_variables=["text"],
            template="""Extract the main topics and themes from this document. List 3-5 key topics:

{text}

Key Topics (comma-separated):"""
        )

        entities_prompt = PromptTemplate(
            input_variables=["text"],
            template="""Extract important entities (people, organizations, dates, locations) from this document:

{text}

Format as JSON with keys: people, organizations, dates, locations
If a category has no items, use empty array.

JSON:"""
        )

        actions_prompt = PromptTemplate(
            input_variables=["text"],
            template="""Extract any action items, recommendations, or next steps mentioned in this document:

{text}

Action Items (one per line, or 'None found' if none):"""
        )

        sentiment_prompt = PromptTemplate(
            input_variables=["text"],
            template="""Analyze the overall sentiment and tone of this document:

{text}

Respond with one word: Positive, Negative, Neutral, or Mixed""",
        )

        summary_chain = LLMChain(llm=llm, prompt=summary_prompt)
        topics_chain = LLMChain(llm=llm, prompt=topics_prompt)
        entities_chain = LLMChain(llm=llm, prompt=entities_prompt)
        actions_chain = LLMChain(llm=llm, prompt=actions_prompt)
        sentiment_chain = LLMChain(llm=llm, prompt=sentiment_prompt)

        # Trim text to avoid token limits
        text_sample = text[:3000]

        try:
            # Try new API first (.invoke)
            summary = summary_chain.invoke({"text": text_sample}).get("text", "").strip()
        except:
            try:
                # Fallback to old API (.run)
                summary = summary_chain.run(text=text_sample).strip()
            except Exception as e:
                print(f"Summary generation failed: {e}")
                summary = text_sample[:200] + "..."
        
        try:
            topics_raw = topics_chain.invoke({"text": text_sample}).get("text", "").strip()
        except:
            try:
                topics_raw = topics_chain.run(text=text_sample).strip()
            except Exception as e:
                print(f"Topics generation failed: {e}")
                topics_raw = ""
        
        try:
            entities_raw = entities_chain.invoke({"text": text_sample}).get("text", "").strip()
        except:
            try:
                entities_raw = entities_chain.run(text=text_sample).strip()
            except Exception as e:
                print(f"Entities generation failed: {e}")
                entities_raw = ""
        
        try:
            actions_raw = actions_chain.invoke({"text": text_sample}).get("text", "").strip()
        except:
            try:
                actions_raw = actions_chain.run(text=text_sample).strip()
            except Exception as e:
                print(f"Actions generation failed: {e}")
                actions_raw = ""
        
        try:
            sentiment = sentiment_chain.invoke({"text": text_sample}).get("text", "").strip() or "Neutral"
        except:
            try:
                sentiment = sentiment_chain.run(text=text_sample).strip() or "Neutral"
            except Exception as e:
                print(f"Sentiment generation failed: {e}")
                sentiment = "Neutral"

        topics = [t.strip() for t in topics_raw.split(',') if t.strip()]
        action_items = [line.strip() for line in actions_raw.split('\n') if line.strip() and not line.lower().startswith("none")]

        try:
            entities = json.loads(entities_raw)
        except Exception:
            entities = {
                "people": _extract_entities(text, "people"),
                "organizations": _extract_entities(text, "organizations"),
                "dates": _extract_entities(text, "dates"),
                "locations": _extract_entities(text, "locations"),
            }

        return {
            "summary": summary[:500] if summary else text_sample[:200],
            "key_topics": topics[:5],
            "entities": entities,
            "action_items": action_items[:5],
            "sentiment": sentiment,
            "document_stats": {
                "estimated_reading_time": _estimate_reading_time(text),
                "complexity_score": _calculate_complexity(text),
            },
        }

    except Exception as e:
        print(f"LLM-based insights generation failed: {e}")
        return _smart_insights(text)


def _smart_insights(text: str) -> Dict:
    """Generate insights without LLM using text analysis."""
    # Extract first few sentences as summary
    sentences = re.split(r'[.!?]+', text)
    sentences = [s.strip() for s in sentences if len(s.strip()) > 20]
    summary = '. '.join(sentences[:3]) + '.' if sentences else "Document processed successfully."
    if len(summary) > 500:
        summary = summary[:500] + '...'
    
    # Extract key topics from frequent capitalized words
    words = re.findall(r'\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b', text)
    word_freq = {}
    for w in words:
        if len(w) > 3:
            word_freq[w] = word_freq.get(w, 0) + 1
    topics = sorted(word_freq.keys(), key=lambda x: word_freq[x], reverse=True)[:5]
    if not topics:
        topics = ["Document Analysis", "Information Processing"]
    
    # Extract entities
    entities = {
        "people": _extract_entities(text, "people"),
        "organizations": _extract_entities(text, "organizations"),
        "dates": _extract_entities(text, "dates"),
        "locations": _extract_entities(text, "locations"),
    }
    
    # Simple action item extraction
    action_patterns = [
        r'(?:should|must|need to|required to|recommend|suggest)[^.]*\.',
        r'(?:action|task|todo|step)[\s:]+[^.]*\.',
    ]
    action_items = []
    for pattern in action_patterns:
        matches = re.findall(pattern, text, re.IGNORECASE)
        action_items.extend([m.strip()[:100] for m in matches[:2]])
    action_items = action_items[:5]
    
    return {
        "summary": summary,
        "key_topics": topics,
        "entities": entities,
        "action_items": action_items,
        "sentiment": "Neutral",
        "document_stats": {
            "estimated_reading_time": _estimate_reading_time(text),
            "complexity_score": _calculate_complexity(text),
        },
    }


def _minimal_insights(text: str) -> Dict:
    return {
        "summary": "Document processed successfully.",
        "key_topics": ["Document Analysis"],
        "entities": {"people": [], "organizations": [], "dates": [], "locations": []},
        "action_items": [],
        "sentiment": "Neutral",
        "document_stats": {
            "estimated_reading_time": _estimate_reading_time(text),
            "complexity_score": _calculate_complexity(text),
        },
    }


def _extract_entities(text: str, entity_type: str) -> list:
    if entity_type == "dates":
        patterns = [
            r"\b\d{1,2}/\d{1,2}/\d{2,4}\b",
            r"\b\d{1,2}-\d{1,2}-\d{2,4}\b",
            r"\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}\b",
        ]
        found = []
        for pattern in patterns:
            found.extend(re.findall(pattern, text))
        return list(dict.fromkeys(found))[:3]

    if entity_type == "organizations":
        keywords = ["Inc", "Corp", "Ltd", "LLC", "Company", "University", "Institute", "Center"]
        sentences = text.split('.')[:10]
        orgs = []
        for sentence in sentences:
            for keyword in keywords:
                if keyword in sentence:
                    words = sentence.split()
                    idx = next((i for i, w in enumerate(words) if keyword in w), -1)
                    if idx >= 0:
                        snippet = ' '.join(words[max(0, idx - 2): idx + 1])
                        if len(snippet) > 3:
                            orgs.append(snippet.strip())
        return list(dict.fromkeys(orgs))[:3]

    return []


def _estimate_reading_time(text: str) -> str:
    words = len(text.split())
    if not words:
        return "< 1 minute"
    minutes = words / 200
    if minutes < 1:
        return "< 1 minute"
    if minutes < 60:
        return f"{int(minutes)} minutes"
    hours = int(minutes // 60)
    mins = int(minutes % 60)
    return f"{hours}h {mins}m"


def _calculate_complexity(text: str) -> str:
    words = text.split()
    if not words:
        return "Unknown"
    avg_len = sum(len(word) for word in words) / len(words)
    if avg_len > 6:
        return "High"
    if avg_len > 4.5:
        return "Medium"
    return "Low"
