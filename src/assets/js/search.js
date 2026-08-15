/* Full-text search over /index.json using FlexSearch (Apache-2.0, vendored).
   One index serves the header box (Cmd/Ctrl+K or "/") and the /search page.

   Two index tiers: one record per page, plus one per H2/H3 heading so a hit can
   land on the right anchor rather than the top of a long page. Section filters
   on the /search page narrow by top-level section without re-querying.
   Falls back to substring matching if the FlexSearch bundle is absent. */
(function () {
  var d = document, box = d.querySelector('[data-search]');

  /* Keystrokes are debounced — on a large index every character would otherwise
     re-run the full query on the main thread. */
  function debounce(fn, ms) {
    var t = null;
    return function () {
      var args = arguments, self = this;
      clearTimeout(t);
      t = setTimeout(function () { fn.apply(self, args); }, ms == null ? 120 : ms);
    };
  }
  var indexURL = d.documentElement.dataset.searchIndex || '/index.json';
  var docs = null, idx = null, loading = null;

  function flatten(data) {
    /* Expand each page's headings into their own searchable records. */
    var out = [];
    data.forEach(function (p) {
      out.push({ id: out.length, title: p.title, href: p.href, crumb: p.crumb,
                 section: p.section, description: p.description,
                 content: p.content, kind: 'page' });
      (p.headings || []).forEach(function (h) {
        out.push({ id: out.length, title: h.title, href: p.href + '#' + h.id,
                   crumb: p.title, section: p.section, description: '',
                   content: h.text || '', kind: 'heading' });
      });
    });
    return out;
  }

  function load() {
    if (loading) return loading;
    loading = fetch(indexURL).then(function (r) { return r.json(); }).then(function (data) {
      docs = flatten(data);
      if (window.FlexSearch) {
        idx = new FlexSearch.Document({
          tokenize: 'forward',
          document: { id: 'id', index: [{ field: 'title', weight: 4 }, { field: 'description' }, { field: 'content' }], store: false }
        });
        docs.forEach(function (doc) { idx.add(doc); });
      }
      return docs;
    });
    return loading;
  }

  function query(q, limit, section) {
    if (!q) return [];
    var out;
    if (idx) {
      var seen = {};
      out = [];
      idx.search(q, { limit: (limit || 12) * 3, enrich: false }).forEach(function (field) {
        field.result.forEach(function (id) { if (!seen[id]) { seen[id] = 1; out.push(docs[id]); } });
      });
    } else {
      var needle = q.toLowerCase();
      out = docs.filter(function (doc) {
        return (doc.title + ' ' + doc.description + ' ' + doc.content).toLowerCase().indexOf(needle) > -1;
      });
    }
    if (section) out = out.filter(function (r) { return r.section === section; });
    /* A page beats its own headings; headings still surface on their own. */
    out.sort(function (a, b) { return (a.kind === 'page' ? 0 : 1) - (b.kind === 'page' ? 0 : 1); });
    return out.slice(0, limit || 12);
  }

  function excerpt(doc, q) {
    var text = doc.content || doc.description || '';
    var i = text.toLowerCase().indexOf(q.toLowerCase());
    var start = Math.max(0, i - 45);
    var slice = text.slice(start, start + 170);
    return (start > 0 ? '…' : '') + slice + (text.length > start + 170 ? '…' : '');
  }

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]; }); }
  function highlight(text, q) {
    var terms = q.split(/\s+/).filter(Boolean).map(function (t) { return t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); });
    var out = esc(text);
    terms.forEach(function (t) { out = out.replace(new RegExp('(' + t + ')', 'gi'), '<mark>$1</mark>'); });
    return out;
  }

  function render(container, results, q, empty) {
    if (!results.length) { container.innerHTML = '<div class="results__empty">' + empty + '</div>'; return; }
    container.innerHTML = results.map(function (r) {
      return '<a href="' + r.href + '">' +
        (r.crumb ? '<div class="r-crumb">' + esc(r.crumb) +
          (r.kind === 'heading' ? ' <span class="r-kind">#</span>' : '') + '</div>' : '') +
        '<div class="r-title">' + highlight(r.title, q) + '</div>' +
        '<div class="r-excerpt">' + highlight(excerpt(r, q), q) + '</div></a>';
    }).join('');
  }

  /* ── Header box ───────────────────────────────────────────────────── */
  if (box) {
    var input = box.querySelector('input'), results = box.querySelector('.results');
    var empty = box.dataset.empty || 'No results';
    var run = function () {
      var q = input.value.trim();
      if (!q) { results.dataset.open = 'false'; return; }
      load().then(function () { render(results, query(q), q); results.dataset.open = 'true'; });
    };
    input.addEventListener('focus', load);
    input.addEventListener('input', debounce(function () {
      var q = input.value.trim();
      if (!q) { results.dataset.open = 'false'; return; }
      load().then(function () { render(results, query(q), q, empty); results.dataset.open = 'true'; });
    }, 120));
    input.addEventListener('keydown', function (e) {
      var items = Array.prototype.slice.call(results.querySelectorAll('a'));
      var active = items.findIndex(function (a) { return a.dataset.active === 'true'; });
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        var n = e.key === 'ArrowDown' ? Math.min(items.length - 1, active + 1) : Math.max(0, active - 1);
        items.forEach(function (a, i) { a.dataset.active = String(i === n); });
      } else if (e.key === 'Enter' && active > -1) { location.href = items[active].href; }
      else if (e.key === 'Escape') { results.dataset.open = 'false'; input.blur(); }
    });
    d.addEventListener('click', function (e) { if (!box.contains(e.target)) results.dataset.open = 'false'; });
    d.addEventListener('keydown', function (e) {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !/input|textarea/i.test(d.activeElement.tagName))) {
        e.preventDefault(); input.focus(); input.select();
      }
    });
  }

  /* ── /search page ─────────────────────────────────────────────────── */
  var page = d.querySelector('[data-search-page]');
  if (page) {
    var pInput = page.querySelector('input'), pResults = page.querySelector('.results');
    var pEmpty = page.dataset.empty || 'No results';
    var count = page.querySelector('[data-search-count]');
    var chips = Array.prototype.slice.call(page.querySelectorAll('[data-section-filter]'));
    var section = '';
    pResults.dataset.open = 'true';

    var runPage = function () {
      var q = pInput.value.trim();
      history.replaceState(null, '', q ? '?q=' + encodeURIComponent(q) + (section ? '&section=' + section : '') : location.pathname);
      load().then(function () {
        var hits = query(q, 60, section);
        render(pResults, hits, q, pEmpty);
        if (count) count.textContent = q ? hits.length + ' ' + (count.dataset.label || 'results') : '';
        chips.forEach(function (c) {
          var s = c.dataset.sectionFilter;
          c.setAttribute('aria-pressed', String(s === section));
          if (q) {
            var n = query(q, 999, s).length;
            var badge = c.querySelector('[data-count]');
            if (badge) badge.textContent = n;
          }
        });
      });
    };

    chips.forEach(function (c) {
      c.addEventListener('click', function () {
        section = c.dataset.sectionFilter === section ? '' : c.dataset.sectionFilter;
        runPage();
      });
    });

    var params = new URLSearchParams(location.search);
    section = params.get('section') || '';
    var q0 = params.get('q') || '';
    if (q0) { pInput.value = q0; }
    if (q0 || section) runPage();
    pInput.addEventListener('input', debounce(runPage, 140));
  }
})();
