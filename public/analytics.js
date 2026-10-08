// Basic opt-in: no Google library is requested before consent.
(()=>{
 const id='G-84FTXSFFK7',key='pb-consent';
 let consent=null;
 try{consent=localStorage.getItem(key)}catch{}
 const allowed=()=>consent==='yes'&&!window['ga-disable-'+id];
 window['ga-disable-'+id]=consent!=='yes';
 const clearCookies=()=>{
  const domains=['',location.hostname,...location.hostname.split('.').map((_,i,a)=>'.'+a.slice(i).join('.'))];
  for(const cookie of document.cookie.split(';')){
   const name=cookie.split('=')[0].trim();if(!/^_ga(?:_|$)/.test(name))continue;
   for(const domain of domains)document.cookie=name+'=; Max-Age=0; path=/'+(domain?'; domain='+domain:'');
  }
 };
 window.loadGA=()=>{
  if(!allowed())return;
  if(window.__ga)return;
  window.__ga=true;window.dataLayer=window.dataLayer||[];
  window.gtag=function(){window.dataLayer.push(arguments)};
  window.gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
  window.gtag('js',new Date());
  window.gtag('config',id,{allow_google_signals:false,allow_ad_personalization_signals:false});
  const script=document.createElement('script');script.async=true;script.src='https://www.googletagmanager.com/gtag/js?id='+id;document.head.appendChild(script);
 };
 window.pbTrack=(name,params)=>{if(allowed()&&window.gtag)window.gtag('event',name,params)};
 window.setAnalyticsConsent=value=>{
  consent=value==='yes'?'yes':'no';
  window['ga-disable-'+id]=consent!=='yes';
  try{localStorage.setItem(key,consent)}catch{}
  if(consent==='yes'){
   if(window.__ga){window.gtag('consent','update',{analytics_storage:'granted'});window.gtag('config',id,{send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false});}
   window.loadGA();
  }else{
   // Discard pending events if the async library has not finished loading.
   if(window.dataLayer)for(let i=window.dataLayer.length-1;i>=0;i--)if(['event','config','js'].includes(window.dataLayer[i]?.[0]))window.dataLayer.splice(i,1);
   if(window.gtag)window.gtag('consent','update',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
   clearCookies();
  }
 };
 window.addEventListener('storage',event=>{if(event.key===key||event.key===null)window.setAnalyticsConsent(event.newValue)});
 if(consent==='yes')window.loadGA();else clearCookies();
})();
