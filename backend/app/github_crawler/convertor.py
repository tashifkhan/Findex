from gitingest import ingest
from pydantic import HttpUrl, BaseModel


class InjestedContent(BaseModel):
    tree: str
    summary: str
    content: str


def convert_github_repo_to_markdown(repo_link: HttpUrl) -> InjestedContent:
    """
    Convert a GitHub repository to a markdown file.
    """

    summary, tree, content = ingest(
        str(repo_link),
    )

    return InjestedContent(
        tree=tree,
        summary=summary,
        content=content,
    )


if __name__ == "__main__":
    from pathlib import Path

    repo_link = HttpUrl("https://github.com/tashifkhan/Findex")
    result = convert_github_repo_to_markdown(repo_link)
    print(
        result.tree,
        result.summary,
        result.content,
        sep="\n\n---\n\n",
    )
