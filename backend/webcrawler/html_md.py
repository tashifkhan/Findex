from bs4 import BeautifulSoup
import html2text

def return_html_md(html: str) -> str:
    """Extension sends html body its converted to markdown text."""
    soup = BeautifulSoup(html, "html.parser")
    body = soup.body if soup.body else soup
    body_html = str(body.prettify())
    markdowntext = html2text.html2text(body_html)
    return markdowntext
