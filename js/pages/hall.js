/* Page: hall */
function renderHall(){
  return{title:'Hall Reservations',html:`${pageHead('Hall Reservations','Mandir hall for your celebration','A welcoming, well-kept space for family milestones, hosted within the mandir community.')}
  <section class="section" style="padding-top:28px"><div class="wrap">
    <div class="hall-photos"><div>${ph(2,'Hall photo: main floor')}</div><div>${ph(0,'Hall photo: stage')}</div><div>${ph(5,'Hall photo: dining setup')}</div></div>
    <div class="facts-band" style="margin-top:28px"><div><b>500</b>guests seated</div><div><b>Included</b>tables and chairs</div><div><b>Inquiry</b>handled by mandir staff</div></div>
  </div></section>
  <section class="section alt"><div class="wrap">
    <div class="section-head"><div><span class="eyebrow">Suitable occasions</span><h2>Celebrate with community</h2></div></div>
    <ul class="occ"><li>Baby showers</li><li>Weddings</li><li>Engagements</li><li>Receptions</li><li>Other approved events</li></ul>
  </div></section>
  <section class="section"><div class="wrap split">
    <div><span class="eyebrow">How it works</span><h2 style="margin:8px 0 22px">From inquiry to your date</h2>
      <ol class="steps"><li><div><h3>Send an inquiry</h3><p class="muted">Tell us the occasion, date and number of guests.</p></div></li><li><div><h3>Hear from mandir staff</h3><p class="muted">We confirm availability and share hall guidelines.</p></div></li><li><div><h3>Visit the hall</h3><p class="muted">Walk through the space and finalize details with the team.</p></div></li></ol></div>
    <div class="card panel"><h3 style="margin-bottom:8px">Check availability</h3><p class="muted" style="margin-bottom:18px">Online booking is not available yet. Our team replies to every inquiry.</p>
      <button class="btn btn-saffron" style="width:100%" type="button" data-act="contact-with" data-subject="Hall Reservation Inquiry" id="hall-cta">Contact Us for Availability &amp; Details</button></div>
  </div></section>`};
}
