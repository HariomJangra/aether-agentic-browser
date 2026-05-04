import json
import urllib.error
import urllib.request
from typing import Any


def get_active_tab(
    host: str = "127.0.0.1",
    port: int = 9222,
    timeout_s: float = 0.75,
) -> dict[str, Any]:
    """Return the current active tab (top CDP page entry).

    Fetches the CDP target list from:
      http://{host}:{port}/json

    In your setup, the first entry with type == "page" changes based on
    whichever tab is currently active.

    Output:
      {
        "active": {
          "title": "...",
          "type": "page",
          "url": "..."
        }
      }

    If CDP is unreachable or no page is found:
      {"active": None}
    """

    url = f"http://{host}:{port}/json"

    try:
        req = urllib.request.Request(url, headers={"Accept": "application/json"})
        with urllib.request.urlopen(req, timeout=timeout_s) as resp:
            raw = resp.read().decode("utf-8", errors="replace")
        data = json.loads(raw)
    except (urllib.error.URLError, TimeoutError, OSError, json.JSONDecodeError):
        return {"active": None}

    if not isinstance(data, list):
        return {"active": None}

    for item in data:
        if not isinstance(item, dict):
            continue
        if item.get("type") != "page":
            continue

        title = item.get("title")
        page_url = item.get("url")

        return {
            "active": {
                "title": title if isinstance(title, str) else "",
                "type": "page",
                "url": page_url if isinstance(page_url, str) else "",
            }
        }

    return {"active": None}