(function () {
  "use strict";

  /* ---------- Código de barras Code 39 (escaneável) ---------- */
  // 9 elementos por caractere (barra, espaço, barra...), 1 = largo.
  var CODE39 = {
    "0": "000110100", "1": "100100001", "2": "001100001", "3": "101100000",
    "4": "000110001", "5": "100110000", "6": "001110000", "7": "000100101",
    "8": "100100100", "9": "001100100", "A": "100001001", "B": "001001001",
    "C": "101001000", "D": "000011001", "E": "100011000", "F": "001011000",
    "G": "000001101", "H": "100001100", "I": "001001100", "J": "000011100",
    "K": "100000011", "L": "001000011", "M": "101000010", "N": "000010011",
    "O": "100010010", "P": "001010010", "Q": "000000111", "R": "100000110",
    "S": "001000110", "T": "000010110", "U": "110000001", "V": "011000001",
    "W": "111000000", "X": "010010001", "Y": "110010000", "Z": "011010000",
    "-": "010000101", ".": "110000100", " ": "011000100", "*": "010010100"
  };

  function drawBarcode(svg, text) {
    var NARROW = 2, WIDE = 5, H = 60, QUIET = 0;
    var x = QUIET, rects = [];
    var chars = ("*" + text.toUpperCase() + "*").split("");
    chars.forEach(function (ch, i) {
      var pattern = CODE39[ch];
      if (!pattern) return;
      for (var k = 0; k < 9; k++) {
        var w = pattern[k] === "1" ? WIDE : NARROW;
        if (k % 2 === 0) rects.push('<rect x="' + x + '" y="0" width="' + w + '" height="' + H + '"/>');
        x += w;
      }
      if (i < chars.length - 1) x += NARROW; // espaço entre caracteres
    });
    svg.setAttribute("viewBox", "0 0 " + (x + QUIET) + " " + H);
    svg.innerHTML = rects.join("");
  }

  var svg = document.getElementById("barcode");
  if (svg) drawBarcode(svg, "MKEACS");

  /* Laser passa uma vez sobre o código ao carregar */
  var wrap = document.querySelector(".barcode-wrap");
  if (wrap) {
    var setSweep = function () { wrap.style.setProperty("--sweep", wrap.clientWidth + "px"); };
    setSweep();
    window.addEventListener("resize", setSweep);
    requestAnimationFrame(function () { wrap.classList.add("scan"); });
  }

  /* ---------- Idioma ---------- */
  var EN = {
    skip: "Skip to content",
    navLabel: "Sections",
    brandAria: "Mike Almeida, home",
    navProjects: "Projects",
    navStack: "Tools",
    navContact: "Contact",
    labelAria: "Label with Mike Almeida's name, role, company and barcode",
    labelKind: "Location label",
    fRole: "Role",
    vRole: "Full-stack developer",
    fCompany: "Company",
    lede: "I build the internal systems of an electrical supply distributor, from the ERP's Oracle database to the app running on warehouse barcode scanners.",
    intro: "I work at Elétrica Bahiana, with stores in Salvador, Lauro de Freitas and Aracaju, in northeastern Brazil. I connect what sales, logistics and HR need with what the ERP allows, using Python, TypeScript and SQL.",
    projTitle: "Projects at Elétrica Bahiana",
    projNote: "Private company code, built as a team. Here is what each system solves.",
    p1t: "Internal portal and API",
    p1d: "One place where sales, logistics, purchasing and HR open their everyday tools. A React front end that loads each screen on demand, a FastAPI back end connected to the ERP's Oracle database, and a separate worker for long-running jobs. Permissions by department and by person are managed by IT itself, no deploy needed.",
    p2d: "Electrical cable inventory by storage location. Every reel and every leftover piece has a rack and a position. Cutting for an order takes one step, and the leftover keeps the location of the piece it came from. Stock comes in through the supplier invoice, and every move is logged.",
    p3t: "Benefits and HR",
    p3d: "Transit and meal allowances calculated from time-clock punches, following company rules: vacations, medical leave, interns, hiring mid-month. Syncs with the time-tracking platform every day and generates the file the payroll system imports, sales commissions included.",
    p4t: "ERP screens in the browser",
    p4d: "Winthor (TOTVS) ERP routines rebuilt for the web, for people who don't need an ERP license: price simulation, order printing with QR code and barcode, product history, shipping priority. Queries follow the SQL the ERP itself runs, so results match the original.",
    p5t: "RF, an app for barcode scanners",
    p5d: "Android app for the warehouse's handheld barcode scanners. Pick, check and receive goods by scanning item by item, writing to the ERP through the portal's API.",
    p6t: "AI at work",
    p6d: "A chat assistant that drafts quotes for the sales team, built with LangGraph and the Claude API. MCP servers give IT's AI assistants access to the ERP database, read-only, and to Pipefy.",
    otherTitle: "Other projects",
    o1t: "Website for a visual artist",
    o1d: "Gallery, newsletter and an Instagram carousel with automatic access-token renewal.",
    o2t: "SGP → Omie integration",
    o2d: "Moves receivables from an internet-provider management system into the Omie ERP, with incremental polling and no duplicate entries.",
    o3t: "Electrician sign-up",
    o3d: "Registration for partner electricians, with a user area and an admin dashboard.",
    stackTitle: "Tools",
    stackNote: "What I use in production today.",
    s1: "Languages",
    s3: "Front end and mobile",
    s4: "Data",
    s5: "Infrastructure",
    s6: "AI",
    contactTitle: "Let's talk",
    contactText: "LinkedIn is the fastest way to reach me.",
    contactBtn: "Message me on LinkedIn",
    githubBtn: "See my GitHub",
    footNote: "Handmade, no framework, published on GitHub Pages."
  };

  var STACK_EN = [
    "Python, TypeScript, JavaScript, SQL and PL/SQL, Bash",
    null,
    "React, Vite, Tailwind CSS, React Router, React Hook Form, Recharts, Vitest, React Native with Expo",
    null, null, null
  ];

  var nodes = document.querySelectorAll("[data-i18n]");
  var attrNodes = document.querySelectorAll("[data-i18n-attr]");
  var stackDds = document.querySelectorAll(".stack dd");
  var PT = {}, PT_ATTR = [], PT_STACK = [];

  nodes.forEach(function (el) { PT[el.getAttribute("data-i18n")] = el.textContent; });
  attrNodes.forEach(function (el) {
    var parts = el.getAttribute("data-i18n-attr").split(":");
    PT_ATTR.push({ el: el, attr: parts[0], key: parts[1], pt: el.getAttribute(parts[0]) });
  });
  stackDds.forEach(function (dd) { PT_STACK.push(dd.textContent); });

  var btn = document.getElementById("lang");

  function apply(lang) {
    var en = lang === "en";
    document.documentElement.lang = en ? "en" : "pt-BR";
    nodes.forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      el.textContent = en && EN[key] ? EN[key] : PT[key];
    });
    PT_ATTR.forEach(function (a) { a.el.setAttribute(a.attr, en && EN[a.key] ? EN[a.key] : a.pt); });
    stackDds.forEach(function (dd, i) { dd.textContent = en && STACK_EN[i] ? STACK_EN[i] : PT_STACK[i]; });
    btn.textContent = en ? "PT" : "EN";
    btn.setAttribute("aria-label", en ? "Ler em português" : "Read in English");
    document.title = "Mike Almeida";
  }

  function saved() {
    try { return localStorage.getItem("lang"); } catch (e) { return null; }
  }
  function save(lang) {
    try { localStorage.setItem("lang", lang); } catch (e) { /* sem storage, segue */ }
  }

  var params = new URLSearchParams(location.search);
  var initial = params.get("lang") || saved() ||
    ((navigator.language || "pt").toLowerCase().indexOf("pt") === 0 ? "pt" : "en");
  var current = initial === "en" ? "en" : "pt";
  if (current === "en") apply("en");

  btn.addEventListener("click", function () {
    current = current === "en" ? "pt" : "en";
    apply(current);
    save(current);
  });
})();
