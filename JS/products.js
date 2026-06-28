/* ============================================
   ECO NEST — products.js
   Product Data | Render | Filter
   ============================================ */

   (function () {

    // ---- PRODUCT DATA ----
    const products = [
      {
        id: 'p1',
        name: 'Bamboo Toothbrush Set',
        category: 'care',
        categoryLabel: 'Personal Care',
        icon: 'ri-drop-line',
        badge: 'eco',
        badgeLabel: 'Eco Pick',
        price: 299,
        oldPrice: 399,
        discount: '25% OFF',
        rating: 4.8,
        reviews: 124,
      },
      {
        id: 'p2',
        name: 'Reusable Beeswax Wraps',
        category: 'kitchen',
        categoryLabel: 'Kitchen',
        icon: 'ri-cup-line',
        badge: 'new',
        badgeLabel: 'New',
        price: 499,
        oldPrice: null,
        discount: null,
        rating: 4.6,
        reviews: 87,
      },
      {
        id: 'p3',
        name: 'Organic Cotton Tote Bag',
        category: 'home',
        categoryLabel: 'Home & Living',
        icon: 'ri-shopping-bag-line',
        badge: 'sale',
        badgeLabel: 'Sale',
        price: 349,
        oldPrice: 499,
        discount: '30% OFF',
        rating: 4.9,
        reviews: 213,
      },
      {
        id: 'p4',
        name: 'Solar Herb Garden Kit',
        category: 'garden',
        categoryLabel: 'Garden',
        icon: 'ri-seedling-line',
        badge: 'eco',
        badgeLabel: 'Eco Pick',
        price: 899,
        oldPrice: 1099,
        discount: '18% OFF',
        rating: 4.7,
        reviews: 56,
      },
      {
        id: 'p5',
        name: 'Recycled Glass Water Bottle',
        category: 'home',
        categoryLabel: 'Home & Living',
        icon: 'ri-goblet-line',
        badge: 'new',
        badgeLabel: 'New',
        price: 649,
        oldPrice: null,
        discount: null,
        rating: 4.5,
        reviews: 98,
      },
      {
        id: 'p6',
        name: 'Natural Loofah Sponge',
        category: 'care',
        categoryLabel: 'Personal Care',
        icon: 'ri-leaf-line',
        badge: null,
        badgeLabel: null,
        price: 179,
        oldPrice: 229,
        discount: '22% OFF',
        rating: 4.4,
        reviews: 145,
      },
      {
        id: 'p7',
        name: 'Compostable Bin Liners',
        category: 'home',
        categoryLabel: 'Home & Living',
        icon: 'ri-recycle-line',
        badge: 'eco',
        badgeLabel: 'Eco Pick',
        price: 249,
        oldPrice: null,
        discount: null,
        rating: 4.6,
        reviews: 72,
      },
      {
        id: 'p8',
        name: 'Stainless Steel Straw Set',
        category: 'kitchen',
        categoryLabel: 'Kitchen',
        icon: 'ri-cup-line',
        badge: 'sale',
        badgeLabel: 'Sale',
        price: 199,
        oldPrice: 279,
        discount: '29% OFF',
        rating: 4.8,
        reviews: 310,
      },
    ];
  
    // ---- HELPERS ----
    function renderStars(rating) {
      const full  = Math.floor(rating);
      const half  = rating % 1 >= 0.5 ? 1 : 0;
      const empty = 5 - full - half;
      return (
        '<i class="ri-star-fill"></i>'.repeat(full) +
        (half ? '<i class="ri-star-half-fill"></i>' : '') +
        '<i class="ri-star-line"></i>'.repeat(empty)
      );
    }
  
    function badgeClass(badge) {
      const map = { eco: 'badge-eco', new: 'badge-new', sale: 'badge-sale' };
      return map[badge] || '';
    }
  
    function formatPrice(p) {
      return '₹' + p.toLocaleString('en-IN');
    }
  
    // ---- RENDER CARD ----
    function createCard(product) {
      const card = document.createElement('div');
      card.classList.add('product-card', 'reveal');
      card.dataset.category = product.category;
  
      card.innerHTML = `
        <div class="product-img-wrap">
          <div class="product-img-placeholder">
            <i class="${product.icon}"></i>
          </div>
          ${product.badge ? `<span class="product-badge ${badgeClass(product.badge)}">${product.badgeLabel}</span>` : ''}
          <button class="product-wish-btn" aria-label="Add to wishlist" data-id="${product.id}">
            <i class="ri-heart-line"></i>
          </button>
          <button class="product-quick-add" data-id="${product.id}">
            <i class="ri-shopping-bag-line"></i> Quick Add
          </button>
        </div>
        <div class="product-body">
          <span class="product-category-tag">${product.categoryLabel}</span>
          <h3 class="product-name">${product.name}</h3>
          <div class="product-rating">
            <div class="stars">${renderStars(product.rating)}</div>
            <span class="rating-count">(${product.reviews})</span>
          </div>
          <div class="product-price-row">
            <div class="product-price">
              <span class="price-current">${formatPrice(product.price)}</span>
              ${product.oldPrice ? `<span class="price-old">${formatPrice(product.oldPrice)}</span>` : ''}
              ${product.discount ? `<span class="price-discount">${product.discount}</span>` : ''}
            </div>
            <button class="product-cart-btn" aria-label="Add to cart" data-id="${product.id}">
              <i class="ri-shopping-bag-line"></i>
            </button>
          </div>
        </div>
      `;
  
      // wishlist toggle
      const wishBtn = card.querySelector('.product-wish-btn');
      wishBtn.addEventListener('click', () => {
        wishBtn.classList.toggle('active');
        wishBtn.querySelector('i').className = wishBtn.classList.contains('active')
          ? 'ri-heart-fill'
          : 'ri-heart-line';
      });
  
      // add to cart feedback
      const cartBtn = card.querySelector('.product-cart-btn');
      const quickAdd = card.querySelector('.product-quick-add');
  
      function cartFeedback(btn) {
        const original = btn.innerHTML;
        btn.innerHTML = '<i class="ri-check-line"></i>';
        btn.style.background = 'var(--grad-primary)';
        btn.style.color = '#fff';
        setTimeout(() => {
          btn.innerHTML = original;
          btn.style.background = '';
          btn.style.color = '';
        }, 1200);
      }
  
      cartBtn.addEventListener('click', () => cartFeedback(cartBtn));
      quickAdd.addEventListener('click', () => {
        quickAdd.innerHTML = '<i class="ri-check-line"></i> Added!';
        setTimeout(() => {
          quickAdd.innerHTML = '<i class="ri-shopping-bag-line"></i> Quick Add';
        }, 1200);
      });
  
      return card;
    }
  
    // ---- RENDER ALL ----
    const grid = document.getElementById('productsGrid');
  
    function renderProducts(filter = 'all') {
      grid.innerHTML = '';
      const filtered = filter === 'all'
        ? products
        : products.filter(p => p.category === filter);
  
      filtered.forEach((product, i) => {
        const card = createCard(product);
        card.style.animationDelay = `${i * 0.07}s`;
        grid.appendChild(card);
      });
  
      // trigger reveal
      setTimeout(() => {
        grid.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
      }, 50);
    }
  
    renderProducts();
  
    // ---- FILTER BUTTONS ----
    const filterBtns = document.querySelectorAll('.filter-btn');
  
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProducts(btn.dataset.filter);
      });
    });
  
  })();