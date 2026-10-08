import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import vm from 'node:vm';
import {landingPages,landingPage} from '../src/landing.mjs';
const products=JSON.parse(readFileSync('data/products.json')).products;
for(const page of landingPages)test(page.slug+' has valid product, preview and pack destinations',()=>{
 const html=landingPage(page,products);
 assert.equal((html.match(/<h1>/g)||[]).length,1);
 for(const sample of page.samples)assert.ok(existsSync('public'+sample.src));
 for(const handle of [page.featured,page.pack])assert.ok(html.includes(products.find(p=>p.handle===handle).payhipUrl));
 assert.ok(html.includes('SAVE £11'));
 assert.ok(!html.includes('undefined'));
 assert.ok(html.includes('data-landing-action="preview"'));
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
