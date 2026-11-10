/* Page: magazine */
let magYear=2026;
function cover(i,big){const t=ISSUES[i];return`<div class="cover c${(t.m)%3} ${big?'big':''}" role="img" aria-label="${MONTHS[t.m]} ${t.y} issue cover, placeholder"><span class="cv-m">${MONTHS[t.m].slice(0,3)} ${t.y}</span><img src="assets/img/isso.png" alt=""><span class="cv-t">${t.title}</span></div>`}
function renderMagazine(){
  const cur=ISSUES[0];
  const arch=ISSUES.map((x,i)=>({x,i})).filter(o=>o.i>0&&o.x.y===magYear);
  return{title:'Monthly Magazine',html:`${pageHead('Monthly Magazine','Monthly Magazine','Published each month by the official ISSO (International Swaminarayan Satsang Organization) for devotees and families.')}
  <section class="section" style="padding-top:28px"><div class="wrap current">
    ${cover(0,true)}
    <div><span class="eyebrow">Current issue</span><h2 style="margin:8px 0 12px">${MONTHS[cur.m]} ${cur.y}: ${cur.title}</h2><p class="lead" style="margin-bottom:22px">Festival highlights, satsang reflections, youth stories and seva updates from around the world. Placeholder description.</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn btn-primary" type="button" data-act="toast" data-m="The PDF would open here once the magazine source is confirmed" id="mag-read">Read this issue (PDF)</button><button class="btn btn-ghost" type="button" data-act="toast" data-m="The PDF would download here once the magazine source is confirmed" id="mag-dl">Download PDF</button></div></div>
  </div></section>
  <section class="section alt"><div class="wrap">
    <div class="section-head"><div><span class="eyebrow">Archive</span><h2>Past issues</h2></div>
      <div class="years" style="margin:0" role="group" aria-label="Archive year">${[2026,2025].map(y=>`<button type="button" id="my-${y}" data-act="mag-year" data-v="${y}" aria-pressed="${y===magYear}">${y}</button>`).join('')}</div></div>
    <div class="grid g4">${arch.map(({x,i})=>`<div class="issue">${cover(i)}<h3>${MONTHS[x.m]} ${x.y}</h3><div class="btns"><button class="btn btn-ghost btn-sm" type="button" data-act="toast" data-m="PDF link would open here">View PDF</button><button class="btn btn-ghost btn-sm" type="button" data-act="toast" data-m="PDF download would start here">Download</button></div></div>`).join('')}</div>
  </div></section>`};
}
