/* Youth events and weekly teachings. LESSONS is generated from TOPICS: newest first, one per week. */
const YOUTH_EVENTS=[
 {id:'ye1',date:'2026-11-22',time:'16:00',title:'Teen Leadership Workshop',desc:'Public speaking, teamwork and seva planning for ages 13 to 17.',reg:true},
 {id:'ye2',date:'2026-12-26',time:'09:00',title:'Winter Youth Retreat',desc:'Three days of satsang, sports and service projects for ages 12 to 18.',reg:true},
 {id:'ye3',date:'2027-01-24',time:'15:00',title:'Bal Mandal Talent Show',desc:'Children perform kirtan, skits and shloka recitation. Families welcome.',reg:false}
];
const TOPICS=[['Honesty in Daily Life','We read short stories about telling the truth when it is hard and discussed how to apologise and repair trust.',['Story handout','Reflection questions']],
 ['Seva Begins at Home','Students listed small acts of service for their family and planned one to do this week.',['Seva checklist']],
 ['Understanding Ahimsa','A talk on non-violence in words, thoughts and actions, with a group activity on kind speech.',['Discussion guide','Video link']],
 ['Gratitude and Prayer','We practised a daily gratitude routine and learned a short morning prayer.',['Prayer card']],
 ['Respect for Elders','Role-play on greeting, listening and helping elders in the community.',['Role-play cards']],
 ['Discipline and Focus','Simple habits for study, sleep and screen time, with a weekly goal sheet.',['Goal sheet']],
 ['Friendship and Satsang','What makes a good friend, and how satsang supports good company.',['Reflection prompts']],
 ['Courage and Faith','Stories of devotees who stayed steady under pressure.',['Story handout']]];
const LESSONS=TOPICS.map((t,i)=>{const d=new Date(2026,10,8-7*i,12);return{date:d.toLocaleDateString('en-CA'),topic:t[0],summary:t[1],res:t[2]}});
