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

  /* ── Persistent sidebar groups ──────────────────────────────────── */
  if (sidebar) {
    var sidebarGroups = Array.prototype.slice.call(
      sidebar.querySelectorAll('details[data-sidebar-group]')
    );
    var groupsToggle = sidebar.querySelector('[data-sidebar-groups-toggle]');
    var sidebarStateKey = sidebar.dataset.sidebarStateKey;
    var restoringGroups = true;
    var savedGroups = null;
    try { savedGroups = JSON.parse(localStorage.getItem(sidebarStateKey)); }
    catch (e) { savedGroups = null; }
    if (Array.isArray(savedGroups)) {
      sidebarGroups.forEach(function (group) {
        group.open = savedGroups.indexOf(group.dataset.sidebarGroup) > -1;
      });
    }
    restoringGroups = false;

    function syncGroupsToggle() {
      if (!groupsToggle) return;
      var allOpen = sidebarGroups.length > 0 && sidebarGroups.every(
        function (group) { return group.open; }
      );
      groupsToggle.setAttribute('aria-expanded', String(allOpen));
      var label = allOpen
        ? groupsToggle.dataset.collapseLabel
        : groupsToggle.dataset.expandLabel;
      groupsToggle.title = label;
      groupsToggle.setAttribute('aria-label', label);
    }
    function saveSidebarGroups() {
      if (restoringGroups || !sidebarStateKey) return;
      var filterInput = sidebar.querySelector('[data-sidebar-filter]');
      if (filterInput && filterInput.value) return;
      var openGroups = sidebarGroups.filter(function (group) {
        return group.open;
      }).map(function (group) { return group.dataset.sidebarGroup; });
      try { localStorage.setItem(sidebarStateKey, JSON.stringify(openGroups)); }
      catch (e) {}
      syncGroupsToggle();
    }
    sidebarGroups.forEach(function (group) {
      group.addEventListener('toggle', saveSidebarGroups);
    });
    if (groupsToggle) groupsToggle.addEventListener('click', function () {
      var filterInput = sidebar.querySelector('[data-sidebar-filter]');
      if (filterInput && filterInput.value) {
        filterInput.value = '';
        filterInput.dispatchEvent(new Event('input'));
      }
      var open = groupsToggle.getAttribute('aria-expanded') !== 'true';
      restoringGroups = true;
      sidebarGroups.forEach(function (group) { group.open = open; });
      restoringGroups = false;
      saveSidebarGroups();
    });
    syncGroupsToggle();
  }

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
    /* Block-scoped and distinctly named: a shared `links` here once leaked into
       the sidebar filter below, so the observer rewrote aria-current on the
       sidebar's page link instead of the TOC's headings. */
    const tocLinks = Array.prototype.slice.call(toc.querySelectorAll('a[href^="#"]'));
    const targets = tocLinks.map(function (a) { return d.getElementById(decodeURIComponent(a.hash.slice(1))); }).filter(Boolean);
    let current = null;
    const mark = function (id) {
      if (id === current) return; current = id;
      tocLinks.forEach(function (a) {
        if (decodeURIComponent(a.hash.slice(1)) === id) { a.setAttribute('aria-current', 'true'); }
        else { a.removeAttribute('aria-current'); }
      });
    };
    if (location.hash) { mark(decodeURIComponent(location.hash.slice(1))); }
    window.addEventListener('hashchange', function () {
      if (location.hash) mark(decodeURIComponent(location.hash.slice(1)));
    });
    var io = new IntersectionObserver(function (entries) {
      var visible = entries.filter(function (e) { return e.isIntersecting; })
        .sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top; });
      if (visible.length) mark(visible[0].target.id);
    }, { rootMargin: '-' + (parseInt(getComputedStyle(d.documentElement).getPropertyValue('--header-h')) + 24) + 'px 0px -70% 0px', threshold: 0 });
    targets.forEach(function (t) { io.observe(t); });
  }

  /* ── Sidebar filter ──────────────────────────────────────────────── */
  var filter = d.querySelector('[data-sidebar-filter]');
  if (filter) {
    var sb = d.querySelector('.sidebar');
    const sidebarLinks = Array.prototype.slice.call(sb.querySelectorAll('a'));
    var groups = Array.prototype.slice.call(sb.querySelectorAll('details'));
    var empty = sb.querySelector('[data-sidebar-empty]');
    /* Filtering force-opens groups to reveal matches. The reader's own open/closed
       state is captured before the first keystroke and restored when the box is
       cleared, so clearing a filter does not leave the tree fully expanded. */
    var restore = null;
    filter.addEventListener('input', function () {
      var q = filter.value.trim().toLowerCase();
      if (q && !restore) { restore = groups.map(function (g) { return g.open; }); }
      var hits = 0;
      sidebarLinks.forEach(function (a) {
        var match = !q || a.textContent.toLowerCase().indexOf(q) > -1;
        a.style.display = match ? '' : 'none';
        if (match) hits++;
      });
      groups.forEach(function (g, i) {
        var visible = Array.prototype.slice.call(g.querySelectorAll('a'))
          .some(function (a) { return a.style.display !== 'none'; });
        g.style.display = visible ? '' : 'none';
        if (q) { g.open = visible; }
        else if (restore) { g.open = restore[i]; }
      });
      if (!q) { restore = null; }
      if (empty) empty.hidden = !q || hits > 0;
    });
    filter.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && filter.value) {
        filter.value = '';
        filter.dispatchEvent(new Event('input'));
      }
    });
  }

  /* ── Back to top ─────────────────────────────────────────────────── */
  var top = d.querySelector('[data-back-to-top]');
  if (top) {
    var onScroll = function () { top.dataset.visible = String(window.scrollY > 600); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    top.addEventListener('click', function () {
      var reduced = d.documentElement.getAttribute('data-motion') === 'reduced';
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
      var h1 = d.querySelector('main h1');
      if (h1) { h1.setAttribute('tabindex', '-1'); h1.focus({ preventScroll: true }); }
    });
  }

  /* ── Announcement bar ────────────────────────────────────────────── */
  var bar = d.querySelector('[data-announcement]');
  if (bar) {
    var akey = 'pw:announce:' + bar.dataset.announcement;
    var dismissed = null;
    try { dismissed = localStorage.getItem(akey); } catch (e) {}
    if (dismissed) { bar.remove(); }
    else {
      var close = bar.querySelector('[data-announcement-close]');
      if (close) close.addEventListener('click', function () {
        try { localStorage.setItem(akey, '1'); } catch (e) {}
        bar.remove();
      });
    }
  }

  /* ── Copy page as Markdown ───────────────────────────────────────── */
  var mdBtn = d.querySelector('[data-copy-markdown]');
  if (mdBtn) mdBtn.addEventListener('click', function () {
    fetch(mdBtn.dataset.copyMarkdown).then(function (r) { return r.text(); }).then(function (text) {
      return navigator.clipboard.writeText(text);
    }).then(function () {
      var label = mdBtn.querySelector('span');
      var old = label.textContent;
      label.textContent = mdBtn.dataset.copied || 'Copied';
      setTimeout(function () { label.textContent = old; }, 1600);
    }).catch(function () {});
  });

  /* ── Image lightbox ──────────────────────────────────────────────── */
  var box = d.querySelector('[data-lightbox]');
  if (box) {
    var img = box.querySelector('img'), cap = box.querySelector('figcaption'), opener = null;
    var lock = function (on) {
      if (on) {
        var gap = window.innerWidth - d.documentElement.clientWidth;
        d.body.style.overflow = 'hidden';
        if (gap > 0) { d.body.style.paddingRight = gap + 'px'; }
      } else { d.body.style.overflow = ''; d.body.style.paddingRight = ''; }
    };
    var open = function (source) {
      opener = source;
      lock(true);
      img.src = source.currentSrc || source.src;
      img.alt = source.alt || '';
      if (cap) { cap.textContent = source.alt || ''; cap.hidden = !source.alt; }
      box.dataset.open = 'true';
      box.querySelector('button').focus();
    };
    var close = function () {
      box.dataset.open = 'false';
      lock(false);
      if (opener) opener.focus();
    };
    d.querySelectorAll('.prose img, .zoomable img').forEach(function (i) {
      if (i.closest('a')) return;
      i.tabIndex = 0;
      i.style.cursor = 'zoom-in';
      i.addEventListener('click', function () { open(i); });
      i.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); } });
    });
    box.addEventListener('click', function (e) { if (e.target === box || e.target.closest('[data-lightbox-close]')) close(); });
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape' && box.dataset.open === 'true') close(); });
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
        /* The vote is recorded locally first, so the UI never depends on the
           network. Posting is best-effort and client-rate-limited: at most one
           request per page per hour, and 10 per session. A public endpoint still
           needs its own server-side limiting and abuse handling — see the
           feedbackEndpoint note in the configuration docs. */
        var url = fb.dataset.endpoint;
        if (!url) return;
        var now = Date.now(), quota = 0, lastPost = 0;
        try {
          quota = parseInt(sessionStorage.getItem('pw:fb:count') || '0', 10);
          lastPost = parseInt(localStorage.getItem(key + ':posted') || '0', 10);
        } catch (e) {}
        if (quota >= 10 || (now - lastPost) < 3600000) return;
        try {
          sessionStorage.setItem('pw:fb:count', String(quota + 1));
          localStorage.setItem(key + ':posted', String(now));
        } catch (e) {}
        var body = JSON.stringify({ path: location.pathname, value: sent, title: d.title, lang: d.documentElement.lang });
        var sendBeacon = navigator.sendBeacon && navigator.sendBeacon.bind(navigator);
        if (sendBeacon && sendBeacon(url, new Blob([body], { type: 'application/json' }))) return;
        fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body, keepalive: true }).catch(function () {});
      });
    });
    paint();
  }
})();
