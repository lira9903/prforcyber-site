// PRforCyber landing — behaviour carried over from the Claude Design export.
(function () {
  var NAV_HEIGHT = 68;
  var nav = document.querySelector(".nav");
  var burger = document.querySelector(".nav__burger");
  var menu = document.getElementById("mobile-menu");

  function setMenu(open) {
    if (!burger || !menu) return;
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    menu.hidden = !open;
  }

  // Mobile hamburger menu.
  if (burger) burger.addEventListener("click", function () { setMenu(menu.hidden); });

  function scrollToSection(id) {
    var el = document.getElementById(id);
    var offset = (nav && nav.offsetHeight) || NAV_HEIGHT;
    if (el) window.scrollTo({ top: el.offsetTop - offset, behavior: "smooth" });
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
      setMenu(false);
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
