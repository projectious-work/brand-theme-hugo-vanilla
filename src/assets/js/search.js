(function(){
  var data = null, loading = null;
  function indexUrl(){ return document.documentElement.getAttribute('data-search-index') || '/index.json'; }
  function load(){
    if(data) return Promise.resolve(data);
    if(loading) return loading;
    loading = fetch(indexUrl()).then(function(r){ return r.json(); }).then(function(json){ data = json; return data; });
    return loading;
  }
  function normalize(str){
    return (str || '').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
  }
  function tokenize(str){ return normalize(str).match(/[a-z0-9]+/g) || []; }
  function score(doc, terms){
    var titleTokens = tokenize(doc.title);
    var summaryTokens = tokenize((doc.description || '') + ' ' + (doc.section || '') + ' ' + (doc.tags || []).join(' '));
    var bodyTokens = tokenize(doc.content), s = 0;
    terms.forEach(function(t){
      titleTokens.forEach(function(tt){ if(tt === t) s += 8; else if(tt.indexOf(t) === 0) s += 4; });
      summaryTokens.forEach(function(st){ if(st === t) s += 5; else if(st.indexOf(t) === 0) s += 3; });
      bodyTokens.forEach(function(bt){ if(bt === t) s += 2; else if(bt.indexOf(t) === 0) s += 1; });
    });
    return s;
  }
  function search(query){
    var terms = tokenize(query);
    if(!terms.length) return [];
    return data.map(function(doc){ return { doc: doc, score: score(doc, terms) }; })
      .filter(function(r){ return r.score > 0; })
      .sort(function(a, b){ return b.score - a.score; })
      .slice(0, 20)
      .map(function(r){ return r.doc; });
  }
  function snippet(doc, query){
    var terms = tokenize(query), content = doc.content || '', lower = normalize(content), idx = -1;
    terms.some(function(t){ idx = lower.indexOf(t); return idx > -1; });
    if(idx < 0) return content.slice(0, 140);
    var start = Math.max(0, idx - 60);
    return (start > 0 ? '…' : '') + content.slice(start, start + 160) + '…';
  }
  function renderResults(container, results, query){
    container.innerHTML = '';
    if(!results.length){
      container.innerHTML = '<div class="search-modal__empty">' + (container.dataset.emptyText || 'No results') + '</div>';
      return;
    }
    results.forEach(function(doc, i){
      var a = document.createElement('a');
      a.href = doc.url;
      a.className = 'search-modal__result' + (i === 0 ? ' is-active' : '');
      a.innerHTML = '<div class="search-modal__result-title"></div><div class="search-modal__result-section"></div><div class="search-modal__result-snippet"></div>';
      a.querySelector('.search-modal__result-title').textContent = doc.title;
      a.querySelector('.search-modal__result-section').textContent = doc.section || '';
      a.querySelector('.search-modal__result-snippet').textContent = snippet(doc, query);
      container.appendChild(a);
    });
  }
  document.addEventListener('DOMContentLoaded', function(){
    var modal = document.querySelector('[data-search-modal]');
    var input = document.querySelector('[data-search-input]');
    var results = document.querySelector('[data-search-results]');
    var openers = document.querySelectorAll('[data-search-open]');
    var closers = document.querySelectorAll('[data-search-close]');
    if(!modal || !input || !results) return;
    var lastFocused = null;
    function isOpen(){ return modal.classList.contains('is-open'); }
    /* Focus moves deliberately on open and close: into the field, then back
       to whatever opened the dialog. */
    function open(){
      if(isOpen()) return;
      lastFocused = document.activeElement;
      modal.hidden = false;
      modal.classList.add('is-open');
      load().then(function(){ input.focus(); });
    }
    function close(){
      if(!isOpen()) return;
      modal.classList.remove('is-open');
      modal.hidden = true;
      input.value = '';
      results.innerHTML = '';
      if(lastFocused && lastFocused.focus) lastFocused.focus();
      lastFocused = null;
    }
    openers.forEach(function(o){ o.addEventListener('click', open); });
    closers.forEach(function(c){ c.addEventListener('click', close); });
    modal.addEventListener('click', function(e){ if(e.target === modal) close(); });
    /* Tab stays inside the dialog while it is open. */
    modal.addEventListener('keydown', function(e){
      if(e.key !== 'Tab') return;
      var focusable = modal.querySelectorAll('input, button, a[href]');
      if(!focusable.length) return;
      var first = focusable[0], last = focusable[focusable.length - 1];
      if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
      else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
    });
    document.addEventListener('keydown', function(e){
      var tag = document.activeElement && document.activeElement.tagName;
      if((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA')){
        e.preventDefault(); open();
      } else if(e.key === 'Escape'){ close(); }
    });
    input.addEventListener('input', function(){
      load().then(function(){ renderResults(results, search(input.value), input.value); });
    });
    input.addEventListener('keydown', function(e){
      var active = results.querySelector('.is-active');
      if(e.key === 'ArrowDown'){
        e.preventDefault();
        var next = active && active.nextElementSibling;
        if(next){ active.classList.remove('is-active'); next.classList.add('is-active'); next.scrollIntoView({ block: 'nearest' }); }
      } else if(e.key === 'ArrowUp'){
        e.preventDefault();
        var prev = active && active.previousElementSibling;
        if(prev){ active.classList.remove('is-active'); prev.classList.add('is-active'); prev.scrollIntoView({ block: 'nearest' }); }
      } else if(e.key === 'Enter'){
        if(active) window.location.href = active.getAttribute('href');
      }
    });
  });
})();
