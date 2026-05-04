import numpy as np
import requests
import trafilatura
from concurrent.futures import ThreadPoolExecutor
from ddgs import DDGS
from sentence_transformers import SentenceTransformer

# Load embedding model once at startup
embedding_model = SentenceTransformer("all-MiniLM-L6-v2")


def search_web(query: str, max_results: int = 7) -> list:
    """Search DuckDuckGo and return results."""
    try:
        return DDGS().text(query, max_results=max_results, backend="auto")
    except Exception:
        return []


def extract_url_content(url: str, max_chars: int = 2000, timeout: int = 5) -> str | None:
    """Extract main text content from a URL."""
    try:
        resp = requests.get(url, timeout=timeout, headers={"User-Agent": "Mozilla/5.0"})
        resp.raise_for_status()
        content = trafilatura.extract(resp.text)
        if content:
            return content[:max_chars]
    except Exception:
        pass
    return None


def fetch_item(item: dict) -> dict:
    """Fetch content for a single search result."""
    return {
        "title": item["title"],
        "body": item["body"],
        "url": item["href"],
        "content": extract_url_content(item["href"]),
    }


def chunk_text(text: str, chunk_size: int = 500) -> list[str]:
    """Split text into fixed-size chunks."""
    return [text[i : i + chunk_size] for i in range(0, len(text), chunk_size)]


def retrieve_context(query: str, top_k: int = 5) -> dict:
    """Search, extract, chunk, embed, and return top relevant context with sources."""
    # Search the web
    results = search_web(query)

    # Fetch page content in parallel
    with ThreadPoolExecutor(max_workers=7) as executor:
        data = list(executor.map(fetch_item, results))

    # Build chunks and track which source each chunk came from
    chunks = []
    chunk_sources = []
    for item in data:
        if item["content"]:
            item_chunks = chunk_text(item["content"])
            chunks.extend(item_chunks)
            chunk_sources.extend([item] * len(item_chunks))

    if not chunks:
        return {"context": "", "sources": []}

    # Embed and rank by cosine similarity
    chunk_embeddings = embedding_model.encode(chunks, batch_size=64, show_progress_bar=False)
    query_embedding = embedding_model.encode(query)

    similarities = np.dot(chunk_embeddings, query_embedding) / (
        np.linalg.norm(chunk_embeddings, axis=1) * np.linalg.norm(query_embedding)
    )
    top_indices = np.argsort(similarities)[-top_k:][::-1]
    top_chunks = [chunks[i] for i in top_indices]

    # Collect unique sources used in top chunks
    seen_urls = set()
    sources = []
    for i in top_indices:
        src = chunk_sources[i]
        if src["url"] not in seen_urls:
            seen_urls.add(src["url"])
            sources.append({
                "title": src["title"],
                "url": src["url"],
                "body": src["body"],
            })

    return {"context": "\n\n".join(top_chunks), "sources": sources}
