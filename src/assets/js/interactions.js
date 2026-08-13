document.addEventListener('DOMContentLoaded', function(){
  var navToggle = document.querySelector('[data-nav-toggle]');
  var nav = document.querySelector('[data-nav]');
  if(navToggle && nav){
    navToggle.addEventListener('click', function(){
      nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', nav.classList.contains('is-open'));
    });
  }

  var links = document.querySelectorAll('.toc a');
  if(links.length && 'IntersectionObserver' in window){
    var map = {};
    links.forEach(function(l){
      var id = l.getAttribute('href').slice(1);
      var el = document.getElementById(id);
      if(el) map[id] = l;
    });
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        var link = map[entry.target.id];
        if(!link || !entry.isIntersecting) return;
        links.forEach(function(l){ l.classList.remove('is-active'); });
        link.classList.add('is-active');
      });
    }, { rootMargin: '0px 0px -70% 0px' });
    Object.keys(map).forEach(function(id){ observer.observe(document.getElementById(id)); });
  }
});

document.addEventListener('click', function(e){
  var copyBtn = e.target.closest('.code-block__copy');
  if(copyBtn){
    var block = copyBtn.closest('.code-block');
    var code = block && block.querySelector('pre code');
    if(code){
      navigator.clipboard.writeText(code.innerText).then(function(){
        copyBtn.classList.add('is-copied');
        setTimeout(function(){ copyBtn.classList.remove('is-copied'); }, 1500);
      });
    }
    return;
  }
  var link = e.target.closest('[data-copy-link]');
  if(link){
    e.preventDefault();
    var url = location.origin + link.getAttribute('href');
    navigator.clipboard.writeText(url);
    history.replaceState(null, '', link.getAttribute('href'));
    link.classList.add('is-copied');
    setTimeout(function(){ link.classList.remove('is-copied'); }, 1200);
  }
});
