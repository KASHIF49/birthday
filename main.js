const sections=[...document.querySelectorAll('.page-section')];
let current=0, timer=null;

const dots=document.getElementById('navDots');
sections.forEach((s,i)=>{
  const d=document.createElement('button');
  d.className='nav-dot'+(i===0?' active':'');
  d.title=s.dataset.section;
  d.onclick=()=>goToSection(i);
  dots.appendChild(d);
});

function update(){
  document.querySelectorAll('.nav-dot').forEach((d,i)=>d.classList.toggle('active',i===current));
  document.getElementById('progress').style.width=((current)/(sections.length-1)*100)+'%';
}
function goToSection(i){
  if(i<0||i>=sections.length)return;
  current=i;
  sections[i].scrollIntoView({behavior:'smooth'});
  update();
  resetAuto();
}
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('visible');
      const i=sections.indexOf(e.target);
      if(i>=0){current=i;update();}
    }
  });
},{threshold:.45});
sections.forEach(s=>observer.observe(s));

function startAuto(){
  timer=setInterval(()=>{
    if(current<sections.length-1) goToSection(current+1);
    else clearInterval(timer);
  },7000);
}
function resetAuto(){clearInterval(timer);startAuto();}
document.addEventListener('wheel',()=>clearInterval(timer),{passive:true});
document.addEventListener('touchstart',()=>clearInterval(timer),{passive:true});

function particles(){
  const box=document.getElementById('particles');
  const colors=['#f472b6','#a78bfa','#fbbf24','#34d399','#60a5fa'];
  for(let i=0;i<35;i++){
    const p=document.createElement('div');
    p.className='particle';
    const size=Math.random()*5+2;
    p.style.cssText=`width:${size}px;height:${size}px;left:${Math.random()*100}%;background:${colors[Math.floor(Math.random()*colors.length)]};animation-duration:${Math.random()*8+7}s;animation-delay:${Math.random()*7}s`;
    box.appendChild(p);
  }
}
function confetti(count=130){
  const colors=['#f472b6','#a78bfa','#fbbf24','#34d399','#60a5fa','#fb923c'];
  for(let i=0;i<count;i++){
    const x=document.createElement('div');
    x.className='confetti';
    const size=Math.random()*8+5;
    x.style.left=Math.random()*100+'vw';
    x.style.width=size+'px';
    x.style.height=(Math.random()*14+5)+'px';
    x.style.background=colors[Math.floor(Math.random()*colors.length)];
    x.style.borderRadius=Math.random()>.5?'50%':'2px';
    x.style.animationDelay=Math.random()*.8+'s';
    document.body.appendChild(x);
    setTimeout(()=>x.remove(),4500);
  }
}
function blowCandles(){
  document.getElementById('cake').classList.add('blown');
  confetti(100);
}
function celebrate(){confetti(220);}

const musicBtn=document.getElementById('musicBtn');
let audio;
musicBtn.addEventListener('click',()=>{
  if(!audio){
    audio=new Audio();
    audio.loop=true;
    audio.src='https://files.catbox.moe/j0gnqj.mp3';
    audio.volume=.25;
  }
  if(audio.paused){audio.play().catch(()=>{});musicBtn.classList.add('playing')}
  else{audio.pause();musicBtn.classList.remove('playing')}
});

document.addEventListener('keydown',e=>{
  if(e.key==='ArrowRight'||e.key==='ArrowDown')goToSection(current+1);
  if(e.key==='ArrowLeft'||e.key==='ArrowUp')goToSection(current-1);
});

particles();
setTimeout(()=>{
  document.getElementById('loader').classList.add('hide');
  confetti(70);
  startAuto();
},900);
