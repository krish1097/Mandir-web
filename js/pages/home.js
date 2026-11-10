/* Page: home */
function renderHome(){
  const ups=EVENTS.filter(e=>statusOf(e)==='upcoming').sort((a,b)=>a.date.localeCompare(b.date));
  const next=ups[0];
  const recent=EVENTS.filter(e=>e.album&&statusOf(e)==='past').sort((a,b)=>b.date.localeCompare(a.date)).slice(0,3);
  const ups_=UPDATES.filter(u=>u.publish<=todayStr&&(!u.expire||u.expire>=todayStr)).sort((a,b)=>(b.priority==='high')-(a.priority==='high')||b.publish.localeCompare(a.publish));
  return{title:'Home',html:`
  <section class="hero"><div class="wrap">
    <div>
      <p class="greet" lang="gu">જય સ્વામિનારાયણ</p>
      <h1 id="h1" tabindex="-1">Welcome to Kalupur Swaminarayan Temple</h1>
      <p class="lead">Darshan, satsang and seva for devotees and families, a chapter of ISSO. Join us in person or watch live from home.</p>
      <div class="hero-actions"><a class="btn btn-primary" href="#events">See upcoming events</a><a class="btn btn-ghost" href="#live-darshan">Watch live darshan</a></div>
    </div>
    <div class="hero-art"><div class="arch">${ph(0,'Hero photo: murti darshan')}</div></div>
  </div></section>

  <div class="wrap"><div class="quick">
    <a class="qtile" href="#events">${ic.cal}<strong>Upcoming events</strong><span>${next?`Next: ${next.title}, ${fmt(next.date,{month:'short',day:'numeric'})}`:'See the full calendar'}</span></a>
    <a class="qtile" href="#donations">${ic.heart}<strong>Donate</strong><span>Support the mandir with a secure online gift.</span></a>
    <a class="qtile" href="#gallery">${ic.img}<strong>Gallery</strong><span>Photos from festivals and community events.</span></a>
    <a class="qtile" href="#hall-reservations">${ic.hall}<strong>Hall inquiries</strong><span>Seats 500 guests. Tables and chairs provided.</span></a>
  </div></div>

  <section class="section"><div class="wrap">
    <div class="section-head"><div><span class="eyebrow">Important updates</span><h2>From the mandir office</h2></div></div>
    <ul class="updates">${ups_.map(u=>`<li class="update ${u.priority}"><time datetime="${u.publish}">${fmt(u.publish,{month:'short',day:'numeric'})}</time><div><h3>${u.title}${u.priority==='high'?'<span class="tag">Important</span>':''}</h3><p class="muted">${u.body}</p></div></li>`).join('')}</ul>
  </div></section>

  <section class="section alt"><div class="wrap">
    <div class="section-head"><div><span class="eyebrow">Recent events</span><h2>Moments from the mandir</h2></div><a class="cta-link" href="#gallery">All photo albums →</a></div>
    <div class="grid g3">${recent.map(evCard).join('')}</div>
  </div></section>

  <section class="section"><div class="wrap">
    <div class="live-strip">
      <div><h2>Live Darshan</h2><p>Watch the murtis from anywhere during approved broadcast hours.</p></div>
      <a class="btn btn-saffron" href="#live-darshan">Open live darshan</a>
    </div>
  </div></section>

  <section class="section alt"><div class="wrap visit">
    <div><span class="eyebrow">Visit the mandir</span><h2 style="margin:8px 0 14px">Darshan timings</h2>
      <p class="muted" style="margin-bottom:12px">Placeholder timings. Please confirm the daily schedule with the mandir.</p>
      <table class="times"><tbody>${SITE.aarti.map(a=>`<tr><th scope="row">${a[0]}</th><td>${a[1]}</td></tr>`).join('')}</tbody></table></div>
    <div class="card panel"><h3 style="margin-bottom:12px">Find us</h3>
      <ul class="side-list">
        <li>${ic.pin}<span>${SITE.address.join('<br>')}</span></li>
        <li>${ic.mail}<span>${SITE.email}</span></li>
        <li>${ic.pin}<span><a href="${SITE.mapUrl}" target="_blank" rel="noopener">Get directions</a></span></li></ul>
      <div class="media" style="margin-top:18px;border-radius:10px;aspect-ratio:16/9">${ph(3,'Map and directions placeholder')}</div>
    </div>
  </div></section>`};
}
