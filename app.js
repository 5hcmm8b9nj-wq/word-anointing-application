(function () {
  "use strict";
  var T = window.TEACHING;
  var app = document.getElementById("app");
  var KEY = "waa:" + T.title;
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(KEY + ":" + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(KEY + ":" + k, JSON.stringify(v)); } catch (e) {} }
  };

  /* ---------- helpers ---------- */
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function toast(msg) { var t = document.getElementById("toast"); t.textContent = msg; t.classList.add("show"); setTimeout(function () { t.classList.remove("show"); }, 1800); }
  function sayAttr(text, extra) { return ' data-say="' + esc(text) + '"' + (extra || ""); }
  function refSpeak(ref) { return ref.replace(/–/g, " to ").replace(/:/g, " verse "); }

  function scriptureHTML(s, label) {
    var out = '<div class="scripture"' + sayAttr((label ? label + ". " : "") + refSpeak(s.ref) + ", King James Version.") + '>';
    out += '<p class="ref">' + esc(s.ref) + ' (KJV)</p>';
    s.verses.forEach(function (v) { out += '<p' + sayAttr(v[1]) + '><sup>' + v[0] + '</sup>' + esc(v[1]) + '</p>'; });
    return out + '</div>';
  }
  function originalHTML(list, what) {
    if (list && list.length) {
      return '<div class="original"><div class="label">Minister\'s original words</div>' +
        list.map(function (q) { return '<p' + sayAttr(q) + '>“' + esc(q) + '”</p>'; }).join("") + '</div>';
    }
    return '<div class="original empty"><div class="label">Minister\'s original words</div>' +
      '<p>' + (what || "This space is reserved for the exact words from the recording.") + '</p></div>';
  }

  /* ---------- guided steps ---------- */
  var steps = [];
  steps.push({ role: "neutral", kind: "Welcome", render: function () {
    return '<span class="tag">' + esc(T.ministry) + '</span><h2' + sayAttr(T.title + ". " + T.minister + ".") + '>' + esc(T.title) + '</h2>' +
      '<p class="lead">' + esc(T.minister) + ' · ' + esc(T.date) + '</p>' +
      '<p' + sayAttr("Today's central Scripture.") + '><b>Today\'s central Scripture</b></p>' + scriptureHTML(T.mainScripture);
  } });
  T.journey.forEach(function (j, i) {
    steps.push({ role: j.role, kind: "Service Journey · " + (i + 1) + " of " + T.journey.length, render: function () {
      return '<span class="tag">Service Journey</span><h2' + sayAttr(j.title + ".") + '>' + esc(j.title) + '</h2>' +
        '<p' + sayAttr(j.note) + '>' + esc(j.note) + '</p>' + scriptureHTML(j.scripture) + originalHTML(j.original);
    } });
  });
  T.points.forEach(function (p, i) {
    steps.push({ role: "main", kind: "The Main Word · Point " + (i + 1) + " of " + T.points.length, render: function () { return pointHTML(p, i); } });
  });
  var allDecl = T.originalDeclarations.map(function (d) { return { text: d.text || d, ref: d.ref || "", original: true }; })
    .concat(T.scriptureDeclarations.map(function (d) { return { text: d.text, ref: d.ref, original: false }; }));
  if (!T.originalDeclarations.length) {
    steps.push({ role: "declaration", kind: "Declarations", render: function () {
      return '<span class="tag">Declarations</span><h2' + sayAttr("Declarations.") + '>Declarations</h2>' +
        originalHTML([], "The minister's original declarations will appear here, one at a time, in the exact order given. The declarations that follow are drawn directly from Scripture and are labeled as such.");
    } });
  }
  allDecl.forEach(function (d, i) {
    steps.push({ role: "declaration", kind: "Declaration " + (i + 1) + " of " + allDecl.length, render: function () {
      return '<span class="tag">' + (d.original ? "Original declaration" : "Scripture-based declaration") + '</span>' +
        '<p class="lead">Declaration ' + (i + 1) + ' of ' + allDecl.length + (d.ref ? ' · ' + esc(d.ref) : '') + '</p>' +
        '<p class="decl"' + sayAttr(d.text, ' data-ram="1"') + '>' + esc(d.text) + '</p>';
    } });
  });
  T.keep.forEach(function (k, i) {
    steps.push({ role: "application", kind: "Keeping the Anointing · " + (i + 1) + " of " + T.keep.length, render: function () { return keepHTML(k); } });
  });
  steps.push({ role: "declaration", kind: "Closing prayer", render: function () {
    return '<span class="tag">Closing prayer · Supplementary</span><h2' + sayAttr("Closing prayer. Pray with me.") + '>Closing prayer</h2>' +
      T.closingPrayer.map(function (p) { return '<p class="decl" style="font-size:1.1rem"' + sayAttr(p) + '>' + esc(p) + '</p>'; }).join("");
  } });
  steps.push({ role: "neutral", kind: "Complete", render: function () {
    return '<h2' + sayAttr("You have completed this teaching record. Give thanks.") + '>Teaching complete</h2>' +
      '<p>You have completed this teaching record. Give thanks.</p>' +
      '<div class="listen-row"><button class="chip" data-go="cards">Memory cards</button><button class="chip" data-go="quiz">Bible quiz</button><button class="chip" data-go="decl">My family declarations</button></div>';
  } });

  function pointHTML(p, i) {
    return '<span class="tag">Point ' + (i + 1) + '</span><h2' + sayAttr("Point " + (i + 1) + ". " + p.title + ".") + '>' + esc(p.title) + '</h2>' +
      scriptureHTML(p.scripture) + originalHTML([]) +
      '<div class="supp"><div class="label">Supplementary study</div><p' + sayAttr(p.summary) + '>' + esc(p.summary) + '</p></div>' +
      '<div class="remember"' + sayAttr("One thing to remember. " + p.remember) + '>One thing to remember: ' + esc(p.remember) + '</div>';
  }
  function keepHTML(k) {
    return '<span class="tag">Keeping the Anointing · Supplementary study</span><h2' + sayAttr(k.title + ".") + '>' + esc(k.title) + '</h2>' +
      scriptureHTML(k.scripture) +
      '<div class="supp"><div class="label">What this means</div><p' + sayAttr(k.meaning) + '>' + esc(k.meaning) + '</p></div>' +
      '<div class="supp"><div class="label">After the service</div><ul class="steps">' +
      k.steps.map(function (s) { return '<li' + sayAttr(s) + '>' + esc(s) + '</li>'; }).join("") + '</ul></div>';
  }

  /* ---------- views ---------- */
  var view = "home", stepIdx = store.get("step", 0);
  if (stepIdx >= steps.length) stepIdx = 0;

  var TILES = [
    ["journey", "Service Journey", "Each part of the service in order", "scripture"],
    ["main", "Main Teaching", "Key points and explanations", "main"],
    ["scriptures", "All Scriptures", "Every passage in full", "scripture"],
    ["decl", "My Family Declarations", "Add your family's names", "declaration"],
    ["keep", "Keep the Anointing", "Guidance for after the service", "application"],
    ["cards", "Memory Cards", "Practise the key verses", "scripture"],
    ["quiz", "Bible Quiz", T.quiz.length + " questions", "main"],
    ["colors", "Colour Guide", "What each colour means", "neutral"]
  ];

  function renderHome() {
    var saved = store.get("step", 0);
    var h = '<section class="hero"' + sayAttr(T.ministry + ". " + T.title + ". " + T.minister + ".") + '><div class="ministry">' + esc(T.ministry) + '</div>' +
      '<h1>' + esc(T.title) + '</h1><p class="series">The Word, the Anointing &amp; the Application</p>' +
      '<p class="meta">' + esc(T.minister) + '<br>' + esc(T.date) + '</p>' +
      (T.isSample ? '<span class="sample-flag">Sample record · not a transcript</span>' : '') + '</section>';
    h += '<div class="card r-scripture" style="margin-top:1rem"><span class="tag">Today\'s central Scripture</span>' + scriptureHTML(T.mainScripture) + '</div>';
    h += '<button class="start" id="startBtn">▶ START</button>';
    h += '<button class="secondary" id="listenAll">🔊 Listen to the entire teaching</button>';
    if (saved > 0) h += '<button class="secondary resume" id="resumeBtn">Continue where I stopped (step ' + (saved + 1) + ' of ' + steps.length + ')</button>';
    h += '<h2>Study more</h2><div class="grid">' + TILES.map(function (t) {
      return '<button class="tile r-' + t[3] + '" data-go="' + t[0] + '"><b>' + t[1] + '</b><small>' + t[2] + '</small></button>';
    }).join("") + '</div>';
    if (T.isSample) h += '<p class="notice">This is a sample teaching record that shows how each service will be preserved. The topics are illustrations. Nothing here is a quotation from the minister. All Scripture is from the King James Version. Names you type stay on your own device.</p>';
    else h += '<p class="notice">All Scripture is from the King James Version. Supplementary study is labeled separately from the minister\'s words. Names you type stay on your own device.</p>';
    app.innerHTML = h;
    document.getElementById("startBtn").onclick = function () { stepIdx = 0; go("guide"); };
    document.getElementById("listenAll").onclick = function () { stepIdx = 0; go("guide"); Audio.start(true); };
    var r = document.getElementById("resumeBtn"); if (r) r.onclick = function () { stepIdx = saved; go("guide"); };
  }

  function renderGuide() {
    var s = steps[stepIdx];
    store.set("step", stepIdx);
    var pct = Math.round(((stepIdx + 1) / steps.length) * 100);
    var h = '<div class="progress"><span>' + esc(s.kind) + '</span><span>Step ' + (stepIdx + 1) + ' of ' + steps.length + '</span></div>' +
      '<div class="bar"><i style="width:' + pct + '%"></i></div>' +
      '<article class="card r-' + s.role + '" data-section="' + esc(s.kind) + '">' + s.render() + '</article>' +
      '<div class="listen-row"><button class="chip" id="listenStep">🔊 Listen to this step</button></div>' +
      '<div class="navrow"><button id="prevStep"' + (stepIdx === 0 ? ' disabled' : '') + '>← Previous</button>' +
      '<button class="next" id="nextStep">' + (stepIdx === steps.length - 1 ? 'Finish' : 'Next →') + '</button></div>';
    app.innerHTML = h;
    document.getElementById("prevStep").onclick = function () { Audio.stop(); stepIdx = Math.max(0, stepIdx - 1); renderGuide(); top(); };
    document.getElementById("nextStep").onclick = function () {
      Audio.stop();
      if (stepIdx === steps.length - 1) { store.set("step", 0); go("home"); return; }
      stepIdx++; renderGuide(); top();
    };
    document.getElementById("listenStep").onclick = function () { Audio.start(false); };
  }

  function sectionWrap(role, title, inner, lead) {
    return '<article class="card r-' + role + '" data-section="' + esc(title) + '"><h2' + sayAttr(title + ".") + '>' + esc(title) + '</h2>' + (lead ? '<p class="lead">' + lead + '</p>' : '') + inner + '</article>';
  }
  function listenBar() { return '<div class="listen-row"><button class="chip" id="listenView">🔊 Listen to this page</button></div>'; }

  function renderJourney() {
    var h = '<h2>Service Journey</h2><p class="lead">The parts of the service in the order they happened.</p>' + listenBar();
    T.journey.forEach(function (j, i) {
      h += '<article class="card r-' + j.role + '" data-section="' + esc(j.title) + '"><span class="tag">Part ' + (i + 1) + '</span><h3' + sayAttr(j.title + ".") + '>' + esc(j.title) + '</h3><p' + sayAttr(j.note) + '>' + esc(j.note) + '</p>' + scriptureHTML(j.scripture) + originalHTML(j.original) + '</article>';
    });
    h += '<article class="card r-main" data-section="The Main Word"><span class="tag">Part ' + (T.journey.length + 1) + '</span><h3>The Main Word</h3><p>' + esc(T.title) + '</p><button class="chip" data-go="main">Open the main teaching</button></article>';
    h += '<article class="card r-declaration" data-section="Declarations"><span class="tag">Part ' + (T.journey.length + 2) + '</span><h3>Declarations and Prophetic Directions</h3><button class="chip" data-go="decl">Open declarations</button></article>';
    h += '<article class="card r-application" data-section="Keeping the Anointing"><span class="tag">Part ' + (T.journey.length + 3) + '</span><h3>Keeping the Anointing</h3><button class="chip" data-go="keep">Open guidance</button></article>';
    app.innerHTML = h;
  }
  function renderMain() {
    var h = '<h2>The Main Word</h2><p class="lead">' + T.points.length + ' key points. Each has the Scripture, the minister\'s words and one thing to remember.</p>' + listenBar();
    T.points.forEach(function (p, i) { h += '<article class="card r-main" data-section="Point ' + (i + 1) + '">' + pointHTML(p, i) + '</article>'; });
    app.innerHTML = h;
  }
  function renderScriptures() {
    var seen = {}, list = [];
    function add(s) { if (!seen[s.ref]) { seen[s.ref] = 1; list.push(s); } }
    add(T.mainScripture); T.journey.forEach(function (j) { add(j.scripture); }); T.points.forEach(function (p) { add(p.scripture); }); T.keep.forEach(function (k) { add(k.scripture); });
    var h = '<h2>All Scriptures</h2><p class="lead">' + list.length + ' passages, King James Version. Tap a reference to open it.</p>' + listenBar();
    list.forEach(function (s, i) {
      h += '<details class="card r-scripture" data-section="' + esc(s.ref) + '"' + (i === 0 ? ' open' : '') + '><summary><b>' + esc(s.ref) + '</b></summary>' + scriptureHTML(s) + '</details>';
    });
    app.innerHTML = h;
  }
  function renderKeep() {
    var h = '<h2>Keeping the Anointing</h2><p class="lead">Supplementary Bible study for after the service.</p>' + listenBar();
    T.keep.forEach(function (k, i) { h += '<article class="card r-application" data-section="' + esc(k.title) + '">' + keepHTML(k) + '</article>'; });
    h += sectionWrap("declaration", "Closing prayer", T.closingPrayer.map(function (p) { return '<p' + sayAttr(p) + '>' + esc(p) + '</p>'; }).join(""), "Supplementary prayer");
    app.innerHTML = h;
  }

  /* family declarations */
  function renderDecl() {
    var n = store.get("names", { me: "", kids: "", who: "kids", rep: 1 });
    var h = '<h2>My Family Declarations</h2>';
    h += '<article class="card r-declaration">' + originalHTML(T.originalDeclarations.map(function (d) { return d.text || d; }), "The minister's original declarations will appear here exactly as given. They are never changed to insert names.") + '</article>';
    h += '<article class="card r-declaration"><span class="tag">Personalize</span>' +
      '<label class="field"><span>Your name</span><input id="nMe" autocomplete="off" value="' + esc(n.me) + '" placeholder="Your name"></label>' +
      '<label class="field"><span>Children\'s names (separate with commas)</span><input id="nKids" autocomplete="off" value="' + esc(n.kids) + '" placeholder="e.g. Tyler, Ryan"></label>' +
      '<div class="seg" role="group" aria-label="Pray for"><button data-who="kids" class="' + (n.who === "kids" ? "on" : "") + '">My children</button><button data-who="me" class="' + (n.who === "me" ? "on" : "") + '">Myself</button></div>' +
      '<div class="listen-row" role="group" aria-label="Repeat each declaration"><span style="align-self:center;font-weight:700">Repeat each:</span>' +
      [1, 3, 7].map(function (r) { return '<button class="chip r-declaration' + (n.rep === r ? " on" : "") + '" data-rep="' + r + '">' + r + '×</button>'; }).join("") + '</div>' +
      '</article><div id="declOut"></div>';
    app.innerHTML = h;
    function save() { n.me = document.getElementById("nMe").value.trim(); n.kids = document.getElementById("nKids").value.trim(); store.set("names", n); out(); }
    document.getElementById("nMe").oninput = save; document.getElementById("nKids").oninput = save;
    app.querySelectorAll("[data-who]").forEach(function (b) { b.onclick = function () { n.who = b.dataset.who; store.set("names", n); app.querySelectorAll("[data-who]").forEach(function (x) { x.classList.toggle("on", x === b); }); out(); }; });
    app.querySelectorAll("[data-rep]").forEach(function (b) { b.onclick = function () { n.rep = +b.dataset.rep; store.set("names", n); app.querySelectorAll("[data-rep]").forEach(function (x) { x.classList.toggle("on", x === b); }); }; });
    function joinNames(s) { var a = s.split(",").map(function (x) { return x.trim(); }).filter(Boolean); if (a.length < 2) return a[0] || ""; return a.slice(0, -1).join(", ") + " and " + a[a.length - 1]; }
    function lines() {
      return T.scriptureDeclarations.map(function (d) {
        var name = n.who === "kids" ? joinNames(n.kids) : "";
        var text = name ? d.personal.replace(/\{NAME\}/g, name).replace(/\{OBJ\}/g, "them") : d.text;
        return { text: text, ref: d.ref };
      });
    }
    function out() {
      var L = lines(), who = n.who === "kids" ? (joinNames(n.kids) || "your children") : (n.me || "yourself");
      var hh = '<article class="card r-declaration" data-section="Personalized declarations"><span class="tag">Personalized Scripture-based declarations</span>' +
        '<p class="lead">For ' + esc(who) + '. These come from the Bible verses shown. They are not the minister\'s original declarations.</p>';
      if (n.who === "kids" && !n.kids) hh += '<p><b>Type your children\'s names above to place them in the declarations.</b></p>';
      L.forEach(function (l, i) { hh += '<div class="supp"><div class="label">' + (i + 1) + ' of ' + L.length + ' · ' + esc(l.ref) + '</div><p class="decl" style="font-size:1.15rem"' + sayAttr(l.text, ' data-ram="1"') + '>' + esc(l.text) + '</p></div>'; });
      hh += '<div class="listen-row"><button class="chip r-declaration on" id="dListen">🔊 Listen &amp; repeat</button><button class="chip r-declaration" id="dCopy">Copy</button><button class="chip r-declaration" id="dShare">Share</button></div></article>';
      document.getElementById("declOut").innerHTML = hh;
      var full = (n.me ? n.me + "'s declarations" : "My declarations") + "\n\n" + L.map(function (l) { return l.text + " (" + l.ref + ", KJV)"; }).join("\n\n");
      document.getElementById("dListen").onclick = function () { Audio.repeatEach = n.rep; Audio.start(false); };
      document.getElementById("dCopy").onclick = function () { copy(full); };
      document.getElementById("dShare").onclick = function () { if (navigator.share) navigator.share({ title: "Declarations", text: full }).catch(function () {}); else copy(full); };
    }
    out();
  }
  function copy(t) {
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(t).then(function () { toast("Copied"); }, fallback); else fallback();
    function fallback() { var a = document.createElement("textarea"); a.value = t; document.body.appendChild(a); a.select(); try { document.execCommand("copy"); toast("Copied"); } catch (e) { toast("Copy not available"); } a.remove(); }
  }

  /* memory cards */
  function renderCards() {
    var cards = [T.mainScripture].concat(T.points.map(function (p) { return p.scripture; }), T.keep.map(function (k) { return k.scripture; }));
    var seen = {}; cards = cards.filter(function (c) { if (seen[c.ref]) return false; seen[c.ref] = 1; return true; });
    var i = store.get("card", 0) % cards.length, hidden = false;
    function draw() {
      var c = cards[i]; store.set("card", i);
      app.innerHTML = '<h2>Memory Cards</h2><p class="lead">Card ' + (i + 1) + ' of ' + cards.length + '</p>' +
        '<article class="card r-scripture" data-section="' + esc(c.ref) + '"><div id="cv" class="' + (hidden ? "hidden-verse" : "") + '">' + scriptureHTML(c) + '</div>' +
        '<div class="listen-row"><button class="chip" id="cHide">' + (hidden ? "Reveal verse" : "Hide verse") + '</button><button class="chip" id="cPlay">🔊 Play</button></div>' +
        '<p class="lead">Practise: hide the verse, say it aloud from memory, then reveal it to check.</p></article>' +
        '<div class="navrow"><button id="cPrev">← Previous</button><button class="next" id="cNext">Next card →</button></div>';
      document.getElementById("cHide").onclick = function () { hidden = !hidden; draw(); };
      document.getElementById("cPlay").onclick = function () { Audio.start(false); };
      document.getElementById("cPrev").onclick = function () { Audio.stop(); i = (i - 1 + cards.length) % cards.length; hidden = false; draw(); };
      document.getElementById("cNext").onclick = function () { Audio.stop(); i = (i + 1) % cards.length; hidden = false; draw(); };
    }
    draw();
  }

  /* quiz */
  function renderQuiz() {
    var qi = 0, score = 0;
    function draw() {
      if (qi >= T.quiz.length) {
        app.innerHTML = '<h2>Quiz complete</h2><article class="card r-main"><p class="decl">You scored ' + score + ' of ' + T.quiz.length + '.</p><div class="navrow"><button id="qRetry">Try again</button><button class="next" data-go="home">Home</button></div></article>';
        document.getElementById("qRetry").onclick = function () { qi = 0; score = 0; draw(); };
        return;
      }
      var q = T.quiz[qi];
      app.innerHTML = '<h2>Bible Quiz</h2><p class="lead">Question ' + (qi + 1) + ' of ' + T.quiz.length + '</p>' +
        '<article class="card r-main" data-section="Question ' + (qi + 1) + '"><h3' + sayAttr(q.q) + '>' + esc(q.q) + '</h3>' +
        q.a.map(function (a, k) { return '<button class="opt" data-k="' + k + '">' + esc(a) + '</button>'; }).join("") + '<div class="feedback" id="fb"></div></article>';
      app.querySelectorAll(".opt").forEach(function (b) {
        b.onclick = function () {
          if (app.querySelector(".opt.right")) return;
          var k = +b.dataset.k, ok = k === q.c; if (ok) score++;
          app.querySelectorAll(".opt").forEach(function (x) { if (+x.dataset.k === q.c) x.classList.add("right"); });
          if (!ok) b.classList.add("wrong");
          var verse = findVerse(q.ref);
          document.getElementById("fb").innerHTML = '<p><b>' + (ok ? "Correct." : "Not quite. The answer is: " + esc(q.a[q.c])) + '</b></p>' +
            (verse ? scriptureHTML(verse) : '') + '<button class="secondary" id="qNext" style="margin-top:.6rem">' + (qi === T.quiz.length - 1 ? "See my score" : "Next question →") + '</button>';
          document.getElementById("qNext").onclick = function () { qi++; draw(); top(); };
        };
      });
    }
    draw();
  }
  function findVerse(ref) {
    var m = ref.match(/^(.*) (\d+):(\d+)$/); if (!m) return null;
    var pool = [T.mainScripture].concat(T.journey.map(function (j) { return j.scripture; }), T.points.map(function (p) { return p.scripture; }), T.keep.map(function (k) { return k.scripture; }));
    for (var i = 0; i < pool.length; i++) {
      var s = pool[i]; if (s.ref.indexOf(m[1] + " " + m[2] + ":") !== 0) continue;
      for (var j = 0; j < s.verses.length; j++) if (s.verses[j][0] === m[3]) return { ref: ref, verses: [s.verses[j]] };
    }
    return null;
  }

  function renderColors() {
    var rows = [["scripture", "Royal Blue — Bible Scriptures", "Complete verses, references and biblical context"],
      ["main", "Gold — Main Points", "The most important teaching points"],
      ["application", "Green — Practical Application", "Instructions and daily action steps"],
      ["declaration", "Burgundy — Declarations", "Prayers and declarations to personalize"]];
    app.innerHTML = '<h2>Colour Guide</h2><p class="lead">These colours mean the same thing in every teaching record.</p><div class="legend">' +
      rows.map(function (r) { return '<div class="r-' + r[0] + '"><i></i><span><b>' + r[1] + '</b><br><small>' + r[2] + '</small></span></div>'; }).join("") +
      '<div class="r-neutral"><i style="border:2px dashed var(--c);background:transparent"></i><span><b>Dashed box — Minister\'s original words</b><br><small>Exact words from the recording, never rewritten</small></span></div></div>';
  }

  var VIEWS = { home: renderHome, guide: renderGuide, journey: renderJourney, main: renderMain, scriptures: renderScriptures, decl: renderDecl, keep: renderKeep, cards: renderCards, quiz: renderQuiz, colors: renderColors };
  function top() { window.scrollTo(0, 0); }
  function go(v) {
    Audio.stop(); view = v; VIEWS[v](); top(); app.focus({ preventScroll: true });
    document.getElementById("player").hidden = (v === "home");
    var lv = document.getElementById("listenView"); if (lv) lv.onclick = function () { Audio.start(false); };
    if (location.hash.slice(1) !== v) history.pushState(null, "", "#" + v);
  }
  app.addEventListener("click", function (e) { var b = e.target.closest("[data-go]"); if (b) go(b.dataset.go); });
  window.addEventListener("popstate", function () { var v = location.hash.slice(1) || "home"; if (VIEWS[v]) { Audio.stop(); view = v; VIEWS[v](); document.getElementById("player").hidden = (v === "home"); var lv = document.getElementById("listenView"); if (lv) lv.onclick = function () { Audio.start(false); }; } });

  /* ---------- audio ---------- */
  var synth = window.speechSynthesis;
  var Audio = {
    segs: [], i: 0, playing: false, token: 0, continuous: false, repeatEach: 1, timer: null, sleepT: null,
    rate: 1, vol: 1,
    collect: function () {
      var out = [], self = this;
      app.querySelectorAll("[data-section]").forEach(function (sec, si) {
        sec.querySelectorAll("[data-say]").forEach(function (el) {
          var ram = el.dataset.ram === "1";
          var reps = ram ? self.repeatEach : 1;
          for (var r = 0; r < reps; r++) out.push({ el: el, text: el.dataset.say, ram: ram, sec: si, name: sec.dataset.section });
        });
      });
      return out;
    },
    start: function (continuous) {
      if (!synth) { toast("Audio is not supported in this browser"); return; }
      this.stop(); this.continuous = !!continuous;
      this.segs = this.collect(); this.i = 0;
      if (!this.segs.length) return;
      document.getElementById("player").hidden = false;
      this.playing = true; this.play();
    },
    play: function () {
      var self = this, tok = ++this.token;
      synth.cancel(); clearTimeout(this.timer);
      if (this.i >= this.segs.length) { return this.finished(); }
      var s = this.segs[this.i];
      mark(s.el); setNow(s.name || "Playing"); setBtn(true);
      var text = s.ram && document.getElementById("pRam").checked ? "Repeat after me. " + s.text : s.text;
      var u = new SpeechSynthesisUtterance(text);
      u.rate = this.rate; u.volume = this.vol; u.lang = "en-US";
      var v = pickVoice(); if (v) u.voice = v;
      u.onend = function () {
        if (tok !== self.token || !self.playing) return;
        var wait = 350;
        if (s.ram && document.getElementById("pRam").checked) wait = Math.max(3500, s.text.split(/\s+/).length * 550 / self.rate);
        self.timer = setTimeout(function () { if (tok !== self.token) return; self.i++; self.play(); }, wait);
      };
      u.onerror = function (e) { if (tok !== self.token) return; if (e.error === "interrupted" || e.error === "canceled") return; self.i++; self.play(); };
      synth.speak(u);
    },
    finished: function () {
      var self = this;
      if (document.getElementById("pRepeat").checked) { this.i = 0; return this.play(); }
      if (this.continuous && view === "guide" && stepIdx < steps.length - 1) {
        stepIdx++; renderGuide(); top();
        setTimeout(function () { self.segs = self.collect(); self.i = 0; self.play(); }, 500);
        return;
      }
      this.stop(); setNow("Finished");
    },
    toggle: function () {
      if (this.playing) { this.playing = false; this.token++; synth && synth.cancel(); clearTimeout(this.timer); setBtn(false); setNow("Paused"); }
      else if (this.segs.length && this.i < this.segs.length) { this.playing = true; this.play(); }
      else this.start(view === "guide");
    },
    stop: function () {
      this.playing = false; this.token++; clearTimeout(this.timer); if (synth) synth.cancel();
      this.i = 0; mark(null); setBtn(false); setNow("Ready");
    },
    seek: function (d) { if (!this.segs.length) return; this.i = Math.max(0, Math.min(this.segs.length - 1, this.i + d)); if (this.playing) this.play(); else mark(this.segs[this.i].el); },
    section: function (d) {
      if (view === "guide") {
        var was = this.playing || this.continuous, c = this.continuous;
        var n = stepIdx + d; if (n < 0 || n >= steps.length) return;
        this.stop(); stepIdx = n; renderGuide(); top();
        if (was) this.start(c);
        return;
      }
      if (!this.segs.length) this.segs = this.collect();
      var cur = this.segs[this.i] ? this.segs[this.i].sec : 0, target = cur + d, k;
      for (k = 0; k < this.segs.length; k++) if (this.segs[k].sec === target) break;
      if (k >= this.segs.length) return;
      this.i = k; this.segs[k].el.scrollIntoView({ block: "center", behavior: "smooth" });
      if (this.playing) this.play(); else { this.playing = true; this.play(); }
    }
  };
  var voiceCache = null;
  function pickVoice() {
    if (voiceCache) return voiceCache;
    var vs = synth.getVoices() || [];
    voiceCache = vs.find(function (v) { return /en[-_]US/i.test(v.lang) && /Samantha|Google US English|Natural|Aria|Jenny/i.test(v.name); }) ||
      vs.find(function (v) { return /^en/i.test(v.lang); }) || null;
    return voiceCache;
  }
  if (synth && synth.onvoiceschanged !== undefined) synth.onvoiceschanged = function () { voiceCache = null; };
  function mark(el) { app.querySelectorAll(".speaking").forEach(function (x) { x.classList.remove("speaking"); }); if (el) { el.classList.add("speaking"); var r = el.getBoundingClientRect(); if (r.top < 70 || r.bottom > window.innerHeight - 180) el.scrollIntoView({ block: "center", behavior: "smooth" }); } }
  function setNow(t) { document.getElementById("nowPlaying").textContent = t; }
  function setBtn(p) { var b = document.getElementById("pPlay"); b.innerHTML = (p ? "❚❚" : "▶") + "<span>" + (p ? "Pause" : "Play") + "</span>"; b.setAttribute("aria-label", p ? "Pause" : "Play"); }

  document.getElementById("pPlay").onclick = function () { Audio.toggle(); };
  document.getElementById("pStop").onclick = function () { Audio.stop(); };
  document.getElementById("pBack").onclick = function () { Audio.seek(-1); };
  document.getElementById("pFwd").onclick = function () { Audio.seek(1); };
  document.getElementById("pPrevSec").onclick = function () { Audio.section(-1); };
  document.getElementById("pNextSec").onclick = function () { Audio.section(1); };
  document.getElementById("pSpeed").onchange = function (e) { Audio.rate = +e.target.value; if (Audio.playing) Audio.play(); };
  document.getElementById("pVol").oninput = function (e) { Audio.vol = +e.target.value; };
  document.getElementById("pVol").onchange = function () { if (Audio.playing) Audio.play(); };
  document.getElementById("pSleep").onchange = function (e) {
    clearTimeout(Audio.sleepT); var m = +e.target.value;
    if (m) { Audio.sleepT = setTimeout(function () { Audio.stop(); setNow("Sleep timer ended"); e.target.value = "0"; }, m * 60000); toast("Audio will stop in " + m + " minutes"); }
  };

  /* ---------- settings ---------- */
  var fs = store.get("fs", 1.125), theme = store.get("theme", "day");
  function applyPrefs() {
    document.documentElement.style.setProperty("--fs", fs + "rem");
    document.documentElement.dataset.theme = theme;
    document.getElementById("themeBtn").textContent = theme === "night" ? "Day" : "Night";
  }
  document.getElementById("fontUp").onclick = function () { fs = Math.min(1.6, +(fs + 0.1).toFixed(2)); store.set("fs", fs); applyPrefs(); };
  document.getElementById("fontDown").onclick = function () { fs = Math.max(0.95, +(fs - 0.1).toFixed(2)); store.set("fs", fs); applyPrefs(); };
  document.getElementById("themeBtn").onclick = function () { theme = theme === "night" ? "day" : "night"; store.set("theme", theme); applyPrefs(); };
  document.getElementById("homeBtn").onclick = function () { go("home"); };
  applyPrefs();

  var initial = location.hash.slice(1);
  go(VIEWS[initial] ? initial : "home");
  window.__waa = { Audio: Audio, steps: steps, go: go };
})();
