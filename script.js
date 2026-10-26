document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const themeToggle = document.querySelector('.theme-toggle');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  let savedTheme;
  try {
    savedTheme = localStorage.getItem('theme');
  } catch {
    // Storage may be disabled; the theme still works for this visit.
  }
  let explicitTheme = savedTheme === 'light' || savedTheme === 'dark';
  function setTheme(theme) {
    root.dataset.theme = theme;
    const label = `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`;
    themeToggle.setAttribute('aria-label', label);
    themeToggle.title = label;
  }
  setTheme(explicitTheme ? savedTheme : systemTheme.matches ? 'dark' : 'light');
  themeToggle.addEventListener('click', () => {
    const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    explicitTheme = true;
    setTheme(theme);
    try { localStorage.setItem('theme', theme); } catch { /* Keep the in-memory choice. */ }
  });
  systemTheme.addEventListener('change', (event) => {
    if (!explicitTheme) setTheme(event.matches ? 'dark' : 'light');
  });

  const nav = document.querySelector('.nav');
  const navToggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-links');
  const mobile = window.matchMedia('(max-width: 900px)');
  function setMenu(open, returnFocus = false) {
    open = mobile.matches && open;
    nav.dataset.open = String(open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.inert = mobile.matches && !open;
    if (returnFocus) navToggle.focus();
  }
  // Enhance only after handlers/state are available; links remain usable without JS.
  nav.dataset.enhanced = 'true';
  setMenu(false);
  navToggle.addEventListener('click', () => setMenu(nav.dataset.open !== 'true'));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.dataset.open === 'true') setMenu(false, true);
  });
  document.addEventListener('click', (event) => {
    if (!nav.contains(event.target)) setMenu(false);
  });
  nav.addEventListener('focusout', (event) => {
    if (!nav.contains(event.relatedTarget)) setMenu(false);
  });
  mobile.addEventListener('change', () => {
    const focusInMenu = menu.contains(document.activeElement);
    setMenu(false, mobile.matches && focusInMenu);
  });
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (mobile.matches) {
        setMenu(false);
        const target = document.querySelector(link.hash);
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    });
  });
  document.getElementById('year').textContent = new Date().getFullYear();

  const header = document.querySelector('.header');
  const links = [...menu.querySelectorAll('a')];
  const targets = links.map((link) => document.querySelector(link.hash));
  let scheduled = false;
  function updateNavigation() {
    const offset = Math.max(header.getBoundingClientRect().height + 32, parseFloat(getComputedStyle(targets[0]).scrollMarginTop) + 2);
    let current = -1;
    targets.forEach((target, index) => {
      if (target.getBoundingClientRect().top <= offset) current = index;
    });
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
      current = targets.length - 1;
    }
    links.forEach((link, index) => {
      link.classList.toggle('active', index === current);
      if (index === current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    scheduled = false;
  }
  function scheduleNavigation() {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(updateNavigation);
    }
  }
  window.addEventListener('scroll', scheduleNavigation, { passive: true });
  window.addEventListener('resize', scheduleNavigation);
  window.addEventListener('load', scheduleNavigation);
  updateNavigation();

  // Observe individual cards, never a tall parent section. Content stays visible
  // without observer support, with reduced motion, or when reached by keyboard.
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const cards = document.querySelectorAll('.project-card, .skill-card, .card, .service-list li, .soft-skill-list li, .contact-link');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0 });
    cards.forEach((card) => {
      card.classList.add('reveal');
      observer.observe(card);
    });
    reducedMotion.addEventListener('change', (event) => {
      if (event.matches) {
        observer.disconnect();
        cards.forEach((card) => card.classList.add('visible'));
      }
    });
  }
});
