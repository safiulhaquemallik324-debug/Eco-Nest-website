/* ============================================
   ECO NEST — navbar.js
   Scroll effect | Mobile menu | Overlay
   ============================================ */

   (function () {
    const navbar    = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks  = document.getElementById('navLinks');
  
    // ---- CREATE OVERLAY ----
    const overlay = document.createElement('div');
    overlay.classList.add('nav-overlay');
    document.body.appendChild(overlay);
  
    // ---- SCROLL — sticky glass effect ----
    function onScroll() {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run on load
  
    // ---- MOBILE MENU TOGGLE ----
    function openMenu() {
      navLinks.classList.add('open');
      overlay.classList.add('open');
      navToggle.innerHTML = '<i class="ri-close-line"></i>';
      document.body.style.overflow = 'hidden';
    }
  
    function closeMenu() {
      navLinks.classList.remove('open');
      overlay.classList.remove('open');
      navToggle.innerHTML = '<i class="ri-menu-3-line"></i>';
      document.body.style.overflow = '';
    }
  
    navToggle.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  
    // close on overlay click
    overlay.addEventListener('click', closeMenu);
  
    // close on nav link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  
    // close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  
    // ---- ACTIVE LINK on scroll ----
    const sections = document.querySelectorAll('section[id]');
  
    function setActiveLink() {
      const scrollY = window.scrollY + 100;
  
      sections.forEach(section => {
        const top    = section.offsetTop;
        const height = section.offsetHeight;
        const id     = section.getAttribute('id');
        const link   = document.querySelector(`.nav-link[href="#${id}"]`);
  
        if (link) {
          if (scrollY >= top && scrollY < top + height) {
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
          }
        }
      });
    }
  
    window.addEventListener('scroll', setActiveLink, { passive: true });
    setActiveLink();
  
  })();