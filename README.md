# Poornachandratejasvi Laxman Bhattar — Research Website

A responsive, static academic homepage designed for GitHub Pages. Built with plain HTML, CSS and vanilla JavaScript; no build step or package manager is required.

## Files

- `index.html` — homepage, research themes, publication list and dedicated Packages, Education, Experience and Skills sections
- `style.css` — responsive design system (white, navy, cobalt blue, pale blue and a restrained gold accent)
- `script.js` — mobile navigation, publication filters, interactive three-layer research infographic and live public-repository catalogue
- `assets/favicon.svg` — site icon
- `assets/research-architecture.webp` — original three-layer research infographic used by the interactive Research section
- `SOURCES.md` — public sources used for biography, education and publications

## GitHub Pages deployment

The intended site repository is `https://github.com/PCTejasvi/pctejasvi.github.io` if the repository belongs to the `PCTejasvi` account. If it is under another account, replace the remote/repository owner with that account's actual repository URL.

1. Download and extract the ZIP.
2. Open the `pctejasvi.github.io` repository on GitHub and select the `main` branch.
3. Back up any existing site files before replacing them.
4. Upload the contents of the extracted folder to the repository root. Keep `index.html` at the root and upload the `assets` folder alongside it.
5. Commit the changes to `main`.
6. In **Settings → Pages**, select **Deploy from a branch**, then `main` and `/ (root)`, and save.

For a user/organisation repository named `pctejasvi.github.io`, GitHub Pages normally publishes at `https://pctejasvi.github.io/` when the owner is `PCTejasvi`.

## Live Packages section

The Packages section requests the account's public repositories from the GitHub REST API (`https://api.github.com/users/PCTejasvi/repos`). It displays each repository's own description, primary language, topics, star/fork counts and last-push date. The page does not invent package names or claim capabilities that are not in the repository metadata. The section also links directly to the GitHub Packages tab (`https://github.com/PCTejasvi?tab=packages`) and the complete repositories list. If the API is unavailable or rate-limited, visitors can use those links.

## Local preview

Open `index.html` in a browser. For best testing of the live Packages API, run a local server from this folder:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.


## Latest visual update

The research landscape uses a custom 3D isometric illustration with selectable Power System, Cyber and Software & Computing layers. On desktop pointers, the visual tilts subtly with pointer movement; all layers are also accessible through keyboard-operable tabs. The Skills section presents the listed engineering software and programming languages as selectable cards with concise descriptions.


### Visual assets

- `assets/research-landscape-isometric.webp` — isometric 3D Figure 01 overview of the power, cyber and computing domains. The three domain controls link to the corresponding interactive research panels.
- `assets/research-architecture.webp` — separate 3D isometric interactive research-layer illustration in the Research section.


## Latest visual and accessibility refinements

- Figure 01 now uses the labeled research-landscape infographic showing power-system, cyber and software/computing concepts.
- The separate isometric research-architecture image remains in the Research section.
- Supporting typography has been enlarged, including navigation labels, metadata, captions and mobile text.
- Education is presented as a responsive academic pathway with three distinct degree cards.


## Figure assets

- `assets/figure-01-isometric-platforms.webp` is the clean isometric 3D scene used as Figure 01 in the homepage hero.
- `assets/research-landscape-labelled.webp` is the detailed labelled three-layer infographic used in the Research section.

The page keeps the two visuals distinct: the first emphasises the three-dimensional connected platforms; the second provides explicit labels and research terminology.
