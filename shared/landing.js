// PRforCyber landing — behaviour carried over from the Claude Design export.
(function () {
  var NAV_HEIGHT = 68;

  function scrollToSection(id) {
    var el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - NAV_HEIGHT, behavior: "smooth" });
  }

  // In-page links (nav items, "See the Programme"): smooth scroll under the sticky nav.
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href").slice(1);
      if (!document.getElementById(id)) return;
      e.preventDefault();
      if (link.classList.contains("nav__link")) {
        document.querySelectorAll(".nav__link.is-active").forEach(function (a) { a.classList.remove("is-active"); });
        link.classList.add("is-active");
      }
      scrollToSection(id);
    });
  });

  // Waitlist market chips: highlight when checked.
  document.querySelectorAll(".chip input").forEach(function (box) {
    box.addEventListener("change", function () {
      box.closest(".chip").classList.toggle("is-on", box.checked);
    });
  });

  // Waitlist form: send the selected markets as one comma-separated field.
  var form = document.querySelector(".wl-form");
  if (form) {
    form.addEventListener("submit", function () {
      var picked = Array.prototype.map.call(form.querySelectorAll(".chip input:checked"), function (b) { return b.value; });
      form.querySelector('input[name="markets"]').value = picked.join(", ") || "None selected";
    });
  }
})();
