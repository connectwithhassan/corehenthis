// script.js - shared for all pages

// copyright year
document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});

// mobile menu toggle
function bindMobileToggle() {
  const toggle = document.getElementById('mobileToggle');
  const mMenu = document.getElementById('mobileMenu');
  if (!toggle || !mMenu) return;
  toggle.addEventListener('click', () => mMenu.classList.toggle('hidden'));
}
bindMobileToggle();

// hero parallax (works only when a #heroImage exists on page)
function heroParallax() {
  const hero = document.getElementById('home');
  const heroImg = document.getElementById('heroImage');
  if (!hero || !heroImg) return;
  function onScrollParallax() {
    const rect = hero.getBoundingClientRect();
    const vh = window.innerHeight;
    const t = Math.min(Math.max((vh - rect.top) / (vh + rect.height), 0), 1);
    const scale = 1 + 0.18 * t;
    const translateY = -15 * t;
    heroImg.style.transform = `scale(${scale}) translateY(${translateY}px)`;
  }
  window.addEventListener('scroll', onScrollParallax, { passive: true });
  onScrollParallax();
}
heroParallax();

// reveal elements on scroll
const reveals = document.querySelectorAll('.reveal');
if (reveals.length) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
  }, { threshold: 0.15 });
  reveals.forEach(r => obs.observe(r));
}
