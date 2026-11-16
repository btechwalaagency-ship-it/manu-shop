/* Shared site JS
   1. Mobile nav toggle
   2. Scroll-reveal animations
   3. Mark the current page in the nav
*/
(function () {
  "use strict";

  /* Mark that JavaScript ran, so CSS can safely hide things it will
     reveal later. Without this a JS failure would leave images invisible. */
  document.documentElement.classList.add("js");

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- fade photographs in once they have actually decoded ---- */
  (function () {
    var imgs = document.querySelectorAll("img.card__media, .hero__art, .logo--footer img");
    imgs.forEach(function (img) {
      if (img.complete && img.naturalWidth > 0) { img.classList.add("is-loaded"); return; }
      img.addEventListener("load", function () { img.classList.add("is-loaded"); });
      img.addEventListener("error", function () { img.classList.add("is-loaded"); });
    });
    // belt and braces: never leave an image hidden
    window.addEventListener("load", function () {
      imgs.forEach(function (img) { img.classList.add("is-loaded"); });
    });
  })();

  /* ---- back to top ---- */
  (function () {
    var btn = document.createElement("button");
    btn.className = "to-top";
    btn.type = "button";
    btn.setAttribute("aria-label", "Back to top");
    btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" ' +
      'stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ' +
      'aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    });
    document.body.appendChild(btn);
    var shown = false;
    var toggle = function () {
      var should = window.scrollY > 600;
      if (should !== shown) { shown = should; btn.classList.toggle("is-shown", shown); }
    };
    window.addEventListener("scroll", toggle, { passive: true });
    toggle();
  })();

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

  /* ---- photo upgrade ----
     Every illustration carries a data-photo path. If a real photograph is
     present at that path it is swapped in; if the file isn't there the
     illustration simply stays. Nothing ever renders broken, so photos can
     be added one at a time without touching any HTML. */
  document.querySelectorAll("img[data-photo]").forEach(function (img) {
    var src = img.getAttribute("data-photo");
    if (!src) return;
    var probe = new Image();
    probe.onload = function () {
      if (probe.naturalWidth > 1) {
        img.src = src;
        img.classList.add("has-photo");
      }
    };
    probe.src = src;
  });

  /* ---- header gains a shadow once scrolled ---- */
  var header = document.querySelector(".site-header");
  if (header) {
    var stuck = false;
    var onScroll = function () {
      var should = window.scrollY > 8;
      if (should !== stuck) {
        stuck = should;
        header.classList.toggle("is-stuck", stuck);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
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
    el.style.transitionDelay = (Math.min(i % 3, 2) * 90) + "ms";
    io.observe(el);
  });
})();
