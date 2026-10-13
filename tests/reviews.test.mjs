import test from 'node:test';import assert from 'node:assert/strict';
import {reviews,validateReviews,ratingSummary,reviewSection,landingReviews} from '../src/reviews.mjs';
import {readFileSync} from 'node:fs';
const products=JSON.parse(readFileSync(new URL('../data/products.json',import.meta.url))).products;
test('archive recovery has unique valid records matching current products',()=>{assert.equal(reviews.length,147);assert.equal(new Set(reviews.map(r=>r.handle)).size,28);validateReviews(reviews,products.map(p=>p.handle));});
test('invalid scores, duplicate IDs and product mappings are rejected',()=>{for(const rows of [[{...reviews[0],rating:6}],[reviews[0],reviews[0]],[{...reviews[0],handle:'unknown'}]])assert.throws(()=>validateReviews(rows,products.map(p=>p.handle)));});
test('pack rating uses only reviews of the pack',()=>{const h='career-survival-pack';const rows=reviews.filter(r=>r.handle===h);assert.equal(ratingSummary(h).count,5);assert.equal(ratingSummary(h).average,rows.reduce((s,r)=>s+r.rating,0)/5);});
test('complete review section preserves all reviews with accessible disclosure',()=>{const p=products.find(p=>p.handle==='uk-limited-company-formation-guide');const s=reviewSection(p);assert.equal((s.match(/class="review-card"/g)||[]).length,6);assert.match(s,/Show all 6 reviews/);assert.match(s,/Already purchased/);assert.doesNotMatch(s,/Verified purchase/);});
test('landing reviews stay within audience and link reviewed products',()=>{const h='career-survival-pack';const s=landingReviews({primary:[h],related:[]},products);assert.match(s,new RegExp('/products/'+h+'/'));assert.equal((s.match(/class="review-card"/g)||[]).length,1);});
