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

  /* Footer year, in case a page is served for years without a rebuild. */
  var y = String(new Date().getFullYear());
  document.querySelectorAll('footer span').forEach(function (s) {
    if (s.children.length) return;   // leaf spans only: rewriting textContent would flatten the email links
    var prev = s.previousSibling ? s.previousSibling.textContent : '';
    if (/© 20\d\d/.test(s.textContent)) s.textContent = s.textContent.replace(/© 20\d\d/, '© ' + y);
    else if (/^20\d\d$/.test(s.textContent) && /©\s*$/.test(prev)) s.textContent = y;   // "© <span>2026</span>"
  });
})();
