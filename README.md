<div align="center">

  # Nautic Boy & Studio
  **nauticboy.top — Producer · DJ · Mix & Mastering Engineer**

  <p align="center">
    <a href="https://nauticboy.top"><b>Website</b></a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  </p>
</div>

---

## ✦ Overview

One-page bilingual (EN/ES) marketing site for **Nautic Boy & Studio**: mixing/mastering services, official releases, production templates, selected works, NauticMixxx DJ software and the NauticPlayer macOS app.

Statically exported (`output: 'export'`) and deployed to GitHub Pages via `.github/workflows/nextjs-deploy.yml`. In Settings → Pages, Source must be **GitHub Actions** (`build_type: workflow`). Publishing the source branch directly renders the README instead of the compiled site and can overwrite the Next.js deployment.

## ✦ Tech Stack

- **Next.js 16** (App Router, static export) + React 19
- **Tailwind CSS v4** (CSS-first theming in `src/app/globals.css`)
- **Framer Motion** — reveals, 3D tilt, sliders, scroll progress
- **Typography** — Unbounded (display), Outfit (body), JetBrains Mono (engineering labels)
- **i18n** — dictionary-based EN/ES under `src/app/[lang]`

## ✦ Getting Started

```bash
npm install
npm run dev     # http://localhost:3000 → language selection, /en or /es
npm run build   # static export to out/
npm run lint
```

## ✦ Structure

```
src/
  app/[lang]/           # routes (page, success) + locale layout (fonts, metadata)
  components/layout/    # navbar (scroll-spy, progress bar), mobile menu, footer
  components/sections/  # hero, studio, releases, templates, portfolio, software, about, reviews, contact
  components/ui/        # primitives: GlowButton, TiltCard, SectionHeading, CountUp, SpotlightCard…
  lib/data/             # releases, templates, testimonials, works
  lib/i18n/             # dictionaries + locales (en/es)
```

Contact and newsletter forms are handled by FormSubmit. Audio previews via SoundCloud Widget API and local media.

## ✦ Philosophy

Technology should serve the art, not the other way around — the design keeps a dark studio-room aesthetic: intentional orange accent light, engineering-grade mono labels, film grain, and motion that serves the sound metaphor.

## Navigation and product content

The page follows Studio → Work → Reviews → Music → Templates → Software → About → Contact. `src/lib/navigation.ts` supplies the navbar, mobile menu and footer links in that order. Software groups NauticMixxx and NauticPlayer; their direct anchors are `#nauticmixxx` and `#nauticplayer`.

NauticMixxx versions and release links are retrieved automatically from the [latest public release](https://github.com/nauticsoftware/NauticMixxx/releases/latest). `src/lib/nauticmixxx.ts` reads the generated release snapshot. The icon and Home/PERFORMANCE captures in `public/images/nauticmixxx-*` are the official assets copied from the product website, sourced from the [product repository](https://github.com/nauticsoftware/NauticMixxx/blob/56267f5f838a555f97e734bc3b5223d7eaa6fe70/README.md). Both screenshots use lossless WebP and retain their original proportions.

## SEO

The root is an accessible language selection page with HTML links. Each locale has its own canonical, reciprocal hreflang, Open Graph metadata and structured data. `scripts/finalize-export.mjs` stamps the correct HTML language into the static exports, including Spanish before JavaScript loads. Contact success pages are noindex and excluded from the sitemap. Versions and release links update automatically. Review the bilingual product descriptions when product capabilities change.

## Automatic NauticMixxx releases

Both websites use GitHub's public `releases/latest` API for `nauticsoftware/NauticMixxx`, which selects the latest published release and excludes drafts and prereleases. Publish a normal GitHub Release to update the websites; changing a Git tag or the README alone does not publish a release.

- `npm run build` / `npm run dev` first run `scripts/prepare-release.mjs`. This retrieves the release and its uploaded assets into `src/lib/release/snapshot.json`. Versions, release URLs, installer names, source and checksums come from that response; no manual version edits are required.
- The generated static HTML includes this version before JavaScript loads. `public/release-snapshot.json` is generated for inspection and is not committed.
- After hydration, `useNauticRelease` checks GitHub from the browser, with a five-minute cache, shared requests, and refreshes while the page is visible or regains focus. Version labels, download links and `SoftwareApplication` structured data update together.
- Missing installers point to the release page with “View downloads”; missing checksums are omitted. Only uploaded assets from the official repository are accepted. No asset filename is invented.
- A browser API failure keeps the most recent validated response or the compiled snapshot. During local builds, an API failure uses the checked-in snapshot. CI instead stops the deployment, preserving the live site if GitHub is unavailable.
- GitHub Actions also rebuilds and publishes hourly, so static HTML and SEO catch up without a website commit. Scheduled runs are subject to GitHub queue delays and default-branch schedule policies; browser updates continue independently.
- `GITHUB_TOKEN` is used only in Node during CI, never shipped to the browser. The browser uses the public endpoint; API rate limits or offline access can delay refreshes.

Run `npm run test:release` to verify a future release with renamed assets, missing installers, rate limits, caching, storage failures and synchronized structured data. The release integration under `src/lib/release/` is intentionally identical in both independent website repositories; keep it synchronized when changing the mechanism.

Release notes use the official release title and link. Product feature descriptions and screenshots remain editorial content and should be reviewed if the product changes its capabilities.

Production builds use `next build --webpack` to avoid the Turbopack Google Fonts resolver error observed on the Linux Pages runner. The exported pages and release verification remain the same.
