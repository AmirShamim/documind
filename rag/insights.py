from pathlib import Path
from typing import Dict, Optional
import json
import re

try:
    from langchain.chat_models import ChatOpenAI
    from langchain.prompts import PromptTemplate
    from langchain.chains import LLMChain
except Exception:
    ChatOpenAI = None
    PromptTemplate = None
    LLMChain = None

from .loader import load_pdf_text
from .ingest import ingest_pdf

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
    if not (ChatOpenAI and PromptTemplate and LLMChain):
        return _minimal_insights(text)

    llm = ChatOpenAI(temperature=0.1, model="gpt-3.5-turbo")

    summary_prompt = PromptTemplate(
        input_variables=["text"],
        template="""Provide a concise 2-3 sentence summary of the following document:

{text[:2000]}

Summary:"""
    )

    topics_prompt = PromptTemplate(
        input_variables=["text"],
        template="""Extract the main topics and themes from this document. List 3-5 key topics:

{text[:3000]}

Key Topics (comma-separated):"""
    )

    entities_prompt = PromptTemplate(
        input_variables=["text"],
        template="""Extract important entities (people, organizations, dates, locations) from this document:

{text[:3000]}

Format as JSON with keys: people, organizations, dates, locations
If a category has no items, use empty array.

JSON:"""
    )

    actions_prompt = PromptTemplate(
        input_variables=["text"],
        template="""Extract any action items, recommendations, or next steps mentioned in this document:

{text[:3000]}

Action Items (one per line, or 'None found' if none):"""
    )

    sentiment_prompt = PromptTemplate(
        input_variables=["text"],
        template="""Analyze the overall sentiment and tone of this document:

{text[:2000]}

Respond with one word: Positive, Negative, Neutral, or Mixed""",
    )

    try:
        summary_chain = LLMChain(llm=llm, prompt=summary_prompt)
        topics_chain = LLMChain(llm=llm, prompt=topics_prompt)
        entities_chain = LLMChain(llm=llm, prompt=entities_prompt)
        actions_chain = LLMChain(llm=llm, prompt=actions_prompt)
        sentiment_chain = LLMChain(llm=llm, prompt=sentiment_prompt)

        summary = summary_chain.run(text=text).strip()
        topics_raw = topics_chain.run(text=text).strip()
        entities_raw = entities_chain.run(text=text).strip()
        actions_raw = actions_chain.run(text=text).strip()
        sentiment = sentiment_chain.run(text=text).strip() or "Neutral"

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
            "summary": summary,
            "key_topics": topics[:5],
            "entities": entities,
            "action_items": action_items[:5],
            "sentiment": sentiment,
            "document_stats": {
                "estimated_reading_time": _estimate_reading_time(text),
                "complexity_score": _calculate_complexity(text),
            },
        }

    except Exception:
        return _minimal_insights(text)


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
