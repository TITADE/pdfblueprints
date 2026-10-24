const menu=document.querySelector('#menu-button'),nav=document.querySelector('#mobile-nav');
menu?.addEventListener('click',()=>{const expanded=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!expanded));nav.hidden=expanded});
const dialog=document.querySelector('#sample-dialog'),sampleImage=document.querySelector('#sample-image');
document.querySelectorAll('[data-sample]').forEach(button=>button.addEventListener('click',()=>{sampleImage.src=button.dataset.sample;sampleImage.alt=button.dataset.alt;document.querySelector('#sample-full').href=button.dataset.sample;dialog.showModal()}));
document.querySelector('.dialog-close')?.addEventListener('click',()=>dialog.close());
dialog?.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
const grid=document.querySelector('#catalogue-grid');
if(grid){const cards=[...grid.children],search=document.querySelector('#search'),sort=document.querySelector('#sort'),buttons=[...document.querySelectorAll('[data-filter]')];const params=new URLSearchParams(location.search);let category=buttons.some(b=>b.dataset.filter===params.get('category'))?params.get('category'):'All';search.value=params.get('q')||'';if(params.get('q')){requestAnimationFrame(()=>{const r=document.querySelector('.search-row');if(r)r.scrollIntoView({block:'start'})})};
function render(){const term=search.value.toLowerCase().trim();let visible=0;const ordered=[...cards];if(sort.value==='title')ordered.sort((a,b)=>a.dataset.title.localeCompare(b.dataset.title));if(sort.value==='low'||sort.value==='high')ordered.sort((a,b)=>(Number(a.dataset.price)-Number(b.dataset.price))*(sort.value==='low'?1:-1));ordered.forEach(c=>{c.hidden=!((category==='All'||c.dataset.category===category)&&c.dataset.title.includes(term));if(!c.hidden)visible++;grid.append(c)});buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===category)));document.querySelector('#result-count').textContent=`${visible} ${visible===1?'result':'results'}`;document.querySelector('#empty-state').hidden=visible!==0;const query=new URLSearchParams();if(category!=='All')query.set('category',category);if(term)query.set('q',search.value);history.replaceState(null,'',location.pathname+(query.size?'?'+query:''));}
buttons.forEach(b=>b.addEventListener('click',()=>{category=b.dataset.filter;render()}));search.addEventListener('input',render);sort.addEventListener('change',render);document.querySelector('#clear-filters').addEventListener('click',()=>{category='All';search.value='';sort.value='featured';render();search.focus()});render();}
const articleSearch=document.querySelector('#article-search');
articleSearch?.addEventListener('input',()=>{const q=articleSearch.value.toLowerCase().trim();let n=0;document.querySelectorAll('[data-article]').forEach(a=>{a.hidden=!a.dataset.article.includes(q);if(!a.hidden)n++});document.querySelector('#article-count').textContent=`${n} articles`;document.querySelector('#article-empty').hidden=n!==0;});

// Outbound referrals are not confirmed checkouts or purchases.
document.addEventListener('click',e=>{
 const a=e.target.closest?.('a[href*="payhip.com"]');if(!a||a.dataset.landingAction)return;
 let url;try{url=new URL(a.href)}catch{return}if(url.hostname!=='payhip.com')return;
 const handle=a.dataset.productHandle||location.pathname.match(/^\/products\/([^/]+)/)?.[1]||'';
 window.pbTrack?.('payhip_click',{product_handle:handle,payhip_product_id:url.pathname.split('/').filter(Boolean).pop(),format:'pdf',link_url:a.href,page_path:location.pathname});
});

 ;(function(){if(!window.loadGA)return;const get=k=>{try{return localStorage.getItem(k)}catch{return null}};const link=document.querySelector('.cookie-settings');
function close(){document.getElementById('cookie-banner')?.remove()}
function show(){if(document.getElementById('cookie-banner'))return;const b=document.createElement('div');b.id='cookie-banner';b.setAttribute('role','dialog');b.setAttribute('aria-label','Cookie consent');b.innerHTML='<div><p>Choose optional cookies. Analytics helps us understand site use. Marketing uses Meta Pixel to measure advertising and support relevant ads. Both are optional. <a href="/policies/privacy-policy/">Privacy policy</a></p><label><input type="checkbox" id="pb-analytics-choice"> Analytics (Google Analytics)</label> <label><input type="checkbox" id="pb-marketing-choice"> Marketing (Meta Pixel)</label></div><div><button type="button" data-c="no">Reject optional</button><button type="button" data-c="save">Save choices</button><button type="button" data-c="yes" class="accept">Accept all</button></div>';document.body.appendChild(b);b.querySelector('#pb-analytics-choice').checked=get('pb-consent')==='yes';b.querySelector('#pb-marketing-choice').checked=get('pb-marketing-consent')==='yes';b.addEventListener('click',e=>{const c=e.target.dataset?.c;if(!c)return;const analytics=c==='save'?b.querySelector('#pb-analytics-choice').checked:c==='yes';const marketing=c==='save'?b.querySelector('#pb-marketing-choice').checked:c==='yes';window.setAnalyticsConsent(analytics?'yes':'no');window.setMarketingConsent?.(marketing?'yes':'no');close()});}
if(link){link.hidden=false;link.addEventListener('click',show)}
if(get('pb-consent')===null||get('pb-marketing-consent')===null)show()})();

// Amazon referrals are clicks, not sales. Record only with current analytics consent.
document.addEventListener('click',event=>{const link=event.target.closest?.('a[data-amazon-format]');if(!link)return;try{window.pbTrack?.('amazon_format_click',{product_handle:link.dataset.productHandle,format:link.dataset.amazonFormat,destination_marketplace:'amazon.co.uk',link_url:link.href});}catch{}});
