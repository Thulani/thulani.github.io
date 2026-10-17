# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Thulani Hlongwane's personal CV site: a static single page served by GitHub Pages from the repo root at the custom domain in `CNAME` (`www.thulanihlongwane.co.za`). It has no build step, no package manager and no dependencies. Anything committed to `master` goes live as-is.

## Commands

```bash
python3 -m http.server 8000   # preview at http://localhost:8000 (or just open index.html)
```

There are no tests, linters or CI. To check visual changes, screenshot the page at desktop (1280px) and phone (390px) widths, in both light and dark color schemes, plus print media. Playwright with the Chromium at `/opt/pw-browsers/chromium` works for this.

## Architecture

- **`index.html`**: all content. Sections (`#top` hero, `#about`, `#experience`, `#skills`, `#education`, `#contact`) each need a matching link in `.site-nav`, and `js/main.js` highlights the link for the section in view. The schema.org `Person` JSON-LD and the Open Graph tags in `<head>` repeat the job title, links and skills, so keep them in sync with the body.
- **Experience**: recent roles are `.job` cards in `ol.timeline`, and older roles are one-liners in `ul.earlier`. To add an achievement bullet, put a `<ul><li>…</li></ul>` inside a `.job` (already styled).
- **Skills**: chips are grouped in `.skill-group` cards. Adding `class="core"` to a chip highlights it as a headline skill.
- **`css/style.css`**: hand-written, token-based. Colors are CSS custom properties on `:root`, redefined for dark mode both under `@media (prefers-color-scheme: dark)` (guarded by `:root:not([data-theme="light"])`) and under `:root[data-theme="dark"]`, so change both dark blocks together. The `@media print` block at the bottom turns the page into a PDF CV. It hard-codes the email, phone and LinkedIn URL in `.location::after`, so update it if those change.
- **`js/main.js`**: handles the theme toggle (saved in `localStorage`, with an inline script in `<head>` that applies it before paint), builds the email link from `data-email-user` and `data-email-domain` (the address is never written out in the HTML, to deter scrapers), fills `[data-years-since]` and `.js-year` with values computed from the current year, and runs the print button and the active-nav observer.
