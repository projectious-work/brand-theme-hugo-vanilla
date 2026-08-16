/* Colour mode + accessibility selectors. Loaded in <head>, before paint,
   so the stored choice never flashes. Everything persists to localStorage. */
(function () {
  var K = 'pw:mode', A = 'pw:a11y', html = document.documentElement;
  var darkScheme = window.matchMedia('(prefers-color-scheme: dark)');

  /* Four choices. "navy" and "dark" are both dark mode; they differ only in
     which surface the page and cards sit on. System dark resolves to navy,
     the house default — an explicit "dark" pick opts into the deeper one. */
  function applyMode(mode) {
    if (mode === 'light') { html.setAttribute('data-theme', 'light'); }
    else if (mode === 'system') {
      html.setAttribute('data-theme', darkScheme.matches ? 'dark' : 'light');
    }
    else { html.setAttribute('data-theme', 'dark'); }
    if (mode === 'dark') { html.removeAttribute('data-surface'); }
    else { html.setAttribute('data-surface', 'navy'); }
    html.setAttribute('data-mode-pref', mode);
  }
  var stored = null;
  try { stored = localStorage.getItem(K); } catch (e) {}
  applyMode(stored || 'system');
  function followSystem() {
    if (html.getAttribute('data-mode-pref') === 'system') { applyMode('system'); }
  }
  if (darkScheme.addEventListener) {
    darkScheme.addEventListener('change', followSystem);
  }
  else if (darkScheme.addListener) { darkScheme.addListener(followSystem); }

  var a11y = {};
  try { a11y = JSON.parse(localStorage.getItem(A) || '{}'); } catch (e) {}
  Object.keys(a11y).forEach(function (k) {
    if (a11y[k]) { html.setAttribute(k, a11y[k]); } else { html.removeAttribute(k); }
  });

  window.pwTheme = {
    set: function (mode) {
      try { localStorage.setItem(K, mode); } catch (e) {}
      applyMode(mode);
      document.dispatchEvent(new CustomEvent('pw:mode', { detail: mode }));
    },
    get: function () { return html.getAttribute('data-mode-pref') || 'system'; },
    setA11y: function (attr, value) {
      if (value) { html.setAttribute(attr, value); a11y[attr] = value; }
      else { html.removeAttribute(attr); delete a11y[attr]; }
      try { localStorage.setItem(A, JSON.stringify(a11y)); } catch (e) {}
      document.dispatchEvent(new CustomEvent('pw:a11y', { detail: a11y }));
    },
    getA11y: function (attr) { return html.getAttribute(attr) || ''; }
  };
})();
