// PRforCyber — Google Analytics 4 with Consent Mode v2 and a cookie consent banner.
// Load synchronously in <head>, before the gtag.js script, so the consent default is set first.
(function () {
  var GA_ID = "G-C64CSBL070";
  var KEY = "prfc_consent"; // "granted" | "denied"

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };

  function getChoice() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function saveChoice(value) {
    try { localStorage.setItem(KEY, value); } catch (e) {}
  }

  // Consent Mode v2: everything denied until the visitor clicks Accept.
  gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    wait_for_update: 500
  });
  if (getChoice() === "granted") gtag("consent", "update", { analytics_storage: "granted" });

  gtag("js", new Date());
  gtag("config", GA_ID);

  // ---------- Banner ----------
  var banner;

  function hideBanner() {
    if (banner) { banner.remove(); banner = null; }
  }

  function showBanner() {
    if (banner) {
      // Already open (no choice made yet): flash it so the click visibly does something.
      banner.classList.remove("cc-banner--flash");
      void banner.offsetWidth;
      banner.classList.add("cc-banner--flash");
      banner.querySelector(".cc-btn--primary").focus();
      return;
    }
    banner = document.createElement("div");
    banner.className = "cc-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", "Cookie consent");
    banner.innerHTML =
      '<p class="cc-banner__text">We use Google Analytics cookies to understand how visitors use this site. ' +
      'They are only set if you accept. <a href="/privacy/">Privacy policy</a></p>' +
      '<div class="cc-banner__actions">' +
        '<button type="button" class="cc-btn cc-btn--outline" data-cc="denied">Decline</button>' +
        '<button type="button" class="cc-btn cc-btn--primary" data-cc="granted">Accept</button>' +
      "</div>";
    banner.addEventListener("click", function (e) {
      var choice = e.target.getAttribute && e.target.getAttribute("data-cc");
      if (!choice) return;
      saveChoice(choice);
      gtag("consent", "update", { analytics_storage: choice });
      hideBanner();
    });
    document.body.appendChild(banner);
  }

  // Lets the privacy page reopen the banner so visitors can change their choice.
  window.prfcCookieSettings = showBanner;

  if (!getChoice()) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", showBanner);
    else showBanner();
  }
})();
