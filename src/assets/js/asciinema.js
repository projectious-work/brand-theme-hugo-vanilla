/* asciinema-player mounting and colour-mode handling.

   The player's palette is a create-time option, not a CSS variable, so following
   the page's colour mode means disposing and recreating each player. The API's
   cleanup method is feature-detected: 3.x exposes dispose() on the returned
   instance, and older builds do not — without it, recreating would leak listeners
   and stack canvases, so in that case the player is left as-is rather than
   breaking it. Every other option is preserved verbatim across a rebuild. */
(function () {
  var d = document, root = d.documentElement;
  var casts = [].slice.call(d.querySelectorAll('[data-cast]'));
  if (!casts.length || typeof AsciinemaPlayer === 'undefined') return;

  function isDark() {
    return root.getAttribute('data-theme') === 'dark'
      || (!root.getAttribute('data-theme') && matchMedia('(prefers-color-scheme: dark)').matches);
  }

  /* asciinema ships a small set of named palettes. "asciinema" is the dark house
     theme; "solarized-light" is the only bundled light one that keeps all 16 ANSI
     slots legible on a pale surface. */
  function paletteFor(dark) { return dark ? 'asciinema' : 'solarized-light'; }

  function mount(el) {
    var node = el.querySelector('[data-cast-options]');
    if (!node) return;
    var o = JSON.parse(node.textContent);
    var target = d.createElement('div');
    el.appendChild(target);

    var build = function () {
      var opts = {
        cols: o.cols, rows: o.rows,
        idleTimeLimit: o.idleTimeLimit, speed: o.speed,
        autoPlay: o.autoPlay, loop: o.loop, poster: o.poster,
        terminalFontFamily: o.terminalFontFamily,
        theme: paletteFor(isDark())
      };
      if (o.title) { opts.title = o.title; }
      return AsciinemaPlayer.create(o.src, target, opts);
    };

    var player = build();
    if (!player || typeof player.dispose !== 'function') return;

    d.addEventListener('pw:mode', function () {
      var wanted = paletteFor(isDark());
      if (target.dataset.palette === wanted) return;
      target.dataset.palette = wanted;
      try { player.dispose(); } catch (e) {}
      target.innerHTML = '';
      player = build();
    });
    target.dataset.palette = paletteFor(isDark());
  }

  casts.forEach(mount);
})();
