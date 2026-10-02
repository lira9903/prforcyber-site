# prforcyber.io

## Hosting
- Static site on GitHub Pages, custom domain `prforcyber.io`.
- **Never delete `CNAME`.** It must contain exactly `prforcyber.io`.

## Structure
- Each page is a folder with an `index.html` (e.g. `/waitlist/index.html`, `/thanks/index.html`).
- Main page is `/index.html`.
- Shared assets live in `/shared/` (images in `/shared/img/`, favicon at `/shared/favicon.png`).

## Pasting HTML from Claude Design
- Extract inline/base64 images into `/shared/img/` and reference them with relative links.
- Keep the design exactly as given.
- Add favicon (`/shared/favicon.png`), a `<title>` and a `<meta name="description">`.

## Replacing a page with a new Claude Design export
- Keep the existing form wiring, favicon and meta tags.

## Forms (Web3Forms)
- `action="https://api.web3forms.com/submit"`, `method="POST"`
- Hidden fields:
  - `<input type="hidden" name="access_key" value="b009bce9-d147-406b-9018-aedd5c86e217">`
  - `<input type="hidden" name="subject" value="...">`
  - `<input type="hidden" name="redirect" value="https://prforcyber.io/thanks/">`
  - Honeypot: `<input type="checkbox" name="botcheck" class="hidden" style="display:none">`

## Analytics + cookie consent (every page)
- Every page — including new ones — must include this snippet in `<head>`, right after the favicon link:
  ```html
  <!-- Google Analytics 4 + cookie consent (gtag.js loads only after Accept) -->
  <link rel="stylesheet" href="/shared/consent.css">
  <script src="/shared/consent.js"></script>
  ```
- Privacy-strict: `consent.js` injects `gtag.js` **only after the visitor clicks Accept** (or has accepted before). With no choice or Decline there must be zero requests to Google domains. Never add a `<script src="https://www.googletagmanager.com/...">` tag to a page, and never default consent to granted.
- GA4 Measurement ID: `G-C64CSBL070` (set in `consent.js`).
- `/thanks/` fires the `generate_lead` event when the `prfc_lead` sessionStorage flag (set on waitlist form submit in `landing.js`) is present. It only reaches Google if the visitor accepted.
- Footers link to `/privacy/`. Update the privacy page if new data collection or third-party services are added.

## No third-party requests
- Pages may only load files from this site. The only allowed external requests are Google Analytics after Accept, and the Web3Forms form POST on submit.
- Fonts are self-hosted in `/shared/fonts/` (woff2, declared with `@font-face` at the top of `shared/landing.css`). Never link to Google Fonts (`fonts.googleapis.com` / `fonts.gstatic.com`) or any other CDN. New fonts: download the woff2 files into `/shared/fonts/` with their licence.
- When a Claude Design export includes font links or CDN scripts, replace them with self-hosted files or static HTML.

## SEO + sharing (every page)
- Every page's `<head>` has, right after `<meta name="description">`:
  - `<link rel="canonical" href="https://prforcyber.io/<path>/">` — always the https://prforcyber.io URL with trailing slash (`/` for home). Skip on noindex pages.
  - Open Graph + Twitter card tags: `og:type`, `og:site_name` (PRforCyber), `og:title` and `og:description` (same as `<title>` / meta description), `og:url` (canonical URL), `og:image` + `og:image:width` 1200 + `og:image:height` 630 + `og:image:alt`, `twitter:card` = `summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image`. Copy the block from `/waitlist/index.html`.
  - Image URLs must be absolute: `https://prforcyber.io/shared/img/og-image.png` (1200x630 share image). No `twitter:site`/handle (no X links).
- Pages that shouldn't be indexed (`/thanks/`, `404.html`, any utility page) get `<meta name="robots" content="noindex">` instead of a canonical, and stay out of the sitemap.
- New indexable page → add it to `sitemap.xml` (with `<lastmod>`). Update `<lastmod>` when a page's content changes meaningfully.
- `robots.txt` allows everything and points to the sitemap. Don't block pages there; use noindex instead.
- Homepage keeps the JSON-LD `Organization` schema (name, url, logo `/shared/img/logo.png`, email). Update it if contact details change. Never add LinkedIn/X to `sameAs`.
- `404.html` at the root is GitHub Pages' not-found page. Use root-relative links (`/shared/...`) on it.

## Content rules
- British spelling throughout (programme, optimised, enquiry).
- Number ranges use a regular hyphen with non-breaking spaces: `50&nbsp;-&nbsp;60`, `2&nbsp;-&nbsp;3 months` (renders "50 - 60"). No en dashes in ranges.
- No LinkedIn or X links.

## Workflow
1. Make changes.
2. Tell the user to preview with Live Server.
3. Only commit + push when the user says **"deploy"**. Then give the live URL: https://prforcyber.io
