import {readFileSync} from 'node:fs';
import {card,layout,esc} from './site.mjs';
export const audiences=JSON.parse(readFileSync(new URL('../data/audience-catalogue.json',import.meta.url),'utf8'));
export function audienceNav(){return `<nav class="wrap audience-nav" aria-label="Browse by audience">${audiences.map(a=>`<a href="/${a.slug}/">${esc(a.title)}</a>`).join('')}</nav>`;}
export function audienceCatalogue(slug,products){
 const a=audiences.find(a=>a.slug===slug);
 const rangeLabel=[...a.primary,...a.related].some(h=>products.find(p=>p.handle===h)?.category==='Packs')?'guides & packs':'guides';
 const render=handles=>handles.map(h=>{const p=products.find(p=>p.handle===h);if(!p)throw Error('Unknown audience product '+h);return card(p)}).join('');
 return `<section class="wrap section audience-catalogue" id="all-guides"><div class="section-heading"><div><p class="eyebrow">EXPLORE THE FULL RANGE</p><h2>${esc(a.title)}</h2></div><p>${a.primary.length+a.related.length} relevant ${rangeLabel}</p></div><p>${esc(a.intro)}</p><nav class="audience-topics" aria-label="Topics in this collection">${a.groups.map((g,i)=>`<a href="#topic-${i+1}">${esc(g.title)} (${g.handles.length})</a>`).join('')}</nav>${a.groups.map((g,i)=>`<section class="audience-group" id="topic-${i+1}"><h3>${esc(g.title)}</h3><div class="product-grid">${render(g.handles)}</div></section>`).join('')}</section>`;
}
export function audiencePage(a,products){return layout(a.title,`<section class="wrap library-heading"><p class="eyebrow">GUIDES FOR YOUR SITUATION</p><h1>${esc(a.headline)}</h1><p>${esc(a.intro)}</p><a class="button primary" href="#all-guides">Explore the guides ↓</a></section>${audienceNav()}${audienceCatalogue(a.slug,products)}<section class="wrap section"><h2>Look inside before you choose</h2><p>Open a product to see its contents, available sample pages, edition, price and purchase options. Packs list their included titles.</p><p>PDF purchases are delivered through Payhip. Available Amazon editions appear on the relevant product pages.</p><a href="/help/">Questions? Get help ↗</a></section>`,a.intro);}
