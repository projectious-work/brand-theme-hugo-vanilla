/* Full-text search over /index.json using FlexSearch (Apache-2.0, vendored).
   Header box, Cmd/Ctrl+K, "/" shortcut, and the /search page all run through
   the same index. Falls back to substring matching if the bundle is absent. */
(function () {
  var d = document, box = d.querySelector('[data-search]');
  var indexURL = (d.documentElement.dataset.searchIndex || '/index.json');
  var docs = null, idx = null, loading = null;

  function load() {
    if (loading) return loading;
    loading = fetch(indexURL).then(function (r) { return r.json(); }).then(function (data) {
      docs = data;
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

  function query(q, limit) {
    if (!q) return [];
    if (idx) {
      var seen = {}, out = [];
      idx.search(q, { limit: limit || 12, enrich: false }).forEach(function (field) {
        field.result.forEach(function (id) { if (!seen[id]) { seen[id] = 1; out.push(docs[id]); } });
      });
      return out.slice(0, limit || 12);
    }
    var needle = q.toLowerCase();
    return docs.filter(function (doc) {
      return (doc.title + ' ' + doc.description + ' ' + doc.content).toLowerCase().indexOf(needle) > -1;
    }).slice(0, limit || 12);
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
        (r.crumb ? '<div class="r-crumb">' + esc(r.crumb) + '</div>' : '') +
        '<div class="r-title">' + highlight(r.title, q) + '</div>' +
        '<div class="r-excerpt">' + highlight(excerpt(r, q), q) + '</div></a>';
    }).join('');
  }

  /* Header search box */
  if (box) {
    var input = box.querySelector('input'), results = box.querySelector('.results');
    var empty = box.dataset.empty || 'No results';
    var run = function () {
      var q = input.value.trim();
      if (!q) { results.dataset.open = 'false'; return; }
      load().then(function () { render(results, query(q), q, empty); results.dataset.open = 'true'; });
    };
    input.addEventListener('focus', load);
    input.addEventListener('input', run);
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

  /* /search page */
  var page = d.querySelector('[data-search-page]');
  if (page) {
    var pInput = page.querySelector('input'), pResults = page.querySelector('.results');
    var pEmpty = page.dataset.empty || 'No results';
    pResults.dataset.open = 'true';
    var q0 = new URLSearchParams(location.search).get('q') || '';
    var runPage = function (q) {
      load().then(function () {
        render(pResults, query(q, 40), q, pEmpty);
        var c = page.querySelector('[data-search-count]');
        if (c) c.textContent = q ? query(q, 40).length + ' ' + (c.dataset.label || 'results') : '';
      });
    };
    if (q0) { pInput.value = q0; runPage(q0); }
    pInput.addEventListener('input', function () {
      var q = pInput.value.trim();
      history.replaceState(null, '', q ? '?q=' + encodeURIComponent(q) : location.pathname);
      runPage(q);
    });
  }
})();
