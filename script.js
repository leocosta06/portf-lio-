const cur = document.getElementById('cur');
const ring = document.getElementById('cur-ring');
let mx=0,my=0,rx=0,ry=0;

document.addEventListener('mousemove',e=>{
  mx=e.clientX; my=e.clientY;
  cur.style.left=mx+'px'; cur.style.top=my+'px';
});

(function animR(){
  rx+=(mx-rx)*.1; ry+=(my-ry)*.1;
  ring.style.left=rx+'px'; ring.style.top=ry+'px';
  requestAnimationFrame(animR);
})();

document.querySelectorAll('a,button').forEach(el=>{
  el.addEventListener('mouseenter',()=>{
    cur.style.transform='translate(-50%,-50%) scale(2.5)';
    ring.style.width='56px'; ring.style.height='56px';
    ring.style.opacity='.4';
  });
  el.addEventListener('mouseleave',()=>{
    cur.style.transform='translate(-50%,-50%) scale(1)';
    ring.style.width='34px'; ring.style.height='34px';
    ring.style.opacity='1';
  });
});

window.addEventListener('scroll',()=>{
  document.getElementById('nav').classList.toggle('scrolled',scrollY>60);
});

const revEls = document.querySelectorAll('.reveal');
const ro = new IntersectionObserver(entries=>{
  entries.forEach((e,i)=>{
    if(e.isIntersecting) setTimeout(()=>e.target.classList.add('on'), i*70);
  });
},{threshold:.08});
revEls.forEach(el=>ro.observe(el));

const statsObs = new IntersectionObserver(entries=>{
  if(!entries[0].isIntersecting) return;
  document.querySelectorAll('[data-to]').forEach(el=>{
    const target=+el.dataset.to;
    let n=0;
    const step=Math.max(1,Math.ceil(target/35));
    const t=setInterval(()=>{
      n=Math.min(n+step,target);
      el.textContent=n+(target===100?'%':'+');
      if(n>=target) clearInterval(t);
    },40);
  });
  statsObs.disconnect();
},{threshold:.4});

if(document.querySelector('.stats-row')) {
  statsObs.observe(document.querySelector('.stats-row'));
}
