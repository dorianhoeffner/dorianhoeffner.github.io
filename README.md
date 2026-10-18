# dorianhoeffner.com

Personal research website of Dorian Höffner. Plain HTML, no build step, hosted on GitHub Pages.

| File | Purpose |
| --- | --- |
| `index.html` | Home page (EN/DE, light/dark), all content |
| `legal.html` | Legal notice and privacy policy |
| `404.html` | Page shown for broken links |
| `fonts.css`, `fonts/` | Self-hosted Source Serif 4 / Source Sans 3 / Source Code Pro (same as the Absorption Atlas, no Google Fonts) |
| `img/` | Images, e.g. a later `portrait.jpg` |
| `refrigerant-atlas/index.html` | Refrigerant Atlas web app (single file, all property data embedded), served at `dorianhoeffner.com/refrigerant-atlas/` |
| `og.png` | Preview image for links shared on LinkedIn, Slack, email etc. |
| `favicon.svg`, `robots.txt`, `sitemap.xml`, `CNAME`, `.nojekyll` | Hosting and search engine files |

The Refrigerant Atlas lives in this repository (`refrigerant-atlas/`). The Absorption Atlas lives in its own repository and is served below this domain automatically:
`dorianhoeffner.com/absorptionlib/` comes from the `docs/` folder of `dorianhoeffner/absorptionlib`.

## Publish (first time)

1. On GitHub, create a **public** repository named exactly `dorianhoeffner.github.io` (no README, no licence).
2. In this folder:
   ```bash
   git add -A
   git commit -m "Home page"
   git branch -M main
   git remote add origin git@github.com:dorianhoeffner/dorianhoeffner.github.io.git
   git push -u origin main
   ```
3. Repository → Settings → Pages: Source "Deploy from a branch", branch `main`, folder `/ (root)`.
4. At your domain registrar, set these DNS records for `dorianhoeffner.com`:
   ```
   A     @    185.199.108.153
   A     @    185.199.109.153
   A     @    185.199.110.153
   A     @    185.199.111.153
   AAAA  @    2606:50c0:8000::153
   AAAA  @    2606:50c0:8001::153
   AAAA  @    2606:50c0:8002::153
   AAAA  @    2606:50c0:8003::153
   CNAME www  dorianhoeffner.github.io.
   ```
   Remove any other A/AAAA records the registrar created for `@` (parking page).
5. Settings → Pages → Custom domain: `dorianhoeffner.com` (already set by the `CNAME` file). Once the DNS check is green, tick **Enforce HTTPS** (can take up to an hour).
6. Recommended: GitHub → your profile Settings → Pages → **Add a verified domain** for `dorianhoeffner.com`, so nobody else can claim it on GitHub.
7. Push the updated Absorption Atlas (`absorptionlib` repo) as well. It now links back to the home page and uses `https://dorianhoeffner.com/absorptionlib/` as canonical URL. Do **not** add a CNAME file to that repo.

Old links such as `dorianhoeffner.github.io/absorptionlib/` keep working: GitHub redirects them to the new domain.

## Editing

Every text exists twice in `index.html`, once with `data-l="en"` and once with `data-l="de"`. Change both.

- **Portrait**: put a square photo at `img/portrait.jpg` (at least 440 × 440 px) and replace the `<div class="portrait">…</div>` block with
  `<div class="portrait"><img src="img/portrait.jpg" alt="Dorian Höffner" width="440" height="440"></div>`
- **Career**: the two entries with `class="step todo"` are placeholders. Fill them in, then delete `todo` from the class and the two `todo-flag` spans. Copy a `<li class="step">` block for further stations. Add the start year of the current position where the `TODO` comment is.
- **Profiles**: add ORCID, Google Scholar or LinkedIn next to the GitHub button (hero) and in the contact list; also add the URLs to `"sameAs"` in the JSON-LD block in `<head>`.
- **New tool**: copy one `<article class="tool">` block. Every card has the same parts: a preview plate (a small SVG diagram with a 320 × 200 viewBox, or a short code example), the kind of tool, the title, one sentence and a row of links. Add the URL to `sitemap.xml`.
- **Publication**: copy an `<li class="pub">` block; newest first.

To preview locally, open `index.html` in a browser, or run `python3 -m http.server` in this folder and open http://localhost:8000 (links to `/absorptionlib/` only work online).

## Legal note

`legal.html` names Dorian Höffner and an email address, without a postal address. For a purely private, non-commercial website this is often considered sufficient; a site that is regarded as business-like (§ 5 DDG) or journalistic-editorial (§ 18 MStV) requires a postal address where you can be served. If you want to be on the safe side without publishing your home address, use an impressum/address service (c/o address) or, if TU Berlin agrees, your institute address. Not legal advice.
