# Launch handoff — 24 September 2026

Inspection: https://pdfblueprints.pages.dev/

## Completed

- 38 products (37 original plus the new Subscription Cancellation guide), 89 articles, 11 collections, 76 sample images.
- Original product/article paths retained; legacy article alias and collection/product redirects tested on Cloudflare.
- 153 HTML pages; 5,795 internal references passed. HTTPS and genuine 404 verified.
- Stripe card form and PayPal available. Two free checkout orders completed; receipts reached the authorised Gmail inbox. Three downloaded PDFs matched expected SHA-256 hashes (download-checks.json).
- Replacement policy drafts prepared in data/policies.json; original Shopify policies preserved in policies-source.json. Production build refuses to release unapproved policy drafts.
- Sample viewer now includes a full-size image link for browser zoom.
- Full 19-record DNS backup imported to Cloudflare Free, DNS-only, preserving current routing. Nameserver changes NOT applied at Shopify.

## Domain migration

Assigned nameservers: eleanor.ns.cloudflare.com and javon.ns.cloudflare.com. Compare staged DNS against dns-before-migration.json before activation. Zoho MX, SPF, DKIM and DMARC are preserved. Check DNSSEC state before nameserver change; disabling existing DNSSEC requires user action-time confirmation.

The registration remains at Shopify. Transfer before closing Shopify. Any registrar purchase/terms acceptance needs the user at the final step. Shopify shows renewal on 16 July 2027, $52 USD. No transfer purchase or registrar unlock performed.

## Owner decisions needed

1. Public legal seller name and business correspondence address. User says entered on Payhip, but inspected invoice settings show Add Address. Do not publish the private registrar address without confirmation.
2. Decide whether advertised £15/£21/£31 are tax-inclusive. Current UK checkout adds 20%; ebook tax classification also warrants review. Do not mark all PDFs tax exempt without checking.
3. Review replacement policy drafts before launch.
4. Complete a real paid checkout with a suitable independent buyer/payment method. Free tests validate delivery, not Stripe settlement.

## Remaining tasks

- Test coupon verified exhausted (2/2); unused earlier coupon expired on 23 September.
- New Subscription Cancellation guide added at its verified Payhip price £14.99, with 30 pages and two actual samples.
- Export historical Shopify orders/customer data and existing redirect rules before retirement; retain support access for old download links.
- Domain-owned links can be retained. Shopify-owned myshopify.com and old Shopify download URLs cannot be controlled by the new host after closure.
- Apply Cloudflare custom-domain setup and HTTPS, activate nameservers with mail records preserved, transfer registration, and test incoming/outgoing Zoho email.
- Recheck production robots.txt write: existing file replacement was blocked even after a permission grant. Preview build safely retains identical noindex/disallow contents.

Sources: https://help.payhip.com/article/107-testing-checkout-flow ; https://help.payhip.com/article/127-digital-eu-vat ; https://help.shopify.com/en/manual/domains/managing-domain-ownership/transferring-shopify-domains ; https://www.gov.uk/online-and-distance-selling-for-businesses
