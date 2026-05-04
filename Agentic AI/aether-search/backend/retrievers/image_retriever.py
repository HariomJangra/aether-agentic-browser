from ddgs import DDGS


def search_images(query: str, max_results: int = 10) -> list[dict]:
    """Search DuckDuckGo for images and return results."""
    try:
        results = DDGS().images(query, max_results=max_results)
        return [
            {
                "title": r.get("title", ""),
                "image": r.get("image", ""),
                "thumbnail": r.get("thumbnail", "")
            }
            for r in results
        ]
    except Exception:
        return []