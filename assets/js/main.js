const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const form = document.getElementById('lead-form');
const note = document.getElementById('form-note');
const btn = document.getElementById('submit-btn');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    btn.disabled = true;
    btn.textContent = 'Enviando...';

    setTimeout(() => {
      note.textContent = '¡Gracias! Te contactaremos en menos de 48 horas.';
      btn.textContent = 'Solicitud enviada ✓';
      form.reset();

      setTimeout(() => {
        btn.disabled = false;
        btn.textContent = 'Quiero mi estimado';
      }, 2200);
    }, 700);
  });
}
