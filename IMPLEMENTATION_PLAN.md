# Implementation plan

## Objectives

1. Present PDFBlueprints as a modern, credible digital-product library.
2. Reduce fixed platform costs through static Cloudflare hosting and Payhip's entry plan.
3. Give the owner portable website source and a documented product-update workflow.
4. Measure product interest and sales without promising that a redesign alone will create demand.

## Milestones

### 1. Establish the catalogue

- Export Shopify product information, images, existing URLs, policies and any relevant historical records.
- Obtain original PDFs and identify approved sample pages.
- Verify product titles, prices, file formats, page counts, editions, jurisdictions and pack contents.
- Select one representative guide for the first design milestone.
- Record the existing domain registrar and DNS configuration, including email records.

Acceptance: a source-backed product inventory with missing fields marked explicitly.

### 2. Build the first design milestone locally

- Implement the Modern Blueprint Library design with readable typography, consistent spacing and accessible colours.
- Homepage: short value proposition, featured guides, browse by situation, genuine sample content, purchase explanation and support information.
- Product page: cover and sample gallery, intended reader, benefits supported by the contents, contents list, verified edition details, price, purchase action and delivery information.
- Show desktop and mobile versions for review.

Acceptance: working local pages with real representative content, no fabricated purchase functionality and no missing assets.

### 3. Complete the website

- Reusable page templates and one structured record per product.
- Catalogue search, topic filters and jurisdiction filters where the verified catalogue supports them.
- Individual guide pages and pack pages listing their actual contents.
- About, contact, FAQ and policies appropriate to the replacement store.
- Page titles, descriptions, canonical URLs, sitemap and usable 404 page.
- Preserve valuable current URLs and create a redirect map for changed URLs.

Acceptance: all launch products and essential routes are populated and navigable.

### 4. Connect Payhip

- The owner signs in to Payhip and completes required account/payment onboarding.
- Upload the correct sale files, set prices and currencies, and configure delivery.
- Add real direct checkout links to matching website products.
- Verify packs separately; do not assume every Payhip product type supports the same embed behaviour.
- Match available checkout branding to the website.
- Document the catalogue/price update process and keep payment credentials out of source code.

Acceptance: each product points to its correct checkout with matching price and files.

### 5. Test the complete experience

- Desktop/mobile layout, keyboard navigation, visible focus, contrast, zoom and reduced motion.
- Search/filter combinations, empty results, product links, contact and legal links.
- Asset optimisation and loading performance.
- Approved purchase test covering checkout, order record, receipt and download access. The owner performs any required payment action.
- Confirm full paid PDFs are absent from public assets and the repository.
- Verify prices and currencies immediately before launch.

Acceptance: a buyer can find a guide, understand the contents, purchase and receive the correct files.

### 6. Launch and retire Shopify

- Deploy a review version to the owner's Cloudflare account.
- Check the exact deployment configuration, then connect pdfblueprints.store when launch is authorised.
- Preserve email DNS, apply redirects and verify HTTPS, canonical URLs, sitemap and indexing settings.
- Verify the production checkout/download journey and support address.
- Retain backups and rollback instructions. Cancel Shopify only after migration checks and explicit cancellation authorisation.

Acceptance: replacement store and email operate on the domain, old relevant URLs resolve correctly and Shopify retirement is separately confirmed.

### 7. Measure and maintain

- Record visits, product-page engagement and checkout clicks separately from confirmed Payhip orders.
- Do not report a checkout click as a sale.
- Identify leading products and improve the weakest observed step in the customer journey.
- Document editing, product additions, price updates, file replacement, publication and recovery.

## Inputs still needed

- One representative PDF and its cover, followed by the full catalogue/export.
- Confirmation of product facts that cannot be verified from public pages.
- Owner access to Shopify exports, Payhip, Cloudflare and the domain registrar at the relevant milestone.
- Preferred payment provider supported by the owner's Payhip account.

Visual implementation can proceed with verified public information while account setup is pending. Paid download delivery cannot be declared complete without the original files and a tested checkout.

## Reference documentation

- https://help.payhip.com/article/68-add-payhip-to-your-website
- https://payhip.com/pricing
- https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/
- https://developers.cloudflare.com/pages/get-started/git-integration/
- https://docs.astro.build/en/guides/deploy/cloudflare/
