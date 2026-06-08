(function () {
  if (typeof mermaid === 'undefined') return;

  function getTheme() {
    return document.body.getAttribute('data-md-color-scheme') === 'slate'
      ? 'dark' : 'default';
  }

  function storeOriginals() {
    document.querySelectorAll('.mermaid').forEach(function (el) {
      if (!el.hasAttribute('data-original')) {
        el.setAttribute('data-original', el.innerHTML);
      }
    });
  }

  function renderAll() {
    mermaid.initialize({ startOnLoad: false, theme: getTheme() });
    mermaid.run();
  }

  function resetAndRender() {
    document.querySelectorAll('.mermaid[data-processed]').forEach(function (el) {
      el.removeAttribute('data-processed');
      var orig = el.getAttribute('data-original');
      if (orig) el.innerHTML = orig;
    });
    renderAll();
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
