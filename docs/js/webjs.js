$(document).ready(function () {
  // 1. Fix favicon to use local resource
  let favicon = "/uploads/icon.svg";

  $("link[rel='icon']").remove();
  $("head").append(`<link rel="icon" type="image/svg+xml" href="${favicon}">`);

  // 3. Optimized KaTeX rendering
  if (typeof renderMathInElement === 'function') {
    renderMathInElement(document.body, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false },
        { left: "\\(", right: "\\)", display: false },
        { left: "\\[", right: "\\]", display: true },
        { left: "\\begin{align}", right: "\\end{align}", display: true },
        { left: "\\begin{alignat}", right: "\\end{alignat}", display: true },
        { left: "\\begin{gather}", right: "\\end{gather}", display: true },
        { left: "\\begin{CD}", right: "\\end{CD}", display: true },
        { left: "\\begin{equation}", right: "\\end{equation}", display: true }
      ],
      throwOnError: false,
      trust: true
    });
  }

  // 4. Render Mermaid diagrams
  if (typeof mermaid !== 'undefined') {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose'
    });
    try {
      mermaid.run({ querySelector: '.mermaid' });
    } catch (e) {
      console.error('Mermaid error:', e);
    }
  }
});
