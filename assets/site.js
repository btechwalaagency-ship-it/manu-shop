(function () {
"use strict";
document.documentElement.classList.add("js");
var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var scrollJobs = [];
var scrollQueued = false;
function runScrollJobs() {
scrollQueued = false;
var y = window.scrollY;
for (var i = 0; i < scrollJobs.length; i++) scrollJobs[i](y);
}
function onScrollTick() {
if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(runScrollJobs); }
}
window.addEventListener("scroll", onScrollTick, { passive: true });
window.addEventListener("resize", onScrollTick, { passive: true });
function onScrollAdd(fn) { scrollJobs.push(fn); fn(window.scrollY); }
(function () {
var header = document.querySelector(".site-header");
if (!header) return;
var stuck = false;
onScrollAdd(function (y) {
var should = y > 8;
if (should !== stuck) { stuck = should; header.classList.toggle("is-stuck", stuck); }
});
})();
(function () {
var imgs = document.querySelectorAll("img.card__media, .hero__art, .logo--footer img");
imgs.forEach(function (img) {
if (img.complete && img.naturalWidth > 0) { img.classList.add("is-loaded"); return; }
img.addEventListener("load", function () { img.classList.add("is-loaded"); });
img.addEventListener("error", function () { img.classList.add("is-loaded"); });
});
window.addEventListener("load", function () {
imgs.forEach(function (img) { img.classList.add("is-loaded"); });
});
})();
if (!reduced) {
var bar = document.createElement("div");
bar.className = "progress";
bar.setAttribute("aria-hidden", "true");
document.body.appendChild(bar);
var docEl = document.documentElement;
onScrollAdd(function (y) {
var max = docEl.scrollHeight - window.innerHeight;
bar.style.transform = "scaleX(" + (max > 0 ? (y / max).toFixed(4) : 0) + ")";
docEl.style.setProperty("--sy", String(y | 0));
});
}
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
if (!reduced) {
(function () {
try {
if (sessionStorage.getItem("seenIntro")) return;
sessionStorage.setItem("seenIntro", "1");
} catch (e) {  }
/* A brand moment is only worth it when the page is already quick. On a
slow link, or when the visitor has asked to save data, the curtain is
just a second of staring at a logo while they wait. */
var conn = navigator.connection || {};
if (conn.saveData) return;
if (conn.effectiveType && /2g|^3g$/.test(conn.effectiveType)) return;
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
window.addEventListener("load", function () { setTimeout(lift, 260); });
setTimeout(lift, 1200);
})();
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
setTimeout(go, 900);
});
window.addEventListener("pageshow", function () { w.classList.remove("is-out"); });
})();
(function () {
var anchor = document.querySelector(".hero");
var isHome = !!document.querySelector(".trust-strip");
if (!anchor || !isHome) return;
/* not built at all on phones - it is hidden there anyway */
if (window.matchMedia("(max-width: 879px)").matches) return;
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
if ("IntersectionObserver" in window) {
var row = m.querySelector(".marquee__row");
new IntersectionObserver(function (es) {
row.style.animationPlayState = es[0].isIntersecting ? "running" : "paused";
}, { rootMargin: "100px 0px" }).observe(m);
}
})();
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
(function () {
var media = [].slice.call(document.querySelectorAll(".card__media"));
if (!media.length) return;
/* skip the per-frame parallax on phones - it is scroll work for an
effect that barely reads on a small screen */
if (window.matchMedia("(max-width: 879px)").matches) return;
var live = [];
if ("IntersectionObserver" in window) {
var vio = new IntersectionObserver(function (entries) {
entries.forEach(function (e) {
var i = live.indexOf(e.target);
if (e.isIntersecting && i === -1) {
live.push(e.target);
e.target.style.willChange = "transform";
} else if (!e.isIntersecting && i !== -1) {
live.splice(i, 1);
e.target.style.willChange = "";
}
});
}, { rootMargin: "120px 0px" });
media.forEach(function (m) { vio.observe(m); });
} else {
live = media;
}
onScrollAdd(function () {
if (!live.length) return;
var vh = window.innerHeight;
for (var i = 0; i < live.length; i++) {
var r = live[i].getBoundingClientRect();
var mid = (r.top + r.height / 2 - vh / 2) / vh;
live[i].style.transform = "scale(1.08) translateY(" + (mid * -14).toFixed(1) + "px)";
}
});
})();
}
(function () {
var WEEK = [
{ open: 11 * 60, close: 17 * 60 },
{ open:  9 * 60, close: 18 * 60 },
{ open:  9 * 60, close: 18 * 60 },
{ open:  9 * 60, close: 18 * 60 },
{ open:  9 * 60, close: 18 * 60 },
{ open:  9 * 60, close: 18 * 60 },
{ open:  9 * 60, close: 17 * 60 }
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
if (h === 24) h = 0;
return { day: d, mins: h * 60 + parseInt(o.minute, 10) };
} catch (e) {
return null;
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
b.classList.add("hours-status");
b.classList.remove("is-open", "is-shut");
b.classList.add(state);
if (b.getAttribute("data-hours-status") === "lg") b.classList.add("hours-status--lg");
var where = b.getAttribute("data-hours-status");
var text = (where === "header")
? '<span>' + (main === "Open now" ? "Open" : "Closed") + '</span>' +
'<span class="hours-status__sub">' + sub.replace("opens ", "opens ") + '</span>'
: '<span>' + main + '</span><span class="hours-status__sub">' + sub + '</span>';
b.innerHTML = '<span class="hours-status__dot"></span>' + text;
      // readable when flattened to plain text (screen readers, previews)
      b.setAttribute("aria-label", main + " \u2014 " + sub);
b.setAttribute("role", "status");
requestAnimationFrame(function () { b.classList.add("is-ready"); });
});
document.querySelectorAll(".hours-mini").forEach(function (ul) {
var rows = ul.children;
var idx = now.day === 0 ? 2 : (now.day === 6 ? 1 : 0);
if (rows[idx]) rows[idx].classList.add("is-today");
});
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
onScrollAdd(function (y) {
var should = y > 600;
if (should !== shown) { shown = should; btn.classList.toggle("is-shown", shown); }
});
})();
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
var here = location.pathname.replace(/index\.html$/, "").replace(/\/$/, "");
document.querySelectorAll(".nav a, .mobile-nav a").forEach(function (a) {
var href = a.getAttribute("href");
if (!href || href.charAt(0) === "#" || /^(tel:|mailto:|http)/.test(href)) return;
var path = new URL(href, location.href).pathname
.replace(/index\.html$/, "").replace(/\/$/, "");
if (path === here) a.setAttribute("aria-current", "page");
});
var form = document.querySelector(".form");
if (form) {
var WA = "61470282957";
form.addEventListener("submit", function (e) {
e.preventDefault();
var g = function (n) {
var el = form.querySelector('[name="' + n + '"]');
return el ? el.value.trim() : "";
};
var lines = ["Hi MM Repair Master, I'd like to book a repair."];
lines.push("");
lines.push("Name: " + (g("name") || "-"));
lines.push("Phone: " + (g("phone") || "-"));
if (g("email")) lines.push("Email: " + g("email"));
lines.push("Service: " + (g("service") || "Not sure"));
if (g("message")) { lines.push(""); lines.push(g("message")); }
lines.push("");
lines.push("(Sent from the website - 10% online booking discount)");
var url = "https://wa.me/" + WA + "?text=" + encodeURIComponent(lines.join("\n"));
var win = window.open(url, "_blank", "noopener");
if (!win) window.location.href = url;
var note = form.querySelector(".form__sent");
if (note) note.hidden = false;
});
}
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