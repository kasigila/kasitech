# Deploy Jembe Group LLC independently

Production origin: **https://jembegroupllc.com**

This is a static website. It must be hosted on its own platform. It must not
redirect to, iframe, or load assets from kasitechinnovations.com, and it must
not be served from `/preview/jembe`.

The deployable site lives in the `jembe/` directory of this repository.

## Recommended host

**Vercel**, **Netlify**, or **Cloudflare Pages**.

Any of those can attach the custom domain `jembegroupllc.com` with HTTPS.
Do not deploy this site through kasitechinnovations.com.

## What to deploy

Only the `jembe/` folder.

| Item | Value |
| --- | --- |
| Root directory | `jembe` |
| Framework | None (static HTML) |
| Build command | `node scripts/build.mjs` |
| Output / publish directory | `.` (the `jembe` folder itself) |
| Node | 20+ (only needed for the build check) |

There is no Next.js, Vite, or bundler step for this site. The build script
writes `config.js` from environment variables and verifies that Kasitech
preview paths and missing assets are absent.

If the host cannot run a build command, leave it empty and deploy the files
as-is. The committed `config.js` already works without a build; the mandate
form then uses a `mailto:` fallback to `info@jembegroup.com`.

## Create the hosting project

1. Create a **new** project on Vercel, Netlify, or Cloudflare Pages.
2. Connect this Git repository.
3. Set the project **root directory** to `jembe`.
4. Set the build command and publish directory as in the table above.
5. Do **not** use the Kasitech Next.js app (`npm run build` at the repo root)
   for this domain. That application is a different website.

### Vercel

- Framework preset: Other
- Root Directory: `jembe`
- Build Command: `node scripts/build.mjs`
- Output Directory: leave empty (serves the `jembe` folder)
- Add the domain `jembegroupllc.com` under Project → Settings → Domains
- Set `www.jembegroupllc.com` to redirect to the apex `jembegroupllc.com`

`jembe/vercel.json` already:
- redirects `www` → apex
- redirects leftover `/preview/jembe` URLs to `/`
- rewrites in-site section paths (`/about`, `/mandate`, …) to `index.html`

### Netlify

- Base directory: `jembe`
- Build command: `node scripts/build.mjs`
- Publish directory: `jembe` (or `.` if the base directory is already `jembe`)
- Add the domain under Domain management
- `jembe/netlify.toml` handles `www` → apex, SPA fallback, and leftover preview paths

### Cloudflare Pages

- Root directory: `jembe`
- Build command: `node scripts/build.mjs`
- Build output directory: `/` (this folder)
- Custom domain: `jembegroupllc.com`
- `jembe/_redirects` provides the SPA fallback

## Environment variables

Set these on the host. They are optional except as noted.

| Variable | Required | Purpose |
| --- | --- | --- |
| `JEMBE_FORM_ENDPOINT` | Recommended for production | HTTPS endpoint that receives mandate-form JSON (Formspree, Web3Forms, or your own backend) |
| `JEMBE_FORM_ACCESS_KEY` | Only for Web3Forms | Public access key; restrict it to `jembegroupllc.com` in the provider dashboard |
| `JEMBE_MANDATE_EMAIL` | No | Mailbox for the mailto fallback. Default: `info@jembegroup.com` |
| `JEMBE_SITE_ORIGIN` | No | Canonical origin. Default: `https://jembegroupllc.com` |

Do not put private API secrets, SMTP passwords, or database credentials in
these variables or in any frontend file. The browser can only call a public
form endpoint. If you need a private mailer, build a small backend on a
separate service and point `JEMBE_FORM_ENDPOINT` at that backend.

A template is in `jembe/.env.example`.

### Form providers (independent of Kasitech)

Pick one. Do not send client information to Kasitech unless you explicitly
configure that.

1. **Formspree** — create a form, set `JEMBE_FORM_ENDPOINT=https://formspree.io/f/<id>`
2. **Web3Forms** — set `JEMBE_FORM_ENDPOINT=https://api.web3forms.com/submit` and `JEMBE_FORM_ACCESS_KEY=<public key>`
3. **Your own HTTPS API** — accept JSON fields `counterpart`, `sector`, `name`, `organisation`, `contact`, `notes`
4. **No endpoint** — the site opens the visitor’s email client to `info@jembegroup.com`

Until `JEMBE_FORM_ENDPOINT` is set, submissions are not posted to any server.

## Third-party services

The site is self-contained except for:

- **Google Fonts** (Barlow Condensed, Cormorant Garamond, Source Sans 3) — already used by the current Jembe preview. Loaded from `fonts.googleapis.com` / `fonts.gstatic.com`.
- **An optional form endpoint** you configure (see above).

No font, image, CSS, JS, or API request is made to kasitechinnovations.com.

## DNS records

At the registrar (or DNS host) for `jembegroupllc.com`, point the domain at
the chosen host. Use the records that host shows in its domain UI.

Typical Vercel:

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

Typical Netlify:

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | Netlify load-balancer IP shown in the UI |
| CNAME | `www` | `<site>.netlify.app` |

Typical Cloudflare Pages (when DNS is also on Cloudflare):

| Type | Name | Value |
| --- | --- | --- |
| CNAME | `@` | `<project>.pages.dev` (CNAME flattening) |
| CNAME | `www` | `<project>.pages.dev` |

Wait for DNS to propagate, then confirm HTTPS is issued automatically by the
host. Do not add records that CNAME or redirect `jembegroupllc.com` to
kasitechinnovations.com.

## Custom domain and HTTPS

1. Add `jembegroupllc.com` on the host.
2. Add `www.jembegroupllc.com` and redirect it to the apex.
3. Leave the host to provision the TLS certificate (Let’s Encrypt or equivalent).
4. Canonical URL in the HTML is already `https://jembegroupllc.com/`.

## www behaviour

Apex is canonical: `https://jembegroupllc.com`

`https://www.jembegroupllc.com` should 301 to the apex. This is configured in
`vercel.json` and `netlify.toml`. Also set the same redirect in the host’s
domain settings so it applies before application routing.

## SPA routing

The site is a single `index.html` with in-page sections. Navigation uses
`/#about`, `/#mandate`, and so on. Refreshing those URLs works on any static
host.

Path URLs such as `/mandate` are rewritten to `index.html` so a refresh does
not 404. Existing files (`/styles.css`, `/app.js`, `/assets/*`, `/robots.txt`)
are served as files.

## Local preview

```bash
cd jembe
npm run build
npm run dev
```

Open http://localhost:4173 — this is only for local checks. Production is
https://jembegroupllc.com.

## Final production checks

After DNS and HTTPS are live:

- [ ] https://jembegroupllc.com/ loads the home page
- [ ] https://www.jembegroupllc.com redirects to https://jembegroupllc.com/
- [ ] Certificate is valid
- [ ] Logo, sector photographs, CSS, and JS load from `jembegroupllc.com` (not from another origin)
- [ ] Desktop and mobile navigation work
- [ ] Search overlay and hash sections work
- [ ] Refresh on https://jembegroupllc.com/#mandate keeps the mandate page
- [ ] Mandate form either posts to your configured endpoint or opens mail to `info@jembegroup.com`
- [ ] View source: canonical is `https://jembegroupllc.com/`
- [ ] `robots.txt` and `sitemap.xml` are reachable
- [ ] No request in DevTools Network goes to kasitechinnovations.com
- [ ] No URL contains `/preview/jembe`

## What this project is not

- It is not a redirect from jembegroupllc.com to kasitechinnovations.com
- It is not an iframe of `/preview/jembe`
- It is not the Kasitech Next.js application
- It does not require Kasitech environment variables, APIs, or hosting
