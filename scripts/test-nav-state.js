/*
 * Regression test — TOC active-heading tracking must not touch the sidebar.
 *
 * Guards the defect where `interactions.js` declared `var links` twice in the
 * same function scope: the second (sidebar) assignment won, so the
 * IntersectionObserver callback rewrote aria-current on every sidebar link and
 * dropped the `page` marker on the current document.
 *
 * Run on a docs page that has both a sidebar and a table of contents:
 *
 *   <script src="/scripts/test-nav-state.js"></script>
 *
 * or paste into the console. Reports to the console and returns the results.
 */
(function () {
  var results = [];
  function check(name, pass, detail) {
    results.push({ name: name, pass: !!pass, detail: detail || '' });
  }
  function sidebarCurrent() {
    return document.querySelectorAll('.sidebar a[aria-current="page"]');
  }
  function tocCurrent() {
    return document.querySelectorAll('.toc a[aria-current="true"]');
  }
  function stale() {
    return document.querySelectorAll('[aria-current="false"]');
  }

  var sidebar = document.querySelector('.sidebar');
  var toc = document.querySelector('.toc');
  if (!sidebar || !toc) {
    console.warn('[nav-state] needs a page with both .sidebar and .toc — skipped');
    return results;
  }

  /* 1. Initial load ------------------------------------------------------ */
  check('initial: exactly one sidebar a[aria-current="page"]',
    sidebarCurrent().length === 1, sidebarCurrent().length + ' found');
  check('initial: at most one toc a[aria-current="true"]',
    tocCurrent().length <= 1, tocCurrent().length + ' found');
  check('initial: no aria-current="false" left on any link',
    stale().length === 0, stale().length + ' found');

  /* 2. Anchor click ------------------------------------------------------ */
  var firstTocLink = toc.querySelector('a[href^="#"]');
  var sidebarHrefBefore = sidebarCurrent()[0] && sidebarCurrent()[0].getAttribute('href');
  if (firstTocLink) {
    firstTocLink.click();
  }

  /* 3. Scroll ------------------------------------------------------------ */
  var filter = document.querySelector('[data-sidebar-filter]');
  if (filter) {
    /* Filtering must not disturb either current marker. */
    filter.value = 'a';
    filter.dispatchEvent(new Event('input'));
  }
  window.scrollTo(0, document.body.scrollHeight / 2);

  /* The observer fires asynchronously; assert after a frame pair. */
  return new Promise(function (resolve) {
    setTimeout(function () {
      check('after click + scroll: still exactly one sidebar a[aria-current="page"]',
        sidebarCurrent().length === 1, sidebarCurrent().length + ' found');
      check('after click + scroll: sidebar current is unchanged',
        sidebarCurrent()[0] && sidebarCurrent()[0].getAttribute('href') === sidebarHrefBefore,
        'was ' + sidebarHrefBefore);
      check('after scroll: exactly one toc a[aria-current="true"]',
        tocCurrent().length === 1, tocCurrent().length + ' found');
      check('after scroll: the active toc link is inside .toc',
        !tocCurrent()[0] || toc.contains(tocCurrent()[0]));
      check('after scroll: no aria-current="false" left on any link',
        stale().length === 0, stale().length + ' found');
      check('sidebar filter did not receive a toc-shaped marker',
        sidebar.querySelectorAll('a[aria-current="true"]').length === 0,
        sidebar.querySelectorAll('a[aria-current="true"]').length + ' found');

      if (filter) { filter.value = ''; filter.dispatchEvent(new Event('input')); }

      var failed = results.filter(function (r) { return !r.pass; });
      console.table(results);
      console.log(failed.length ? '[nav-state] ' + failed.length + ' FAILED' : '[nav-state] ALL CLEAR');
      resolve(results);
    }, 400);
  });
})();
