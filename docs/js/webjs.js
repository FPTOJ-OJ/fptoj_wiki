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

  // 3. Render Mermaid diagrams with light/dark theme support
  if (typeof mermaid !== 'undefined') {
    function initMermaid() {
      const isDark = document.body.getAttribute('data-md-color-scheme') === 'slate';
      const theme = isDark ? 'dark' : 'default';
      const themeVars = isDark ? {
        // Dark mode: bright arrows & lines for visibility
        background: '#1e1e2e',
        lineColor: '#8ab4f8',
        primaryColor: '#2d2d44',
        primaryTextColor: '#e0e0e0',
        primaryBorderColor: '#555580',
        secondaryColor: '#1e1e30',
        tertiaryColor: '#252540',
        edgeLabelBackground: '#1e1e2e',
        clusterBkg: '#1e1e30',
        clusterBorder: '#444466',
        titleColor: '#e0e0e0',
        arrowheadColor: '#8ab4f8',
        // Flowchart
        nodeBorder: '#555580',
        mainBkg: '#2d2d44',
        nodeTextColor: '#e0e0e0',
        // Sequence
        actorBkg: '#2d2d44',
        actorBorder: '#555580',
        actorTextColor: '#e0e0e0',
        signalColor: '#8ab4f8',
        signalTextColor: '#e0e0e0',
        labelBoxBkgColor: '#1e1e30',
        labelBoxBorderColor: '#444466',
        labelTextColor: '#e0e0e0',
        loopTextColor: '#e0e0e0',
        noteBkgColor: '#2d2d44',
        noteTextColor: '#e0e0e0',
        noteBorderColor: '#555580',
        activationBkgColor: '#3a3a55',
        activationBorderColor: '#555580',
        // Class
        classText: '#e0e0e0',
        // State
        labelColor: '#e0e0e0',
      } : {};
      mermaid.initialize({
        startOnLoad: false,
        theme: theme,
        themeVariables: themeVars,
        securityLevel: 'loose'
      });
      // Re-render: reset SVG content and re-run
      document.querySelectorAll('.mermaid').forEach(function(el) {
        // Restore original source if already rendered
        var src = el.getAttribute('data-mermaid-src');
        if (!src) {
          src = el.textContent || el.innerText;
          el.setAttribute('data-mermaid-src', src);
        }
        el.removeAttribute('data-processed');
        el.innerHTML = src;
      });
      try {
        mermaid.run({ querySelector: '.mermaid' });
      } catch (e) {
        console.error('Mermaid error:', e);
      }
    }

    // Initial render
    initMermaid();

    // Watch for theme changes and re-render
    var mermaidObserver = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-md-color-scheme') {
          initMermaid();
        }
      });
    });
    mermaidObserver.observe(document.body, { attributes: true });
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
