
// Cart functionality
class Cart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('aura-cart')) || [];
    this.updateCartCount();
  }

  addItem(product, quantity = 1) {
    const existingItem = this.items.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: quantity
      });
    }
    
    this.saveCart();
    this.updateCartCount();
    this.showToast(`${product.title} added to cart!`, 'success');
  }

  removeItem(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.saveCart();
    this.updateCartCount();
    this.renderCartItems();
    this.showToast('Item removed from cart', 'success');
  }

  updateQuantity(productId, quantity) {
    const item = this.items.find(item => item.id === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeItem(productId);
      } else {
        item.quantity = quantity;
        this.saveCart();
        this.updateCartCount();
        this.renderCartItems();
      }
    }
  }

  getTotal() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getTotalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  clearCart() {
    this.items = [];
    this.saveCart();
    this.updateCartCount();
    this.renderCartItems();
  }

  saveCart() {
    localStorage.setItem('aura-cart', JSON.stringify(this.items));
  }

  updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
      cartCount.textContent = this.getTotalItems();
    }
  }

  renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartItemsContainer) return;

    if (this.items.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="empty-cart">
          <p>Your cart is empty</p>
          <button class="btn btn-primary" onclick="closeModal('cart-modal')">Continue Shopping</button>
        </div>
      `;
      if (cartTotal) cartTotal.textContent = '0';
      return;
    }

    cartItemsContainer.innerHTML = this.items.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.title}" class="cart-item-image">
        <div class="cart-item-info">
          <h4 class="cart-item-title">${item.title}</h4>
          <p class="cart-item-price">₹${item.price}</p>
        </div>
        <div class="cart-item-controls">
          <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})" ${item.quantity <= 1 ? 'disabled' : ''}>-</button>
          <span class="quantity">${item.quantity}</span>
          <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
          <button class="remove-btn" onclick="cart.removeItem(${item.id})">🗑️</button>
        </div>
      </div>
    `).join('');

    if (cartTotal) {
      cartTotal.textContent = this.getTotal();
    }
  }

  showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
  }
}

// Product Modal functionality
class ProductModal {
  constructor() {
    this.modal = document.getElementById('product-modal');
    this.modalBody = document.getElementById('product-modal-body');
  }

  show(productId) {
    const product = window.productsData.find(p => p.id === productId);
    if (!product) return;

    this.renderProduct(product);
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  hide() {
    this.modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  renderProduct(product) {
    const relatedProducts = window.productsData
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 3);

    this.modalBody.innerHTML = `
      <div class="product-detail">
        <div class="product-gallery">
          <img src="${product.images[0]}" alt="${product.title}" class="main-image" id="main-image">
          <div class="thumbnail-grid">
            ${product.images.map((img, index) => `
              <img src="${img}" alt="${product.title}" class="thumbnail ${index === 0 ? 'active' : ''}" 
                   onclick="productModal.changeImage('${img}', ${index})">
            `).join('')}
          </div>
        </div>
        
        <div class="product-details">
          <h2>${product.title}</h2>
          <p class="product-price">₹${product.price}</p>
          <p class="product-description">${product.description}</p>
          
          <ul class="product-features">
            ${Object.entries(product.features).map(([key, value]) => `
              <li><strong>${key}:</strong> ${value}</li>
            `).join('')}
          </ul>
          
          <div class="quantity-selector">
            <label for="quantity">Quantity:</label>
            <input type="number" id="quantity" class="quantity-input" value="1" min="1" max="10">
          </div>
          
          <div class="product-actions">
            <button class="btn btn-primary" onclick="productModal.addToCart(${product.id})">
              Add to Cart
            </button>
            <button class="btn btn-outline" onclick="productModal.hide()">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
      
      ${relatedProducts.length > 0 ? `
        <div class="related-products">
          <h3>You might also like</h3>
          <div class="related-grid">
            ${relatedProducts.map(p => `
              <div class="related-product" onclick="productModal.show(${p.id})">
                <img src="${p.image}" alt="${p.title}">
                <h4>${p.title}</h4>
                <p class="price">₹${p.price}</p>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    `;
  }

  changeImage(imageSrc, index) {
    const mainImage = document.getElementById('main-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    mainImage.src = imageSrc;
    thumbnails.forEach((thumb, i) => {
      thumb.classList.toggle('active', i === index);
    });
  }

  addToCart(productId) {
    const product = window.productsData.find(p => p.id === productId);
    const quantity = parseInt(document.getElementById('quantity').value) || 1;
    
    if (product) {
      cart.addItem(product, quantity);
      this.hide();
    }
  }
}

// Modal functionality
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    if (modalId === 'cart-modal') {
      cart.renderCartItems();
    }
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

// Checkout functionality
class Checkout {
  constructor() {
    this.form = document.getElementById('checkout-form');
    this.setupEventListeners();
  }

  setupEventListeners() {
    if (this.form) {
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
  }

  show() {
    this.renderCheckoutItems();
    openModal('checkout-modal');
  }

  renderCheckoutItems() {
    const checkoutItems = document.getElementById('checkout-items');
    const checkoutTotal = document.getElementById('checkout-total');
    
    if (!checkoutItems || cart.items.length === 0) return;

    checkoutItems.innerHTML = cart.items.map(item => `
      <div class="checkout-item">
        <span>${item.title} x ${item.quantity}</span>
        <span>₹${item.price * item.quantity}</span>
      </div>
    `).join('');

    if (checkoutTotal) {
      checkoutTotal.textContent = cart.getTotal();
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const orderData = {
      name: document.getElementById('checkout-name').value,
      phone: document.getElementById('checkout-phone').value,
      email: document.getElementById('checkout-email').value,
      address: document.getElementById('checkout-address').value,
      pincode: document.getElementById('checkout-pincode').value,
      items: cart.items,
      total: cart.getTotal(),
      orderDate: new Date().toISOString()
    };

    // In a real application, you would send this data to a server
    console.log('Order placed:', orderData);
    
    // Show success message
    this.showSuccessMessage();
    
    // Clear cart
    cart.clearCart();
    
    // Close modal
    closeModal('checkout-modal');
  }

  showSuccessMessage() {
    const message = `
      <div class="success-message">
        <h3>🎉 Order Placed Successfully!</h3>
        <p>Thank you for your order! We'll contact you within 2 hours to confirm delivery details.</p>
        <p><strong>Delivery:</strong> 2-5 days within Ahmedabad</p>
        <p><strong>Payment:</strong> Cash on Delivery</p>
      </div>
    `;
    
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-body">
          ${message}
          <button class="btn btn-primary full-width" onclick="this.closest('.modal').remove(); document.body.style.overflow = 'auto'">
            Continue Shopping
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
  }
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

// Testimonial slider
class TestimonialSlider {
  constructor() {
    this.testimonials = document.querySelectorAll('.testimonial');
    this.dots = document.querySelectorAll('.dot');
    this.currentSlide = 0;
    this.interval = null;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.startAutoSlide();
  }

  setupEventListeners() {
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToSlide(index));
    });
  }

  goToSlide(slideIndex) {
    this.testimonials[this.currentSlide].classList.remove('active');
    this.dots[this.currentSlide].classList.remove('active');
    
    this.currentSlide = slideIndex;
    
    this.testimonials[this.currentSlide].classList.add('active');
    this.dots[this.currentSlide].classList.add('active');
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.testimonials.length;
    this.goToSlide(nextIndex);
  }

  startAutoSlide() {
    this.interval = setInterval(() => this.nextSlide(), 5000);
  }

  stopAutoSlide() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}

// Initialize components
let cart, productModal, checkout, testimonialSlider;

document.addEventListener('DOMContentLoaded', () => {
  cart = new Cart();
  productModal = new ProductModal();
  checkout = new Checkout();
  testimonialSlider = new TestimonialSlider();
  
  initializeFAQ();
});

// Export for global access
window.cart = cart;
window.productModal = productModal;
window.checkout = checkout;
window.openModal = openModal;
window.closeModal = closeModal;
