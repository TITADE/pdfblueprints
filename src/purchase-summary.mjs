import {readFileSync} from 'node:fs';
const previews=Object.fromEntries(JSON.parse(readFileSync(new URL('../data/previews.json',import.meta.url),'utf8')).previews.map(p=>[p.handle,p]));
const packs=JSON.parse(readFileSync(new URL('../data/packs.json',import.meta.url),'utf8'));
const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function checkoutUrl(value){const match=/^https:\/\/payhip\.com\/b\/([A-Za-z0-9]+)\/?$/.exec(value||'');return match?'https://payhip.com/buy?s=1&cart_links%5B%5D='+encodeURIComponent(match[1])+'&qty%5B'+encodeURIComponent(match[1])+'%5D=1':value;}
export function purchaseSummary(p){
 const preview=previews[p.handle],members=packs[p.handle];
 const pages=p.handle==='uk-limited-company-formation-guide'?30:preview?.pageCount;
 const parts=[];
 if(members){parts.push(members.length+' complete guides as separate PDFs');if(Number.isInteger(pages)&&pages>0)parts.push(pages+' pages in total');}
 else {parts.push(Number.isInteger(pages)&&pages>0?pages+'-page PDF':'PDF download');
 if(p.handle==='practical-ai-governance-and-compliance')parts.push('separate companion resources ZIP');
 if(p.handle==='renters-rights-act-2025-landlord-compliance-blueprint')parts.push('23 practical tools included within the guide');
 if(p.handle==='burnout-recovery-blueprint')parts.push('12 printable tools included within the guide');}
 parts.push('Download after payment');
 return '<p class="purchase-note purchase-summary"><strong>What you receive:</strong> '+parts.map(escape).join(' · ')+'</p>';
}
export const checkoutReassurance='Secure checkout with Payhip. Your downloads are available after payment.';
