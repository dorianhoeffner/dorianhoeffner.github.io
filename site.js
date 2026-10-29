/* Shared behaviour for every page: language, theme, mobile menu, shrinking header, section highlight.
   The tiny script in each page's <head> sets language and theme before first paint. */
(function () {
  var d = document.documentElement;

  /* Language: both languages are in the HTML; the page title comes from data-title-en / data-title-de on <html>. */
  var langBtns = document.querySelectorAll('[data-set-lang]');
  function setLang(l, save) {
    d.setAttribute('data-lang', l); d.lang = l;
    langBtns.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-set-lang') === l)); });
    var t = d.getAttribute('data-title-' + l);
    if (t) document.title = t;
    if (save) { try { localStorage.setItem('dh-lang', l); } catch (e) {} }
  }
  langBtns.forEach(function (b) { b.addEventListener('click', function () { setLang(b.getAttribute('data-set-lang'), true); }); });
  setLang(d.getAttribute('data-lang') || 'en', false);

  /* Theme: light by default, the switch turns dark mode on and off (remembered in dh-theme). */
  var switches = document.querySelectorAll('.theme-switch');
  function setTheme(t, save) {
    d.setAttribute('data-theme', t);
    switches.forEach(function (s) { s.setAttribute('aria-checked', String(t === 'dark')); });
    if (save) { try { localStorage.setItem('dh-theme', t); } catch (e) {} }
  }
  switches.forEach(function (s) {
    s.addEventListener('click', function () { setTheme(d.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true); });
  });
  setTheme(d.getAttribute('data-theme') === 'dark' ? 'dark' : 'light', false);
  /* Keep every open page of the site in step: a switch in one tab, or coming back with the back button, applies the current choice. */
  function syncTheme() { var t = null; try { t = localStorage.getItem('dh-theme'); } catch (e) {} setTheme(t === 'dark' ? 'dark' : 'light', false); }
  window.addEventListener('storage', function (e) { if (!e.key || e.key === 'dh-theme') syncTheme(); });
  window.addEventListener('pageshow', function (e) { if (e.persisted) syncTheme(); });

  /* Mobile menu */
  var header = document.querySelector('.site-header');
  var menu = document.getElementById('menuBtn');
  if (header && menu) {
    menu.addEventListener('click', function () {
      var open = header.classList.toggle('open'); menu.setAttribute('aria-expanded', String(open));
    });
    header.querySelectorAll('.nav a').forEach(function (a) {
      a.addEventListener('click', function () { header.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); });
    });
  }

  /* Shrinking header. Pages with data-compact on the header stay compact.
     Two thresholds (shrink below 64 px, grow back above 8 px) keep it from flickering. */
  if (header && !header.hasAttribute('data-compact')) {
    var compact = false, ticking = false;
    var update = function () {
      ticking = false;
      var y = window.scrollY || d.scrollTop || 0;
      if (!compact && y > 64) { compact = true; header.classList.add('is-compact'); }
      else if (compact && y < 8) { compact = false; header.classList.remove('is-compact'); }
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* Highlight the section in view (home page only: in-page links starting with #). */
  if ('IntersectionObserver' in window) {
    var links = {};
    document.querySelectorAll('.nav a[href^="#"]').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
    var ids = Object.keys(links);
    if (ids.length) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) {
            ids.forEach(function (k) { links[k].removeAttribute('aria-current'); });
            if (links[e.target.id]) links[e.target.id].setAttribute('aria-current', 'true');
          }
        });
      }, { rootMargin: '-40% 0px -55% 0px' });
      ids.forEach(function (k) { var s = document.getElementById(k); if (s) io.observe(s); });
    }
  }
})();
