/* App: navigation, routing and click/form handling. */
const navList=$('#navlist');
navList.innerHTML=SITE.nav.map(([k,l])=>`<li><a href="#${k}" data-nav="${k}">${l}</a></li>`).join('');
$('#f-links').innerHTML=SITE.nav.slice(0,5).map(([k,l])=>`<li><a href="#${k}">${l}</a></li>`).join('')+SITE.nav.slice(5).map(([k,l])=>`<li><a href="#${k}">${l}</a></li>`).join('');
$('#f-addr').innerHTML=SITE.address.join('<br>');
$('#f-contact').innerHTML=`<li>${SITE.email}</li><li><a href="${SITE.mapUrl}" target="_blank" rel="noopener">Get directions</a></li><li>Mangala Aarti 5:30 AM · Sandhya Aarti 7:00 PM</li><li>Open daily (placeholder hours)</li>`;

function current(){
  const h=(location.hash||'#home').slice(1)||'home';
  if(h.startsWith('event-'))return{group:'events',r:()=>renderEvent(h.slice(6))};
  if(h.startsWith('album-'))return{group:'gallery',r:()=>renderAlbum(h.slice(6))};
  const map={home:renderHome,events:renderEvents,gallery:renderGallery,'live-darshan':renderLive,donations:renderDonations,'hall-reservations':renderHall,'contact-us':renderContact,'monthly-magazine':renderMagazine,'youth-activities':renderYouth,policies:renderPolicies};
  return map[h]?{group:h,r:map[h]}:{group:'home',r:renderHome};
}
function paint(focusId,scroll){
  const c=current();const o=c.r();
  main.innerHTML=o.html;
  document.title=(o.title==='Home'?'':o.title+' | ')+SITE.name;
  document.querySelectorAll('[data-nav]').forEach(a=>a.dataset.nav===c.group?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current'));
  if(scroll){window.scrollTo(0,0);$('#h1')&&!paint.first&&$('#h1').focus({preventScroll:true})}
  if(focusId)$('#'+focusId)?.focus({preventScroll:true});
  paint.first=false;
}
paint.first=true;
window.addEventListener('hashchange',()=>{$('#nav').classList.remove('open');$('#menu').setAttribute('aria-expanded','false');paint(null,true)});

/* ============ Interaction ============ */
document.addEventListener('click',e=>{
  const t=e.target.closest('[data-act]');if(!t)return;
  const a=t.dataset.act,v=t.dataset.v;
  const again=(id)=>paint(id||t.id);
  switch(a){
    case 'menu':{const n=$('#nav');const o=n.classList.toggle('open');t.setAttribute('aria-expanded',o);break}
    case 'theme':{const r=document.documentElement;const dark=r.dataset.theme?r.dataset.theme==='dark':matchMedia('(prefers-color-scheme:dark)').matches;r.dataset.theme=dark?'light':'dark';try{localStorage.setItem('kst-theme',r.dataset.theme)}catch(_){}break}
    case 'ev-view':ev.view=v;again();break;
    case 'ev-status':ev.status=v;again();break;
    case 'ev-clear':ev.from='';again('ev-from');break;
    case 'ev-prev':case 'ev-next':case 'ev-today':{let[y,m]=ev.month.split('-').map(Number);if(a==='ev-today'){ev.month=todayStr.slice(0,7)}else{m+=a==='ev-next'?1:-1;const d=new Date(y,m-1,1);ev.month=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`}again();break}
    case 'gal-year':galYear=+v;again();break;
    case 'mag-year':magYear=+v;again();break;
    case 'live':live.state=v;again();break;
    case 'toast':toast(t.dataset.m);break;
    case 'contact-with':pendingSubject=t.dataset.subject;if(location.hash==='#contact-us')paint(null,true);else location.hash='contact-us';break;
    case 'amt':don.amount=+v;{const i=$('#d-amount');i.value=v;document.querySelectorAll('[data-act=amt]').forEach(b=>b.setAttribute('aria-pressed',b===t));$('#don-submit').textContent='Donate $'+v}break;
    case 'don-again':don.done=null;don.amount=51;paint(null,true);break;
    case 'photo':lb.i=+t.dataset.i;lbShow();$('#lb').showModal();break;
    case 'lb-prev':lb.i=(lb.i-1+lb.items.length)%lb.items.length;lbShow();break;
    case 'lb-next':lb.i=(lb.i+1)%lb.items.length;lbShow();break;
    case 'lb-close':$('#lb').close();break;
  }
});
document.addEventListener('keydown',e=>{if(!$('#lb').open)return;if(e.key==='ArrowRight'){lb.i=(lb.i+1)%lb.items.length;lbShow()}if(e.key==='ArrowLeft'){lb.i=(lb.i-1+lb.items.length)%lb.items.length;lbShow()}});
$('#lb').addEventListener('click',e=>{if(e.target.id==='lb')e.target.close()});
document.addEventListener('change',e=>{
  if(e.target.id==='ev-from'){ev.from=e.target.value;paint('ev-from')}
  if(e.target.id==='ev-month'&&e.target.value){ev.month=e.target.value;paint('ev-month')}
});
document.addEventListener('input',e=>{
  if(e.target.id==='d-amount'){const n=parseFloat(e.target.value);don.amount=n>0?n:0;document.querySelectorAll('[data-act=amt]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.v===n));$('#don-submit').textContent=n>0?'Donate $'+n:'Donate'}
});
document.addEventListener('submit',async e=>{
  e.preventDefault();const f=e.target;
  if(f.id==='don-form'){
    if(!validate(f))return;
    const b=$('#don-submit'),fail=$('#don-fail');
    if(b.disabled)return;                       // blocks duplicate submissions
    b.disabled=true;b.textContent='Processing\u2026';fail.hidden=true;
    try{
      const r=await submitDonation({name:$('#d-name').value.trim(),street:$('#d-street').value.trim(),city:$('#d-city').value.trim(),state:$('#d-state').value.trim(),zip:$('#d-zip').value.trim(),email:$('#d-email').value.trim(),amount:+$('#d-amount').value,method:f.method.value});
      if(r){don.done={...r,amount:String(r.amount)};paint(null,true)}
    }catch(err){
      fail.textContent=err.message;fail.hidden=false;b.disabled=false;b.textContent='Donate $'+don.amount;
    }
  }
  if(f.id==='c-form'){
    if($('#c-site').value)return;               // spam trap: real visitors never fill this
    if(!validate(f))return;
    const b=$('#c-send');b.disabled=true;
    try{
      const sent=await sendContact({name:$('#c-name').value.trim(),email:$('#c-email').value.trim(),subject:$('#c-subject').value.trim(),message:$('#c-msg').value.trim()});
      $('#c-wrap').innerHTML=`<div class="card panel" role="status"><h2 style="font-size:1.6rem;margin-bottom:10px">Thank you</h2><p class="notice">${sent?'Your message has been sent to the mandir. We will reply by email.':'Demo only: in the live site this message would be delivered to the mandir inbox. Nothing was sent.'}</p><p style="margin-top:18px"><a class="btn btn-ghost" href="#contact-us" id="c-again">Send another</a></p></div>`;
      $('#c-again').addEventListener('click',ev2=>{ev2.preventDefault();paint(null,true)});
    }catch(err){
      b.disabled=false;let m=$('#c-fail');
      if(!m){m=document.createElement('p');m.id='c-fail';m.className='err';m.setAttribute('role','alert');b.before(m)}
      m.textContent=err.message;
    }
  }
});
try{const s=localStorage.getItem('kst-theme');if(s)document.documentElement.dataset.theme=s}catch(_){}
paint(null,false);
