/* ==========================================================
   Ronahi Beauty Center — site behaviour
   Reads everything editable from config.js (window.RONAHI_CONFIG)
   ========================================================== */
(function () {
  "use strict";

  /* ---------- Config (with safe defaults) ---------- */
  var USER = window.RONAHI_CONFIG || {};
  var CFG = Object.assign({
    maps: "", address: "دهۆک", mapEmbed: "", phone: "", whatsapp: "", hours: "",
    socialHub: "", social: {}, galleryCategories: [], gallery: []
  }, USER);
  CFG.social = CFG.social || {};

  var NS = "http://www.w3.org/2000/svg";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* tiny DOM helper — text always goes through textContent (no HTML injection from config) */
  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === "text") n.textContent = attrs[k];
      else if (attrs[k] !== null && attrs[k] !== undefined && attrs[k] !== false) n.setAttribute(k, attrs[k]);
    });
    (kids || []).forEach(function (c) { if (c) n.appendChild(c); });
    return n;
  }
  function icon(id) {
    var s = document.createElementNS(NS, "svg");
    s.setAttribute("class", "i");
    s.setAttribute("aria-hidden", "true");
    var u = document.createElementNS(NS, "use");
    u.setAttribute("href", "#" + id);
    s.appendChild(u);
    return s;
  }

  /* ---------- Social + location links ---------- */
  var hub = CFG.socialHub || CFG.maps || "#";
  function socialUrl(key) {
    var s = CFG.social[key] || {};
    return (s.url && s.url.trim()) || hub;
  }
  var CHANNELS = [
    { key: "snapchat",   icon: "i-snapchat",   label: "سناپ چات",   sub: "Snapchat" },
    { key: "instagram1", icon: "i-instagram",  label: "ئینستاگرام", sub: "Instagram", num: "1" },
    { key: "instagram2", icon: "i-instagram",  label: "ئینستاگرام", sub: "Instagram", num: "2" },
    { key: "facebook",   icon: "i-facebook",   label: "فەیسبووک",   sub: "Facebook" },
    { key: "tiktok",     icon: "i-tiktok",     label: "تیک تۆک",    sub: "TikTok" },
    { key: "location",   icon: "i-pin",        label: "شوێن",       sub: "Google Maps", location: true }
  ];
  function channelUrl(c) { return c.location ? (CFG.maps || hub) : socialUrl(c.key); }
  function channelLabel(c) { return c.num ? c.label + " " + c.num : c.label; }

  function renderSocials() {
    $$("[data-socials]").forEach(function (box) {
      var mode = box.getAttribute("data-socials");
      box.textContent = "";
      CHANNELS.forEach(function (c) {
        var a = el("a", { href: channelUrl(c), target: "_blank", rel: "noopener", "aria-label": channelLabel(c), title: channelLabel(c) });
        if (mode === "tiles") {
          var s = CFG.social[c.key] || {};
          var ico = el("span", { "class": "ico" }, [icon(c.icon)]);
          if (c.num) ico.appendChild(el("span", { "class": "num", text: c.num }));
          var txt = el("span", {}, [
            el("b", { text: channelLabel(c) }),
            el("small", { text: c.location ? (CFG.address || c.sub) : (s.handle || c.sub), dir: c.location ? null : "ltr" })
          ]);
          a.appendChild(ico); a.appendChild(txt);
        } else {
          a.appendChild(icon(c.icon));
          if (c.num) a.appendChild(el("span", { "class": "num", text: c.num, "aria-hidden": "true" }));
        }
        box.appendChild(el("li", {}, [a]));
      });
    });
  }

  /* ---------- Contact details ---------- */
  function telHref(p) { return "tel:" + String(p).replace(/[^\d+]/g, ""); }
  function waHref(p) { return "https://wa.me/" + String(p).replace(/\D/g, ""); }

  function renderContact() {
    var maps = CFG.maps || hub;
    var heroMap = $("#heroMap"), placeBtn = $("#placeBtn");
    if (heroMap) heroMap.href = maps;
    if (placeBtn) placeBtn.href = maps;

    var addr = $("#placeAddress");
    if (addr) addr.textContent = CFG.address || "دهۆک";

    // top bar info
    var top = $("#topInfo");
    if (top) {
      top.textContent = "";
      if (CFG.hours) top.appendChild(el("span", {}, [icon("i-clock"), document.createTextNode(CFG.hours)]));
      if (CFG.phone) {
        var ph = el("a", { href: telHref(CFG.phone), dir: "ltr" }, [icon("i-phone"), document.createTextNode(CFG.phone)]);
        top.appendChild(ph);
      }
      if (!CFG.hours && !CFG.phone) top.appendChild(el("span", {}, [icon("i-pin"), document.createTextNode(CFG.address || "دهۆک")]));
    }

    // place card meta
    var meta = $("#placeMeta");
    if (meta) {
      meta.textContent = "";
      if (CFG.hours) meta.appendChild(el("li", {}, [icon("i-clock"), el("span", { text: CFG.hours })]));
      if (CFG.phone) meta.appendChild(el("li", {}, [icon("i-phone"), el("a", { href: telHref(CFG.phone), dir: "ltr", text: CFG.phone })]));
      if (!meta.children.length) meta.hidden = true;
    }

    // optional embedded map
    var mapBox = $("#placeMap");
    if (mapBox && CFG.mapEmbed) {
      mapBox.querySelector(".place-pin").hidden = true;
      mapBox.appendChild(el("iframe", { src: CFG.mapEmbed, loading: "lazy", referrerpolicy: "no-referrer-when-downgrade", title: "شوێنی ناوەند لەسەر نەخشە", allowfullscreen: "" }));
    }

    // quick contact next to the booking form
    var alt = $("#bookingAlt");
    if (alt) {
      alt.textContent = "";
      if (CFG.phone) alt.appendChild(el("a", { href: telHref(CFG.phone) }, [icon("i-phone"), document.createTextNode("پەیوەندی بکە")]));
      if (CFG.whatsapp) alt.appendChild(el("a", { href: waHref(CFG.whatsapp), target: "_blank", rel: "noopener" }, [icon("i-chat"), document.createTextNode("WhatsApp")]));
      if (!alt.children.length) alt.hidden = true;
    }
  }

  /* ---------- Header: scroll state + mobile drawer ---------- */
  function initHeader() {
    var header = $("#header"), btn = $("#menuBtn"), drawer = $("#drawer");
    function onScroll() { header.classList.toggle("is-scrolled", window.scrollY > 8); }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    function setMenu(open) {
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? "داخستنی مینوو" : "کردنەوەی مینوو");
      drawer.hidden = !open;
    }
    btn.addEventListener("click", function () { setMenu(btn.getAttribute("aria-expanded") !== "true"); });
    $$("a", drawer).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
    window.addEventListener("resize", function () { if (window.innerWidth > 1020) setMenu(false); });
  }

  /* ---------- Gallery + lightbox ---------- */
  var items = [], shown = [], current = 0;

  function catLabel(key) {
    var c = (CFG.galleryCategories || []).filter(function (x) { return x.key === key; })[0];
    return c ? c.label : "";
  }

  function renderGallery() {
    var grid = $("#galleryGrid"), filters = $("#galleryFilters");
    items = (CFG.gallery || []).filter(function (g) { return g && g.src; });
    grid.textContent = "";
    filters.textContent = "";

    if (!items.length) {
      // ready-made placeholders until real photos are added in config.js
      var names = ["جوانکاری ڕوو", "لێزەر", "PRP", "HIFU", "پاککردنەوەی ڕوو", "CO₂ Laser"];
      names.forEach(function (n) {
        grid.appendChild(el("div", { "class": "shot shot--ph" }, [icon("i-image"), el("b", { text: n }), el("small", { text: "وێنەکان بەم زووانە" })]));
      });
      filters.hidden = true;
      return;
    }

    var usedKeys = {};
    items.forEach(function (g) { if (g.category) usedKeys[g.category] = true; });
    var cats = (CFG.galleryCategories || []).filter(function (c) { return usedKeys[c.key]; });
    var active = "all";

    function draw() {
      grid.textContent = "";
      shown = items.filter(function (g) { return active === "all" || g.category === active; });
      shown.forEach(function (g, idx) {
        var alt = g.title || catLabel(g.category) || "وێنەی کار";
        var img = el("img", { src: g.src, alt: alt, loading: "lazy", decoding: "async" });
        var btn = el("button", { type: "button", "class": "shot", "aria-label": "کردنەوەی وێنە: " + alt }, [img]);
        if (g.title) btn.appendChild(el("span", { "class": "shot-cap", text: g.title }));
        img.addEventListener("error", function () { btn.remove(); });
        btn.addEventListener("click", function () { if (window.openLightbox) window.openLightbox(idx); });
        grid.appendChild(btn);
      });
    }

    if (cats.length > 1) {
      [{ key: "all", label: "هەموو" }].concat(cats).forEach(function (c) {
        var b = el("button", { type: "button", "class": "filter", "aria-pressed": String(c.key === active), text: c.label });
        b.addEventListener("click", function () {
          active = c.key;
          $$(".filter", filters).forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
          draw();
        });
        filters.appendChild(b);
      });
    } else {
      filters.hidden = true;
    }
    draw();
  }

  function initLightbox() {
    var box = $("#lightbox"), img = $("#lbImg"), cap = $("#lbCap");
    if (!box || typeof box.showModal !== "function") return;

    function show(i) {
      if (!shown.length) return;
      current = (i + shown.length) % shown.length;
      var g = shown[current];
      img.src = g.src;
      img.alt = g.title || catLabel(g.category) || "وێنەی کار";
      cap.textContent = g.title || "";
      box.classList.toggle("single", shown.length < 2);
    }
    window.openLightbox = function (i) { show(i); box.showModal(); document.body.style.overflow = "hidden"; };
    function close() { box.close(); }
    box.addEventListener("close", function () { document.body.style.overflow = ""; });

    $("#lbClose").addEventListener("click", close);
    $("#lbPrev").addEventListener("click", function () { show(current - 1); });
    $("#lbNext").addEventListener("click", function () { show(current + 1); });
    box.addEventListener("click", function (e) { if (e.target === box) close(); });
    box.addEventListener("keydown", function (e) {
      // RTL: right = previous, left = next
      if (e.key === "ArrowRight") show(current - 1);
      if (e.key === "ArrowLeft") show(current + 1);
    });
    var x0 = null;
    box.addEventListener("touchstart", function (e) { x0 = e.changedTouches[0].clientX; }, { passive: true });
    box.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 50) show(dx > 0 ? current - 1 : current + 1);
    });
  }

  /* ---------- Before / After slider ----------
     Uses only the center's configured paired photos; never invents placeholder results. */
  function initBeforeAfter() {
    var cfg = CFG.beforeAfter || {};
    var section = $("#beforeAfterSection");
    if (!section || !cfg.before || !cfg.after) return;

    var before = $("#beforeAfterBefore"), after = $("#beforeAfterAfter");
    var clip = $("#beforeAfterAfterClip"), divider = $("#beforeAfterDivider");
    var range = $("#beforeAfterRange");
    var title = $("#beforeAfterTitle"), description = $("#beforeAfterDescription");
    var beforeLabel = $("#beforeAfterBeforeLabel"), afterLabel = $("#beforeAfterAfterLabel");
    var caption = $("#beforeAfterCaption");

    before.src = cfg.before;
    after.src = cfg.after;
    before.alt = cfg.beforeAlt || cfg.beforeLabel || "پێش";
    after.alt = cfg.afterAlt || cfg.afterLabel || "دوای";
    if (title && cfg.title) title.textContent = cfg.title;
    if (description && cfg.description) description.textContent = cfg.description;
    if (beforeLabel) beforeLabel.textContent = cfg.beforeLabel || "پێش";
    if (afterLabel) afterLabel.textContent = cfg.afterLabel || "دوای";
    if (caption) {
      caption.textContent = cfg.caption || "";
      caption.hidden = !cfg.caption;
    }

    function update() {
      var value = Math.max(0, Math.min(100, Number(range.value) || 0));
      clip.style.clipPath = "inset(0 0 0 " + value + "%)";
      divider.style.left = value + "%";
      range.setAttribute("aria-valuetext", value + "%");
    }
    range.addEventListener("input", update);
    [before, after].forEach(function (img) {
      img.addEventListener("error", function () {
        section.hidden = true;
      }, { once: true });
    });
    section.hidden = false;
    update();
  }

  /* ---------- Booking form ---------- */
  function toLatinDigits(s) {
    return String(s)
      .replace(/[٠-٩]/g, function (d) { return d.charCodeAt(0) - 1632; })
      .replace(/[۰-۹]/g, function (d) { return d.charCodeAt(0) - 1776; });
  }
  function todayLocal() {
    var d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 10);
  }

  function initBooking() {
    var form = $("#bookingForm"), msg = $("#formMessage"), btn = $("#submitBtn");
    var success = $("#success"), again = $("#againBtn");
    var lastAppointment = null;
    if (!form) return;

    if (form.elements.date) form.elements.date.min = todayLocal();

    // "ژوان وەرگرە" buttons on service cards pre-select that service
    $$("[data-service]").forEach(function (a) {
      a.addEventListener("click", function () {
        var sel = form.elements.service, v = a.getAttribute("data-service");
        if (sel) sel.value = v;
        clearError(sel);
      });
    });

    var RULES = {
      name:    { test: function (v) { return v.trim().length >= 2; }, msg: "تکایە ناوی تەواوت بنووسە." },
      phone:   { test: function (v) { var d = toLatinDigits(v).replace(/\D/g, ""); return d.length >= 10 && d.length <= 15; }, msg: "ژمارەی مۆبایلێکی دروست بنووسە، نموونە: 0750 123 4567" },
      service: { test: function (v) { return !!v; }, msg: "خزمەتگوزارییەک هەڵبژێرە." },
      date:    { test: function (v) { return !!v && v >= todayLocal(); }, msg: function (v) { return v ? "ڕۆژەکە نابێت لە ڕابردوودا بێت." : "ڕۆژێک هەڵبژێرە."; } },
      time:    { test: function (v) { return !!v; }, msg: "کاتێک هەڵبژێرە." }
    };

    function fieldOf(input) { return input && input.closest(".field"); }
    function clearError(input) {
      var f = fieldOf(input); if (!f) return;
      f.classList.remove("invalid");
      var e = f.querySelector(".err"); if (e) e.remove();
      input.removeAttribute("aria-invalid");
    }
    function setError(input, text) {
      var f = fieldOf(input); if (!f) return;
      clearError(input);
      f.classList.add("invalid");
      input.setAttribute("aria-invalid", "true");
      f.appendChild(el("span", { "class": "err", role: "alert", text: text }));
    }
    function validate() {
      var first = null;
      Object.keys(RULES).forEach(function (k) {
        var input = form.elements[k];
        if (!input) return;
        if (RULES[k].test(input.value)) clearError(input);
        else { var m = RULES[k].msg; setError(input, typeof m === "function" ? m(input.value) : m); if (!first) first = input; }
      });
      if (first) first.focus();
      return !first;
    }
    Object.keys(RULES).forEach(function (k) {
      var input = form.elements[k];
      if (input) { input.addEventListener("input", function () { clearError(input); }); input.addEventListener("change", function () { clearError(input); }); }
    });

    function showError(text) { msg.textContent = text; msg.className = "form-message error"; }
    function clearMessage() { msg.textContent = ""; msg.className = "form-message"; }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      clearMessage();
      if (!validate()) return;

      // Honeypot: silently ignore automated submissions; never show a false success state.
      if (form.elements.website && form.elements.website.value) return;

      var data = Object.fromEntries(new FormData(form).entries());
      delete data.website;
      data.phone = toLatinDigits(data.phone).trim();
      data.name = data.name.trim();

      btn.classList.add("loading"); btn.disabled = true;
      fetch("/api/book", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(data) })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok && j.ok, j: j }; }); })
        .then(function (res) {
          if (!res.ok || !res.j.appointment) throw new Error(res.j.message || "هەڵەیەک ڕوویدا، تکایە دووبارە هەوڵ بدەرەوە.");
          lastAppointment = res.j.appointment;
          var a = lastAppointment;
          [["appointmentReference", a.reference], ["appointmentName", a.name], ["appointmentPhone", a.phone],
           ["appointmentService", a.service], ["appointmentBranch", a.branch], ["appointmentDate", a.date], ["appointmentTime", a.time]]
            .forEach(function (pair) { var node = $("#" + pair[0]); if (node) node.textContent = pair[1] || "—"; });
          var status = $("#successStatus");
          if (status) status.textContent = a.status === "pending"
            ? "داواکارییەکەت بە سەرکەوتوویی نێردرا و چاوەڕێی پشتڕاستکردنەوەی خاوەن ناوەندە. ئەمە هێشتا ژوانی پشتڕاستکراوە نییە."
            : "ژوانەکەت پشتڕاست کراوەتەوە.";
          form.reset();
          form.hidden = true; success.hidden = false;
          var h = success.querySelector("h3"); h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true });
          success.scrollIntoView({ behavior: "smooth", block: "center" });
        })
        .catch(function (err) { showError(err && err.message ? err.message : "هەڵەیەک ڕوویدا، تکایە دووبارە هەوڵ بدەرەوە."); })
        .then(function () { btn.classList.remove("loading"); btn.disabled = false; });
    });

    var calendarBtn = $("#addCalendarBtn");
    if (calendarBtn) calendarBtn.addEventListener("click", function () {
      if (!lastAppointment) return;
      var a = lastAppointment;
      function icsEscape(value) { return String(value || "").replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;"); }
      function utcStamp(date) {
        return date.getUTCFullYear() + String(date.getUTCMonth() + 1).padStart(2, "0") + String(date.getUTCDate()).padStart(2, "0") + "T" +
          String(date.getUTCHours()).padStart(2, "0") + String(date.getUTCMinutes()).padStart(2, "0") + "00Z";
      }
      var start = new Date(a.date + "T" + a.time + ":00");
      if (isNaN(start.getTime())) return;
      var end = new Date(start.getTime() + 30 * 60000);
      var lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Ronahi Beauty Center//Appointment//CKB", "CALSCALE:GREGORIAN", "BEGIN:VEVENT",
        "UID:" + icsEscape(a.reference) + "@ronahi-beauty-center", "DTSTAMP:" + utcStamp(new Date()), "DTSTART:" + utcStamp(start), "DTEND:" + utcStamp(end),
        "SUMMARY:" + icsEscape("داواکاریی ژوان - " + a.service),
        "DESCRIPTION:" + icsEscape("ژمارە: " + a.reference + "\nناو: " + a.name + "\nمۆبایل: " + a.phone + "\nتێبینی: چاوەڕێی پشتڕاستکردنەوە"),
        "LOCATION:" + icsEscape(a.branch), "END:VEVENT", "END:VCALENDAR"];
      var blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
      var url = URL.createObjectURL(blob), link = document.createElement("a");
      link.href = url; link.download = a.reference + ".ics"; document.body.appendChild(link); link.click(); link.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    });

    again.addEventListener("click", function () {
      success.hidden = true; form.hidden = false; clearMessage();
      form.elements.name.focus();
    });
  }

  /* ---------- Boot ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    var y = $("#year"); if (y) y.textContent = new Date().getFullYear();
    renderSocials();
    renderContact();
    initHeader();
    renderGallery();
    initLightbox();
    initBeforeAfter();
    initBooking();
  });
})();
