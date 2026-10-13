# Reviews operation

## Implemented 13 October 2026
147 unique public Judge.me records recovered from 28 archived Shopify product pages. Ratings, reviewer display names, titles, bodies and available dates preserved. Original archive flags were false for verified buyer; owner states all reviews are verified. No public verification badge is applied until original evidence resolves the discrepancy. No original Judge.me account export has been obtained. Recovered counts match archived page totals.

Product summaries and full reviews are separate for each exact product, including packs. Category selections show the latest review of up to three relevant products, not a combined category rating. All published feedback contributes to the product average regardless of score. Historical editions are disclosed. Reviews are escaped as text and include no email/order information.

Payhip: enabled customer reviews, seven-day post-purchase request, daily digest, manual moderation (auto-publish off). Saved settings and email preview checked in Chrome. Actual scheduled email receipt and a real buyer submission still require an eligible purchase/download session; no fabricated customer review was submitted.

## New reviews: manual transfer workflow
Payhip's documented public API covers coupons/license keys; documented webhooks cover sales/refunds/subscriptions, not reviews. No automatic review sync is installed.
Sources: https://help.payhip.com/article/347-public-api and https://help.payhip.com/article/115-webhooks

1. Read the Payhip review digest, open Products > Reviews > Moderate.
2. Check for spam, abuse, personal information and duplicates. Retain legitimate criticism. Reply helpfully where appropriate. Ask the customer to remove private details rather than silently rewriting their experience.
3. Publish the appropriate review in Payhip. Copy its public fields exactly into a JSON batch using the schema below. Match the Payhip product URL to data/products.json; never attach a guide review to a pack. Use a stable source review ID if exposed; otherwise assign and retain a stable local identifier. Do not store email, receipt/download URLs, order IDs or private evidence in this repository.
4. Run `node scripts/import-reviews.mjs /absolute/path/batch.json` for validation, then repeat with `--write`. Reusing an ID updates the record (including edits/removals) without duplicating it. Mark withdrawn reviews rejected so they stop contributing to ratings.
5. Run `node --test tests/*.test.mjs` and `SITE_RELEASE=production node scripts/build.mjs`. Review the resulting page. Commit data/reviews.json, pull --rebase, push main and verify Cloudflare succeeds.

Batch schema (illustrative placeholders, never publish this example):
```json
{"reviews":[{"id":"payhip:stable-review-id","handle":"exact-product-handle","name":"Public display name","title":"","body":"Exact customer text","rating":4,"date":"2026-10-13","source":"Payhip","verifiedPurchase":false,"status":"pending"}]}
```
Only set verifiedPurchase true when purchase verification is actually established. Date may be empty when unavailable. Status is published, pending or rejected. No customer email is needed. Only published entries render. No daily automation is scheduled; transfer approved new reviews when a digest arrives.

## Remaining source/end-to-end checks
Obtain original Judge.me export if accessible, reconcile verification status, and verify receipt of a scheduled Payhip email and a genuine buyer's submission. These are not claimed complete by the frontend tests.
