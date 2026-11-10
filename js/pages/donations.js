/* Page: donations */
const don={amount:51,done:null};
function renderDonations(){
  if(don.done){const r=don.done;return{title:'Donation receipt',html:`${pageHead('Donations','Thank you','Your payment was received. Keep this receipt for your records.')}
  <section class="section" style="padding-top:28px"><div class="wrap" style="max-width:720px">
    <div class="receipt" role="region" aria-label="Donation receipt"><span class="stamp">Payment received</span><h2>${SITE.name}</h2><p class="muted">Donation confirmation</p>
      <dl class="rcpt-rows">
        <div><dt>Transaction reference</dt><dd>${r.ref}</dd></div><div><dt>Amount</dt><dd>$${r.amount}</dd></div><div><dt>Date</dt><dd>${r.date}</dd></div><div><dt>Received by</dt><dd>${SITE.name}</dd></div><div><dt>Donor</dt><dd>${r.name}</dd></div><div><dt>Payment method</dt><dd>${r.method}</dd></div></dl>
      <p class="muted" style="font-size:.9rem">This receipt confirms that a payment was received. It does not state whether the gift is tax deductible. Please consult a tax adviser.</p>
      ${r.demo?`<p class="notice" style="margin-top:16px">Sample receipt for design review. No payment was made. A copy will be emailed to ${r.email} once email delivery is connected.</p>`:`<p class="muted" style="margin-top:12px">A copy of this receipt is emailed to ${r.email}.</p>`}
    </div>
    <div style="display:flex;gap:12px;margin-top:22px;flex-wrap:wrap"><button class="btn btn-primary" type="button" data-act="don-again" id="don-again">Make another donation</button><a class="btn btn-ghost" href="#home">Back to home</a></div>
  </div></section>`}}
  return{title:'Donations',html:`${pageHead('Donations','Support the mandir','Your gift helps with festivals, seva, youth programs and care of the mandir. Payments are handled by a secure payment processor.')}
  <section class="section" style="padding-top:28px"><div class="wrap split">
    <form class="card panel" id="don-form" novalidate aria-labelledby="don-h">
      <h2 id="don-h" style="font-size:1.6rem;margin-bottom:20px">Donation details</h2>
      ${field('d-name','Full name',{ac:'name'})}
      ${field('d-street','Mailing address',{ac:'street-address',msg:'Enter your street address.'})}
      <div class="row3">${field('d-city','City',{ac:'address-level2'})}${field('d-state','State',{ac:'address-level1'})}${field('d-zip','ZIP code',{ac:'postal-code'})}</div>
      ${field('d-email','Email',{type:'email',ac:'email',hint:'We send your receipt here.'})}
      <fieldset><legend class="legend">Amount (USD)</legend>
        <div class="chips">${[25,51,101,251,501].map(a=>`<button type="button" data-act="amt" data-v="${a}" id="amt-${a}" aria-pressed="${don.amount===a}">$${a}</button>`).join('')}</div>
        <div class="field" style="margin:0"><label for="d-amount" class="sr">Custom amount in dollars</label><input type="number" id="d-amount" name="d-amount" required min="1" step="1" inputmode="decimal" value="${don.amount}" data-msg="Enter a donation amount." aria-describedby="d-amount-err"><p class="err" id="d-amount-err" hidden></p></div></fieldset>
      <fieldset><legend class="legend" style="margin-bottom:8px">Payment method</legend><div class="radio"><label><input type="radio" name="method" value="Credit card" checked> Credit card</label><label><input type="radio" name="method" value="Debit card"> Debit card</label></div></fieldset>
      <div class="secure"><strong style="display:flex;gap:8px;align-items:center"><span style="width:22px;height:22px;display:inline-grid" class="side-list">${ic.lock}</span>Secure card entry</strong><p class="muted" style="margin-top:6px;font-size:.92rem">Card number, expiry and security code are typed into a field supplied by the payment processor. This website never sees or stores them.</p><div class="skel" aria-hidden="true"></div></div>
      <div class="check"><input type="checkbox" id="d-agree" required data-msg="Please confirm you have read the terms." aria-describedby="d-agree-err"><div><label for="d-agree">I have read the <a href="#policies">donation terms and privacy policy</a>.</label><p class="err" id="d-agree-err" hidden></p></div></div>
      <p class="err" id="don-fail" role="alert" hidden></p>
      <button class="btn btn-primary" type="submit" id="don-submit" style="width:100%;font-size:1.1rem;min-height:54px">Donate $${don.amount}</button>
    </form>
    <aside class="card panel"><h3 style="margin-bottom:14px">Before you give</h3>
      <ul class="side-list"><li>${ic.lock}<span>Payments are processed by a PCI-compliant provider. Card details never reach this site.</span></li><li>${ic.mail}<span>You will see a confirmation with a transaction reference and receive it by email.</span></li><li>${ic.shield}<span>Refunds or corrections: contact the mandir office at ${SITE.email}.</span></li><li>${ic.clock}<span>Click Donate once. We prevent duplicate charges if the page is submitted twice.</span></li></ul></aside>
  </div></section>`};
}
