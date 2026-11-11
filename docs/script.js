(function () {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const preference = window.matchMedia('(prefers-color-scheme: light)');
  let explicitTheme = null;
  try { explicitTheme = localStorage.getItem('expectancy-site-theme'); } catch { /* Preferences remain usable without storage. */ }

  function applyTheme(theme) {
    root.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#101715' : '#fafbf9');
    if (!toggle) return;
    const next = theme === 'dark' ? 'light' : 'dark';
    toggle.setAttribute('aria-label', `Use ${next} theme`);
    toggle.setAttribute('title', `Use ${next} theme`);
    toggle.setAttribute('aria-pressed', String(theme === 'light'));
    toggle.innerHTML = theme === 'dark'
      ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v2m0 14v2M3 12h2m14 0h2M5.64 5.64l1.42 1.42m9.88 9.88 1.42 1.42m0-12.72-1.42 1.42M7.06 16.94l-1.42 1.42"/><circle cx="12" cy="12" r="4"/></svg>'
      : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.3 14.1A8.5 8.5 0 0 1 9.9 3.7a8.5 8.5 0 1 0 10.4 10.4Z"/></svg>';
  }
  applyTheme(root.dataset.theme);
  // Documentation shortcut is ignored while typing or when a modal is open.
  document.addEventListener('keydown', event => {
    const target = event.target;
    if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey || document.querySelector('dialog[open]') || target?.matches('input, textarea, select') || target?.isContentEditable) return;
    event.preventDefault();
    const query = document.getElementById('docs-query');
    if (query) query.focus();
    else document.querySelector('.search-link')?.click();
  });
  toggle?.addEventListener('click', function () {
    explicitTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('expectancy-site-theme', explicitTheme); } catch { /* Keep the current-page preference. */ }
    applyTheme(explicitTheme);
  });
  preference.addEventListener('change', () => {
    if (explicitTheme !== 'light' && explicitTheme !== 'dark') applyTheme(preference.matches ? 'light' : 'dark');
  });

  // A small keyboard-operable tour; every panel remains readable without JavaScript.
  const tablist = document.querySelector('.workspace-tabs');
  const tabs = Array.from(tablist?.querySelectorAll('[role="tab"]') || []);
  function selectTab(selected, focus = false) {
    tabs.forEach((tab) => {
      const active = tab === selected;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      document.getElementById(tab.getAttribute('aria-controls')).hidden = !active;
    });
    if (focus) selected.focus();
  }
  if (tabs.length) {
    tablist.hidden = false;
    selectTab(tabs[0]);
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => selectTab(tab));
      tab.addEventListener('keydown', (event) => {
        let next;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        if (next === undefined) return;
        event.preventDefault();
        selectTab(tabs[next], true);
      });
    });
  }

  const header = document.querySelector('.site-header');
  const toc = document.querySelector('.toc');
  const tocLinks = Array.from(document.querySelectorAll('.toc a[href^="#"]'));
  const sections = tocLinks.map((link) => document.getElementById(link.hash.slice(1))).filter(Boolean);
  const mobileToc = document.createElement('button');
  mobileToc.type = 'button';
  mobileToc.className = 'toc-mobile-toggle';
  mobileToc.setAttribute('aria-expanded', 'false');
  mobileToc.setAttribute('aria-label', 'Show page sections');
  mobileToc.textContent = 'On this page +';
  if (toc) {
    toc.prepend(mobileToc);
    toc.classList.add('is-enhanced');
    mobileToc.addEventListener('click', () => {
      const open = toc.classList.toggle('is-open');
      mobileToc.setAttribute('aria-expanded', String(open));
      mobileToc.setAttribute('aria-label', open ? 'Hide page sections' : 'Show page sections');
      requestPageStateUpdate();
    });
    toc.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && toc.classList.contains('is-open')) {
        closeToc();
        mobileToc.focus();
      }
    });
  }
  function closeToc() {
    toc?.classList.remove('is-open');
    mobileToc.setAttribute('aria-expanded', 'false');
    mobileToc.setAttribute('aria-label', 'Show page sections');
    requestPageStateUpdate();
  }
  let frameRequested = false;
  function setActiveSection(id) {
    tocLinks.forEach((link) => {
      const active = link.hash === `#${id}`;
      link.classList.toggle('is-active', active);
      if (active) {
        link.setAttribute('aria-current', 'location');
        mobileToc.textContent = `On this page · ${link.textContent} ${toc.classList.contains('is-open') ? '−' : '+'}`;
      } else link.removeAttribute('aria-current');
    });
  }
  function updatePageState() {
    frameRequested = false;
    header?.classList.toggle('is-scrolled', window.scrollY > 10);
    if (!sections.length) return;
    const headerBottom = header?.getBoundingClientRect().bottom || 0;
    const mobile = window.matchMedia('(max-width: 860px)').matches;
    const activationLine = headerBottom + (mobile ? 105 : 65);
    let active = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= activationLine) active = section;
      else break;
    }
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) active = sections[sections.length - 1];
    setActiveSection(active.id);
  }
  function requestPageStateUpdate() {
    if (frameRequested) return;
    frameRequested = true;
    window.requestAnimationFrame(updatePageState);
  }
  tocLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const mobile = window.matchMedia('(max-width: 860px)').matches;
      closeToc();
      setActiveSection(link.hash.slice(1));
      if (mobile) mobileToc.focus({ preventScroll: true });
    });
  });
  window.addEventListener('scroll', requestPageStateUpdate, { passive: true });
  window.addEventListener('resize', requestPageStateUpdate);
  window.addEventListener('hashchange', requestPageStateUpdate);
  window.addEventListener('load', requestPageStateUpdate);
  updatePageState();

  // Existing full-size image links remain the no-JavaScript fallback.
  if (typeof HTMLDialogElement === 'undefined' || !HTMLDialogElement.prototype.showModal) return;
  document.querySelectorAll('.inline-figure').forEach((figure) => {
    const image = figure.querySelector('img');
    const original = figure.querySelector('figcaption a');
    if (!image || !original) return;
    const link = document.createElement('a');
    link.className = 'screenshot-link';
    link.href = original.href;
    link.target = '_blank';
    link.rel = 'noopener';
    link.dataset.lightbox = '';
    link.setAttribute('aria-label', `Enlarge screenshot: ${figure.querySelector('figcaption strong').textContent}`);
    image.before(link);
    link.append(image);
    original.dataset.lightbox = '';
    image.loading = 'lazy';
  });
  const imageLinks = document.querySelectorAll('[data-lightbox]');
  if (!imageLinks.length) return;
  const dialog = document.createElement('dialog');
  dialog.className = 'image-dialog';
  dialog.setAttribute('aria-labelledby', 'image-dialog-title');
  dialog.setAttribute('aria-describedby', 'image-dialog-caption');
  dialog.innerHTML = '<div class="image-dialog-bar"><h2 id="image-dialog-title">Workspace screenshot</h2><button type="button" class="image-dialog-size" aria-pressed="false">Actual size</button><button type="button" class="image-dialog-close" aria-label="Close screenshot" autofocus>×</button></div><div class="image-dialog-viewport"><img alt=""></div><p id="image-dialog-caption" class="image-dialog-caption"></p>';
  document.body.append(dialog);
  const viewerImage = dialog.querySelector('img');
  const sizeButton = dialog.querySelector('.image-dialog-size');
  let opener;
  imageLinks.forEach((link) => link.addEventListener('click', (event) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const figure = link.closest('figure');
    const original = figure?.querySelector('img');
    if (!original) return;
    event.preventDefault();
    opener = link;
    viewerImage.src = original.src;
    viewerImage.alt = original.alt;
    dialog.querySelector('h2').textContent = figure.querySelector('figcaption strong')?.textContent || 'Inside Expectancy';
    dialog.querySelector('.image-dialog-caption').textContent = original.alt;
    dialog.classList.remove('is-actual-size');
    sizeButton.textContent = 'Actual size';
    sizeButton.setAttribute('aria-pressed', 'false');
    document.body.classList.add('has-lightbox');
    dialog.showModal();
    dialog.querySelector('.image-dialog-viewport').scrollTo(0, 0);
  }));
  sizeButton.addEventListener('click', () => {
    const actual = dialog.classList.toggle('is-actual-size');
    sizeButton.textContent = actual ? 'Fit to screen' : 'Actual size';
    sizeButton.setAttribute('aria-pressed', String(actual));
  });
  dialog.querySelector('.image-dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('has-lightbox');
    opener?.focus({ preventScroll: true });
  });
}());
