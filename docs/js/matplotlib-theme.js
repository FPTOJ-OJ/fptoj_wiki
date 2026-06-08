document.addEventListener("DOMContentLoaded", function () {
  function updateImages() {
    var isDark = document.body.getAttribute("data-md-color-scheme") === "slate";
    document.querySelectorAll("img.mpl-plot").forEach(function (img) {
      var src = isDark ? img.getAttribute("data-dark") : img.getAttribute("data-light");
      if (src && img.src !== location.origin + src) {
        img.src = src;
      }
    });
  }

  updateImages();

  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (m) {
      if (m.attributeName === "data-md-color-scheme") updateImages();
    });
  });
  observer.observe(document.body, { attributes: true });
});
