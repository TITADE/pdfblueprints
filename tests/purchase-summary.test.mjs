import test from 'node:test';
import assert from 'node:assert/strict';
import {purchaseSummary,checkoutUrl} from '../src/purchase-summary.mjs';
import {readFileSync} from 'node:fs';
const products=JSON.parse(readFileSync('data/products.json','utf8')).products;
test('catalogue checkout links preserve each Payhip product and quantity',()=>{for(const p of products){const code=new URL(p.payhipUrl).pathname.split('/').at(-1);const u=new URL(checkoutUrl(p.payhipUrl));assert.equal(u.hostname,'payhip.com');assert.equal(u.pathname,'/buy');assert.equal(u.searchParams.get('cart_links[]'),code);assert.equal(u.searchParams.get('qty['+code+']'),'1');}});
test('summaries distinguish books, packs and companion resources without prices',()=>{for(const p of products)assert.ok(!purchaseSummary(p).includes('£'));const find=h=>products.find(p=>p.handle===h);assert.match(purchaseSummary(find('renters-rights-act-2025-landlord-compliance-blueprint')),/48-page PDF.*23 practical tools/);assert.match(purchaseSummary(find('uk-landlord-starter-pack')),/2 complete guides as separate PDFs.*104 pages in total/);assert.match(purchaseSummary(find('practical-ai-governance-and-compliance')),/257-page PDF.*separate companion resources ZIP/);assert.match(purchaseSummary({handle:'unknown'}),/PDF download/);assert.doesNotMatch(purchaseSummary({handle:'unknown'}),/undefined|NaN|\d+-page/);});
