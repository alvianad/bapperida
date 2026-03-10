// BAPPERIDA v2 – JavaScript

// ===== SLIDER =====
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let autoSlideTimer;

function goToSlide(idx) {
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = (idx + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

function startAutoSlide() {
  autoSlideTimer = setInterval(() => goToSlide(currentSlide + 1), 5000);
}

function resetAutoSlide() {
  clearInterval(autoSlideTimer);
  startAutoSlide();
}

document.getElementById('sliderNext').addEventListener('click', () => { goToSlide(currentSlide + 1); resetAutoSlide(); });
document.getElementById('sliderPrev').addEventListener('click', () => { goToSlide(currentSlide - 1); resetAutoSlide(); });
dots.forEach(dot => dot.addEventListener('click', () => { goToSlide(+dot.dataset.idx); resetAutoSlide(); }));
startAutoSlide();

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  hamburger.classList.toggle('open');
});

// Close on outside click
document.addEventListener('click', e => {
  if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
    navMenu.classList.remove('open');
  }
});

// ===== STICKY HEADER on scroll =====
const header = document.getElementById('header');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const current = window.scrollY;
  // Compact header on scroll
  if (current > 80) {
    header.style.padding = '8px 0';
  } else {
    header.style.padding = '16px 0';
  }
  lastScroll = current;
});

// ===== ACTIVE NAV =====
const sections = document.querySelectorAll('section[id], div[id]');
const navLinks = document.querySelectorAll('.nav-item');
window.addEventListener('scroll', () => {
  let found = '';
  sections.forEach(s => {
    if (window.scrollY + 120 >= s.offsetTop) found = s.id;
  });
  navLinks.forEach(li => {
    const a = li.querySelector('a');
    if (a && a.getAttribute('href') === '#' + found) {
      navLinks.forEach(x => x.classList.remove('active'));
      li.classList.add('active');
    }
  });
});

// ===== SEARCH =====
function doSearch() {
  const q = document.getElementById('searchInput').value.trim();
  if (q) alert('Mencari: "' + q + '"');
}
document.getElementById('searchInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') doSearch();
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href.length > 1) {
      const target = document.querySelector(href);
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    }
  });
});

// ===== MAP CLICK =====
const mapEl = document.querySelector('.map-placeholder');
if (mapEl) mapEl.addEventListener('click', () => {
  window.open('https://maps.google.com/?q=Balai+Kota+Semarang', '_blank');
});

console.log('%c🏛️ BAPPERIDA', 'font-size:18px;font-weight:bold;color:#1a4080');
console.log('%cBadan Perencanaan Pembangunan Riset dan Inovasi Daerah', 'color:#666');
