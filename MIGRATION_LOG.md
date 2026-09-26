# Migration completion report — 23 September 2026

All 37 catalogue products have saved Payhip listings and unique links connected to the local storefront. Listings remain unlisted. The website has not been deployed. Payment-provider setup and a purchase/download test remain outstanding.

## Verification

- All 37 products have unique Payhip URLs present on their generated product pages.
- Production build passed: 42 HTML pages and 1,813 internal link/asset references resolved.
- No paid PDF files in public build output. Preview noindex retained.
- Migration checks covered source-file identity, uploaded attachments and covers, configured prices and saved-product confirmation. These checks are not a complete factual or legal audit of the books.
- The build message “Checkout is inactive” reflects pending payment setup; product links are connected. No real purchase or delivery test was performed.

## Product register

| Product | GBP | Payhip |
|---|---:|---|
| UK Right to Work Checks Blueprint | 15.0 | https://payhip.com/b/GXeL3 |
| UK Employment Rights Act 2025 Compliance Blueprint | 15.0 | https://payhip.com/b/D3stx |
| Importing from China to the UK: The Complete Step-by-Step Blueprint for First-Time Importers | 15.0 | https://payhip.com/b/Aq1xo |
| Rucking Blueprint | 21.0 | https://payhip.com/b/HdCsU |
| AI Compliance for Small Business (UK Edition) | 21.0 | https://payhip.com/b/ryVhL |
| AI Compliance for Small Business (EU Edition) | 21.0 | https://payhip.com/b/zlgiV |
| AI Compliance for Small Business | 21.0 | https://payhip.com/b/h0z3N |
| Digital Nomad Visa Comparison Guide | 21.0 | https://payhip.com/b/AXWrx |
| College Dorm Survival Blueprint 2026 | 21.0 | https://payhip.com/b/CK0jS |
| Menopause & Equality Action Plan Compliance | 21.0 | https://payhip.com/b/OLbrf |
| Menopause at Work Blueprint | 21.0 | https://payhip.com/b/6mE7a |
| Making Tax Digital Survival Blueprint – UK Edition | 21.0 | https://payhip.com/b/9ASDz |
| Property Buyer's Complete Pack | 31.0 | https://payhip.com/b/wRhke |
| Over-50 Career Pack | 31.0 | https://payhip.com/b/MVS5t |
| Career Pivot Pack | 31.0 | https://payhip.com/b/jpXnJ |
| Career Survival Pack | 31.0 | https://payhip.com/b/qhToi |
| UK Business Formation Pack | 31.0 | https://payhip.com/b/83kPr |
| UK Landlord Starter Pack (England) | 31.0 | https://payhip.com/b/prx4y |
| Making Friends as an Adult Blueprint | 21.0 | https://payhip.com/b/CMvro |
| Redundancy & Settlement Agreement Survival Blueprint – UK Edition | 21.0 | https://payhip.com/b/7HkAD |
| Nigerian Pidgin English: The Afrobeats Guide | 21.0 | https://payhip.com/b/bnK9Z |
| Modern Birding for Beginners Blueprint | 21.0 | https://payhip.com/b/XTOtZ |
| Renters' Rights Act 2025 Compliance Blueprint — 2026 Edition | 21.0 | https://payhip.com/b/ANeMh |
| Companies House Identity Verification Compliance Blueprint | 21.0 | https://payhip.com/b/BVaZ3 |
| Over-50 Job Loss & Career Reinvention Blueprint (UK Edition) | 21.0 | https://payhip.com/b/17Hil |
| Over-50 Job Loss & Career Reinvention Blueprint (US Edition) | 21.0 | https://payhip.com/b/wGahu |
| AI Career Survival and Pivot Blueprint | 21.0 | https://payhip.com/b/YF5Ly |
| Layoff & Severance Survival Blueprint | 21.0 | https://payhip.com/b/UZdbr |
| Salary Negotiation Blueprint | 21.0 | https://payhip.com/b/Dxwn2 |
| Fraud and Scam Prevention Blueprint | 21.0 | https://payhip.com/b/ApDtM |
| Crypto Tax Reporting & Compliance Guide | 21.0 | https://payhip.com/b/PY4jl |
| Wills & Power of Attorney Guide | 21.0 | https://payhip.com/b/krOlL |
| First-Time Home Buyer's Workbook | 21.0 | https://payhip.com/b/yf296 |
| First-Time Landlord Blueprint – UK Edition (England) | 21.0 | https://payhip.com/b/p0Bvr |
| First-Time Landlord Blueprint – US Edition | 21.0 | https://payhip.com/b/me0nf |
| USA LLC Formation Guide | 21.0 | https://payhip.com/b/RCt8c |
| UK Limited Company Formation Guide | 21.0 | https://payhip.com/b/D8kfc |

## Recorded migration issues — resolved

The following changes are saved in Payhip. Source originals remain in Downloads; repaired PDFs and a source manifest are in the sibling `pdfblueprints-corrected-pdfs` directory, outside website build output.

| Issue | Resolution | Affected Payhip products |
|---|---|---|
| UK AI Compliance wrong running header | Corrected all 17 text-page headers; replaced download | ryVhL |
| Nigerian Pidgin duplicated contents and bad references | Rebuilt three contents pages from body headings; added working page links/bookmarks; preserved 143 pages | bnK9Z |
| Modern Birding editorial label | Removed “MASTER MANUSCRIPT — EDITORIAL REVIEW EDITION” from title page; preserved body | XTOtZ |
| Over-50 US contents references | Corrected 35 chapter destinations; added links/bookmarks; preserved 57 pages | wGahu |
| Older Over-50 UK copy in bundle | Replaced bundle file with current standalone Shopify store edition | MVS5t |
| Wills filename version conflict | Renamed Payhip download to Version 1.0, matching PDF front matter; content unchanged | krOlL |
| UK company filename/page-count conflict | Download renamed Version 1.1 in standalone and pack; local sales page already shows verified 33 pages | D8kfc, 83kPr |
| UK Landlord scope and filename | Filename now Version 2.0 in standalone and both packs; England scope explicit in local catalogue and Payhip landlord listing/pack | p0Bvr, prx4y, wRhke |
| Rejected WebP covers | JPEG covers uploaded during migration | All affected products |
| Right to Work attachment follow-up | Downloaded attachment from Payhip and verified matching title and contents | GXeL3 |

### Repair verification

- Rendered and visually reviewed all rebuilt contents pages, Birding title page and representative AI header pages.
- Checked unchanged body text on all pages outside the edited regions/pages; original page counts retained.
- Pidgin section destinations verified against the actual target pages; all 35 Over-50 US chapter destinations derived from body headings.
- Renamed PDF copies are byte-identical to their source; no speculative edition changes.
- Payhip returned saved-change confirmations for all eleven edited product listings, including affected packs.
- Removing an editorial label does not constitute a substantive editorial or factual review. These repairs address the recorded formatting, naming and source-version issues only.

## Remaining launch work

1. Recorded migration/PDF issues above are resolved. A broader factual/content review is a separate remaining launch check.
2. Connect Stripe or another supported payment provider in Payhip (user-owned task), then test purchase, receipt and delivery, including all attachments in a pack.
3. Complete the final product-content and cover-claim review. Right to Work attachment identity is now verified; customer delivery still needs a checkout test.
4. Finalise policies, redirects and launch metadata/sitemap.
5. Deploy to Cloudflare, configure the domain, verify email DNS and remove preview noindex only for the production release. Keep Shopify available until the replacement purchase journey works and rollback is available.
