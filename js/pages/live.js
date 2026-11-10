/* Page: live */
const live={state:'offline'};
function renderLive(){
  const s=live.state;
  const over=s==='live'?`<div class="ctrl"><span aria-hidden="true">▶</span><span aria-hidden="true">♪</span><div class="bar"></div><span aria-hidden="true">⛶</span></div>`
   :`<div class="stage-over">${s==='error'?`<h2>We can’t load the stream right now</h2><p>Please check your connection and try again. If the problem continues, contact the mandir office.</p><button class="btn btn-saffron btn-sm" type="button" data-act="toast" data-m="Retry would reload the player here">Try again</button>`:`<h2>Darshan is offline right now</h2><p>Next broadcast: tomorrow at 5:30 AM ${SITE.tzLabel}, Mangala Aarti.</p>`}</div>`;
  return{title:'Live Darshan',html:`${pageHead('Live Darshan','Live Darshan','Watch darshan of the murtis from home during approved broadcast hours.')}
  <section class="section" style="padding-top:28px"><div class="wrap">
    <div class="stage" role="region" aria-label="Live darshan video player">
      ${ph(1,'Still image of the murtis','nolabel')}
      <span class="badge ${s==='live'?'on':''}"><i></i>${s==='live'?'Live':s==='error'?'Unavailable':'Offline'}</span>
      ${s==='live'?'<div class="stage-over" style="background:none"><p style="background:rgba(20,6,8,.7);padding:6px 16px;border-radius:99px;font-size:.9rem">Approved stream player embeds here (YouTube Live or secure HLS)</p></div>':''}
      ${over}
    </div>
    <div class="preview-note no-print"><strong>Design preview</strong><span class="muted">See each state:</span>
      <div class="seg" role="group" aria-label="Preview stream state">${['offline','live','error'].map(x=>`<button type="button" id="l-${x}" data-act="live" data-v="${x}" aria-pressed="${s===x}">${x[0].toUpperCase()+x.slice(1)}</button>`).join('')}</div></div>
    <div class="grid g2" style="margin-top:44px;align-items:start">
      <div class="card panel"><h2 style="font-size:1.5rem;margin-bottom:14px">Daily darshan schedule</h2><p class="muted" style="margin-bottom:8px">Placeholder timings in ${SITE.tzLabel}.</p><table class="times"><tbody>${SITE.aarti.map(a=>`<tr><th scope="row">${a[0]}</th><td>${a[1]}</td></tr>`).join('')}</tbody></table></div>
      <div class="card panel"><h2 style="font-size:1.5rem;margin-bottom:14px">Watching with respect</h2>
        <ul class="side-list"><li>${ic.shield}<span>The camera shows approved sacred areas only.</span></li><li>${ic.clock}<span>The “Live” label appears only while the stream is confirmed active.</span></li><li>${ic.img}<span>Recording or re-broadcasting the stream is not permitted.</span></li></ul></div>
    </div>
  </div></section>`};
}
