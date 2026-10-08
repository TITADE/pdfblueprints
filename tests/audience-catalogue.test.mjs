import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {audiences,audienceCatalogue} from '../src/audience-catalogue.mjs';
const products=JSON.parse(readFileSync('data/products.json')).products;
test('every product and pack has exactly one primary audience',()=>{
 const assigned=audiences.flatMap(a=>a.primary);
 assert.equal(assigned.length,products.length);
 assert.equal(new Set(assigned).size,products.length);
 assert.deepEqual([...assigned].sort(),products.map(p=>p.handle).sort());
});
test('cross-listings are valid, unique and rendered on each page',()=>{
 for(const a of audiences){
 const handles=[...a.primary,...a.related];assert.equal(handles.length,new Set(handles).size);
 const html=audienceCatalogue(a.slug,products);
 for(const h of handles){assert.ok(products.some(p=>p.handle===h));assert.ok(html.includes('/products/'+h+'/'));}
 }
});
test('audience boundaries distinguish employers, employees and property buyers',()=>{
 const home=h=>audiences.find(a=>a.primary.includes(h)).slug;
 assert.equal(home('the-menopause-equality-action-plan-compliance'),'business-compliance');
 assert.equal(home('the-complete-menopause-at-work-blueprint'),'career-and-work');
 assert.equal(home('first-time-home-buyers-workbook'),'home-and-life');
 assert.equal(home('us-first-time-landlord-blueprint'),'landlords');
 assert.ok(audiences.find(a=>a.slug==='start-a-business').related.includes('the-making-tax-digital-survival-blueprint'));
});

test('topic groups preserve each audience catalogue without omission or duplication',()=>{for(const a of audiences){const grouped=a.groups.flatMap(g=>g.handles);assert.equal(grouped.length,new Set(grouped).size);assert.deepEqual([...grouped].sort(),[...a.primary,...a.related].sort())}});
