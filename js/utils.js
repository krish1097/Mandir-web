/* Shared helpers: date formatting, placeholder images, form fields, validation, small UI pieces. */
const $=(s,r=document)=>r.querySelector(s);
const main=$('#main');
const todayStr=new Intl.DateTimeFormat('en-CA',{timeZone:SITE.tz}).format(new Date());
const D=(s)=>new Date(s+'T12:00:00');
const fmt=(s,o)=>D(s).toLocaleDateString('en-US',o);
const longDate=s=>fmt(s,{weekday:'long',month:'long',day:'numeric',year:'numeric'});
const shortDate=s=>fmt(s,{month:'short',day:'numeric',year:'numeric'});
const fmtTime=t=>{const[h,m]=t.split(':').map(Number);return`${((h+11)%12)+1}:${String(m).padStart(2,'0')} ${h<12?'AM':'PM'}`};
const statusOf=e=>e.status==='cancelled'?'cancelled':(e.date>=todayStr?'upcoming':'past');
const hashN=s=>[...s].reduce((a,c)=>(a*31+c.charCodeAt(0))>>>0,7);
const ic={
 cal:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M8 3v4M16 3v4M3.5 10h17"/></svg>',
 heart:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.500 10c0 5.400-7.500 10-7.500 10z"/></svg>',
 img:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="4.5" width="17" height="15" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="M4 17l5-4.500 4 3.500 3-2.500 4.500 4"/></svg>',
 hall:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 20h18M5 20V9l7-5 7 5v11M9 20v-5h6v5"/></svg>',
 pin:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s6.500-5.800 6.500-11a6.500 6.500 0 0 0-13 0c0 5.200 6.500 11 6.500 11z"/><circle cx="12" cy="10" r="2.300"/></svg>',
 phone:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.500 1.500a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>',
 insta:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17" cy="7" r=".8"/></svg>',
 mail:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.500 7l8.500 6 8.500-6"/></svg>',
 clock:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.500"/><path d="M12 7v5l3 2"/></svg>',
 lock:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10.500" width="14" height="9.500" rx="2"/><path d="M8 10.500V8a4 4 0 0 1 8 0v2.500"/></svg>',
 shield:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l7 3v5c0 4.500-3 8-7 10-4-2-7-5.500-7-10V6z"/><path d="M9 12l2 2 4-4"/></svg>'
};
function ph(v,label,cls=''){return`<span class="ph v${v%6} ${cls}" data-label="${label}" role="img" aria-label="Placeholder photo: ${label}"><svg class="ph-ic" aria-hidden="true" viewBox="0 0 100 80"><use href="#shikhar"/></svg></span>`}
function toast(msg){const t=$('#toast');t.textContent=msg;t.hidden=false;clearTimeout(toast.h);toast.h=setTimeout(()=>t.hidden=true,3200)}
function field(id,label,o={}){
  const{type='text',req=true,ac='',hint='',ta=false,msg='',val='',ph:p=''}=o;
  const common=`id="${id}" name="${id}" ${req?'required':''} ${ac?`autocomplete="${ac}"`:''} data-msg="${msg||('Enter '+label.toLowerCase()+'.')}" aria-describedby="${id}-err ${hint?id+'-hint':''}" ${p?`placeholder="${p}"`:''}`;
  return`<div class="field"><label for="${id}">${label}${req?'':' <span class="req">(optional)</span>'}</label>${ta?`<textarea ${common}>${val}</textarea>`:`<input type="${type}" ${common} value="${val}">`}${hint?`<p class="hint" id="${id}-hint">${hint}</p>`:''}<p class="err" id="${id}-err" hidden></p></div>`;
}
function validate(form){
  let first=null;
  form.querySelectorAll('input[required],textarea[required]').forEach(el=>{
    const err=$('#'+el.id+'-err',form);let m='';
    const v=el.value.trim();
    if(el.type==='checkbox'){if(!el.checked)m=el.dataset.msg}
    else if(!v)m=el.dataset.msg;
    else if(el.type==='email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))m='Enter an email address like name@example.com.';
    else if(el.type==='number'&&!(parseFloat(v)>=1))m='Enter an amount of 1 or more.';
    if(err){err.textContent=m;err.hidden=!m}
    el.setAttribute('aria-invalid',m?'true':'false');
    if(m&&!first)first=el;
  });
  if(first)first.focus();
  return!first;
}
function pageHead(eyebrow,title,lead){return`<section class="page-head"><div class="wrap"><span class="eyebrow">${eyebrow}</span><h1 id="h1" tabindex="-1">${title}</h1>${lead?`<p class="lead">${lead}</p>`:''}<div class="rule"></div></div></section>`}
const chip=(e)=>{const s=statusOf(e);return`<span class="chip ${s==='upcoming'?'up':s==='cancelled'?'cx':''}">${s==='upcoming'?'Upcoming':s==='cancelled'?'Cancelled':'Past'}</span>`};
function albums(){
  const a=EVENTS.filter(e=>e.album).map(e=>({id:e.id,year:+e.date.slice(0,4),title:e.title,date:e.date,v:e.v,eventId:e.id}));
  return[...a,...EXTRA_ALBUMS].map(x=>({...x,count:12+hashN(x.id)%9})).sort((p,q)=>q.date.localeCompare(p.date));
}
function evCard(e){
  const href=e.album?`#album-${e.id}`:`#event-${e.id}`;
  return`<a class="card ev-card" href="${href}"><div class="media">${ph(e.v,e.title)}</div><div class="body"><span class="meta">${shortDate(e.date)} · ${e.cat}</span><h3>${e.title}</h3><span class="cta-link">${e.album?'View photos':'Event details'} →</span></div></a>`;
}
