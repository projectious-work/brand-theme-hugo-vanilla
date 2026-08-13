(function(){
  var documents = null;
  var index = null;
  var loading = null;

  function indexUrl(){
    return document.documentElement.getAttribute('data-search-index') || '/index.json';
  }

  function encode(value){
    return ('' + (value || ''))
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .match(/[\p{L}\p{N}]+/gu) || [];
  }

  function createIndex(records){
    var searchIndex = new FlexSearch.Document({
      tokenize: 'forward',
      encode: encode,
      cache: 100,
      document: {
        id: 'id',
        store: ['title', 'url', 'section', 'description', 'content'],
        index: ['title', 'description', 'section', 'content']
      }
    });

    records.forEach(function(record, id){
      searchIndex.add({
        id: id,
        title: record.title || '',
        url: record.url,
        section: record.section || '',
        description: record.description || '',
        content: record.content || ''
      });
    });
    return searchIndex;
  }

  function load(){
    if(index) return Promise.resolve(index);
    if(loading) return loading;
    loading = fetch(indexUrl())
      .then(function(response){
        if(!response.ok) throw new Error('Search index request failed');
        return response.json();
      })
      .then(function(records){
        documents = records;
        index = createIndex(records);
        return index;
      })
      .catch(function(error){
        loading = null;
        throw error;
      });
    return loading;
  }

  function search(query){
    if(!index || !query.trim()) return [];
    var fields = index.search(query, {
      enrich: true,
      suggest: true,
      limit: 20
    });
    var ranked = new Map();
    var fieldWeight = { title: 4, description: 3, section: 2, content: 1 };

    fields.forEach(function(field){
      field.result.forEach(function(match, position){
        var id = typeof match === 'object' ? match.id : match;
        var current = ranked.get(id) || { id: id, score: 0 };
        current.score += (fieldWeight[field.field] || 1) * (20 - position);
        ranked.set(id, current);
      });
    });

    return Array.from(ranked.values())
      .sort(function(a, b){ return b.score - a.score; })
      .slice(0, 20)
      .map(function(result){ return documents[result.id]; });
  }

  function snippet(doc, query){
    var terms = encode(query), content = doc.content || doc.description || '';
    var normalized = content.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
    var idx = -1;
    terms.some(function(term){ idx = normalized.indexOf(term); return idx > -1; });
    if(idx < 0) return content.slice(0, 140);
    var start = Math.max(0, idx - 60);
    return (start > 0 ? '…' : '') + content.slice(start, start + 160) + '…';
  }

  function renderResults(container, results, query){
    container.innerHTML = '';
    if(!results.length){
      container.innerHTML = '<div class="search-modal__empty">' +
        (container.dataset.emptyText || 'No results') + '</div>';
      return;
    }
    results.forEach(function(doc, position){
      var anchor = document.createElement('a');
      anchor.href = doc.url;
      anchor.className = 'search-modal__result' + (position === 0 ? ' is-active' : '');
      anchor.innerHTML = '<div class="search-modal__result-title"></div>' +
        '<div class="search-modal__result-section"></div>' +
        '<div class="search-modal__result-snippet"></div>';
      anchor.querySelector('.search-modal__result-title').textContent = doc.title;
      anchor.querySelector('.search-modal__result-section').textContent = doc.section || '';
      anchor.querySelector('.search-modal__result-snippet').textContent = snippet(doc, query);
      container.appendChild(anchor);
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
    var querySequence = 0;

    function isOpen(){ return modal.classList.contains('is-open'); }
    function open(){
      if(isOpen()) return;
      lastFocused = document.activeElement;
      modal.hidden = false;
      modal.classList.add('is-open');
      load().then(function(){ input.focus(); }).catch(function(){
        results.innerHTML = '<div class="search-modal__empty">Search is unavailable</div>';
      });
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

    openers.forEach(function(opener){ opener.addEventListener('click', open); });
    closers.forEach(function(closer){ closer.addEventListener('click', close); });
    modal.addEventListener('click', function(event){ if(event.target === modal) close(); });
    modal.addEventListener('keydown', function(event){
      if(event.key !== 'Tab') return;
      var focusable = modal.querySelectorAll('input, button, a[href]');
      if(!focusable.length) return;
      var first = focusable[0], last = focusable[focusable.length - 1];
      if(event.shiftKey && document.activeElement === first){ event.preventDefault(); last.focus(); }
      else if(!event.shiftKey && document.activeElement === last){ event.preventDefault(); first.focus(); }
    });
    document.addEventListener('keydown', function(event){
      var tag = document.activeElement && document.activeElement.tagName;
      if((event.key === 'k' && (event.metaKey || event.ctrlKey)) ||
          (event.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA')){
        event.preventDefault(); open();
      } else if(event.key === 'Escape') close();
    });
    input.addEventListener('input', function(){
      var sequence = ++querySequence;
      var query = input.value;
      load().then(function(){
        if(sequence === querySequence) renderResults(results, search(query), query);
      });
    });
    input.addEventListener('keydown', function(event){
      var active = results.querySelector('.is-active');
      if(event.key === 'ArrowDown'){
        event.preventDefault();
        var next = active && active.nextElementSibling;
        if(next){ active.classList.remove('is-active'); next.classList.add('is-active'); next.scrollIntoView({ block: 'nearest' }); }
      } else if(event.key === 'ArrowUp'){
        event.preventDefault();
        var previous = active && active.previousElementSibling;
        if(previous){ active.classList.remove('is-active'); previous.classList.add('is-active'); previous.scrollIntoView({ block: 'nearest' }); }
      } else if(event.key === 'Enter' && active){
        window.location.href = active.getAttribute('href');
      }
    });
  });
})();
