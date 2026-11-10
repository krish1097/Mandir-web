/* Page: youth */
function renderYouth(){
  const L=LESSONS[0];
  return{title:'Youth Activities',html:`${pageHead('Youth Activities','Youth activities','Weekly teachings, retreats and gatherings for children and teens. Youth content is kept separate from general mandir events.')}
  <section class="section" style="padding-top:28px"><div class="wrap">
    <div class="section-head"><div><span class="eyebrow">This week’s teaching</span><h2>${L.topic}</h2></div></div>
    <article class="card lesson-feature"><div class="split" style="align-items:center"><div><p class="meta" style="margin-bottom:8px">Sunday class · ${longDate(L.date)}</p><p style="max-width:60ch">${L.summary}</p><div class="res">${L.res.map(r=>`<span class="chip cat">${r}</span>`).join('')}</div></div><div class="media" style="border-radius:12px;aspect-ratio:16/10">${ph(2,'Class photo or slide')}</div></div></article>
  </div></section>
  <section class="section alt"><div class="wrap">
    <div class="section-head"><div><span class="eyebrow">Upcoming youth events</span><h2>Join us</h2></div></div>
    <div class="stack">${YOUTH_EVENTS.map(y=>`<article class="card ev-row"><div class="datebadge" aria-hidden="true"><span>${fmt(y.date,{month:'short'})}</span><b>${+y.date.slice(8)}</b></div><div><h3>${y.title}</h3><p class="meta">${longDate(y.date)} · ${fmtTime(y.time)} ${SITE.tzLabel}</p><p style="margin-top:6px">${y.desc}</p></div>${y.reg?`<button class="btn btn-primary btn-sm go" type="button" data-act="contact-with" data-subject="Youth Event Registration: ${y.title}" id="reg-${y.id}">Register interest</button>`:`<span class="chip go">No registration needed</span>`}</article>`).join('')}</div>
    <p class="muted" style="margin-top:16px">Registration questions: ${SITE.youthEmail}</p>
  </div></section>
  <section class="section"><div class="wrap">
    <div class="section-head"><div><span class="eyebrow">Lesson archive</span><h2>Previous weekly teachings</h2></div></div>
    <div class="stack">${LESSONS.slice(1).map(l=>`<details class="arc"><summary><span>${l.topic}<span class="meta" style="display:block;font-weight:500">${shortDate(l.date)}</span></span></summary><div class="in"><p style="max-width:62ch">${l.summary}</p><div class="res">${l.res.map(r=>`<span class="chip cat">${r}</span>`).join('')}</div></div></details>`).join('')}</div>
    <div class="consent" style="margin-top:34px">${ic.shield}<div><h3 style="margin-bottom:4px">Photos of children</h3><p class="muted">We publish photos that show identifiable children only after a parent or guardian gives written consent and the mandir team has reviewed the photo.</p></div></div>
  </div></section>`};
}
