/* Progressive enhancement: menus, mobile sidebar, tabs, copy buttons,
   active-heading tracking, feedback widget. No dependencies. */
(function () {
  var d = document;

  /* ── Popover menus (colour mode, language, version, accessibility) ── */
  function closeAll(except) {
    d.querySelectorAll('.menu__panel[data-open="true"]').forEach(function (p) {
      if (p !== except) { p.dataset.open = 'false'; var b = p.previousElementSibling; if (b) b.setAttribute('aria-expanded', 'false'); }
    });
  }
  d.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-menu-trigger]');
    if (trigger) {
      var panel = trigger.nextElementSibling;
      var open = panel.dataset.open === 'true';
      closeAll(panel);
      panel.dataset.open = open ? 'false' : 'true';
      trigger.setAttribute('aria-expanded', open ? 'false' : 'true');
      return;
    }
    if (!e.target.closest('.menu__panel')) closeAll();
  });
  d.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeAll(); });

  /* ── Colour mode buttons ─────────────────────────────────────────── */
  function syncMode() {
    var cur = window.pwTheme ? window.pwTheme.get() : 'system';
    d.querySelectorAll('[data-mode]').forEach(function (b) {
      b.setAttribute('aria-checked', String(b.dataset.mode === cur));
    });
  }
  d.querySelectorAll('[data-mode]').forEach(function (b) {
    b.addEventListener('click', function () { window.pwTheme.set(b.dataset.mode); closeAll(); });
  });
  d.addEventListener('pw:mode', syncMode); syncMode();

  /* ── Accessibility selectors ─────────────────────────────────────── */
  d.querySelectorAll('[data-a11y-set]').forEach(function (b) {
    var attr = b.dataset.a11ySet, val = b.dataset.a11yValue || '';
    b.setAttribute('aria-checked', String(window.pwTheme.getA11y(attr) === val && val !== ''));
    b.addEventListener('click', function () {
      var active = window.pwTheme.getA11y(attr) === val;
      window.pwTheme.setA11y(attr, active ? '' : val);
      d.querySelectorAll('[data-a11y-set="' + attr + '"]').forEach(function (o) {
        o.setAttribute('aria-checked', String(!active && o === b));
      });
    });
  });

  /* ── Mobile sidebar ──────────────────────────────────────────────── */
  var burger = d.querySelector('[data-sidebar-toggle]'), sidebar = d.querySelector('.sidebar');
  if (burger && sidebar) burger.addEventListener('click', function () {
    var open = sidebar.dataset.open === 'true';
    sidebar.dataset.open = open ? 'false' : 'true';
    burger.setAttribute('aria-expanded', open ? 'false' : 'true');
  });

  /* ── Tabs ────────────────────────────────────────────────────────── */
  d.querySelectorAll('.tabs').forEach(function (tabs) {
    var btns = Array.prototype.slice.call(tabs.querySelectorAll('.tabs__tab'));
    var panels = Array.prototype.slice.call(tabs.querySelectorAll('.tabs__panel'));
    function select(i) {
      btns.forEach(function (b, j) { b.setAttribute('aria-selected', String(i === j)); b.tabIndex = i === j ? 0 : -1; });
      panels.forEach(function (p, j) { p.hidden = i !== j; });
    }
    btns.forEach(function (b, i) {
      b.addEventListener('click', function () { select(i); });
      b.addEventListener('keydown', function (e) {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        var n = (i + (e.key === 'ArrowRight' ? 1 : btns.length - 1)) % btns.length;
        select(n); btns[n].focus();
      });
    });
    select(0);
  });

  /* ── Copy code ───────────────────────────────────────────────────── */
  d.querySelectorAll('.code__copy').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var pre = btn.closest('.code').querySelector('pre');
      navigator.clipboard.writeText(pre.innerText).then(function () {
        var label = btn.querySelector('span');
        var old = label.textContent;
        label.textContent = btn.dataset.copied || 'Copied';
        setTimeout(function () { label.textContent = old; }, 1600);
      });
    });
  });

  /* ── Active-heading tracking for the table of contents ───────────── */
  var toc = d.querySelector('.toc');
  if (toc && 'IntersectionObserver' in window) {
    var links = Array.prototype.slice.call(toc.querySelectorAll('a[href^="#"]'));
    var targets = links.map(function (a) { return d.getElementById(decodeURIComponent(a.hash.slice(1))); }).filter(Boolean);
    var current = null;
    function mark(id) {
      if (id === current) return; current = id;
      links.forEach(function (a) { a.setAttribute('aria-current', String(a.hash.slice(1) === id)); });
    }
    var io = new IntersectionObserver(function (entries) {
      var visible = entries.filter(function (e) { return e.isIntersecting; })
        .sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top; });
      if (visible.length) mark(visible[0].target.id);
    }, { rootMargin: '-' + (parseInt(getComputedStyle(d.documentElement).getPropertyValue('--header-h')) + 24) + 'px 0px -70% 0px', threshold: 0 });
    targets.forEach(function (t) { io.observe(t); });
  }

  /* ── Feedback widget ─────────────────────────────────────────────── */
  var fb = d.querySelector('.feedback');
  if (fb) {
    var key = 'pw:fb:' + location.pathname;
    var sent = null;
    try { sent = localStorage.getItem(key); } catch (e) {}
    var status = fb.querySelector('[data-feedback-status]');
    function paint() {
      fb.querySelectorAll('[data-feedback]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.feedback === sent)); });
      if (sent && status) status.textContent = status.dataset.thanks;
    }
    fb.querySelectorAll('[data-feedback]').forEach(function (b) {
      b.addEventListener('click', function () {
        sent = b.dataset.feedback;
        try { localStorage.setItem(key, sent); } catch (e) {}
        paint();
        var url = fb.dataset.endpoint;
        if (url) {
          fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ path: location.pathname, value: sent, title: d.title }) }).catch(function () {});
        }
      });
    });
    paint();
  }
})();
