# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Thulani Hlongwane's personal résumé site, a static single page served by GitHub Pages at the custom domain in `CNAME` (`www.thulanihlongwane.co.za`). It is built on the Start Bootstrap "Resume" template v5.0.7 (Bootstrap 4, jQuery, Font Awesome 5). That is why `package.json` and the CSS/JS banners still name Start Bootstrap. There is no server-side code, and Pages serves the repo root as-is. Anything committed to `master` goes live, including `vendor/`, `css/*.min.css` and `js/*.min.js`.

## Commands

```bash
npm install          # install gulp toolchain + front-end deps
npx gulp             # default = build: wipe & repopulate vendor/, compile SCSS, minify JS
npx gulp css         # scss/ -> css/resume.css + css/resume.min.css
npx gulp js          # js/resume.js -> js/resume.min.js
npm start            # build, then watch + BrowserSync dev server on http://localhost:3000
```

There are no tests or linters. `.travis.yml` runs `npm test`, but `package.json` defines no `test` script.

The toolchain dates from 2019 (gulp 4, `gulp-sass` 4 with `node-sass`). `npm install` is likely to fail on current Node because `node-sass` won't build there. When a change is small and npm won't install, you can edit the source and the matching built file directly, but keep them in sync.

## Architecture

- **`index.html`**: all of the content. A fixed left `#sideNav` holds the nav links. Each `<section class="resume-section" id="...">` (about, education, training, experience, skills, interests, contact) needs a matching `<a class="nav-link js-scroll-trigger" href="#id">` in the nav. Entries in education, training and experience use the `.resume-item > .resume-content + .resume-date` pattern, and sections are separated by `<hr class="m-0">`.
- **Styles**: edit the source in `scss/`, never `css/` directly. `resume.scss` imports the partials (`_variables`, `_mixins`, `_global`, `_nav`, `_resume-item`, `_bootstrap-overrides`). The theme color is `$primary: $orange` (`#BD5D38`) and the sidebar width is `$sidebar-base-width` in `_variables.scss`. The page loads only `css/resume.min.css`, so rebuild after any SCSS change.
- **Scripts**: `js/resume.js` handles jQuery-easing smooth scroll, collapses the mobile menu on click, and runs Bootstrap scrollspy on `#sideNav`. The page loads `js/resume.min.js`, so regenerate it after edits.
- **`vendor/`**: third-party assets copied out of `node_modules` by the gulp `vendor` task. `gulp build` deletes and recreates it, so don't hand-edit it. It is committed because Pages has no build step.
- **Fonts**: Saira Extra Condensed and Muli load from Google Fonts in `<head>`.
