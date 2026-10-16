const players = [
 {name:'정진우',roman:'JUNG JINWOO',position:'GK',role:'골키퍼',description:'마지막 순간까지 골문을 지키는 팀의 든든한 버팀목.'},
 {name:'조현진',roman:'CHO HYUNJIN',position:'DF',role:'수비수',description:'침착한 판단과 단단한 수비로 팀의 중심을 잡는다.'},
 {name:'윤현수',roman:'YOON HYUNSOO',position:'DF',role:'수비수',description:'한발 먼저 움직이며 상대의 공격 흐름을 끊는다.'},
 {name:'백태현',roman:'BAEK TAEHYUN',position:'MF',role:'미드필더 · 주장',captain:true,description:'경기의 흐름을 읽고, 팀을 하나로 연결하는 캡틴.'},
 {name:'한웅비',roman:'HAN WOONGBI',position:'FW',role:'공격수',description:'수비 뒷공간을 파고드는 날카로운 침투로 득점 기회를 만든다.'},
 {name:'이승민',roman:'LEE SEUNGMIN',position:'FW',role:'공격수',description:'기회를 놓치지 않는 움직임으로 공격을 완성한다.'}
];
function portrait(p){return `<div class="player-art"><span class="player-position-bg">${p.position}</span>${p.captain?'<span class="captain-tag" title="주장">C</span>':''}<svg viewBox="0 0 260 310" aria-hidden="true"><ellipse cx="130" cy="327" rx="105" ry="15" fill="#c8beb0"/><path d="M75 172 36 190 10 310h240l-26-120-39-18-28-10h-54Z" fill="${p.position==='GK'?'#624b3c':'#f5f2eb'}"/><path d="m75 172 28-10 27 21 27-21 28 10-19 21h-72Z" fill="#493125"/><path d="M39 253h182v10H39zm-2 19h186v4H37" fill="${p.position==='GK'?'#c4ad91':'#604532'}"/><path d="m105 136-3 32 28 16 28-16-4-32" fill="#a99a88"/><ellipse cx="130" cy="100" rx="39" ry="50" fill="#b7aa98"/><path d="M91 102c-11-49 15-64 39-64 36 0 49 27 39 63l-9-29-20 5-34-7-10 30Z" fill="#8d7c69"/><path d="M95 116c4 26 18 39 35 39s31-13 35-39c-8 21-20 27-35 27s-27-6-35-27Z" fill="#a99a88"/><path d="m52 186-17 89M207 186l18 89" fill="none" stroke="${p.position==='GK'?'#4a372c':'#d6cec2'}" stroke-width="2"/><use href="#acorn" x="166" y="206" width="18" height="22" color="${p.position==='GK'?'#e8dac8':'#604532'}"/><text x="130" y="244" text-anchor="middle" font-family="Arial" font-size="14" font-weight="900" letter-spacing="2" fill="${p.position==='GK'?'#e8dac8':'#604532'}">DOTORI</text></svg><span class="portrait-label">PLAYER SILHOUETTE</span></div>`}
const grid=document.querySelector('#players');
grid.innerHTML=players.map((p,i)=>`<button class="player-card" data-index="${i}" data-position="${p.position}" aria-label="${p.name}, ${p.role} 프로필 보기" aria-haspopup="dialog">${portrait(p)}<div class="player-meta"><span class="pos">${p.position} / ${p.role}</span><h3>${p.name}</h3><p>${p.roman}</p><span class="plus" aria-hidden="true">↗</span></div></button>`).join('');
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('[data-filter]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
 let count=0;document.querySelectorAll('.player-card').forEach(card=>{card.hidden=button.dataset.filter!=='ALL'&&card.dataset.position!==button.dataset.filter;if(!card.hidden)count++;});
 document.querySelector('.squad-count').textContent=`${count} ${count===1?'PLAYER':'PLAYERS'}`;
}));
const dialog=document.querySelector('#profile');
grid.addEventListener('click',e=>{const card=e.target.closest('.player-card');if(!card)return;const p=players[Number(card.dataset.index)];
 document.querySelector('#profile-content').innerHTML=`<div class="profile-layout">${portrait(p)}<div class="profile-copy"><p class="eyebrow">DOTORI FC / ${p.position}${p.captain?' / CAPTAIN':''}</p><h2 id="profile-name">${p.name}</h2><p class="roman">${p.roman}</p><p class="description">${p.description}</p><div class="profile-details">포지션　${p.role}<br>등번호　추후 공개</div></div></div>`;
 dialog.setAttribute('aria-labelledby','profile-name');dialog.showModal();document.body.style.overflow='hidden';
});
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>document.body.style.overflow='');
document.querySelector('#year').textContent=new Date().getFullYear();
