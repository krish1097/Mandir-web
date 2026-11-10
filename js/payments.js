/* Payment and contact-form adapters. This is the ONLY file to change when connecting the real portal.

   submitDonation(d) receives:
     { name, street, city, state, zip, email, amount, method }   (amount is a number in dollars)
   It must resolve with a receipt object:
     { ref, amount, date, name, email, method, demo }
   or redirect the browser away (redirect mode), or throw an Error with a message the donor can read.

   The site never handles card numbers. The portal collects card details on its own page or secure field. */
async function submitDonation(d){
  const when=new Date().toLocaleString('en-US',{timeZone:SITE.tz,dateStyle:'long',timeStyle:'short'})+' '+SITE.tzLabel;

  if(PAYMENT.mode==='redirect'&&PAYMENT.portalUrl){
    const u=new URL(PAYMENT.portalUrl);
    /* Rename these parameters to whatever your portal expects. */
    u.searchParams.set('amount',d.amount);
    u.searchParams.set('name',d.name);
    u.searchParams.set('email',d.email);
    window.location.href=u.toString();
    return null;
  }

  if(PAYMENT.mode==='api'&&PAYMENT.apiBase){
    /* Adjust the path, body and response fields to match your portal's API documentation. */
    const fail='The payment could not be completed. You have not been charged. Please try again or contact the mandir office.';
    const res=await fetch(PAYMENT.apiBase+'/donations',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({...d,currency:PAYMENT.currency})
    }).catch(()=>{throw new Error(fail)});
    if(!res.ok)throw new Error(fail);
    const r=await res.json();
    if(r.redirectUrl){window.location.href=r.redirectUrl;return null}
    return{ref:r.reference||r.id,amount:d.amount,date:when,name:d.name,email:d.email,method:d.method,demo:false};
  }

  /* Demo mode */
  await new Promise(r=>setTimeout(r,900));
  return{ref:'KST-'+todayStr.replace(/-/g,'')+'-'+String(Math.floor(1000+Math.random()*9000)),amount:d.amount,date:when,name:d.name,email:d.email,method:d.method,demo:true};
}

/* Sends the contact form. Returns true when delivered, false in demo mode (nothing sent). Throws on failure. */
async function sendContact(m){
  if(!CONTACT.endpoint){await new Promise(r=>setTimeout(r,500));return false}
  const msg='Your message could not be sent. Please try again in a moment.';
  const res=await fetch(CONTACT.endpoint,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(m)}).catch(()=>{throw new Error(msg)});
  if(!res.ok)throw new Error(msg);
  return true;
}
