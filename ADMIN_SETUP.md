# Admin panel (Decap CMS) — one-time setup

This gives you a web admin at **pdfblueprints.store/admin** to add/edit
products, blog posts, curated collections, static pages and policies —
without touching JSON or the terminal. Saving in the admin commits straight
to GitHub `main`; Cloudflare Pages auto-builds and deploys within ~1-2
minutes, exactly like the pushes we just tested.

It does **not** replace Payhip. Payhip still holds the real manuscript
files, the real checkout price, and does the actual selling. Adding a new
product is still two steps every time:

1. **Payhip** — upload the PDF, set the real price, publish, copy the
   checkout link.
2. **Admin panel** — add the listing (title, description, cover image,
   display price, the Payhip link from step 1) and tick "price matches
   Payhip" before publishing.

## One-time setup (about 10 minutes)

### 1. Register a GitHub OAuth App
This lets the admin panel log you in with GitHub and commit changes as you.

1. Go to https://github.com/settings/developers → **OAuth Apps** → **New OAuth App**
2. Application name: `PDFBlueprints Admin` (anything you like)
3. Homepage URL: `https://pdfblueprints.store`
4. Authorization callback URL: leave this tab open — you'll fill it in
   after step 2 gives you the worker's URL. Use `https://<worker-name>.<your-subdomain>.workers.dev/callback` once you know it (see below).
5. Click **Register application**, then **Generate a new client secret**.
6. Keep the **Client ID** and **Client secret** somewhere safe — you'll need them in step 2.

### 2. Deploy the OAuth worker
This is the small Cloudflare Worker (`oauth-worker/`) already in this repo —
it's what talks to GitHub on the admin panel's behalf.

```
cd oauth-worker
npx wrangler deploy
```

Wrangler will print the worker's URL, e.g.
`https://pdfblueprints-cms-oauth.<your-subdomain>.workers.dev`

Then set the two secrets it needs (paste the values from step 1 when prompted):

```
npx wrangler secret put GITHUB_CLIENT_ID
npx wrangler secret put GITHUB_CLIENT_SECRET
```

Go back to the GitHub OAuth App (step 1) and set the **Authorization
callback URL** to `<worker-url>/callback`, e.g.
`https://pdfblueprints-cms-oauth.<your-subdomain>.workers.dev/callback`. Save.

### 3. Point the admin panel at your worker
Edit `public/admin/config.yml` — change this line:

```
base_url: https://REPLACE-WITH-YOUR-WORKER.workers.dev
```

to your real worker URL from step 2 (no trailing slash), e.g.:

```
base_url: https://pdfblueprints-cms-oauth.<your-subdomain>.workers.dev
```

Commit and push that change — Cloudflare will rebuild automatically.

### 4. Log in
Visit `https://pdfblueprints.store/admin`, click **Login with GitHub**,
authorize the app. You should land on the admin dashboard with five
sections: Products, Blog posts, Curated collections, Store pages, Policies.

## Notes
- The admin panel itself is marked `noindex` so it won't show up in search results, but it isn't otherwise hidden — anyone with the URL who can also authenticate with a GitHub account that has push access to this repo could reach it. That's normal for this setup (same trust boundary as your GitHub repo already has).
- Every save is a real git commit — you can see the full history in GitHub, and revert any change the normal git way if you ever need to.
- Uploaded cover images go into `public/assets/` and are publicly served from `/assets/...`, same as your existing product images.
- The "Approved for production launch" toggle in Policies controls the same `policyDraft.approvedForLaunch` gate that's already in `scripts/build.mjs` — don't flip it off casually, it changes what ships live.
