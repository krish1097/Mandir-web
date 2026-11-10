# Kalupur Swaminarayan Temple website

A plain HTML, CSS and JavaScript site. There is no build step and nothing to install.

## Run it on your computer
Double-click `index.html`, or run `python3 -m http.server 8000` in this folder and open http://localhost:8000.

## Where to edit things

| I want to change... | Edit this file |
|---|---|
| Address, email, darshan timings, menu items | `js/config.js` |
| Events (add, cancel, change dates) | `data/events.js` |
| Important updates on the home page | `data/updates.js` |
| Youth events and weekly teachings | `data/youth.js` |
| Magazine issues | `data/magazine.js` |
| Extra gallery albums | `data/albums.js` |
| Colors and fonts | `css/tokens.css` |
| Layout and styling | `css/base.css`, `css/pages.css`, `css/footer.css` |
| Wording or layout of one page | `js/pages/<page>.js` (home, events, gallery, live, donations, hall, contact, magazine, youth, policies) |
| Header, footer, logos, social links | `index.html` |
| Payment portal connection | `js/payments.js` and `PAYMENT` in `js/config.js` |
| Contact form delivery | `CONTACT` in `js/config.js` |

Dates are written `YYYY-MM-DD` and times in 24-hour form (`18:30`). Events show as Upcoming or Past automatically, using Eastern time.

## Placeholders still to replace
- Mandir email and youth email (`js/config.js`)
- Darshan timings and office hours (`js/config.js`, `js/pages/contact.js`)
- All photos. Placeholder images are made by the `ph()` helper in `js/utils.js`. Swap one for a real photo by replacing the `ph(...)` call with `<img src="assets/photos/your-file.jpg" alt="Describe the photo" loading="lazy">`.
- Hall photos (`js/pages/hall.js`), hero photo (`js/pages/home.js`)
- Policy text (`js/pages/policies.js`)
- WhatsApp link: in `index.html`, find the WhatsApp button in the footer and turn it into `<a href="YOUR-LINK" target="_blank" rel="noopener" aria-label="WhatsApp updates group">`.
- Live stream: replace the placeholder inside `js/pages/live.js` with the approved player embed and set `live.state` from the stream status.

## Connecting the payment portal
1. In `js/config.js`, set `PAYMENT.mode` to `'redirect'` (portal page) or `'api'` (portal API) and fill in `portalUrl` or `apiBase`.
2. Open `js/payments.js` and match the parameter names or API fields to the portal's documentation.
3. Test with the portal's test mode before going live.

The repository being private does not hide what is deployed: every file is visible to anyone who opens the site. Put only public values in `js/config.js`. Secret API keys must stay on the portal's server or a serverless function.

## Hosting with a private repository
- GitHub Pages from a private repo needs a paid GitHub plan (Pro, Team or Enterprise). The workflow in `.github/workflows/pages.yml` deploys on every push to `main`. In the repo, go to Settings, then Pages, and set Source to "GitHub Actions".
- Free alternatives that accept private repos: Cloudflare Pages and Netlify. Point either at this repo with no build command and `/` as the output folder.

## Folder map
```
index.html          page shell: header, footer, logos
css/                tokens (theme), base, pages, footer
js/config.js        site, payment and contact settings
js/utils.js         shared helpers
js/payments.js      payment and contact adapters
js/pages/           one file per page
js/app.js           menu, routing and form handling
data/               events, updates, youth, magazine, albums
assets/img/         logos
```
Scripts load in the order listed at the bottom of `index.html`. Keep that order when adding files.
