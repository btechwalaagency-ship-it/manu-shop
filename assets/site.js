/* Shared site JS
   1. Mobile nav toggle
   2. Scroll-reveal animations
   3. Mark the current page in the nav
*/
(function () {
  "use strict";

  /* ---- mobile nav ---- */
  var burger = document.querySelector(".burger");
  var mnav = document.querySelector(".mobile-nav");
  if (burger && mnav) {
    burger.addEventListener("click", function () {
      var open = mnav.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    mnav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        mnav.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mnav.classList.contains("is-open")) {
        mnav.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
        burger.focus();
      }
    });
  }

  /* ---- highlight current page in nav ---- */
  var here = location.pathname.replace(/index\.html$/, "").replace(/\/$/, "");
  document.querySelectorAll(".nav a, .mobile-nav a").forEach(function (a) {
    var href = a.getAttribute("href");
    if (!href || href.charAt(0) === "#" || /^(tel:|mailto:|http)/.test(href)) return;
    var path = new URL(href, location.href).pathname
      .replace(/index\.html$/, "").replace(/\/$/, "");
    if (path === here) a.setAttribute("aria-current", "page");
  });

  /* ---- contact form ----
     If no form backend is configured yet, fall back to opening the
     visitor's mail client with the enquiry pre-filled, so the form
     still works the day the site goes live. Swap the form's action
     for a Formspree endpoint to collect submissions properly. */
  var form = document.querySelector(".form");
  if (form && /\[YOUR-FORM-ID\]/.test(form.getAttribute("action") || "")) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var g = function (n) {
        var el = form.querySelector('[name="' + n + '"]');
        return el ? el.value.trim() : "";
      };
      var subject = "Website enquiry" + (g("service") ? " \u2014 " + g("service") : "");
      var body = [
        "Name: " + g("name"),
        "Phone: " + g("phone"),
        "Email: " + g("email"),
        "Service: " + (g("service") || "Not specified"),
        "",
        g("message")
      ].join("\n");
      window.location.href = "mailto:mmrepairmaster@gmail.com?subject=" +
        encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    });
  }

  /* ---- scroll reveal ---- */
  var targets = document.querySelectorAll(".reveal");
  if (!targets.length) return;

  if (!("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    targets.forEach(function (el) { el.classList.add("is-in"); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-in");
      io.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

  targets.forEach(function (el, i) {
    el.style.transitionDelay = (Math.min(i % 4, 3) * 70) + "ms";
    io.observe(el);
  });
})();
