import os
import sys
import requests
from typing import List, Optional

try:
    from app.website_context import markdown_fetcher

except ImportError:
    sys.path.append(
        os.path.dirname(
            os.path.dirname(os.path.abspath(__file__)),
        ),
    )
    from website_context import markdown_fetcher


SEARCH_URL_DEFAULT = os.getenv(
    "SEARCH_URL",
    "https://search.inetol.net/",
)


def search_urls(
    query: str,
    search_url: Optional[str] = None,
    max_results: int = 5,
) -> List[str]:
    """
    Search for URLs using SearchXNG (synchronously).
    Returns a list of result URLs.
    """
    search_url = search_url or SEARCH_URL_DEFAULT
    search_params = {"q": query, "format": "json"}

    try:
        response = requests.get(
            search_url,
            params=search_params,
            timeout=30,
        )
        response.raise_for_status()
        search_data = response.json()
        urls = []

        if "results" in search_data:
            for result in search_data["results"][:max_results]:
                if "url" in result:
                    urls.append(result["url"])

        return urls

    except Exception as e:
        print(f"Error searching: {e}")
        return []


def fetch_html(url: str) -> str:
    """
    Fetch HTML content from a URL synchronously.
    Returns the HTML as a string, or an empty string on error.
    """
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    try:
        response = requests.get(
            url,
            headers=headers,
            timeout=30,
        )
        response.raise_for_status()
        return response.text

    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return ""


def html_to_markdown(html: str) -> str:
    """
    Convert HTML to markdown using website_context.html_md_convertor.
    Returns markdown as a string.
    """
    try:
        return markdown_fetcher(html)

    except Exception as e:
        print(f"Error converting HTML to markdown: {e}")
        return html


def get_cleaned_texts(urls: List[str]) -> List[str]:
    """
    Fetch and clean text from multiple URLs synchronously.
    Returns a list of markdown strings, each prefixed with its source URL.
    """
    texts = []

    for url in urls:
        html = fetch_html(url)
        if html:
            clean_text = html_to_markdown(html)
            if clean_text.strip():
                texts.append(f"Source: {url}\n{clean_text}\n\n")

    return texts


def extract_text_from_url(url: str) -> str:
    """
    Extract clean text from a single URL synchronously.
    Returns markdown as a string.
    """
    html = fetch_html(url)
    return html_to_markdown(html) if html else ""


def web_search_pipeline(
    query: str,
    search_url: Optional[str] = None,
    max_results: int = 5,
) -> List[str]:
    """
    Run the full web search and extraction pipeline synchronously:
    1. Search for URLs using the query.
    2. Fetch and clean text from each URL.
    Returns a list of cleaned markdown strings with source URLs.
    """
    urls = search_urls(
        query,
        search_url,
        max_results,
    )

    if not urls:
        return []

    texts = get_cleaned_texts(urls)
    return texts


if __name__ == "__main__":
    query = "elon musk"
    results = web_search_pipeline(
        query,
        max_results=3,
    )

    for idx, result in enumerate(results):
        print(f"Result {idx + 1}:\n{result}\n")
