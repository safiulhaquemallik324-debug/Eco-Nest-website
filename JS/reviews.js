/* ============================================
   ECO NEST — reviews.js
   Review Data | Render | Slider
   ============================================ */

   (function () {

    // ---- REVIEW DATA ----
    const reviews = [
      {
        id: 1,
        name: 'Priya Sharma',
        title: 'Eco Enthusiast, Mumbai',
        initials: 'PS',
        rating: 5,
        text: 'I switched to Eco Nest two months ago and honestly, I cannot imagine going back. The bamboo toothbrush set is incredible — feels premium and knowing it\'s plastic-free makes every morning feel better.',
        verified: true,
        featured: false,
      },
      {
        id: 2,
        name: 'Arjun Mehta',
        title: 'Sustainability Blogger, Delhi',
        initials: 'AM',
        rating: 5,
        text: 'The quality here genuinely surprised me. I\'ve tried many sustainable brands but Eco Nest hits a different level — beautiful packaging, fast delivery, and the products actually last. This is what green shopping should feel like.',
        verified: true,
        featured: true,
      },
      {
        id: 3,
        name: 'Sneha Iyer',
        title: 'Yoga Instructor, Bangalore',
        initials: 'SI',
        rating: 4,
        text: 'Ordered the beeswax wraps and the cotton tote. Both are exactly as described — natural, sturdy, and gorgeous. The tote especially gets so many compliments. Shipping was quick and the zero-waste packaging was a nice touch.',
        verified: true,
        featured: false,
      },
      {
        id: 4,
        name: 'Rohan Das',
        title: 'Product Designer, Kolkata',
        initials: 'RD',
        rating: 5,
        text: 'As someone who cares a lot about aesthetics, I was thrilled that Eco Nest doesn\'t compromise on design. The products look stunning, feel great, and do zero harm to the planet. 10/10 would recommend to everyone.',
        verified: true,
        featured: false,
      },
      {
        id: 5,
        name: 'Kavya Nair',
        title: 'Teacher, Kochi',
        initials: 'KN',
        rating: 5,
        text: 'The solar herb garden kit is an absolute gem. My balcony has never looked this green and alive! Customer support was warm and helpful when I had a question. Will definitely be a repeat customer.',
        verified: true,
        featured: false,
      },
      {
        id: 6,
        name: 'Vikram Joshi',
        title: 'Chef, Pune',
        initials: 'VJ',
        rating: 4,
        text: 'Finally a sustainable kitchen brand that understands quality. The stainless steel straws and glass bottle are now everyday essentials. Even my restaurant guests ask about them. Eco Nest deserves all the love.',
        verified: true,
        featured: false,
      },
    ];
  
    // ---- STATE ----
    let currentPage = 0;
    const perPage   = 3;
    const totalPages = Math.ceil(reviews.length / perPage);
  
    // ---- HELPERS ----
    function renderStars(rating) {
      return Array.from({ length: 5 }, (_, i) =>
        `<i class="${i < rating ? 'ri-star-fill' : 'ri-star-line'}"></i>`
      ).join('');
    }
  
    // ---- RENDER CARDS ----
    function renderReviews(page) {
      const slider = document.getElementById('reviewsSlider');
      slider.innerHTML = '';
  
      const start   = page * perPage;
      const pageSet = reviews.slice(start, start + perPage);
  
      // make middle card featured
      pageSet.forEach((review, idx) => {
        const isFeatured = idx === 1;
        const card = document.createElement('div');
        card.classList.add('review-card', 'reveal');
        if (isFeatured) card.classList.add('featured');
  
        card.innerHTML = `
          <div class="review-quote-icon"><i class="ri-double-quotes-l"></i></div>
          <div class="review-stars">${renderStars(review.rating)}</div>
          <p class="review-text">"${review.text}"</p>
          <div class="reviewer-info">
            <div class="reviewer-avatar">${review.initials}</div>
            <div>
              <div class="reviewer-name">${review.name}</div>
              <div class="reviewer-title">${review.title}</div>
            </div>
            ${review.verified
              ? `<span class="verified-badge"><i class="ri-shield-check-line"></i> Verified</span>`
              : ''}
          </div>
        `;
  
        slider.appendChild(card);
      });
  
      // trigger reveal
      setTimeout(() => {
        slider.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
      }, 50);
  
      renderDots(page);
    }
  
    // ---- DOTS ----
    function renderDots(activePage) {
      const dotsEl = document.getElementById('revDots');
      dotsEl.innerHTML = '';
  
      for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('button');
        dot.classList.add('rev-dot');
        dot.setAttribute('aria-label', `Go to page ${i + 1}`);
        if (i === activePage) dot.classList.add('active');
  
        dot.addEventListener('click', () => {
          currentPage = i;
          renderReviews(currentPage);
        });
  
        dotsEl.appendChild(dot);
      }
    }
  
    // ---- PREV / NEXT ----
    document.getElementById('revPrev').addEventListener('click', () => {
      currentPage = (currentPage - 1 + totalPages) % totalPages;
      renderReviews(currentPage);
    });
  
    document.getElementById('revNext').addEventListener('click', () => {
      currentPage = (currentPage + 1) % totalPages;
      renderReviews(currentPage);
    });
  
    // ---- AUTO PLAY ----
    let autoPlay = setInterval(() => {
      currentPage = (currentPage + 1) % totalPages;
      renderReviews(currentPage);
    }, 5000);
  
    // pause on hover
    const slider = document.getElementById('reviewsSlider');
    slider.addEventListener('mouseenter', () => clearInterval(autoPlay));
    slider.addEventListener('mouseleave', () => {
      autoPlay = setInterval(() => {
        currentPage = (currentPage + 1) % totalPages;
        renderReviews(currentPage);
      }, 5000);
    });
  
    // ---- INIT ----
    renderReviews(currentPage);
  
  })();