/* Visitor counter: one anonymous page-view request to GoatCounter (https://www.goatcounter.com).
   No cookies, no fingerprinting, no personal data; GoatCounter does not store IP addresses.
   The statistics are visible only to the account owner (dashboard: https://dorianhoeffner.goatcounter.com).

   - Counts only on dorianhoeffner.com, never on a local preview, and not in browsers with Do Not Track.
   - Your own visits: open https://dorianhoeffner.com/#nocount once in each browser you use.
     That browser is then never counted (#count switches counting on again).
   - All pages load this one file, including the Absorption Atlas (/absorptionlib/), so the
     account code below is the only place to change. Leave GC empty to switch counting off. */
(function () {
  var GC = 'dorianhoeffner';
  var h = location.hash, skip = false;
  try {
    if (h === '#nocount') localStorage.setItem('dh-nocount', '1');
    if (h === '#count') localStorage.removeItem('dh-nocount');
    skip = localStorage.getItem('dh-nocount') === '1';
  } catch (e) {}
  if (!GC || skip || !/(^|\.)dorianhoeffner\.com$/.test(location.hostname)) return;
  if (navigator.webdriver || navigator.doNotTrack === '1' || window.doNotTrack === '1') return;
  var ref = '';
  try { if (document.referrer && new URL(document.referrer).host !== location.host) ref = document.referrer; } catch (e) {}
  var q = 'p=' + encodeURIComponent(location.pathname) +
          '&t=' + encodeURIComponent(document.title) +
          '&r=' + encodeURIComponent(ref) +
          '&s=' + encodeURIComponent([screen.width, screen.height, window.devicePixelRatio || 1].join(',')) +
          '&rnd=' + Math.random().toString(36).slice(2);
  var url = 'https://' + GC + '.goatcounter.com/count?' + q;
  if (navigator.sendBeacon) { try { if (navigator.sendBeacon(url)) return; } catch (e) {} }
  var img = new Image(); img.src = url;
})();
