import {mkdir,readdir,readFile,writeFile,chmod,rm} from 'node:fs/promises';
async function forceWrite(url,content){try{await chmod(url,0o644)}catch(e){if(e.code!=='ENOENT')throw e}try{await writeFile(url,content,{mode:0o644})}catch(e){if(e.code!=='EACCES'&&e.code!=='EPERM')throw e;await rm(url,{force:true});await writeFile(url,content,{mode:0o644})}}
import {home,productPage,catalogue,infoPage,layout} from '../src/site.mjs';
import {blogIndex,articlePage,collectionPage,textPage} from '../src/editorial.mjs';
const root=new URL('../',import.meta.url),dist=new URL('dist/',root);
const products=JSON.parse(await readFile(new URL('data/products.json',root),'utf8')).products;
await mkdir(dist,{recursive:true});
async function copyAssets(source,dest){await mkdir(dest,{recursive:true});for(const entry of await readdir(source,{withFileTypes:true})){const from=new URL(entry.name+(entry.isDirectory()?'/':''),source),to=new URL(entry.name+(entry.isDirectory()?'/':''),dest);if(entry.isDirectory())await copyAssets(from,to);else {const content=await readFile(from);let previous;try{previous=await readFile(to)}catch(e){if(e.code!=='ENOENT')throw e;}if(!previous||!content.equals(previous))await writeFile(to,content);}}}
await copyAssets(new URL('public/',root),dist);
const routes=[];
async function page(path,content,canonicalPath){if(!canonicalPath)routes.push('/'+path);const canonical='https://pdfblueprints.store/'+(canonicalPath||path);content=content.replace('</head>',`<link rel="canonical" href="${canonical}"><meta property="og:url" content="${canonical}"><meta property="og:site_name" content="PDFBlueprints"></head>`);if(process.env.SITE_RELEASE==='production'){content=content.replace('<meta name="robots" content="noindex,nofollow">','<meta name="robots" content="index,follow">').replace(/<div class="preview-bar">.*?<\/div>/,'');}const dir=new URL(path,dist);await mkdir(dir,{recursive:true});await writeFile(new URL('index.html',dir),content)}
await page('',home(products));
await page('guides/',catalogue(products));
for(const p of products)await page('products/'+p.handle+'/',productPage(p,products));
await page('about/',infoPage('about'));await page('help/',infoPage('help'));
await writeFile(new URL('404.html',dist),layout('Page not found','<section class="wrap prose"><p class="eyebrow">404</p><h1>Let’s find your<br><em>next step.</em></h1><p>This page could not be found.</p><a class="button primary" href="/guides/">Explore the library ↗</a></section>'));
const posts=JSON.parse(await readFile(new URL('data/posts.json',root),'utf8')).posts;
const collections=JSON.parse(await readFile(new URL('data/collections.json',root),'utf8')).collections;
const policyDraft=JSON.parse(await readFile(new URL('data/policies.json',root),'utf8'));
if(process.env.SITE_RELEASE==='production'&&!policyDraft.approvedForLaunch)throw new Error('Confirm seller details, pricing and replacement policies before production release.');
const policies=policyDraft.pages;
const extras=JSON.parse(await readFile(new URL('data/store-pages.json',root),'utf8')).pages;
await page('blogs/guides/',blogIndex(posts));
for(const p of posts)await page('blogs/guides/'+p.slug+'/',articlePage(p,posts));
for(const c of collections)await page('collections/'+c.slug+'/',collectionPage(c,products));
await page('collections/all/',catalogue(products),'guides/');
await page('pages/about-us/',infoPage('about'),'about/');
for(const p of extras)await page(p.path,textPage(p.title,p.html));
for(const p of policies)await page('policies/'+p.slug+'/',textPage(p.title,(policyDraft.approvedForLaunch?'':"<aside class=\"article-note\">Draft for review before the new store launches. Seller identification and final pricing details are still being confirmed.</aside>")+p.html));
await writeFile(new URL('sitemap.xml',dist),'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+routes.map(p=>'<url><loc>https://pdfblueprints.store'+p+'</loc></url>').join('')+'</urlset>');
await writeFile(new URL('_redirects',dist),'/blogs/guides/every-uk-director-now-has-to-prove-who-they-are-heres-how /blogs/guides/companies-house-identity-verification-directors/ 301\n/collections/:collection/products/:handle /products/:handle/ 301\n/blogs /blogs/guides/ 301\n/pages/about /about/ 301\n/pages/help /help/ 301\n/search /guides/ 302\n/cart /guides/ 302\n');
const robots=process.env.SITE_RELEASE==='production'?'User-agent: *\nAllow: /\nSitemap: https://pdfblueprints.store/sitemap.xml\n':'User-agent: *\nDisallow: /\n';
await forceWrite(new URL('robots.txt',dist),robots);
await writeFile(new URL('_headers',dist),'/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Frame-Options: SAMEORIGIN\n');
console.log(`Built ${products.length} products, ${posts.length} articles, ${collections.length} collections and store pages. Payhip checkout links connected. Release mode: ${process.env.SITE_RELEASE||'preview'}.`);
