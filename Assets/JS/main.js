/* ================================================================
   ANTONIO DORAL — PORTFOLIO
   main.js v2.0
   Cursor · Scroll Progress · Nav Shrink · Staggered Reveals
================================================================ */

(function () {
  'use strict';

  /* ── 1. SCROLL PROGRESS BAR ────────────────────────────────────── */
  const bar = document.getElementById('scroll-progress');
  function updateProgress() {
    if (!bar) return;
    const doc  = document.documentElement;
    const top  = doc.scrollTop  || document.body.scrollTop;
    const h    = doc.scrollHeight - doc.clientHeight;
    bar.style.transform = `scaleX(${h > 0 ? top / h : 0})`;
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();


  /* ── 2. NAV SHRINK ON SCROLL ────────────────────────────────────── */
  const nav = document.getElementById('mainNav');
  function updateNav() {
    if (!nav) return;
    nav.classList.toggle('nav--scrolled', window.scrollY > 60);
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();


  /* ── 3. ACTIVE NAV LINK (section spy) ─────────────────────────── */
  const navLinks  = document.querySelectorAll('.navbar-nav .nav-link[href^="#"]');
  const sections  = Array.from(navLinks)
    .map(l => document.querySelector(l.getAttribute('href')))
    .filter(Boolean);

  const spyObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.navbar-nav .nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  sections.forEach(s => spyObserver.observe(s));


  /* ── 4. STAGGERED SCROLL REVEAL ────────────────────────────────── */
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      // Stagger siblings in a grid
      const parent = el.parentElement;
      const siblings = Array.from(parent.querySelectorAll(':scope > .reveal'));
      const idx = siblings.indexOf(el);
      const delay = (idx % 4) * 80; // stagger in groups of 4
      el.style.transitionDelay = `${delay}ms`;
      el.classList.add('reveal--visible');
      revealObserver.unobserve(el);
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


  /* ── 5. SMOOTH SCROLL (override Bootstrap default) ─────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = nav ? nav.offsetHeight + 16 : 80;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
      // Close mobile menu
      const toggler = document.querySelector('.navbar-toggler');
      const collapse = document.querySelector('#navbarNav');
      if (collapse && collapse.classList.contains('show') && toggler) toggler.click();
    });
  });


  /* ── 6. HERO ELEMENTS STAGGER ON LOAD ──────────────────────────── */
  const heroItems = [
    '.hero-eyebrow',
    '.hero-section .display-4',
    '.hero-section .lead',
    '.hero-stats',
    '.hero-ctas',
    '.hero-image-container',
    '.hero-scroll-hint'
  ];
  heroItems.forEach((sel, i) => {
    const el = document.querySelector(sel);
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    }, 100 + i * 120);
  });


  /* ── 7. PROJECT TILE HOVER — IMAGE PARALLAX ────────────────────── */
  document.querySelectorAll('.project-tile, .project-featured').forEach(tile => {
    const img = tile.querySelector('img');
    if (!img || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    tile.addEventListener('mousemove', e => {
      const rect = tile.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 8;
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 6;
      img.style.transform = `scale(1.06) translate(${x}px, ${y}px)`;
    });
    tile.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1)';
    });
  });

})();
