import os
import sys
import requests
import googlesearch
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


def search_and_get_urls(
    query,
    num_results=10,
    lang="en",
):
    """
    Performs a Google search for the given query and returns a list of URLs.
    """

    print(f"Searching for: '{query}'")
    urls = []

    try:
        for url in googlesearch.search(
            query,
            num_results=num_results,
            lang=lang,
        ):
            urls.append(url)
            if len(urls) >= num_results:
                break

    except Exception as e:
        print(f"An error occurred during search: {e}")
        print(
            "This might be due to rate limiting. Try again later or reduce num_results."
        )

    return urls


def search_urls(
    query: str,
    search_url: Optional[str] = None,
    max_results: int = 5,
) -> List[str]:
    """
    Search for URLs using Google search (synchronously).
    Returns a list of result URLs.
    """
    return search_and_get_urls(query, num_results=max_results)


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


def get_cleaned_texts(urls: List[str]) -> List[str]:
    """
    Fetch and clean text from multiple URLs synchronously.
    Returns a list of markdown strings, each prefixed with its source URL.
    """
    texts = []

    for url in urls:
        clean_text = markdown_fetcher(url)
        if clean_text.strip():
            texts.append(f"Source: {url}\n{clean_text}\n\n")

    return texts


def extract_text_from_url(url: str) -> str:
    """
    Extract clean text from a single URL synchronously.
    Returns markdown as a string.
    """
    return markdown_fetcher(url) if url else ""


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
    search_query = input("Enter your search query: ")
    number_of_urls = int(input("How many URLs do you want? (e.g., 10): "))

    results = web_search_pipeline(
        search_query,
        max_results=number_of_urls,
    )

    if results:
        print("\nFound URLs:")
        for i, url in enumerate(results):
            print(f"  {i+1}. {url}")

    else:
        print("No URLs found or an error occurred.")
