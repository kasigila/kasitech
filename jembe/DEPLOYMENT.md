# Deploy Jembe Group LLC independently

Production origin: **https://jembegroupllc.com**

Host only the `jembe/` directory on its own Vercel project. Do not redirect,
iframe, or load assets from kasitechinnovations.com. Do not serve this site
from `/preview/jembe`.

The Kasitech preview at `https://www.kasitechinnovations.com/preview/jembe`
is a separate demo. Leave it alone.

## Vercel project (required)

Create a **new** Vercel project. Do **not** add `jembegroupllc.com` to the
existing Kasitech Vercel project (`kasitech`).

| Setting | Value |
| --- | --- |
| Git repository | `kasigila/kasitech` |
| Project name | `jembegroupllc` (or similar — not `kasitech`) |
| Framework preset | Other |
| Root Directory | `jembe` |
| Build Command | `node scripts/build.mjs` |
| Output Directory | `dist` |
| Install Command | `echo skip` (or leave default; there are no npm dependencies) |
| Node | 20 |

`jembe/vercel.json` already sets build command, output directory, leftover
`/preview/jembe` → `/`, and section rewrites (`/mandate` → `index.html`).
Set www vs apex only in Vercel → Settings → Domains (not in vercel.json),
or CSS and images will redirect-loop and the site will look unstyled.

### Exact clicks in the Vercel dashboard

1. Open [https://vercel.com/new](https://vercel.com/new)
2. Import `kasigila/kasitech`
3. Before deploying, open **Root Directory** → Edit → enter `jembe` → Continue
4. Confirm Framework is **Other**, Build Command `node scripts/build.mjs`, Output `dist`
5. Deploy
6. Do not select the existing `kasitech` project

The production Git branch can be `main` after PR #31 is merged, or this
feature branch until then.

## Mandate form

The browser posts to **`/api/mandate`** on the same Vercel project. That
function does not call Kasitech.

Default delivery (no extra account): **Formsubmit.co** emails
`info@jembegroup.com`. The first live submission sends a confirmation mail
to that inbox; someone with access must click the confirm link.

Preferred (more reliable): Formspree or Web3Forms. Set these on the **Jembe**
Vercel project (Settings → Environment Variables), Production + Preview:

| Variable | When | Value |
| --- | --- | --- |
| `JEMBE_FORM_ENDPOINT` | Formspree | `https://formspree.io/f/<your-form-id>` |
| `JEMBE_FORM_ENDPOINT` | Web3Forms | `https://api.web3forms.com/submit` |
| `JEMBE_FORM_ACCESS_KEY` | Web3Forms only | the access key from the Web3Forms dashboard |
| `JEMBE_MANDATE_EMAIL` | optional | default `info@jembegroup.com` |
| `JEMBE_SITE_ORIGIN` | optional | `https://jembegroupllc.com` |

Do not put SMTP passwords in the frontend. Restrict Web3Forms keys to
`jembegroupllc.com`.

## Custom domain and SSL

After the Jembe Vercel project exists:

1. Project → Settings → Domains
2. Add `jembegroupllc.com`
3. Add `www.jembegroupllc.com` and set it to **redirect** to `jembegroupllc.com`
4. Copy the DNS records Vercel displays on that screen into the registrar
   for `jembegroupllc.com`
5. Wait for Vercel to issue HTTPS (automatic)

Do **not** invent DNS values. Use only the records Vercel shows after the
domain is added. Do **not** CNAME or redirect this domain to
kasitechinnovations.com.

Canonical URL in the HTML is already `https://jembegroupllc.com/`.

## Local preview

```bash
cd jembe
npm run build
npm run dev
```

http://localhost:4173 is local only. `/api/mandate` exists on Vercel, not on
`npx serve`.

## Production checks

- [ ] https://jembegroupllc.com/ is the Jembe site (not Kasitech)
- [ ] www redirects to apex
- [ ] HTTPS is valid
- [ ] Assets load from jembegroupllc.com
- [ ] `/#mandate` refresh works; `/mandate` refresh works
- [ ] Mandate POST goes to `/api/mandate` (same origin)
- [ ] No kasitechinnovations.com and no `/preview/jembe` in Network
