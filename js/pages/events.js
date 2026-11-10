/* Page: events */
const ev={view:'list',status:'upcoming',month:todayStr.slice(0,7),from:''};
function renderEvents(){
  const list=EVENTS.filter(e=>ev.status==='all'||(e.date>=todayStr?'upcoming':'past')===ev.status)
    .filter(e=>!ev.from||e.date>=ev.from);
  list.sort((a,b)=>ev.status==='upcoming'?a.date.localeCompare(b.date):b.date.localeCompare(a.date));
  let body='';
  if(ev.view==='list'){
    const groups={};list.forEach(e=>(groups[e.date.slice(0,7)]=groups[e.date.slice(0,7)]||[]).push(e));
    body=Object.keys(groups).map(k=>`<h2 class="month-title">${fmt(k+'-01',{month:'long',year:'numeric'})}</h2><div class="stack">${groups[k].map(evRow).join('')}</div>`).join('')||`<p class="notice" style="background:var(--surface-2);color:var(--fg)">No events match these filters. Try “All” or clear the date.</p>`;
  }else{
    const[y,m]=ev.month.split('-').map(Number);
    const first=new Date(y,m-1,1).getDay(),days=new Date(y,m,0).getDate();
    let cells=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d=>`<div class="dow" role="columnheader">${d}</div>`).join('');
    const prevDays=new Date(y,m-1,0).getDate();
    for(let i=0;i<first;i++)cells+=`<div class="day out"><span class="n">${prevDays-first+i+1}</span></div>`;
    for(let d=1;d<=days;d++){
      const ds=`${ev.month}-${String(d).padStart(2,'0')}`;
      const es=EVENTS.filter(e=>e.date===ds);
      cells+=`<div class="day ${ds===todayStr?'today':''}"><span class="n">${d}</span><div class="evs">${es.map(e=>`<a class="e ${statusOf(e)==='past'?'past':''} ${e.status==='cancelled'?'cx':''}" href="#event-${e.id}" title="${e.title}"><span class="sr">${shortDate(ds)}: </span>${e.title}</a>`).join('')}</div></div>`;
    }
    const tail=(7-((first+days)%7))%7;for(let i=1;i<=tail;i++)cells+=`<div class="day out"><span class="n">${i}</span></div>`;
    const ml=EVENTS.filter(e=>e.date.startsWith(ev.month)).sort((a,b)=>a.date.localeCompare(b.date));
    body=`<div class="cal-head"><h2>${fmt(ev.month+'-01',{month:'long',year:'numeric'})}</h2><div style="display:flex;gap:8px"><button class="btn btn-ghost btn-sm" data-act="ev-prev" id="ev-prev" type="button">← Previous</button><button class="btn btn-ghost btn-sm" data-act="ev-today" id="ev-today" type="button">Today</button><button class="btn btn-ghost btn-sm" data-act="ev-next" id="ev-next" type="button">Next →</button></div></div>
    <div class="cal" role="grid" aria-label="Events in ${fmt(ev.month+'-01',{month:'long',year:'numeric'})}">${cells}</div>
    <h2 class="month-title">Events this month</h2><div class="stack">${ml.map(evRow).join('')||'<p class="muted">No events this month.</p>'}</div>`;
  }
  return{title:'Events',html:`${pageHead('Events','Mandir events','Festivals, satsang and community gatherings. All times are in the mandir’s local time (Eastern, ET).')}
  <section class="section" style="padding-top:28px"><div class="wrap">
    <div class="toolbar">
      <div><span class="tools-label" id="lb-view">View</span><div class="seg" role="group" aria-labelledby="lb-view"><button type="button" id="v-list" data-act="ev-view" data-v="list" aria-pressed="${ev.view==='list'}">List</button><button type="button" id="v-month" data-act="ev-view" data-v="month" aria-pressed="${ev.view==='month'}">Month</button></div></div>
      ${ev.view==='list'?`<div><span class="tools-label" id="lb-st">Show</span><div class="seg" role="group" aria-labelledby="lb-st">${['upcoming','past','all'].map(s=>`<button type="button" id="s-${s}" data-act="ev-status" data-v="${s}" aria-pressed="${ev.status===s}">${s[0].toUpperCase()+s.slice(1)}</button>`).join('')}</div></div>
      <div class="field" style="margin:0"><label for="ev-from" class="tools-label" style="margin:0 0 6px">From date</label><div style="display:flex;gap:8px"><input type="date" id="ev-from" value="${ev.from}" style="min-width:170px"><button class="btn btn-ghost btn-sm" type="button" data-act="ev-clear" id="ev-clear">Clear</button></div></div>`
      :`<div class="field" style="margin:0"><label for="ev-month" class="tools-label" style="margin:0 0 6px">Jump to month</label><input type="month" id="ev-month" value="${ev.month}" style="min-width:190px"></div>`}
    </div>
    ${body}
  </div></section>`};
}
function evRow(e){
  const[,m,d]=e.date.split('-');
  return`<article class="card ev-row"><div class="datebadge" aria-hidden="true"><span>${fmt(e.date,{month:'short'})}</span><b>${+d}</b></div>
  <div><h3><a href="#event-${e.id}" style="color:inherit;text-decoration:none">${e.title}</a></h3><p class="meta">${fmt(e.date,{weekday:'long',month:'long',day:'numeric',year:'numeric'})} · ${fmtTime(e.time)} ${SITE.tzLabel} · ${e.venue}</p><div class="tags">${chip(e)}<span class="chip cat">${e.cat}</span></div></div>
  <a class="btn btn-ghost btn-sm go" href="#event-${e.id}">Details<span class="sr"> for ${e.title}</span></a></article>`;
}
function renderEvent(id){
  const e=EVENTS.find(x=>x.id===id);if(!e)return renderEvents();
  return{title:e.title,html:`<section class="page-head"><div class="wrap"><a class="back" href="#events">← All events</a><span class="eyebrow" style="display:block;margin-bottom:12px">${e.cat}</span><h1 id="h1" tabindex="-1">${e.title}</h1></div></section>
  <section class="section" style="padding-top:20px"><div class="wrap detail">
    <div class="arch">${ph(e.v,'Event flyer or photo')}</div>
    <div><div style="display:flex;gap:8px;flex-wrap:wrap">${chip(e)}<span class="chip cat">${e.cat}</span></div>
      <dl class="facts"><div><dt>Date</dt><dd>${longDate(e.date)}</dd></div><div><dt>Time</dt><dd>${fmtTime(e.time)} ${SITE.tzLabel}</dd></div><div><dt>Location</dt><dd>${e.venue}, ${SITE.name}</dd></div></dl>
      <p style="max-width:62ch">${e.desc}</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:26px">${e.album?`<a class="btn btn-primary" href="#album-${e.id}">View photos</a>`:''}<a class="btn btn-ghost" href="#events">Back to events</a></div>
    </div></div></section>`};
}
