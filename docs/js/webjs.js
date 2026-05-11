$(document).ready(function () {
  // 1. Fix favicon to use local resource
  // Using a relative path from the root. Since wiki.fptoj.com is the site_url,
  // we can assume it's hosted at the root.
  let favicon = "/uploads/icon.svg";
  
  $("link[rel='icon']").remove();
  $("head").append(`<link rel="icon" type="image/svg+xml" href="${favicon}">`);

  // 2. Redirect logo to main site
  $('a.md-header__button.md-logo').attr('href', 'https://fptoj.com/');

  // 3. Optimized KaTeX rendering
  // We use the auto-render extension to render all math in the document at once.
  // This is much faster than iterating through elements manually.
  if (typeof renderMathInElement === 'function') {
    renderMathInElement(document.body, {
      delimiters: [
        {left: "$$", right: "$$", display: true},
        {left: "$", right: "$", display: false},
        {left: "\\(", right: "\\)", display: false},
        {left: "\\[", right: "\\]", display: true},
        {left: "\\begin{align}", right: "\\end{align}", display: true},
        {left: "\\begin{alignat}", right: "\\end{alignat}", display: true},
        {left: "\\begin{gather}", right: "\\end{gather}", display: true},
        {left: "\\begin{CD}", right: "\\end{CD}", display: true},
        {left: "\\begin{equation}", right: "\\end{equation}", display: true}
      ],
      throwOnError: false,
      trust: true
    });
  }
});
