# Poornachandratejasvi Laxman Bhattar — Research Website

A responsive, static academic homepage designed for GitHub Pages. It uses plain HTML, CSS and vanilla JavaScript; no build step, package manager or framework is required.

## Files

- `index.html` — page content, research-theme infographics (inline SVG/HTML), publications, profile links and timeline
- `style.css` — responsive visual design and layout
- `script.js` — mobile navigation and publication filters
- `assets/favicon.svg` — site icon
- `SOURCES.md` — public sources used for profile and publication information

## Deploy to the existing repository

The intended repository identified for this site is:

`https://github.com/Payal-GridIntegration/pctejasvi-research.github.io`

1. Download and extract the website ZIP.
2. Open the repository above and switch to the `main` branch.
3. Back up the current `index.html`, `style.css` and `script.js` before replacing them.
4. Upload the extracted files and folders to the repository root. Keep `index.html` at the root, and keep the `assets` folder beside it.
5. Commit the changes to `main`.
6. In **Settings → Pages**, confirm that GitHub Pages is configured to deploy from the `main` branch and `/ (root)`. If it is configured differently, use the currently selected source or change it to `main` / root.

The repository name is not the account's special `username.github.io` repository, so GitHub Pages will normally publish it as a project site under the account's Pages domain, with the repository name as a path. Confirm the exact published URL in **Settings → Pages** after deployment.

## Before making the site public

- Confirm the profile owner is happy with the biography, research descriptions and the use of his name.
- Verify that the Google Scholar link opens the correct author profile. Google Scholar did not expose its profile details during research, so citation counts and h-index are intentionally not shown.
- Confirm whether the published IIT Gandhinagar email is still active before adding it to the contact section. It has intentionally not been presented as a current contact address.
- The publication list contains the records identified from DBLP, arXiv and the research-group publication list. It may not be exhaustive; compare it against the owner's live Scholar profile before calling it a complete bibliography.
- The MinTEJ 2026 item is an arXiv preprint, not a peer-reviewed journal publication.

## Local preview

Open `index.html` directly in a browser. For a local server, run:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000` from this directory.
