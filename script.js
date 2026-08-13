// ================= CART LOGIC =================
function addToCart(productName, price) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({ name: productName, price: price });
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${productName} added to your cart!`);
}

// Display Cart Contents (for cart.html)
document.addEventListener('DOMContentLoaded', () => {
  const cartContainer = document.getElementById('cart-container');
  if (cartContainer) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
      cartContainer.innerHTML = '<p style="text-align:center;">Your cart is currently empty.</p>';
    } else {
      let total = 0;
      let html = '<ul style="list-style: none; margin-bottom: 20px;">';
      
      cart.forEach((item) => {
        total += item.price;
        html += `<li style="padding: 12px; border: 2px solid #333; background: #fff; margin-bottom: 8px; display: flex; justify-content: space-between; font-family: 'Oswald', sans-serif;">
          <span>${item.name}</span>
          <span>$${item.price.toFixed(2)}</span>
        </li>`;
      });
      
      html += `</ul><h3 style="font-family:'Oswald', sans-serif; font-size: 1.5rem; text-align:right;">Total: $${total.toFixed(2)}</h3>`;
      html += '<button class="btn" style="margin-top: 15px; float: right;" onclick="clearCart()">Clear Cart</button>';
      cartContainer.innerHTML = html;
    }
  }
});

function clearCart() {
  localStorage.removeItem('cart');
  location.reload();
}

// ================= CATEGORY FILTERING =================
function filterFlorals(category) {
  // Update active state on category filter buttons
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => btn.classList.remove('active'));

  // Highlight the clicked button
  event.currentTarget.classList.add('active');

  // Filter product cards
  const products = document.querySelectorAll('.product-card');
  products.forEach(product => {
    if (category === 'all' || product.getAttribute('data-category') === category) {
      product.style.display = 'flex';
    } else {
      product.style.display = 'none';
    }
  });
}

// ================= LIGHTBOX / FULL-SIZE IMAGE MODAL =================
function openLightbox(imageSrc, captionText) {
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('lightbox-img');
  const modalCaption = document.getElementById('lightbox-caption');

  if (modal && modalImg) {
    modalImg.src = imageSrc;
    modalCaption.textContent = captionText || '';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Stop background scrolling when open
  }
}

function closeLightbox(event) {
  const modal = document.getElementById('image-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Re-enable background scrolling
  }
}

// Close Lightbox when pressing ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
  }
});
