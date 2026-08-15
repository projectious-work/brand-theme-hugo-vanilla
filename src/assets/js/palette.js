/* Command palette and keyboard shortcuts.

   Ctrl/Cmd K opens the palette; "?" opens it on the shortcut list; "/" still
   focuses the header search box. Two-key "g" sequences jump between sections.
   The palette reuses the search index that search.js already fetches, so it
   costs no extra payload — if search is disabled it degrades to shortcuts and
   the jump/action rows only. */
(function () {
  var d = document, root = d.documentElement;
  var pal = d.querySelector('[data-palette]');
  if (!pal) return;

  var input = pal.querySelector('[data-palette-input]');
  var list = pal.querySelector('[data-palette-results]');
  var help = pal.querySelector('[data-palette-shortcuts]');
  var helpBtn = pal.querySelector('[data-palette-help]');
  var lastFocus = null, docs = null, loading = null;
  var indexURL = root.dataset.searchIndex || '/index.json';
  var actions = JSON.parse(pal.dataset.paletteActions || '[]');

  function loadIndex() {
    if (loading) return loading;
    loading = fetch(indexURL).then(function (r) { return r.json(); }).then(function (data) {
      docs = [];
      data.forEach(function (p) {
        docs.push({ title: p.title, href: p.href, crumb: p.crumb, kind: 'page',
                    text: (p.title + ' ' + (p.description || '') + ' ' + (p.content || '')).toLowerCase() });
        (p.headings || []).forEach(function (h) {
          docs.push({ title: h.title, href: p.href + '#' + h.id, crumb: p.title, kind: 'heading',
                      text: (p.title + ' ' + h.title).toLowerCase() });
        });
      });
      return docs;
    }).catch(function () { docs = []; return docs; });
    return loading;
  }

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]; }); }
  function mark(text, q) {
    if (!q) return esc(text);
    var safe = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return esc(text).replace(new RegExp('(' + safe + ')', 'gi'), '<mark>$1</mark>');
  }

  function row(item, q) {
    return '<a href="' + item.href + '" role="option">' +
      (item.crumb ? '<div class="r-crumb">' + esc(item.crumb) +
        (item.kind === 'heading' ? ' <span class="r-kind">#</span>' : '') + '</div>' : '') +
      '<div class="r-title">' + mark(item.title, q) + '</div></a>';
  }

  function render(q) {
    var hits = [];
    var lower = q.toLowerCase();
    actions.forEach(function (a) {
      if (!q || a.label.toLowerCase().indexOf(lower) > -1) {
        hits.push({ title: a.label, href: a.href, crumb: a.group, kind: 'action' });
      }
    });
    if (docs && q) {
      docs.filter(function (doc) { return doc.text.indexOf(lower) > -1; })
        .sort(function (a, b) { return (a.kind === 'page' ? 0 : 1) - (b.kind === 'page' ? 0 : 1); })
        .slice(0, 12).forEach(function (doc) { hits.push(doc); });
    }
    if (!hits.length) { list.innerHTML = '<div class="palette__empty">' + (pal.dataset.empty || 'No results') + '</div>'; return; }
    list.innerHTML = hits.map(function (h) { return row(h, q); }).join('');
    var first = list.querySelector('a');
    if (first) first.dataset.active = 'true';
  }

  /* The page behind the dialog must not scroll, and its width must not jump when
     the scrollbar disappears — hence the padding compensation. */
  function lockScroll(on) {
    if (on) {
      var gap = window.innerWidth - d.documentElement.clientWidth;
      d.body.dataset.pwScrollY = String(window.scrollY);
      d.body.style.overflow = 'hidden';
      if (gap > 0) { d.body.style.paddingRight = gap + 'px'; }
    } else {
      d.body.style.overflow = '';
      d.body.style.paddingRight = '';
      delete d.body.dataset.pwScrollY;
    }
  }

  function open(showHelp) {
    lastFocus = d.activeElement;
    pal.dataset.open = 'true';
    lockScroll(true);
    help.hidden = !showHelp;
    list.hidden = !!showHelp;
    if (!showHelp) { loadIndex().then(function () { render(input.value.trim()); }); }
    input.value = '';
    input.focus();
  }

  function close() {
    pal.dataset.open = 'false';
    lockScroll(false);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  /* Tab cycles inside the dialog while it is open (WCAG 2.1.2). */
  pal.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab' || pal.dataset.open !== 'true') return;
    var focusable = pal.querySelectorAll('input, button, a[href]');
    if (!focusable.length) return;
    var first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey && d.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && d.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  function move(step) {
    var items = Array.prototype.slice.call(list.querySelectorAll('a'));
    if (!items.length) return;
    var i = items.findIndex(function (a) { return a.dataset.active === 'true'; });
    var n = Math.max(0, Math.min(items.length - 1, (i < 0 ? 0 : i) + step));
    items.forEach(function (a, j) { a.dataset.active = String(j === n); });
    keepVisible(items[n]);
  }

  /* scrollIntoViewIfNeeded is Chromium-only and scrollIntoView is banned here
     (it can scroll the host frame), so the scroll container is nudged directly. */
  function keepVisible(el) {
    var box = el.parentNode.parentNode;
    var top = el.offsetTop, bottom = top + el.offsetHeight;
    if (top < box.scrollTop) { box.scrollTop = top; }
    else if (bottom > box.scrollTop + box.clientHeight) { box.scrollTop = bottom - box.clientHeight; }
  }

  input.addEventListener('input', function () {
    help.hidden = true; list.hidden = false;
    loadIndex().then(function () { render(input.value.trim()); });
  });

  input.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
    else if (e.key === 'Enter') {
      var active = list.querySelector('a[data-active="true"]');
      if (active) { e.preventDefault(); location.href = active.getAttribute('href'); }
    } else if (e.key === 'Escape') { close(); }
  });

  pal.addEventListener('click', function (e) { if (e.target === pal) close(); });
  if (helpBtn) helpBtn.addEventListener('click', function () {
    var showing = !help.hidden;
    help.hidden = showing; list.hidden = !showing;
  });

  /* Global keys. "g" starts a two-key jump sequence. */
  var pending = null, timer = null;
  var jumps = { h: '/', d: '/docs/', b: '/blog/' };

  d.addEventListener('keydown', function (e) {
    var typing = /input|textarea|select/i.test(d.activeElement.tagName) || d.activeElement.isContentEditable;
    if (e.key === 'Escape' && pal.dataset.open === 'true') { close(); return; }
    if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) { e.preventDefault(); open(false); return; }
    if (typing) return;
    if (e.key === '?') { e.preventDefault(); open(true); return; }
    if (e.key === 't') { if (window.pwTheme) { window.pwTheme.set(root.getAttribute('data-mode-pref') === 'light' ? 'navy' : 'light'); } return; }
    if (pending === 'g' && jumps[e.key]) {
      e.preventDefault();
      location.href = (pal.dataset.paletteBase || '') + jumps[e.key].replace(/^\//, '');
      pending = null; return;
    }
    if (e.key === 'g') { pending = 'g'; clearTimeout(timer); timer = setTimeout(function () { pending = null; }, 1200); }
  });
})();
