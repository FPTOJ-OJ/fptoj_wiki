"""MkDocs hook to convert mermaid code blocks to div.mermaid."""
import re

def on_page_markdown(markdown, page, config, files):
    """Convert ```mermaid blocks to raw HTML div before pymdownx processes them."""
    pattern = r'```mermaid\n(.*?)```'
    
    def replace_mermaid(match):
        content = match.group(1).rstrip('\n')
        return f'<div class="mermaid">\n{content}\n</div>'
    
    markdown = re.sub(pattern, replace_mermaid, markdown, flags=re.DOTALL)
    return markdown
