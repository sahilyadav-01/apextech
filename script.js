/* =========================================
   APEXTECH INSTRUMENTATION — JAVASCRIPT
   ========================================= */

'use strict';

// ── Navbar scroll effect ──────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ── Active nav link highlighting ─────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);
sections.forEach(section => sectionObserver.observe(section));

// ── Hamburger mobile menu ─────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinksList = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksList.classList.toggle('open');
});
// Close on nav link click
navLinksList.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksList.classList.remove('open');
  });
});

// ── Hero floating particles ──────────────────────────
function createParticles() {
  const container = document.getElementById('hero-particles');
  const count = 28;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 3 + 2;
    p.style.width  = size + 'px';
    p.style.height = size + 'px';
    p.style.left   = Math.random() * 100 + '%';
    p.style.bottom = '-20px';
    p.style.animationDuration = (Math.random() * 15 + 10) + 's';
    p.style.animationDelay    = (Math.random() * 10) + 's';
    p.style.opacity = Math.random() * 0.5 + 0.1;
    container.appendChild(p);
  }
}
createParticles();

// ── Counter animation ─────────────────────────────────
function animateCount(el, target, duration = 2000) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = Math.round(target).toLocaleString();
      clearInterval(timer);
    } else {
      el.textContent = Math.round(start).toLocaleString();
    }
  }, 16);
}

let countersStarted = false;
const heroObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersStarted) {
        countersStarted = true;
        document.querySelectorAll('.stat-value[data-target]').forEach(el => {
          const target = parseInt(el.dataset.target, 10);
          animateCount(el, target);
        });
      }
    });
  },
  { threshold: 0.4 }
);
const heroSection = document.getElementById('home');
if (heroSection) heroObserver.observe(heroSection);

// ── Scroll reveal animations ─────────────────────────
const animateObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, entry.target.dataset.delay || 0);
        animateObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

// Stagger delays for grid children
document.querySelectorAll('.products-grid .product-card').forEach((el, i) => {
  el.dataset.delay = i * 80;
});
document.querySelectorAll('.services-grid .service-card').forEach((el, i) => {
  el.dataset.delay = i * 70;
});
document.querySelectorAll('.industries-grid .industry-card').forEach((el, i) => {
  el.dataset.delay = i * 60;
});
document.querySelectorAll('.about-cards-grid .about-card').forEach((el, i) => {
  el.dataset.delay = i * 100;
  el.setAttribute('data-animate', '');
});

document.querySelectorAll('[data-animate]').forEach(el => animateObserver.observe(el));

// ── Product Filter ────────────────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    productCards.forEach(card => {
      const cat = card.dataset.category;
      if (filter === 'all' || cat === filter) {
        card.style.display = '';
        // Re-trigger animation if needed
        card.classList.remove('visible');
        setTimeout(() => card.classList.add('visible'), 50);
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ── Back-to-top button ────────────────────────────────
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Contact Form ──────────────────────────────────────
const form = document.getElementById('enquiry-form');
const successMsg = document.getElementById('form-success');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const required = form.querySelectorAll('[required]');
  let valid = true;
  required.forEach(field => {
    if (!field.value.trim()) {
      field.style.borderColor = '#EF4444';
      field.style.boxShadow = '0 0 0 3px rgba(239,68,68,0.12)';
      valid = false;
      field.addEventListener('input', () => {
        field.style.borderColor = '';
        field.style.boxShadow = '';
      }, { once: true });
    }
  });
  if (!valid) return;

  // Simulate async send
  const submitBtn = document.getElementById('submit-enquiry-btn');
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  submitBtn.style.opacity = '0.7';

  setTimeout(() => {
    form.reset();
    submitBtn.textContent = 'Send Enquiry';
    submitBtn.disabled = false;
    submitBtn.style.opacity = '';
    successMsg.style.display = 'block';
    setTimeout(() => { successMsg.style.display = 'none'; }, 5000);
  }, 1500);
});

// ── Smooth scroll for all anchor links ────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - offset,
        behavior: 'smooth'
      });
    }
  });
});

// ── Duplicate trust logos for infinite scroll ─────────
const trustLogos = document.querySelector('.trust-logos');
if (trustLogos) {
  trustLogos.innerHTML = trustLogos.innerHTML + trustLogos.innerHTML;
}

// ── Highlight nav-phone on scroll to top ─────────────
window.addEventListener('scroll', () => {
  const navPhone = document.querySelector('.nav-phone');
  if (navPhone) {
    if (window.scrollY < 100) {
      navPhone.style.color = 'rgba(255,255,255,0.75)';
    }
  }
});

console.log('ApexTech Instrumentation — Website Loaded ✅');
