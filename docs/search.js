(function () {
  'use strict';
  const input = document.getElementById('docs-query');
  const results = document.getElementById('search-results');
  const status = document.getElementById('search-status');
  const entries = window.EXPECTANCY_SEARCH || [];
  if (!input || !results || !status) return;
  const normalize = value => value.normalize('NFKD').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  function search() {
    const terms = normalize(input.value.slice(0, 120)).split(/\s+/).filter(Boolean);
    const matches = entries.map(entry => {
      const title = normalize(entry.title);
      const text = normalize(entry.text + ' ' + entry.category);
      const score = terms.every(term => title.includes(term) || text.includes(term))
        ? terms.reduce((sum, term) => sum + (title.includes(term) ? 5 : 1), 0) : -1;
      return {entry, score};
    }).filter(item => item.score >= 0).sort((a,b) => b.score - a.score);
    results.replaceChildren();
    status.textContent = terms.length ? `${matches.length} matching section${matches.length === 1 ? '' : 's'}.` : `Browse ${entries.length} sections, or type to filter.`;
    if (!matches.length) {
      const message = document.createElement('li');
      message.className = 'search-empty';
      message.textContent = 'No matching section. Try fewer words or a broader term, such as “fees”, “import” or “timing”.';
      results.append(message);
    }
    matches.forEach(({entry}) => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = entry.url;
      const category = document.createElement('span');
      category.className = 'search-category';
      category.textContent = entry.category;
      const heading = document.createElement('h2');
      heading.textContent = entry.title;
      const snippet = document.createElement('p');
      const firstMatch = terms.length ? entry.text.toLowerCase().indexOf(terms[0]) : 0;
      const start = Math.max(0, firstMatch - 55);
      snippet.textContent = (start ? '…' : '') + entry.text.slice(start, start + 210) + (entry.text.length > start + 210 ? '…' : '');
      link.append(category, heading, snippet);
      li.append(link);
      results.append(li);
    });
  }
  input.addEventListener('input', search);
  input.addEventListener('keydown', event => {
    if (event.key === 'Escape') { input.value = ''; search(); }
    if (event.key === 'ArrowDown') { event.preventDefault(); results.querySelector('a')?.focus(); }
  });
  // No URL query, request, analytics event or persistent search history.
  search();
}());
