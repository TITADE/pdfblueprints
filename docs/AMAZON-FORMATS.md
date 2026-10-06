# Amazon book editions

Added 6 October 2026. Source is `data/amazon-formats.json`; renderer is `src/amazon-formats.mjs`.

24 titles have 47 direct Amazon UK links (24 Kindle, 23 paperback). Each destination was opened and its author, title, selected format and geographical scope checked against the store product. This verifies listing identity, not exact manuscript parity or legal currency. Public copy explicitly explains that updates, page counts, layout and extras can differ. No Amazon prices are cached.

Keep PDF checkout primary. Packs and unmatched products receive no Amazon controls. Never guess an ASIN, infer paperback availability from a Kindle card, or treat an individual book as a bundle.

Held products: UK and US First-Time Landlord (Amazon links different jurisdictions as formats), UK Limited Company Formation (33-page store edition differs substantively from newer 30/28-page local sources; Payhip delivered PDF needs reconciliation). Do not enable those until resolved.

Home Buyer's Workbook has valid separate direct format URLs; Amazon has not linked their selectors. Its local 52-page PDF page-count highlight was corrected. Other formats do not inherit the PDF's content/features promise. The UK AI PDF has newer offers and additions: Amazon controls explicitly refer readers to that edition's own listing rather than promising the toolkit or PDF additions.

To add/update: verify the actual product page; enter direct `https://www.amazon.co.uk/dp/ASIN` URLs, ASIN, verifiedAt and status `verified`. Renderer hides any other status or URL pattern. Remove the format entry to withdraw a link.

Analytics: `amazon_format_click` emits product_handle, format, destination_marketplace and link_url, only while pb-consent is yes and gtag exists. This measures referrals, not sales. Amazon does not provide order attribution through these ordinary links. The subscription tool page already disables GA, so its Amazon controls do not emit events.

Release uses the existing GitHub main → Cloudflare Pages setup. Build with SITE_RELEASE=production. Check all product destinations and PDF checkout preservation, held-title exclusions, consent yes/no event behaviour, and mobile layout. No credentials or paid PDF files belong in public assets.
