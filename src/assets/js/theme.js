(function(){
  var STORAGE_KEY = 'theme';
  function apply(theme){
    if(theme === 'light' || theme === 'dark'){ document.documentElement.setAttribute('data-theme', theme); }
    else { document.documentElement.removeAttribute('data-theme'); }
  }
  function isDark(){
    var attr = document.documentElement.getAttribute('data-theme');
    if(attr) return attr === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  function updateGiscus(theme){
    var frame = document.querySelector('iframe.giscus-frame');
    if(!frame) return;
    frame.contentWindow.postMessage({ giscus: { setConfig: { theme: theme } } }, 'https://giscus.app');
  }
  /* giscus renders with preferred_color_scheme; if the page pins a mode,
     tell the frame about it once it exists. */
  window.addEventListener('message', function(e){
    if(e.origin !== 'https://giscus.app' || !e.data || !e.data.giscus) return;
    if(document.documentElement.getAttribute('data-theme')) updateGiscus(isDark() ? 'dark' : 'light');
  });
  document.addEventListener('DOMContentLoaded', function(){
    var btn = document.querySelector('[data-theme-toggle]');
    if(!btn) return;
    btn.setAttribute('aria-pressed', String(isDark()));
    btn.addEventListener('click', function(){
      var next = isDark() ? 'light' : 'dark';
      try { localStorage.setItem(STORAGE_KEY, next); } catch(e) {}
      apply(next);
      btn.setAttribute('aria-pressed', String(next === 'dark'));
      updateGiscus(next);
    });
  });
})();
