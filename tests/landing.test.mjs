import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import vm from 'node:vm';
import {availableAmazonFormats} from '../src/amazon-formats.mjs';
import {audiences} from '../src/audience-catalogue.mjs';
import {landingPages,landingPage} from '../src/landing.mjs';
const products=JSON.parse(readFileSync('data/products.json')).products;
for(const page of landingPages)test(page.slug+' has valid product, preview and pack destinations',()=>{
 const html=landingPage(page,products);
 assert.equal((html.match(/<h1>/g)||[]).length,1);
 for(const sample of page.samples)assert.ok(existsSync('public'+sample.src));
 for(const handle of [page.featured,page.pack||page.comparison])assert.ok(html.includes(products.find(p=>p.handle===handle).payhipUrl));
 if(page.pack)assert.ok(html.includes('SAVE £11'));
 else {assert.ok(!html.includes('SAVE £'));assert.ok(html.includes('SEPARATE PURCHASE'));}
 for(const section of ['lp-hero','lp-three','lp-benefits','lp-previews','lp-included','lp-offers','lp-trust','lp-faq','lp-final'])assert.ok(html.includes(section),section);
 assert.equal(page.situations.length,3);assert.equal(page.benefits.length,4);assert.equal(page.samples.length,2);
 assert.ok(page.authorBio&&page.sourceNote&&page.sources.length&&page.reading&&page.printing);
 assert.ok(html.split('lp-final')[1].includes('mailto:support@pdfblueprints.store'));
 const audience=audiences.find(a=>a.slug===page.slug);
 for(const h of [...audience.primary,...audience.related])assert.ok(html.includes('/products/'+h+'/'));
 for(const [,f] of availableAmazonFormats(products.find(p=>p.handle===page.featured)))assert.ok(html.includes(f.url));
 assert.ok(!html.includes('undefined'));
 assert.ok(html.includes('data-landing-action="preview"'));
 assert.ok(html.includes('Can I buy a Kindle ebook or paperback instead of a PDF?'));
 assert.ok(html.includes('How do PDF, Kindle and paperback delivery differ?'));
 const available=availableAmazonFormats(products.find(p=>p.handle===page.featured));
 if(!available.length)assert.ok(html.includes('There is no verified Amazon edition linked for the featured guide at present.'));
 else assert.ok(html.includes('The featured guide has '+available.map(([f])=>({kindle:'Kindle',paperback:'paperback',hardback:'hardback'}[f])).join(' and ')+' options'));
});
test('landing events require current consent and never record purchases',()=>{
 let consent=null,listener;const events=[];
 const target={dataset:{landingAction:'checkout',productHandle:'test',position:'hero'}};
 vm.runInNewContext(readFileSync('public/landing.js','utf8'),{document:{addEventListener:(_,fn)=>listener=fn,querySelector:()=>({dataset:{landingPage:'landlords'}})},localStorage:{getItem:()=>consent},window:{gtag:(...args)=>events.push(args)}});
 const click=()=>listener({target:{closest:()=>target}});
 click();consent='no';click();assert.equal(events.length,0);
 consent='yes';click();assert.equal(events[0][1],'landing_checkout_click');
 target.dataset.landingAction='preview';click();assert.equal(events[1][1],'landing_preview');
 consent='no';click();assert.equal(events.length,2);
});

test('all six audience pages receive the full landing template',()=>{assert.deepEqual(landingPages.map(p=>p.slug).sort(),audiences.map(a=>a.slug).sort())});
