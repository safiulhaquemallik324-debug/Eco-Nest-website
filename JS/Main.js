/* ============================================
   ECO NEST — main.js
   Dark Mode | Contact Form | Search | Toasts
   Scroll Reveal | Newsletter | Back to Top
   ============================================ */

(function () {

  // ---- TOAST UTILITY ----
  const toastContainer = document.getElementById('toastContainer');

  function showToast(message, type = 'success') {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <i class="ri-${type === 'success' ? 'checkbox-circle-line' : 'error-warning-line'}"></i>
      <span>${message}</span>
    `;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(40px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // ---- DARK MODE ----
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  const savedTheme = localStorage.getItem('econest-theme');

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('econest-theme', theme);

    if (themeToggle) {
      const icon = themeToggle.querySelector('i');
      if (theme === 'dark') {
        icon.className = 'ri-sun-line';
        themeToggle.classList.add('active');
        themeToggle.setAttribute('aria-label', 'Switch to light mode');
      } else {
        icon.className = 'ri-moon-line';
        themeToggle.classList.remove('active');
        themeToggle.setAttribute('aria-label', 'Switch to dark mode');
      }
    }
  }

  if (savedTheme) {
    setTheme(savedTheme);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setTheme('dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
      showToast(current === 'dark' ? 'Light mode enabled' : 'Dark mode enabled');
    });
  }

  // ---- SCROLL PROGRESS ----
  const scrollProgress = document.getElementById('scrollProgress');

  window.addEventListener('scroll', () => {
    if (!scrollProgress) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = progress + '%';
  }, { passive: true });

  // ---- SCROLL REVEAL ----
  const revealEls = document.querySelectorAll(
    '.category-card, .pillar, .mission-content, .mission-visual, ' +
    '.newsletter-content, .contact-content, .footer-col, .footer-brand, ' +
    '.section-header, .product-card'
  );

  revealEls.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ---- NEWSLETTER FORM ----
  const form = document.getElementById('newsletterForm');
  const successMsg = document.createElement('div');
  successMsg.classList.add('newsletter-success');
  successMsg.innerHTML = '<i class="ri-checkbox-circle-line"></i> You\'re in! Welcome to the green community.';

  if (form) {
    form.parentNode.insertBefore(successMsg, form.nextSibling);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.form-input');
      const email = input.value.trim();

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast('Please enter a valid email address', 'error');
        return;
      }

      form.style.opacity = '0';
      form.style.transform = 'translateY(-8px)';
      form.style.transition = 'all 0.3s ease';

      setTimeout(() => {
        form.style.display = 'none';
        successMsg.classList.add('show');
        showToast('Successfully subscribed to newsletter!');
      }, 300);
    });
  }

  // ---- CONTACT FORM (Real Gmail via EmailJS) ----
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    const contactSuccess = document.createElement('div');
    contactSuccess.className = 'contact-success';
    contactSuccess.innerHTML = '<i class="ri-checkbox-circle-line"></i> Email sent successfully via Gmail!';
    contactForm.parentNode.insertBefore(contactSuccess, contactForm.nextSibling);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const fields = {
      contactTo: {
        validate: (v) => emailPattern.test(v) || 'Enter a valid recipient Gmail address',
      },
      contactName: {
        validate: (v) => v.length >= 2 || 'Name must be at least 2 characters',
      },
      contactEmail: {
        validate: (v) => emailPattern.test(v) || 'Enter a valid email address',
      },
      contactSubject: {
        validate: (v) => v.length >= 3 || 'Subject must be at least 3 characters',
      },
      contactMessage: {
        validate: (v) => v.length >= 10 || 'Message must be at least 10 characters',
      },
    };

    function showFieldError(id, msg) {
      const input = document.getElementById(id);
      const errorEl = document.querySelector(`.field-error[data-for="${id}"]`);
      if (input) input.classList.toggle('invalid', !!msg);
      if (errorEl) errorEl.textContent = msg || '';
    }

    Object.keys(fields).forEach(id => {
      const input = document.getElementById(id);
      if (input) {
        input.addEventListener('blur', () => {
          const result = fields[id].validate(input.value.trim());
          showFieldError(id, result === true ? '' : result);
        });
        input.addEventListener('input', () => {
          if (input.classList.contains('invalid')) {
            const result = fields[id].validate(input.value.trim());
            if (result === true) showFieldError(id, '');
          }
        });
      }
    });

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      let valid = true;

      Object.keys(fields).forEach(id => {
        const input = document.getElementById(id);
        const result = fields[id].validate(input.value.trim());
        if (result !== true) {
          showFieldError(id, result);
          valid = false;
        } else {
          showFieldError(id, '');
        }
      });

      if (!valid) {
        showToast('Please fix the errors in the form', 'error');
        return;
      }

      if (typeof isEmailJsConfigured === 'function' && !isEmailJsConfigured()) {
        showToast('Email not configured yet. Open JS/email-config.js and add your EmailJS keys.', 'error');
        return;
      }

      if (typeof emailjs === 'undefined') {
        showToast('Email service failed to load. Check your internet connection.', 'error');
        return;
      }

      const submitBtn = document.getElementById('contactSubmit');
      const btnText = submitBtn.querySelector('.btn-text');
      const originalText = btnText.textContent;
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;
      btnText.textContent = 'Sending via Gmail...';

      const toEmail = document.getElementById('contactTo').value.trim()
        || EMAILJS_CONFIG.DEFAULT_TO_EMAIL;
      const fromName = document.getElementById('contactName').value.trim();
      const fromEmail = document.getElementById('contactEmail').value.trim();
      const subject = document.getElementById('contactSubject').value.trim();
      const message = document.getElementById('contactMessage').value.trim();

      const templateParams = {
        to_email: toEmail,
        from_name: fromName,
        from_email: fromEmail,
        subject: subject,
        message: message,
        reply_to: fromEmail,
      };

      try {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

        await emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_ID,
          templateParams
        );

        contactForm.style.display = 'none';
        contactSuccess.classList.add('show');
        showToast(`Email sent to ${toEmail} successfully!`);

        localStorage.setItem('econest-last-contact', JSON.stringify({
          ...templateParams,
          sentAt: new Date().toISOString(),
        }));
      } catch (err) {
        console.error('EmailJS error:', err);
        const errMsg = err.text || err.message || 'Failed to send email';
        showToast(`Send failed: ${errMsg}. Check email-config.js setup.`, 'error');
      } finally {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        btnText.textContent = originalText;
      }
    });
  }

  // ---- COPY CONTACT INFO ----
  document.querySelectorAll('.contact-item.copyable').forEach(item => {
    item.addEventListener('click', async () => {
      const text = item.dataset.copy;
      try {
        await navigator.clipboard.writeText(text);
        showToast('Copied to clipboard!');
      } catch {
        showToast('Could not copy — please copy manually', 'error');
      }
    });
  });

  // ---- SEARCH MODAL ----
  const searchBtn = document.getElementById('searchBtn');
  const searchModal = document.getElementById('searchModal');
  const searchClose = document.getElementById('searchClose');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');

  const searchItems = [
    { name: 'Bamboo Toothbrush Set', icon: 'ri-drop-line', section: '#products' },
    { name: 'Beeswax Wraps', icon: 'ri-cup-line', section: '#products' },
    { name: 'Organic Cotton Tote', icon: 'ri-shirt-line', section: '#products' },
    { name: 'Compost Bin Kit', icon: 'ri-seedling-line', section: '#products' },
    { name: 'Home & Living', icon: 'ri-home-heart-line', section: '#categories' },
    { name: 'Kitchen Essentials', icon: 'ri-cup-line', section: '#categories' },
    { name: 'Our Mission', icon: 'ri-earth-line', section: '#mission' },
    { name: 'Customer Reviews', icon: 'ri-star-line', section: '#reviews' },
    { name: 'Contact Us', icon: 'ri-mail-send-line', section: '#newsletter' },
  ];

  function openSearch() {
    if (!searchModal) return;
    searchModal.classList.add('open');
    searchModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => searchInput && searchInput.focus(), 100);
  }

  function closeSearch() {
    if (!searchModal) return;
    searchModal.classList.remove('open');
    searchModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (searchInput) searchInput.value = '';
    renderSearchResults('');
  }

  function renderSearchResults(query) {
    if (!searchResults) return;
    const q = query.toLowerCase().trim();
    const filtered = q
      ? searchItems.filter(item => item.name.toLowerCase().includes(q))
      : searchItems.slice(0, 5);

    if (!filtered.length) {
      searchResults.innerHTML = '<p class="search-empty">No results found. Try "bamboo" or "kitchen".</p>';
      return;
    }

    searchResults.innerHTML = filtered.map(item => `
      <a href="${item.section}" class="search-result-item">
        <i class="${item.icon}"></i>
        <span>${item.name}</span>
      </a>
    `).join('');

    searchResults.querySelectorAll('.search-result-item').forEach(link => {
      link.addEventListener('click', () => closeSearch());
    });
  }

  if (searchBtn) searchBtn.addEventListener('click', openSearch);
  if (searchClose) searchClose.addEventListener('click', closeSearch);
  if (searchModal) {
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) closeSearch();
    });
  }
  if (searchInput) {
    searchInput.addEventListener('input', (e) => renderSearchResults(e.target.value));
    renderSearchResults('');
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchModal && searchModal.classList.contains('open')) {
      closeSearch();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
  });

  // ---- SMOOTH SCROLL ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ---- COUNTER ANIMATION ----
  function animateCounter(el, target, duration = 1800) {
    let start = null;
    const isFloat = target % 1 !== 0;
    const suffix = el.dataset.suffix || '';

    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;

      if (isFloat) {
        el.textContent = current.toFixed(1) + '%';
      } else if (suffix.includes('+')) {
        el.textContent = Math.floor(current).toLocaleString('en-IN') + suffix;
      } else if (suffix.includes('%')) {
        el.textContent = Math.floor(current) + suffix;
      } else {
        el.textContent = Math.floor(current).toLocaleString('en-IN') + suffix;
      }

      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const raw = el.textContent.trim();
        const suffix = raw.replace(/[\d.,]/g, '').trim();
        const value = parseFloat(raw.replace(/[^\d.]/g, ''));

        if (!isNaN(value)) {
          el.dataset.suffix = suffix;
          animateCounter(el, value);
          counterObserver.unobserve(el);
        }
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-num, .counter-num').forEach(el => {
    counterObserver.observe(el);
  });

  // ---- BACK TO TOP ----
  const backBtn = document.createElement('button');
  backBtn.classList.add('back-to-top');
  backBtn.setAttribute('aria-label', 'Back to top');
  backBtn.innerHTML = '<i class="ri-arrow-up-line"></i>';
  document.body.appendChild(backBtn);

  window.addEventListener('scroll', () => {
    backBtn.classList.toggle('show', window.scrollY > 400);
  }, { passive: true });

  backBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

})();
