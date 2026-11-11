// Apply the saved preference before styles paint. Storage is optional.
(function () {
  let stored;
  try { stored = localStorage.getItem('expectancy-site-theme'); } catch { /* Private browsing can deny storage. */ }
  const preferred = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  document.documentElement.dataset.theme = stored === 'light' || stored === 'dark' ? stored : preferred;
}());
