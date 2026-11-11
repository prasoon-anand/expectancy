# Expectancy documentation site

This directory contains the dependency-free static documentation site published
through GitHub Pages. Keeping the site beneath `docs/` allows the public
repository to publish it directly from the `main` branch without a site-build
workflow.

## Local preview

From the repository root:

```sh
python3 -m http.server 4174 --bind 127.0.0.1 --directory docs
```

Then open `http://127.0.0.1:4174/`.

## Interface checks

The overview includes a keyboard-accessible workspace tour. Left/right arrows,
Home and End select its panels. Screenshots open in a native dialog with a
fit-to-screen/actual-size control; Escape closes it and returns focus to the
original link. Without JavaScript, all tour panels and full-size image links
remain available. The document contents list collapses into a section picker
on smaller screens. Theme preferences are applied before the page is painted;
blocked browser storage does not disable the page controls.

Run `python3 -m unittest scripts/test_docs_site.py -v` from the repository root
to check contrast tokens, local assets, section anchors, metadata and privacy
constraints. Browser checks should cover both themes, keyboard operation,
section highlighting, screenshot controls, and widths from 320px to desktop.

## Worked example and search maintenance

- `start.html` is the task-oriented entry point. The homepage's three-stage
  tour uses the same fictional TST dataset, strategy and numerical result.
- `examples/` contains public, synthetic inputs and expected values. Keep the
  fills and arithmetic consistent whenever changing the tutorial.
- The screenshots are interface illustrations, not native integration-test
  evidence. Their numerical result comes from an actual engine run; the capture
  adapter remains outside the public export and outside the production entry.
- After editing documentation, run `python3 scripts/build_docs_search.py`.
  Commit the generated `search-index.js` alongside the pages. The static site
  needs no search backend or runtime build. Queries are never transmitted.
- The search page supports the slash shortcut, Escape to clear, and Arrow Down
  to enter results. Plain-text rendering prevents queries becoming HTML.
- `downloads.html` is the sole package-availability entry point. Replace a
  platform's preparation or “Planned” state only after recording the actual version,
  release date, architecture, minimum OS, asset size, direct asset link, digest
  and publisher-verification status. Do not infer signing from a checksum.

The first public preview targets Apple Silicon macOS only. The download page
features that target and separates Intel macOS, Windows and Linux as Planned.
Do not turn deferred-platform cards into download buttons or promise dates.
The minimum macOS version remains unannounced until verified by release testing.

### September 2026 interface verification

20 automated checks pass, including first-release scope, local link/anchor validation, generated-index
freshness, theme contrast tokens, package-claim boundaries and an independent
eight-bar accounting replay. Browser checks covered local search matching,
empty queries/results, HTML-like input, keyboard focus, screenshot actual-size
and Escape return, contents highlighting, and all eight pages without document
overflow at 320 CSS pixels. Light and dark themes were checked visually.

## GitHub Pages configuration

The public repository uses the following configuration:

1. Open **Settings → Pages** in `prasoon-anand/expectancy`.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select the `main` branch and `/docs` directory.
4. Save and verify every route, image, canonical social URL and HTTPS response.

The checked-in `.nojekyll` file makes the directory publishable as static files
without a Jekyll or custom Actions build.

## Website analytics configuration

The site uses a production-only Cloudflare Web Analytics loader. Add
`prasoon-anand.github.io` as a Web Analytics site in Cloudflare, copy its
32-character site token into `siteToken` in `analytics.js`, and retain the
hostname in `publishedHosts`. If the project later moves to a custom domain,
add that exact hostname before publishing the domain change.

The loader must remain inactive on localhost and when Global Privacy Control or
Do Not Track is enabled. The Cloudflare token is a public site identifier, not a
secret credential; no Cloudflare account token belongs in this repository.
Statistics are viewed in **Cloudflare → Analytics & Logs → Web Analytics →
prasoon-anand.github.io**.

## Content rules

- Describe supported behaviour, input requirements and constraints precisely.
- Keep scientific limitations adjacent to performance-related capabilities.
- Do not claim profitability, predictive validity or release qualification.
- Do not include private paths, participant information, proprietary data or
  internal planning material.
- Update platform claims only when the corresponding acceptance receipt passes.
