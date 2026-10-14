// Meta PageView only; a previous analytics opt-in does not grant marketing consent.
(()=>{
 const key='pb-marketing-consent',id='1091026997181594';let consent=null,initialised=false,sent=false;
 try{consent=localStorage.getItem(key)}catch{}
 const clear=()=>{for(const name of ['_fbp','_fbc'])for(const domain of ['',location.hostname,...location.hostname.split('.').map((_,i,a)=>'.'+a.slice(i).join('.'))])document.cookie=name+'=; Max-Age=0; path=/'+(domain?'; domain='+domain:'');};
 function start(){
  if(consent!=='yes')return;
  if(!window.fbq){const n=window.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!window._fbq)window._fbq=n;n.push=n;n.loaded=true;n.version='2.0';n.queue=[];const s=document.createElement('script');s.async=true;s.src='https://connect.facebook.net/en_US/fbevents.js';document.head.appendChild(s);}
  window.fbq('consent','grant');
  if(!initialised){window.fbq('set','autoConfig',false,id);window.fbq('init',id);initialised=true;}
  if(!sent){window.fbq('trackSingle',id,'PageView');sent=true;}
 }
 window.setMarketingConsent=value=>{consent=value==='yes'?'yes':'no';try{localStorage.setItem(key,consent)}catch{}
  if(consent==='yes')start();else{if(window.fbq){if(window.fbq.queue){window.fbq.queue=window.fbq.queue.filter(a=>!['track','trackSingle','trackCustom','trackSingleCustom'].includes(a[0]));}window.fbq('consent','revoke');}clear();}
 };
 window.addEventListener('storage',e=>{if(e.key===key||e.key===null)window.setMarketingConsent(e.newValue)});
 if(consent==='yes')start();else clear();
})();
