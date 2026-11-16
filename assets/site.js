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

  /* ---- scroll progress bar + hero glow drift ---- */
  if (!reduced) {
    var bar = document.createElement("div");
    bar.className = "progress";
    bar.setAttribute("aria-hidden", "true");
    document.body.appendChild(bar);
    var ticking = false;
    var onFrame = function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var pct = max > 0 ? window.scrollY / max : 0;
      bar.style.transform = "scaleX(" + pct.toFixed(4) + ")";
      document.documentElement.style.setProperty("--sy", String(Math.round(window.scrollY)));
      ticking = false;
    };
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(onFrame); }
    }, { passive: true });
    onFrame();
  }

  /* ---- split the hero headline into words so they can arrive in turn ---- */
  if (!reduced) {
    var h1 = document.querySelector(".hero h1");
    if (h1) {
      var i = 0;
      var walk = function (node) {
        var out = document.createDocumentFragment();
        [].slice.call(node.childNodes).forEach(function (child) {
          if (child.nodeType === 3) {
            child.textContent.split(/(\s+)/).forEach(function (tok) {
              if (!tok) return;
              if (/^\s+$/.test(tok)) { out.appendChild(document.createTextNode(tok)); return; }
              var sp = document.createElement("span");
              sp.className = "w";
              sp.textContent = tok;
              sp.style.animationDelay = (0.10 + i * 0.055).toFixed(3) + "s";
              i++;
              out.appendChild(sp);
            });
          } else if (child.nodeType === 1) {
            var clone = child.cloneNode(false);
            clone.appendChild(walk(child));
            out.appendChild(clone);
          }
        });
        return out;
      };
      var frag = walk(h1);
      h1.textContent = "";
      h1.appendChild(frag);
      h1.classList.add("is-split");
    }
  }


  /* =======================================================
     Big motion. Every piece is created here, so with scripting
     off none of it exists and the page is plain and usable.
     ======================================================= */
  if (!reduced) {

    /* ---- intro curtain ------------------------------------
       Hard rule: the curtain must never be able to trap the page.
       It is removed on load, and unconditionally after 2.2s even
       if an image never resolves or something throws.           */
    (function () {
      try {
        if (sessionStorage.getItem("seenIntro")) return;
        sessionStorage.setItem("seenIntro", "1");
      } catch (e) { /* private mode - just show it */ }

      var base = document.querySelector('link[rel="apple-touch-icon"]');
      var logo = base ? base.getAttribute("href") : "assets/icon.png";
      var c = document.createElement("div");
      c.className = "curtain";
      c.setAttribute("aria-hidden", "true");
      c.innerHTML = '<img src="' + logo + '" alt="">';
      document.body.appendChild(c);

      var lift = function () {
        if (!c.parentNode || c.classList.contains("is-gone")) return;
        c.classList.add("is-gone");
        setTimeout(function () { if (c.parentNode) c.parentNode.removeChild(c); }, 700);
      };
      window.addEventListener("load", function () { setTimeout(lift, 950); });
      setTimeout(lift, 2200);          // hard stop, whatever happens
    })();

    /* ---- page transition wipe ----
       Only for plain left-clicks on same-origin page links. Anything
       unusual falls through to normal navigation, and a timeout
       navigates anyway if the transition never finishes.          */
    (function () {
      var w = document.createElement("div");
      w.className = "wipe";
      w.setAttribute("aria-hidden", "true");
      document.body.appendChild(w);

      document.addEventListener("click", function (e) {
        var a = e.target.closest ? e.target.closest("a") : null;
        if (!a) return;
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        var href = a.getAttribute("href") || "";
        if (!href || href.charAt(0) === "#") return;
        if (/^(tel:|mailto:|javascript:)/i.test(href)) return;
        if (a.target && a.target !== "_self") return;
        var url;
        try { url = new URL(a.href, location.href); } catch (err) { return; }
        if (url.origin !== location.origin) return;
        if (url.pathname === location.pathname && url.search === location.search) return;

        e.preventDefault();
        w.classList.add("is-out");
        var went = false;
        var go = function () { if (!went) { went = true; location.href = a.href; } };
        setTimeout(go, 430);
        setTimeout(go, 900);           // fallback if the first timer is throttled
      });

      // coming back via the browser's cache: clear the wipe
      window.addEventListener("pageshow", function () { w.classList.remove("is-out"); });
    })();

    /* ---- services marquee, homepage only ---- */
    (function () {
      var anchor = document.querySelector(".hero");
      var isHome = !!document.querySelector(".trust-strip");
      if (!anchor || !isHome) return;
      var names = [];
      document.querySelectorAll(".card--link h3").forEach(function (h) {
        names.push(h.textContent.trim());
      });
      if (names.length < 3) return;
      var once = names.map(function (n) {
        return "<span>" + n + "<i>&bull;</i></span>";
      }).join("");
      var m = document.createElement("div");
      m.className = "marquee";
      m.setAttribute("aria-hidden", "true");
      m.innerHTML = '<div class="marquee__row">' + once + once + "</div>";
      anchor.insertAdjacentElement("afterend", m);
    })();

    /* ---- 3D tilt on cards, pointer devices only ---- */
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      document.querySelectorAll(".card--link").forEach(function (card) {
        var raf = null;
        card.addEventListener("pointermove", function (e) {
          if (raf) return;
          raf = requestAnimationFrame(function () {
            raf = null;
            var r = card.getBoundingClientRect();
            var px = (e.clientX - r.left) / r.width - 0.5;
            var py = (e.clientY - r.top) / r.height - 0.5;
            card.classList.add("tilt");
            card.classList.remove("tilt-off");
            card.style.transform =
              "perspective(900px) rotateX(" + (-py * 7).toFixed(2) + "deg) rotateY(" +
              (px * 9).toFixed(2) + "deg) translateY(-6px)";
          });
        });
        card.addEventListener("pointerleave", function () {
          card.classList.remove("tilt");
          card.classList.add("tilt-off");
          card.style.transform = "";
        });
      });
    }

    /* ---- photographs drift inside their frames while scrolling ---- */
    (function () {
      var media = [].slice.call(document.querySelectorAll(".card__media"));
      if (!media.length) return;
      var pending = false;
      var update = function () {
        pending = false;
        var vh = window.innerHeight;
        media.forEach(function (img) {
          var r = img.getBoundingClientRect();
          if (r.bottom < -100 || r.top > vh + 100) return;
          var mid = (r.top + r.height / 2 - vh / 2) / vh;   // -0.5 .. 0.5
          img.style.transform = "scale(1.08) translateY(" + (mid * -14).toFixed(1) + "px)";
        });
      };
      window.addEventListener("scroll", function () {
        if (!pending) { pending = true; requestAnimationFrame(update); }
      }, { passive: true });
      window.addEventListener("resize", update, { passive: true });
      update();
    })();
  }


  /* =======================================================
     Opening hours: live open/closed status.
     Computed in Perth time, never the visitor's. Someone
     checking from Sydney is three hours ahead; showing them
     their own clock would say "open" at 8am when the kiosk
     is still shut.
     ======================================================= */
  (function () {
    // 0 = Sunday .. 6 = Saturday. Minutes from midnight.
    var WEEK = [
      { open: 11 * 60, close: 17 * 60 },  // Sun
      { open:  9 * 60, close: 18 * 60 },  // Mon
      { open:  9 * 60, close: 18 * 60 },
      { open:  9 * 60, close: 18 * 60 },
      { open:  9 * 60, close: 18 * 60 },
      { open:  9 * 60, close: 18 * 60 },  // Fri
      { open:  9 * 60, close: 17 * 60 }   // Sat
    ];
    var DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var SHORT = { Sun:0, Mon:1, Tue:2, Wed:3, Thu:4, Fri:5, Sat:6 };

    function perthNow() {
      try {
        var parts = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Australia/Perth", weekday: "short",
          hour: "2-digit", minute: "2-digit", hour12: false
        }).formatToParts(new Date());
        var o = {};
        parts.forEach(function (p) { o[p.type] = p.value; });
        var d = SHORT[o.weekday];
        if (d === undefined) return null;
        var h = parseInt(o.hour, 10);
        if (h === 24) h = 0;                       // some engines report 24
        return { day: d, mins: h * 60 + parseInt(o.minute, 10) };
      } catch (e) {
        return null;    // no reliable Perth clock: show nothing rather than a guess
      }
    }

    function fmt(m) {
      var h = Math.floor(m / 60), mm = m % 60;
      var ap = h >= 12 ? "pm" : "am";
      var hh = h % 12; if (hh === 0) hh = 12;
      return hh + ":" + (mm < 10 ? "0" : "") + mm + ap;
    }

    var now = perthNow();
    var badges = document.querySelectorAll("[data-hours-status]");
    if (!now) { badges.forEach(function (b) { b.style.display = "none"; }); return; }

    var today = WEEK[now.day];
    var state, main, sub;

    if (now.mins < today.open) {
      state = "is-shut"; main = "Closed"; sub = "opens " + fmt(today.open) + " today";
    } else if (now.mins < today.close) {
      state = "is-open"; main = "Open now"; sub = "until " + fmt(today.close);
    } else {
      var i = 1, nd;
      while (i <= 7) { nd = (now.day + i) % 7; if (WEEK[nd]) break; i++; }
      var when = i === 1 ? "tomorrow" : DAYS[nd];
      state = "is-shut"; main = "Closed"; sub = "opens " + fmt(WEEK[nd].open) + " " + when;
    }

    badges.forEach(function (b) {
      b.className = "hours-status " + b.className.replace(/hours-status\S*/g, "").trim() +
                    (b.hasAttribute("data-lg") ? "" : "");
      b.classList.add("hours-status", state);
      if (b.getAttribute("data-hours-status") === "lg") b.classList.add("hours-status--lg");
      b.innerHTML = '<span class="hours-status__dot"></span>' +
                    '<span>' + main + '</span>' +
                    '<span class="hours-status__sub">' + sub + '</span>';
      b.setAttribute("role", "status");
      requestAnimationFrame(function () { b.classList.add("is-ready"); });
    });

    /* highlight today in the compact footer list */
    document.querySelectorAll(".hours-mini").forEach(function (ul) {
      var rows = ul.children;
      var idx = now.day === 0 ? 2 : (now.day === 6 ? 1 : 0);
      if (rows[idx]) rows[idx].classList.add("is-today");
    });

    /* highlight today on the full table, and reveal its rows on scroll */
    var table = document.querySelector(".hours");
    if (table) {
      var trs = table.querySelectorAll("tbody tr");
      var idx2 = now.day === 0 ? 2 : (now.day === 6 ? 1 : 0);
      if (trs[idx2]) trs[idx2].classList.add("is-today");
      if (!reduced && "IntersectionObserver" in window) {
        var io2 = new IntersectionObserver(function (es) {
          es.forEach(function (e) {
            if (e.isIntersecting) { table.classList.add("is-in"); io2.disconnect(); }
          });
        }, { threshold: 0.15 });
        io2.observe(table);
      } else {
        table.classList.add("is-in");
      }
    }
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
