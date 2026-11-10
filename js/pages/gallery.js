/* Page: gallery */
let galYear=+todayStr.slice(0,4);
function renderGallery(){
  const all=albums();const years=[...new Set(all.map(a=>a.year))].sort((a,b)=>b-a);if(!years.includes(galYear))galYear=years[0];
  const show=all.filter(a=>a.year===galYear);
  return{title:'Gallery',html:`${pageHead('Gallery','Photo gallery','Albums from festivals, satsang and community events. Choose a year, then open an album.')}
  <section class="section" style="padding-top:28px"><div class="wrap">
    <div class="years" role="group" aria-label="Choose year">${years.map(y=>`<button type="button" id="y-${y}" data-act="gal-year" data-v="${y}" aria-pressed="${y===galYear}">${y}${y===+todayStr.slice(0,4)?' (this year)':''}</button>`).join('')}</div>
    <div class="grid g3">${show.map(a=>`<a class="card ev-card" href="#album-${a.id}"><div class="media">${ph(a.v,a.title)}</div><div class="body"><span class="meta">${shortDate(a.date)} · ${a.count} photos</span><h3>${a.title}</h3><span class="cta-link">Open album →</span></div></a>`).join('')}</div>
  </div></section>`};
}
let lb={items:[],i:0,title:''};
function renderAlbum(id){
  const a=albums().find(x=>x.id===id);if(!a)return renderGallery();
  lb={title:a.title,i:0,items:Array.from({length:a.count},(_,i)=>({v:a.v+i+(i%3),n:i+1}))};
  galYear=a.year;
  return{title:a.title,html:`<section class="page-head"><div class="wrap"><a class="back" href="#gallery">← Gallery, ${a.year}</a><span class="eyebrow" style="display:block;margin-bottom:12px">${shortDate(a.date)} · ${a.count} photos</span><h1 id="h1" tabindex="-1">${a.title}</h1>${a.eventId?`<p style="margin-top:12px"><a href="#event-${a.eventId}" class="cta-link">Event details →</a></p>`:''}</div></section>
  <section class="section" style="padding-top:24px"><div class="wrap"><div class="photos">${lb.items.map((p,i)=>`<button type="button" class="${i%7===0?'wide':''}" data-act="photo" data-i="${i}" aria-label="Open photo ${p.n} of ${a.count}">${ph(p.v,'Photo '+p.n,'nolabel')}</button>`).join('')}</div>
  <p class="muted" style="margin-top:22px;font-size:.9rem">Placeholder images. In the live site, thumbnails load lazily from the approved media library.</p></div></section>`};
}
function lbShow(){const p=lb.items[lb.i];$('#lb-stage').innerHTML=ph(p.v,`${lb.title}, photo ${p.n}`);$('#lb-cap').textContent=`Photo ${p.n} of ${lb.items.length}`}
