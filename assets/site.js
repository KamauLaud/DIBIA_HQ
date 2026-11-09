/* site.js — the only JavaScript the published site runs (~2 KB).
   Everything here is progressive: the page is complete HTML without it. */
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Hero portrait feed: cycle the stacked <img>s marked by the build (data-photo-cycle). */
  document.querySelectorAll('[data-photo-cycle]').forEach(function (frame) {
    var imgs = Array.prototype.slice.call(frame.querySelectorAll('img'));
    if (imgs.length < 2 || reduced) return;
    var i = imgs.findIndex(function (im) { return im.style.opacity === '1'; }); if (i < 0) i = 0;
    setInterval(function () {
      imgs[i].style.opacity = '0'; i = (i + 1) % imgs.length; imgs[i].style.opacity = '1';
    }, 4200);
  });

  /* Signal timeline: "Show earlier" toggle for rows the build marked data-more. */
  document.querySelectorAll('[data-more-target]').forEach(function (btn) {
    var list = document.getElementById(btn.getAttribute('data-more-target'));
    if (!list) return;
    var more = list.querySelectorAll('[data-more]');
    if (!more.length) return;
    btn.style.display = 'inline-flex'; btn.style.alignItems = 'center';
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') !== 'true';
      more.forEach(function (row) { row.hidden = !open; });
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.textContent = open ? 'SHOW FEWER ←' : 'SHOW EARLIER →';
    });
  });

  /* Videos: muted autoplay needs the property (not just the attribute) set before play();
     play only while on screen. */
  var vids = document.querySelectorAll('video');
  vids.forEach(function (v) { v.muted = true; v.playsInline = true; });
  if ('IntersectionObserver' in window) {
    var vio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting && !reduced) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
        else v.pause();
      });
    }, { threshold: 0.25 });
    vids.forEach(function (v) { vio.observe(v); });
  }


  /* Journey (cv.html): everything here is an extra. The CSS :has() rules already highlight a
     traced claim with JS off; this adds the thread line, the detail panel, prev/next, and opens at NOW. */
  var jr = document.getElementById('journey-wrap');
  if (jr) {
    var scroller = jr.querySelector('.jr-scroll'), body = jr.querySelector('.jr-body'), svg = jr.querySelector('.jr-thread');
    var panel = jr.querySelector('.jr-detail'), nav = jr.querySelector('.jr-nav'), now = jr.querySelector('.jr-now');
    var data = {}; try { data = JSON.parse(document.getElementById('journey-data').textContent); } catch (e) {}
    var behavior = reduced ? 'auto' : 'smooth';
    var toNow = function (b) { if (now) scroller.scrollTo({ left: Math.max(0, now.offsetLeft - scroller.clientWidth * (scroller.clientWidth < 640 ? 0.45 : 0.62)), behavior: b || behavior }); };
    if (nav) {
      nav.hidden = false;
      nav.addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b) return;
        if (b.hasAttribute('data-jr-now')) return toNow();
        scroller.scrollBy({ left: Number(b.getAttribute('data-jr-step')) * scroller.clientWidth * 0.7, behavior: behavior });
      });
    }
    if (!/^#trace-/.test(location.hash)) toNow('auto');

    var claim = function () { var r = jr.querySelector('input[name="jr-claim"]:checked'); return r && r.id !== 'jc-none' ? r.id.slice(3) : null; };
    var NS = 'http://www.w3.org/2000/svg';
    var draw = function () {
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      var c = claim(); if (!c) return [];
      var pts = Array.prototype.slice.call(body.querySelectorAll('.it[data-s~="' + c + '"]'))
        .filter(function (el) { return el.offsetParent !== null; })
        .map(function (el) {
          var lane = el.parentElement;
          return { el: el, x: Number(el.getAttribute('data-x')) + 6, y: lane.offsetTop + el.offsetTop + el.offsetHeight / 2 };
        })
        .sort(function (a, b) { return a.x - b.x; });
      if (pts.length > 1) {
        var d = pts.map(function (p, i) { return (i ? 'L' : 'M') + p.x + ' ' + p.y; }).join(' ');
        var path = document.createElementNS(NS, 'path'); path.setAttribute('d', d); svg.appendChild(path);
      }
      pts.forEach(function (p) { var ci = document.createElementNS(NS, 'circle'); ci.setAttribute('cx', p.x); ci.setAttribute('cy', p.y); ci.setAttribute('r', 3.5); svg.appendChild(ci); });
      return pts;
    };
    var show = function (el) {
      var d = data.detail && data.detail[el.id.slice(2)]; if (!d || !panel) return;
      jr.querySelectorAll('.it.is-open').forEach(function (x) { x.classList.remove('is-open'); });
      el.classList.add('is-open');
      var h = '<div class="dd">' + d.d + '</div><h4></h4><p class="o"></p><p class="b"></p>';
      panel.innerHTML = h;
      panel.querySelector('h4').textContent = d.t;
      panel.querySelector('.o').textContent = d.o + (d.w && d.w.length ? ' · with ' + d.w.join(', ') : '');
      panel.querySelector('.b').textContent = d.b;
      var tags = [];
      if (d.f.length) tags.push('● FIRST EVIDENCE: ' + d.f.join(', '));
      if (d.s.length) tags.push('○ ADDED EVIDENCE: ' + d.s.join(', '));
      if (tags.length) { var t = document.createElement('div'); t.className = 'dt'; t.textContent = tags.join('   '); panel.appendChild(t); }
      if (d.l) { var a = document.createElement('a'); a.href = d.l; a.textContent = 'Open →'; a.className = 'dt'; panel.appendChild(a); }
      panel.hidden = false;
    };
    body.addEventListener('click', function (e) { var el = e.target.closest('.it'); if (el) show(el); });
    body.addEventListener('keydown', function (e) { var el = e.target.closest('.it'); if (el && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); show(el); } });

    var fromReceipt = false;
    jr.querySelectorAll('.rc-trace').forEach(function (l) { l.addEventListener('click', function () { fromReceipt = true; }); });
    jr.addEventListener('change', function () {
      var pts = draw();
      if (fromReceipt) {
        fromReceipt = false;
        document.getElementById('journey').scrollIntoView({ behavior: behavior, block: 'start' });
        var f = pts.filter(function (p) { return p.el.matches('[data-f~="' + claim() + '"]'); })[0] || pts[0];
        if (f) { scroller.scrollTo({ left: Math.max(0, f.x - 60), behavior: behavior }); show(f.el); }
      }
    });
    window.addEventListener('resize', draw);
    draw();
    // research.html#trace-<claim>: arriving from a receipt card on the home page
    var m = /^#trace-([\w-]+)$/.exec(location.hash);
    var r = m && document.getElementById('jc-' + m[1]);
    if (r) { r.checked = true; fromReceipt = true; jr.dispatchEvent(new Event('change', { bubbles: true })); }
  }


  /* Marketplace service search (marketplace.html): the full list is static; this only filters it. */
  var svq = document.querySelector('[data-svc-search]');
  if (svq) {
    var svItems = Array.prototype.slice.call(document.querySelectorAll('.sv')), svEmpty = document.querySelector('.sv-empty'), svCount = document.querySelector('.sv-count'), svTotal = svCount ? svCount.textContent : '';
    svq.addEventListener('input', function () {
      var q = svq.value.trim().toLowerCase(), shown = 0;
      svItems.forEach(function (li) { var ok = !q || li.getAttribute('data-search').indexOf(q) > -1; li.hidden = !ok; if (ok) shown++; });
      if (svEmpty) svEmpty.hidden = shown > 0;
      if (svCount) svCount.textContent = q ? shown + ' OF ' + svItems.length + ' SERVICES' : svTotal;
    });
  }

  /* Footer year, in case a page is served for years without a rebuild. */
  var y = String(new Date().getFullYear());
  document.querySelectorAll('footer span').forEach(function (s) {
    if (s.children.length) return;   // leaf spans only: rewriting textContent would flatten the email links
    var prev = s.previousSibling ? s.previousSibling.textContent : '';
    if (/© 20\d\d/.test(s.textContent)) s.textContent = s.textContent.replace(/© 20\d\d/, '© ' + y);
    else if (/^20\d\d$/.test(s.textContent) && /©\s*$/.test(prev)) s.textContent = y;   // "© <span>2026</span>"
  });
})();
