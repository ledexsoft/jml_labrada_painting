/* ══════════════════════════════
   CURSOR ENGINE
══════════════════════════════ */
const cur = document.getElementById('cur');
const ring = document.getElementById('cur-ring');
const curLabel = document.getElementById('cur-label');
let mx=window.innerWidth/2, my=window.innerHeight/2;
let rx=mx, ry=my;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

;(function tick() {
  // dot follows instantly
  cur.style.left = mx + 'px';
  cur.style.top  = my + 'px';
  // ring lerps
  rx += (mx - rx) * 0.1;
  ry += (my - ry) * 0.1;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  // label follows ring
  curLabel.style.left = rx + 'px';
  curLabel.style.top  = ry + 'px';
  requestAnimationFrame(tick);
})();

// hover states
document.querySelectorAll('a, button, .svc-row, .testi-item, .c-row').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('is-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('is-hover'));
});

// project hover — show label
document.querySelectorAll('.pi').forEach(el => {
  el.addEventListener('mouseenter', () => {
    document.body.classList.add('is-proj');
    curLabel.textContent = el.dataset.proj || 'Ver proyecto';
  });
  el.addEventListener('mouseleave', () => {
    document.body.classList.remove('is-proj');
  });
});

// magnetic buttons
document.querySelectorAll('.mag-btn').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width/2);
    const dy = e.clientY - (r.top  + r.height/2);
    btn.style.transform = `translate(${dx*.25}px, ${dy*.3}px)`;
    document.body.classList.add('is-mag');
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
    document.body.classList.remove('is-mag');
  });
});

/* ══════════════════════════════
   CHAR-BY-CHAR HERO TEXT
══════════════════════════════ */
function splitChars(container, text, baseDelay) {
  container.innerHTML = '';
  text.split('').forEach((ch, i) => {
    const s = document.createElement('span');
    s.className = 'char';
    s.textContent = ch === ' ' ? '\u00A0' : ch;
    s.style.animationDelay = (baseDelay + i * 0.045) + 's';
    container.appendChild(s);
  });
}
splitChars(document.getElementById('w1'), 'que', 1.6);
splitChars(document.getElementById('w2'), 'resisten', 1.6);
splitChars(document.getElementById('w3'), 'el tiempo.', 1.6);

/* ══════════════════════════════
   PARALLAX GHOST TEXT
══════════════════════════════ */
const ghost = document.getElementById('hghost');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (ghost) ghost.style.transform = `translateY(${y * 0.4}px)`;
});

/* ══════════════════════════════
   LOADER → CURTAIN
══════════════════════════════ */
const ldLine = document.getElementById('ld-line');
const ldPct  = document.getElementById('ld-pct');
let pct = 0;
const iv = setInterval(() => {
  pct = Math.min(100, pct + Math.floor(Math.random() * 9) + 4);
  ldPct.textContent = String(pct).padStart(2,'0');
  ldLine.style.width = pct + '%';
  if (pct >= 100) {
    clearInterval(iv);
    setTimeout(() => {
      document.getElementById('loader').classList.add('out');
      // open curtain
      setTimeout(() => {
        document.getElementById('curtain').classList.add('open');
        setTimeout(() => {
          document.getElementById('curtain').style.display = 'none';
        }, 1400);
      }, 400);
    }, 200);
  }
}, 55);

/* ══════════════════════════════
   SCROLL PROGRESS
══════════════════════════════ */
const sp = document.getElementById('sprogress');
window.addEventListener('scroll', () => {
  sp.style.width = (window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100) + '%';
});

/* ══════════════════════════════
   NAV HIDE / SHOW
══════════════════════════════ */
const nav = document.getElementById('nav');
let lastSY = 0;
window.addEventListener('scroll', () => {
  const sy = window.scrollY;
  nav.classList.toggle('scrolled', sy > 80);
  nav.classList.toggle('hide', sy > lastSY + 5 && sy > 120);
  if (sy < lastSY - 5) nav.classList.remove('hide');
  lastSY = sy;
});

/* ══════════════════════════════
   INTERSECTION OBSERVER REVEAL
══════════════════════════════ */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); }
  });
}, { threshold: 0.07, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('[data-r]').forEach(el => io.observe(el));

/* ══════════════════════════════
   SMOOTH ANCHOR
══════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

/* ══════════════════════════════
   FORM SUBMIT
══════════════════════════════ */
function submitForm(e) {
  e.preventDefault();
  const btn = document.getElementById('fbtn');
  const span = btn.querySelector('.f-btn-text');
  span.textContent = 'Enviado con éxito ✓';
  btn.style.pointerEvents = 'none';
  btn.querySelector('::before');
  setTimeout(() => {
    span.textContent = 'Enviar solicitud →';
    btn.style.pointerEvents = '';
    e.target.reset();
  }, 3500);
}
