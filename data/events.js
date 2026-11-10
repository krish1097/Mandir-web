/* Events shown on Home, Events and Gallery. Add a new object to add an event.
   Fields: id (unique, letters/numbers/hyphens), title, date (YYYY-MM-DD), time (24h), cat, venue,
   v (placeholder color 0-5), desc, album:1 (if photos exist), status:'cancelled' (optional). */
const VENUE='Main Mandir Hall';
const EVENTS=[
 {id:'annakut-2026',title:'Annakut Darshan and New Year Celebration',date:'2026-11-10',time:'09:00',cat:'Festival',venue:VENUE,v:0,desc:'Devotees offer hundreds of vegetarian dishes before the murtis. Darshan opens after Mangala Aarti, followed by New Year greetings and prasad. This is placeholder text and will be replaced with the mandir’s own description.'},
 {id:'tulsi-vivah-2026',title:'Tulsi Vivah Celebration',date:'2026-11-21',time:'17:30',cat:'Festival',venue:VENUE,v:2,desc:'A traditional evening ceremony with kirtan and aarti, followed by prasad for all families.'},
 {id:'health-camp-2026',title:'Community Health Camp',date:'2026-12-06',time:'10:00',cat:'Community',venue:'Seva Hall',v:3,status:'cancelled',desc:'Free blood pressure and sugar screening with volunteer physicians. This session is cancelled; a new date will be announced.'},
 {id:'gita-jayanti-2026',title:'Gita Jayanti Satsang',date:'2026-12-20',time:'18:00',cat:'Satsang',venue:VENUE,v:4,desc:'Evening satsang with discourse and group recitation.'},
 {id:'year-end-2026',title:'Year-End Satsang and Aarti',date:'2026-12-31',time:'20:00',cat:'Satsang',venue:VENUE,v:1,desc:'Close the year in prayer with kirtan, a short discourse and Shayan Aarti at midnight.'},
 {id:'uttarayan-2027',title:'Uttarayan Celebration',date:'2027-01-14',time:'11:00',cat:'Festival',venue:'Mandir Courtyard',v:5,desc:'Kite flying, tilgul and a family lunch in the courtyard.'},
 {id:'vasant-panchami-2027',title:'Vasant Panchami and Shikshapatri Jayanti',date:'2027-02-11',time:'09:30',cat:'Festival',venue:VENUE,v:2,desc:'Special pujan and a talk on the Shikshapatri.'},
 {id:'maha-shivratri-2027',title:'Maha Shivratri Night Satsang',date:'2027-03-06',time:'19:00',cat:'Satsang',venue:VENUE,v:4,desc:'Overnight bhajan and abhishek, with light fasting refreshments.'},
 {id:'swaminarayan-jayanti-2027',title:'Swaminarayan Jayanti and Ram Navami',date:'2027-04-15',time:'08:30',cat:'Festival',venue:VENUE,v:0,desc:'A day of celebration with a procession, midday aarti and community lunch.'},
 {id:'diwali-2026',title:'Diwali and Chopda Pujan',date:'2026-11-08',time:'18:30',cat:'Festival',venue:VENUE,v:0,album:1,desc:'Lamps, rangoli and Chopda Pujan with the whole community.'},
 {id:'sharad-purnima-2026',title:'Sharad Purnima Raas',date:'2026-10-26',time:'19:00',cat:'Festival',venue:'Mandir Courtyard',v:4,album:1,desc:'Raas under the full moon with milk-sweet prasad.'},
 {id:'navratri-2026',title:'Navratri Garba Nights',date:'2026-10-16',time:'19:30',cat:'Festival',venue:VENUE,v:5,album:1,desc:'Nine evenings of Garba, aarti and community dinner.'},
 {id:'janmashtami-2026',title:'Janmashtami Midnight Aarti',date:'2026-09-04',time:'22:00',cat:'Festival',venue:VENUE,v:1,album:1,desc:'Jhulan darshan, kirtan and midnight aarti.'},
 {id:'rakshabandhan-2026',title:'Rakshabandhan',date:'2026-08-28',time:'11:00',cat:'Community',venue:VENUE,v:3,album:1,desc:'Rakhi tying for children and families, followed by lunch.'},
 {id:'guru-purnima-2026',title:'Guru Purnima Sabha',date:'2026-07-29',time:'10:00',cat:'Satsang',venue:VENUE,v:2,album:1,desc:'Morning sabha with pujan and discourse.'}
];
