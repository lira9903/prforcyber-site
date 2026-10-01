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

## Content rules
- No LinkedIn or X links.

## Workflow
1. Make changes.
2. Tell the user to preview with Live Server.
3. Only commit + push when the user says **"deploy"**. Then give the live URL: https://prforcyber.io
