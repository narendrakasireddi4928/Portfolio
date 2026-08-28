const nav = document.querySelector('.navbar');
const menu = document.querySelector('.menu-btn');
const progress = document.querySelector('.progress');
const theme = document.querySelector('.theme-btn');

menu.addEventListener('click', () => nav.classList.toggle('nav-open'));
document.querySelectorAll('.navbar nav a').forEach(a => a.addEventListener('click', () => nav.classList.remove('nav-open')));

window.addEventListener('scroll', () => {
  const h = document.documentElement;
  progress.style.width = `${(h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100}%`;
});

theme.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  theme.textContent = document.body.classList.contains('light-mode') ? '☀' : '☾';
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {threshold: .12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const modal = document.querySelector('.modal');
const modalImg = document.querySelector('.modal-box img');
const modalTitle = document.querySelector('.modal-box h3');
document.querySelectorAll('.cert-card').forEach(card => {
  card.addEventListener('click', () => {
    modalImg.src = card.dataset.img;
    modalImg.alt = card.dataset.title;
    modalTitle.textContent = card.dataset.title;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  });
});
document.querySelector('.modal-close').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
