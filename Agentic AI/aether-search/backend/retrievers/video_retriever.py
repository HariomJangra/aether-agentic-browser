from ddgs import DDGS


def search_videos(query: str, max_results: int = 10) -> list[dict]:
    """Search DuckDuckGo for videos and return results."""
    try:
        results = DDGS().videos(query, max_results=max_results)
        return [
            {
                "title": r.get("title", ""),
                "url": r.get("content", ""),
                "description": r.get("description", ""),
                "publisher": r.get("publisher", ""),
                "duration": r.get("duration", ""),
                "thumbnail": r.get("images", {}).get("large", "") if isinstance(r.get("images"), dict) else "",
            }
            for r in results
        ]
    except Exception:
        return []