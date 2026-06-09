(function () {
  if (typeof mermaid === 'undefined') return;

  var isRendering = false;
  var renderQueue = false;

  function getTheme() {
    return document.body.getAttribute('data-md-color-scheme') === 'slate'
      ? 'dark' : 'default';
  }

  function storeOriginals() {
    document.querySelectorAll('pre.mermaid, div.mermaid').forEach(function (el) {
      if (!el.hasAttribute('data-original')) {
        var codeEl = el.querySelector('code');
        var text = codeEl ? codeEl.textContent : el.textContent;
        el.setAttribute('data-original', text.trim());
      }
    });
  }

  async function renderAll() {
    if (isRendering) {
      renderQueue = true;
      return;
    }
    isRendering = true;

    try {
      var currentTheme = getTheme();
      var config = {
        startOnLoad: false,
        theme: currentTheme,
        securityLevel: 'loose',
      };

      if (currentTheme === 'dark') {
        config.themeVariables = {
          background: 'transparent',
          primaryColor: '#1e1e2e',
          primaryTextColor: '#d0d0e0',
          lineColor: '#444466',
          primaryBorderColor: '#444466',
          nodeBorder: '#444466',
        };
      } else {
        config.themeVariables = {
          background: 'transparent',
        };
      }

      mermaid.initialize(config);
      await mermaid.run({
        querySelector: 'pre.mermaid, div.mermaid',
      });
    } catch (err) {
      console.error('Mermaid render error:', err);
    } finally {
      isRendering = false;
      if (renderQueue) {
        renderQueue = false;
        setTimeout(resetAndRender, 50);
      }
    }
  }

  function resetAndRender() {
    document.querySelectorAll('pre.mermaid[data-processed], div.mermaid[data-processed]').forEach(function (el) {
      el.removeAttribute('data-processed');
      var orig = el.getAttribute('data-original');
      if (orig) {
        el.innerHTML = '<code>' + escapeHTML(orig) + '</code>';
      }
    });
    renderAll();
  }

  function escapeHTML(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function init() {
    storeOriginals();
    renderAll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  new MutationObserver(function (mutations) {
    for (var i = 0; i < mutations.length; i++) {
      if (mutations[i].attributeName === 'data-md-color-scheme') {
        resetAndRender();
        break;
      }
    }
  }).observe(document.body, { attributes: true });
})();
