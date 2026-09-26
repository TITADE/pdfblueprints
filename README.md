# PDFBlueprints

Custom digital-product storefront for pdfblueprints.store.

## Agreed direction

Replace Shopify with a locally developed, independently owned website. Use Cloudflare static hosting and Payhip for checkout and PDF delivery. Keep fixed costs low while the store establishes sales.

Design: **Modern Blueprint Library**, with editorial typography, white backgrounds, navy text (#14213D), blue actions (#2457F5), pale grey surfaces (#F3F5F9), consistent covers and real sample pages. Prioritise clarity, credibility and mobile usability.

## Current status

Local storefront implemented with 37 imported product records and locally stored cover images. Includes a homepage, searchable/filterable catalogue, 37 product routes, About, Help and a 404 page. The UK Limited Company Formation Guide has a detailed page with verified contents and two real sample images.

Payhip checkout is not configured; all purchase controls remain disabled. Other product pages use imported titles and short descriptions and still need full file-content verification. Policies must be finalised before launch. No site has been deployed and Shopify is unchanged.

The complete paid PDF is stored outside this project’s public files, under the task's work/source-pdfs directory. Only two selected sample page images are included in the website.

The project is in this task's outputs folder; Desktop write permission was not granted. It is not registered as a separate saved Codex sidebar project.

## Content findings

The Shopify description for the UK Limited Company Formation Guide says 60+ pages, but the attached file contains 33 physical pages. Its filename says version 1.0; the contents page identifies version 1.1, August 2026. The new page uses the verified file details. This is a content inventory check, not certification that legal/tax guidance is current.

See [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) for the remaining migration and launch steps.

## Development

The initial scaffold uses Node.js and has no external dependencies:

```sh
npm run dev
```

Local address: http://127.0.0.1:4173

```sh
npm run build
```

Build output: dist/. Templates are in src/site.mjs; catalogue records are in data/products.json. The development command builds first and then starts the local server. After editing, rebuild and refresh the browser.

## Content and commerce

- Store public product metadata, approved samples and cover assets in the website project.
- Keep full paid PDFs in Payhip, outside public website assets and source control.
- Payhip is the authority for purchase prices and fulfilment. For the first release, record and verify matching display prices in the website catalogue whenever prices change.
- Use direct checkout links initially. Do not create a local cart that implies Payhip cart synchronisation.
- Do not invent authorship, credentials, legal review, page counts, update dates, testimonials or bestseller claims.

## Hosting

Target Cloudflare static hosting. Prefer Workers Static Assets for a new project following current Cloudflare guidance; a portable static output also preserves Pages compatibility. wrangler.jsonc prepares a static-assets deployment, but the project has not been connected to a Cloudflare account or published. Preview pages intentionally contain noindex directives; remove these only for the verified production launch.

