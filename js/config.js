/* Site settings. Edit the mandir details, navigation, payment and contact-form settings here. */
const SITE={
  name:'Kalupur Swaminarayan Temple',
  tz:'America/New_York', tzLabel:'ET',
  address:['2101 Garry Road','Cinnaminson, NJ 08077'],
  mapUrl:'https://www.google.com/maps/search/?api=1&query=2101+Garry+Road+Cinnaminson+NJ+08077',
  insta:'https://www.instagram.com/issosnj/',
  email:'info@example.org', youthEmail:'youth@example.org',
  aarti:[['Mangala Aarti','5:30 AM'],['Shangar Darshan','8:00 AM'],['Rajbhog Aarti','11:30 AM'],['Open Darshan','4:00 PM'],['Sandhya Aarti','7:00 PM'],['Shayan Aarti','8:30 PM']],
  nav:[['home','Home'],['events','Events'],['gallery','Gallery'],['live-darshan','Live Darshan'],['donations','Donations'],['hall-reservations','Hall Reservations'],['contact-us','Contact Us'],['monthly-magazine','Monthly Magazine'],['youth-activities','Youth Activities']]
};

/* Payments. Keep "demo" until the parent organization approves the site and you have the portal details.
   mode 'demo'     Shows a sample receipt. No payment is made.
   mode 'redirect' Sends the donor to your existing hosted payment page (set portalUrl).
   mode 'api'      Sends the donation to your payment portal's API (set apiBase). See js/payments.js.
   Only PUBLIC values belong here. This file is served to every visitor, even when the repo is private.
   Secret API keys must live on the portal's server or a serverless function, never in this repository. */
const PAYMENT={
  mode:'demo',
  portalUrl:'',          // e.g. 'https://portal.example.org/donate'
  apiBase:'',            // e.g. 'https://api.example.org'
  publishableKey:'',     // public key only, if the portal gives you one
  currency:'USD'
};

/* Contact form. Leave endpoint empty for demo mode. Paste the form service or backend URL when ready. */
const CONTACT={
  endpoint:''            // e.g. 'https://formspree.io/f/xxxxxxxx'
};
