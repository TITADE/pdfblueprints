# Consumer subscription tool — version 1.0.0

Integrated into `/products/uk-subscription-cancellation-compliance-blueprint/#subscriber-tool` above the product hero and PDF purchase section. Payhip checkout and PDF delivery are unchanged. No new business dashboard.

## Architecture

- `src/subscription-tool.mjs`: accessible, escaped server-rendered form and source/update log.
- `src/site.mjs`: conditional product-page integration, tool-only assets, analytics excluded from this product page.
- `public/subscription-tool.js`: form, local state, letters, clipboard fallback, printable letter and downloads.
- `public/subscription-rules.js`: pure date, decision, validation, letter and calendar functions.
- `public/subscription-tool.css`: responsive styles and focus treatment.
- `data/subscription-tool.json`: editorial copy, official links, review metadata and updates.
- `public/admin/config.yml`: CMS content section. Legal review metadata is hidden from ordinary editing.
- `tests/subscription-rules.test.mjs`: meaningful cancellation, date, letter and review-gate scenarios.

The rule engine has a fixed review gate at 1 January 2027. Editorial changes cannot extend it. After the gate the checker still prepares a generic letter and an optional renewal reminder, but does not calculate an unreviewed legal window. Future DMCCA renewal rights, commencement and transitional rules are not implemented.

## Supported calculations

Existing CCR 2013 initial cancellation guidance for personal-use contracts between UK consumers and UK traders entered online/by phone, for ordinary service, digital-content and regular ordinary-goods subscriptions. All outputs depend on the user’s facts. Missing or late cancellation-rights information is assessed conditionally under regulation 31. Digital-content consent and fully performed services are checked. No guaranteed entitlement or numerical refund amount is produced.

Cross-border, business/mixed, off-premises, at-premises, special goods, finance, insurance, healthcare, utilities, telecoms and uncertain contract types receive referral/general guidance rather than calculated cooling-off rights. A charge-after-cancellation journey distinguishes a cancellation request from the effective end date and contract termination from cancelling payment authority.

## Privacy and delivery

No account, storage, API call, bank connection, AI prompt or form submission. Answers remain in JavaScript memory and form controls. No personal data in URLs, calendar entries or analytics. Google Analytics is excluded only on this product page. Downloads and clipboard are user-initiated; downloaded files are the user’s responsibility. Browser memory/session restoration and browser spellchecking are outside server control.

The calendar is an all-day reminder the day before the earliest available supported deadline or entered next-renewal date. It does not cancel a subscription. No reminder is generated from an unverified 2027 cooling-off rule.

## Verification

32 automated tests pass (27 rule tests and 5 integration checks).

Run `node --test tests/*.test.mjs`.
Build with `SITE_OUTPUT=<absolute preview directory> node scripts/build.mjs` for an isolated noindex preview.
A production build must use the existing `SITE_RELEASE=production` setting and confirmed policy metadata.

Verified browser paths: service cancellation, digital-content waiver/renewal, disputed post-cancellation charge, conditional fields, personalised letter, TXT and ICS downloads, clear/start-again. Desktop and 390px mobile inspected; duplicate IDs and horizontal overflow checked. Browser download events were not exposed by the in-app browser; the actual downloaded TXT/checklist/ICS files were verified on disk. Print uses the browser’s native print dialog with a dedicated letter-only print sheet; native PDF saving remains browser-dependent.

## Release

The modified source is in the existing local repository. No commit, push, Cloudflare deployment or live-site change was made. Local notes describe Cloudflare Pages; a Wrangler Worker static-assets configuration also exists. Confirm the active production build and latest GitHub state before publishing. Do not replace the live site wholesale from an old snapshot if newer content exists. Apply the focused source changes, rebuild through the existing production pipeline, then verify the exact product URL, its anchor, PDF previews, Payhip link and downloads.

## Updating the law

Check official legislation and commencement instruments, not only announcements. Review exclusions, new-contract/transition rules, missing-information periods and refund conditions; update the pure engine and tests, review the explanatory text, then advance review dates in code and data together. Keep a dated change log. Basic rule changes should not be performed by editing a date in the CMS.

Sources: https://www.legislation.gov.uk/uksi/2013/3134 (especially regs 28–37); https://www.fca.org.uk/consumers/recurring-card-payments; government subscription consultation response (2 April 2026) and announcement (9 August 2026).
