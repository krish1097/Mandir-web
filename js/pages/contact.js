/* Page: contact */
let pendingSubject='';
function renderContact(){
  const subj=pendingSubject;pendingSubject='';
  return{title:'Contact Us',html:`${pageHead('Contact Us','Contact the mandir','Questions, hall inquiries or feedback. We read every message.')}
  <section class="section" style="padding-top:28px"><div class="wrap split">
    <div id="c-wrap"><form class="card panel" id="c-form" novalidate aria-labelledby="c-h"><h2 id="c-h" style="font-size:1.6rem;margin-bottom:20px">Send a message</h2>
      ${field('c-name','Your name',{ac:'name'})}
      ${field('c-email','Email',{type:'email',ac:'email'})}
      ${field('c-subject','Subject',{val:subj,msg:'Enter a subject.'})}
      ${field('c-msg','Message',{ta:true,msg:'Enter your message.'})}
      <div class="hp" aria-hidden="true"><label for="c-site">Leave this field empty</label><input type="text" id="c-site" name="site" tabindex="-1" autocomplete="off"></div>
      <button class="btn btn-primary" type="submit" id="c-send">Send message</button>
      <p class="hint" style="margin-top:12px">Messages go to the mandir’s inbox. Spam protection and rate limits apply.</p></form></div>
    <aside class="card panel"><h3 style="margin-bottom:14px">Mandir details</h3>
      <ul class="side-list"><li>${ic.pin}<span>${SITE.name}<br>${SITE.address.join('<br>')}</span></li><li>${ic.mail}<span>${SITE.email}</span></li><li>${ic.pin}<span><a href="${SITE.mapUrl}" target="_blank" rel="noopener">Get directions</a></span></li><li>${ic.insta}<span><a href="${SITE.insta}" target="_blank" rel="noopener">Instagram @issosnj</a></span></li><li>${ic.clock}<span>Office hours: Tue to Sun, 10:00 AM to 6:00 PM (placeholder)</span></li></ul>
      <div class="media" style="margin-top:18px;border-radius:10px;aspect-ratio:16/10">${ph(3,'Map placeholder')}</div></aside>
  </div></section>`};
}
