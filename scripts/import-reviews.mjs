// Import a manually reconciled JSON batch; this is not a Payhip API/export format.
import {readFileSync,writeFileSync} from 'node:fs';
import {validateReviews} from '../src/reviews.mjs';
const input=process.argv[2];if(!input)throw new Error('Usage: node scripts/import-reviews.mjs batch.json [--write]');
const path=new URL('../data/reviews.json',import.meta.url),data=JSON.parse(readFileSync(path,'utf8'));
const incoming=JSON.parse(readFileSync(input,'utf8')).reviews;
const handles=JSON.parse(readFileSync(new URL('../data/products.json',import.meta.url),'utf8')).products.map(p=>p.handle);
validateReviews(incoming,handles);
const allowed=['id','handle','name','title','body','rating','date','source','verifiedPurchase','status'];
for(const r of incoming){if(Object.keys(r).some(k=>!allowed.includes(k)))throw new Error('Unexpected field: do not import private customer data');}
const map=new Map(data.reviews.map(r=>[r.id,r]));let added=0,updated=0;
for(const r of incoming){if(map.has(r.id)){if(map.get(r.id).handle!==r.handle)throw new Error('Cannot change product for existing review');updated++;}else added++;map.set(r.id,r);}
data.reviews=[...map.values()];validateReviews(data.reviews,handles);
if(process.argv.includes('--write'))writeFileSync(path,JSON.stringify(data,null,2)+'\n');
console.log(`${process.argv.includes('--write')?'Imported':'Dry run'}: ${added} new, ${updated} existing; ${data.reviews.length} total`);
