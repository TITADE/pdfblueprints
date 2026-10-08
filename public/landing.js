// Landing-page interactions are recorded only while analytics consent is granted.
// Checkout clicks are intent signals; they are never recorded as purchases.
document.addEventListener('click',event=>{
  const target=event.target.closest?.('[data-landing-action]');
  const page=document.querySelector('[data-landing-page]');
  if(!target||!page)return;
  try{
    window.pbTrack?.(target.dataset.landingAction==='preview'?'landing_preview':'payhip_click',{
      landing_page:page.dataset.landingPage,
      product_handle:target.dataset.productHandle,
      position:target.dataset.position,
      format:'pdf'
    });
  }catch{}
});
