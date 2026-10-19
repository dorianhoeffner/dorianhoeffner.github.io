# dorianhoeffner.com

Personal research website of Dorian Höffner. Plain HTML, no build step, hosted on GitHub Pages.

| File | Purpose |
| --- | --- |
| `index.html` | Home page: tools, selected publications, latest notes, short about (EN/DE, light/dark) |
| `publications/index.html` | Full publication list, grouped by type |
| `notes/index.html` | List of all notes |
| `notes/<yyyy-mm-title>/index.html` | One note per folder |
| `notes/_template/index.html` | Template for a new note (not linked, `noindex`) |
| `site.css` | Shared styles for home, publications and notes (colours, header, tool boxes, lists) |
| `site.js` | Shared behaviour: language, dark mode, mobile menu, shrinking header |
| `legal.html` | Legal notice and privacy policy |
| `404.html` | Page shown for broken links |
| `fonts.css`, `fonts/` | Self-hosted Source Serif 4 / Source Sans 3 / Source Code Pro (no Google Fonts) |
| `img/` | Images, e.g. `portrait.jpg` |
| `refrigerant-atlas/index.html` | Refrigerant Atlas web app, served at `dorianhoeffner.com/refrigerant-atlas/` |
| `og.png` | Preview image for links shared on LinkedIn, Slack, email etc. |
| `favicon.svg`, `robots.txt`, `sitemap.xml`, `CNAME`, `.nojekyll` | Hosting and search engine files |

The Absorption Atlas lives in its own repository and is served below this domain automatically:
`dorianhoeffner.com/absorptionlib/` comes from the `docs/` folder of `dorianhoeffner/absorptionlib`.

## Editing

Every text exists twice, once with `data-l="en"` and once with `data-l="de"`. Change both.
Each page also carries its title twice on the `<html>` tag (`data-title-en`, `data-title-de`).

- **Portrait**: put a square photo at `img/portrait.jpg` (at least 160 × 160 px; it is shown at 64 px and 32 px). In `site.css`, replace the `--portrait: url("data:image/svg+xml,…")` line with `--portrait: url(/img/portrait.jpg);`. This changes the header on every page at once.
- **New tool**: in `index.html`, copy one `<article class="tool">` block inside `tool-grid`. Each box has an icon (24 × 24 stroke SVG), the kind of tool, the name, one sentence, three bullets with the core functions, and a row of links (the first with `class="go"`). The grid adds rows by itself. Add the tool's URL to `sitemap.xml`.
- **Publication**: in `publications/index.html`, copy an `<li class="pub">` block into the right group, newest first. Groups for talks and theses are prepared at the end of the file (commented out). The home page shows a selection of 3 to 5 entries: copy the same `<li>` block there.
- **Note**: copy the folder `notes/_template/` to `notes/<yyyy-mm-short-title>/`, follow the steps in its comment (fill the placeholders, delete the `noindex` line), then add one `<article class="note-row">` to `notes/index.html` and to the Notes section of `index.html`, and the URL to `sitemap.xml`. On the home page, the newest note can use the larger `note-feature` layout with a figure; move the previous one down to a `note-row`. A note may also link straight to an external page (mark it with `<span class="ext">↗</span>`).
- **Profiles**: add ORCID, Google Scholar, LinkedIn or a CV link in the About block of `index.html` (`<p class="contact">`), and the URLs to `"sameAs"` in the JSON-LD block in `<head>`.
- **Header**: on the home page the header starts large (photo, name, "Thermal energy storage · TU Berlin") and shrinks after 64 px of scrolling. Subpages use `class="site-header is-compact" data-compact`, so they start compact.

To preview locally, run `python3 -m http.server` in this folder and open http://localhost:8000 (links to `/absorptionlib/` only work online, and the portrait path `/img/portrait.jpg` needs the server, not a double-click on the file).

## Publish

Changes go live a minute or two after a push:

```bash
git add -A
git commit -m "Describe the change"
git push
```

## Legal note

`legal.html` names Dorian Höffner and an email address, without a postal address. For a purely private, non-commercial website this is often considered sufficient; a site that is regarded as business-like (§ 5 DDG) or journalistic-editorial (§ 18 MStV) requires a postal address where you can be served. If you want to be on the safe side without publishing your home address, use an impressum/address service (c/o address) or, if TU Berlin agrees, your institute address. Not legal advice.
