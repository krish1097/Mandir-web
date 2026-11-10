/* Monthly magazine issues. Replace the placeholder list with real issue titles and PDF links from ISSO. */
const MAG_THEMES=['Diwali Special','Sharad Utsav','Navratri','Janmashtami','Rakshabandhan','Guru Purnima','Monsoon Satsang','Seva Stories','Summer Camp','Spring Festivals','Vasant Panchami','New Year Sankalp'];
const MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];
const ISSUES=[];for(let y=2026;y>=2025;y--)for(let m=(y===2026?10:11);m>=0;m--)ISSUES.push({y,m,title:MAG_THEMES[(11-m+(y-2025)*4)%12]});
