$(document).ready(function () {
  // 1. Fix favicon to use local resource
  let favicon = "/uploads/icon.svg";

  $("link[rel='icon']").remove();
  $("head").append(`<link rel="icon" type="image/svg+xml" href="${favicon}">`);

  // 2. Optimized KaTeX rendering
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

  // 3. Render Mermaid diagrams
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

  // 4. Lazy-load CodeMirror only when .cp-pg exists on page
  if (document.querySelector('.cp-pg')) {
    var cmCSS = [
      'https://cdn.jsdelivr.net/npm/codemirror@5.65.18/lib/codemirror.min.css',
      'https://cdn.jsdelivr.net/npm/codemirror@5.65.18/addon/hint/show-hint.min.css',
      'https://cdn.jsdelivr.net/npm/codemirror@5.65.18/theme/monokai.min.css'
    ];
    var cmJS = [
      'https://cdn.jsdelivr.net/npm/codemirror@5.65.18/lib/codemirror.min.js',
      'https://cdn.jsdelivr.net/npm/codemirror@5.65.18/mode/clike/clike.min.js',
      'https://cdn.jsdelivr.net/npm/codemirror@5.65.18/mode/python/python.min.js',
      'https://cdn.jsdelivr.net/npm/codemirror@5.65.18/addon/edit/matchbrackets.min.js',
      'https://cdn.jsdelivr.net/npm/codemirror@5.65.18/addon/edit/closebrackets.min.js',
      'https://cdn.jsdelivr.net/npm/codemirror@5.65.18/addon/hint/show-hint.min.js',
      'https://cdn.jsdelivr.net/npm/codemirror@5.65.18/addon/hint/anyword-hint.min.js',
      'https://cdn.jsdelivr.net/npm/codemirror@5.65.18/addon/selection/active-line.min.js',
      '/js/cp-compiler.js',
      '/js/cp-playground.js'
    ];

    function loadCSS(href) {
      if (document.querySelector('link[href="' + href + '"]')) return;
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    }

    function loadScriptsSequentially(scripts, index) {
      if (index >= scripts.length) return;
      var src = scripts[index];
      if (document.querySelector('script[src="' + src + '"]')) {
        loadScriptsSequentially(scripts, index + 1);
        return;
      }
      var s = document.createElement('script');
      s.src = src;
      s.onload = function() { loadScriptsSequentially(scripts, index + 1); };
      document.head.appendChild(s);
    }

    cmCSS.forEach(loadCSS);
    loadScriptsSequentially(cmJS, 0);
  }
});
