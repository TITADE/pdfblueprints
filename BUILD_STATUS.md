# Build status — 24 September 2026

Live inspection site: https://pdfblueprints.pages.dev/
Local preview: http://127.0.0.1:4173/

## Completed

- Custom Cloudflare Pages storefront in existing account; prior project untouched.
- 38 products: original 37 migrated from Shopify, plus new Payhip Subscription Cancellation guide (£14.99, 30 pages).
- 89 full articles, 11 collections, About/Help/contact, replacement policy drafts.
- 76 actual sample images; modal and full-size viewing. No complete paid PDFs in public build.
- Product and article URL paths preserved; Cloudflare redirects tested.
- Catalogue filtering/search/sort, journal search, responsive layout and sample viewing checked.
- 153 generated HTML pages and 5,795 internal link/asset references checked.
- Cloudflare confirmed final 276-file deployment succeeded; new guide verified on hosted preview at £14.99.
- Stripe card entry and PayPal visible at checkout.
- Two free checkout orders completed; both email receipts arrived. All three downloaded files match corrected source hashes.
- Test coupon exhausted (2/2); earlier unused test coupon expired.
- All 19 original DNS records backed up and staged in Cloudflare Free, DNS-only. Zoho MX, SPF, DKIM and DMARC preserved. Nameservers have NOT changed.

## Remaining before final launch

- Confirm public legal seller name and correspondence address. User says updated in Payhip; inspected invoice settings did not expose them. Do not publish private registration details without confirmation.
- Confirm whether advertised prices include applicable tax. Current Payhip UK checkout adds VAT. Ebook classification also requires review.
- Review replacement policy drafts in data/policies.json. Production build refuses unapproved drafts.
- Complete a real paid order to verify actual payment processing. Free tests verify delivery only.
- Set custom domain and HTTPS, activate DNS, transfer domain registration away from Shopify, verify Zoho send/receive, then retire Shopify with historical order support preserved.
- Export/check historical Shopify data and redirect rules before retirement. Shopify-owned URLs cannot be controlled by the replacement host.
- Resolve production robots.txt overwrite permissions before removing noindex. Preview remains safely excluded from indexing.

Details: migration/NEXT-STEPS.md, migration/download-checks.json, migration/hosted-checks.json, migration/dns-before-migration.json.
