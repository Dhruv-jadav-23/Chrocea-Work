
// Main JavaScript functionality for Crochea Luxe

// Global variables
let currentTestimonial = 0;
let isLoading = true;

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
  // Remove loading screen after content loads
  setTimeout(() => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.classList.add('hidden');
      isLoading = false;
    }
  }, 1500);

  // Initialize all components
  initializeNavigation();
  initializeProducts();
  initializeGallery();
  initializeTestimonials();
  initializeFAQ();
  initializeScrollEffects();
  initializeContactForm();
  initializeNewsletter();
  initializeModals();
});

// Navigation functionality
function initializeNavigation() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const header = document.getElementById('header');

  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
  }

  // Close mobile menu when clicking on links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });

  // Header scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Active link highlighting
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });
}

// Smooth scrolling
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Products functionality
function initializeProducts() {
  const productsGrid = document.getElementById('products-grid');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const categoryCards = document.querySelectorAll('.category-card');

  if (!productsGrid) return;

  // Render products
  function renderProducts(productsToShow = window.productsData) {
    productsGrid.innerHTML = productsToShow.map(product => `
      <div class="product-card" data-category="${product.category}">
        <div class="product-image">
          <img src="${product.image}" alt="${product.title}" loading="lazy">
        </div>
        <div class="product-info">
          <h3 class="product-title">${product.title}</h3>
          <p class="product-price">₹${product.price}</p>
          <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
          <button class="btn btn-outline" onclick="showProductDetail(${product.id})" style="width: 100%; margin-top: 0.5rem;">View Details</button>
        </div>
      </div>
    `).join('');
  }

  // Filter products
  function filterProducts(category) {
    const filteredProducts = category === 'all' 
      ? window.productsData 
      : window.productsData.filter(product => product.category === category);
    
    renderProducts(filteredProducts);

    // Update active filter button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-filter="${category}"]`).classList.add('active');
  }

  // Add filter event listeners
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.getAttribute('data-filter');
      filterProducts(category);
    });
  });

  // Category card click handlers
  categoryCards.forEach(card => {
    card.addEventListener('click', () => {
      const category = card.getAttribute('data-category');
      scrollToSection('shop');
      setTimeout(() => filterProducts(category), 500);
    });
  });

  // Initial render
  renderProducts();
}

// Add to cart functionality
function addToCart(productId) {
  const product = window.productsData.find(p => p.id === productId);
  if (product && window.cart) {
    window.cart.addItem(product);
  }
}

// Show product detail
function showProductDetail(productId) {
  if (window.productModal) {
    window.productModal.show(productId);
  }
}

// Gallery functionality
function initializeGallery() {
  const galleryGrid = document.getElementById('gallery-grid');
  
  if (!galleryGrid) return;

  galleryGrid.innerHTML = window.galleryData.map(image => `
    <div class="gallery-item" onclick="openImageModal('${image.src}', '${image.caption}')">
      <img src="${image.src}" alt="${image.alt}" loading="lazy">
      <div class="gallery-overlay">
        <div class="gallery-caption">
          <p>${image.caption}</p>
        </div>
      </div>
    </div>
  `).join('');
}

// Open image modal
function openImageModal(imageSrc, caption) {
  const modal = document.createElement('div');
  modal.className = 'modal active';
  modal.innerHTML = `
    <div class="modal-content" style="max-width: 90%; max-height: 90%;">
      <button class="modal-close" onclick="this.closest('.modal').remove(); document.body.style.overflow = 'auto'">&times;</button>
      <div class="modal-body" style="padding: 0; text-align: center;">
        <img src="${imageSrc}" alt="${caption}" style="width: 100%; height: auto; max-height: 80vh; object-fit: contain;">
        <p style="padding: 1rem; margin: 0; font-style: italic;">${caption}</p>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  
  // Close on background click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
      document.body.style.overflow = 'auto';
    }
  });
}

// Testimonials slider
function initializeTestimonials() {
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.dot');

  if (testimonials.length === 0) return;

  function showTestimonial(index) {
    // Hide all testimonials
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Show current testimonial
    if (testimonials[index]) {
      testimonials[index].classList.add('active');
      dots[index].classList.add('active');
    }
  }

  function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
  }

  // Dot click handlers
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentTestimonial = index;
      showTestimonial(currentTestimonial);
    });
  });

  // Auto-advance testimonials
  setInterval(nextTestimonial, 5000);
}

// FAQ functionality
function initializeFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });
      
      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// Scroll effects
function initializeScrollEffects() {
  const scrollTopBtn = document.getElementById('scroll-top');

  // Show/hide scroll to top button
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  // Scroll to top functionality
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements for scroll animations
  const animateElements = document.querySelectorAll('.category-card, .product-card, .feature, .gallery-item');
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Contact form
function initializeContactForm() {
  const contactForm = document.getElementById('contact-form');
  
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Show success message
    showToast('Thank you for your message! Mahima will get back to you soon.', 'success');
    
    // Reset form
    contactForm.reset();
  });
}

// Newsletter
function initializeNewsletter() {
  const newsletterForm = document.getElementById('newsletter-form');
  
  if (!newsletterForm) return;

  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = new FormData(newsletterForm).get('email');
    
    if (email) {
      showToast('Thank you for subscribing to our newsletter!', 'success');
      newsletterForm.reset();
    }
  });
}

// Modal functionality
function initializeModals() {
  const modals = document.querySelectorAll('.modal');
  const closeBtns = document.querySelectorAll('.modal-close');

  // Close modal handlers
  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  });

  // Close on background click
  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  });

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeModal = document.querySelector('.modal.active');
      if (activeModal) {
        activeModal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    }
  });
}

// Toast notification
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    top: 100px;
    right: 2rem;
    background: ${type === 'success' ? '#d4edda' : '#f8d7da'};
    color: ${type === 'success' ? '#155724' : '#721c24'};
    border: 1px solid ${type === 'success' ? '#c3e6cb' : '#f5c6cb'};
    border-radius: 12px;
    padding: 1rem 1.5rem;
    box-shadow: 0 8px 30px rgba(212, 175, 160, 0.2);
    z-index: 3000;
    transform: translateX(400px);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    max-width: 300px;
    font-weight: 500;
  `;
  
  document.body.appendChild(toast);
  
  setTimeout(() => toast.style.transform = 'translateX(0)', 100);
  setTimeout(() => {
    toast.style.transform = 'translateX(400px)';
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 3000);
}

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Export functions for global access
window.scrollToSection = scrollToSection;
window.addToCart = addToCart;
window.showProductDetail = showProductDetail;
window.openImageModal = openImageModal;
window.showToast = showToast;
