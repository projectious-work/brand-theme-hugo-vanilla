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
  document.addEventListener('DOMContentLoaded', function(){
    var btn = document.querySelector('[data-theme-toggle]');
    if(!btn) return;
    btn.addEventListener('click', function(){
      var next = isDark() ? 'light' : 'dark';
      localStorage.setItem(STORAGE_KEY, next);
      apply(next);
      updateGiscus(next);
    });
  });
})();
