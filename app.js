/* ==========================================================================
   21 FLORALS - UNIVERSAL JS SCRIPT
   ========================================================================== */

const MASTER_21_SILK_FLORALS = [
  { id: 1, name: "Royal Peony", role: "Primary Focal", category: "focal" },
  { id: 2, name: "Heritage Garden Rose", role: "Primary Focal", category: "focal" },
  { id: 3, name: "Classic Hydrangea", role: "Primary Focal", category: "focal" },
  { id: 4, name: "Velvet Orchid (Phalaenopsis)", role: "Primary Focal", category: "focal" },
  { id: 5, name: "Dinnerplate Dahlia", role: "Primary Focal", category: "focal" },
  { id: 6, name: "Calla Lily", role: "Primary Focal", category: "focal" },
  { id: 7, name: "Italian Ranunculus", role: "Secondary Accent", category: "secondary" },
  { id: 8, name: "Anemone (Windflower)", role: "Secondary Accent", category: "secondary" },
  { id: 9, name: "Pacific Delphinium", role: "Secondary Accent", category: "secondary" },
  { id: 10, name: "Dutch Tulip", role: "Secondary Accent", category: "secondary" },
  { id: 11, name: "Southern Magnolia", role: "Secondary Accent", category: "secondary" },
  { id: 12, name: "Silk Carnation", role: "Secondary Accent", category: "secondary" },
  { id: 13, name: "Stargazer Lily", role: "Secondary Accent", category: "secondary" },
  { id: 14, name: "French Lavender", role: "Supporting Foliage/Stem", category: "supporting" },
  { id: 15, name: "Silver Dollar Eucalyptus", role: "Supporting Foliage/Stem", category: "supporting" },
  { id: 16, name: "Baby's Breath (Gypsophila)", role: "Supporting Foliage/Stem", category: "supporting" },
  { id: 17, name: "Monstera Palm Leaf", role: "Supporting Foliage/Stem", category: "supporting" },
  { id: 18, name: "Leatherleaf Fern", role: "Supporting Foliage/Stem", category: "supporting" },
  { id: 19, name: "Japanese Cherry Blossom", role: "Supporting Foliage/Stem", category: "supporting" },
  { id: 20, name: "Cascading Wisteria", role: "Supporting Foliage/Stem", category: "supporting" },
  { id: 21, name: "Echeveria Succulent", role: "Supporting Foliage/Stem", category: "supporting" }
];

const CATALOG_CATEGORIES = [
  { id: "mothers-day", title: "Mother's Day Collection", tag: "Seasonal Special" },
  { id: "valentines", title: "Valentine's Day Collection", tag: "Romance & Passion" },
  { id: "birthdays", title: "Birthday Celebrations", tag: "Joyful Blossoms" },
  { id: "holidays", title: "Holidays & Festivities", tag: "Seasonal Decor" },
  { id: "home-decor", title: "Home Decor & Living Spaces", tag: "Everyday Luxury" },
  { id: "corporate", title: "Corporate Events & Suites", tag: "Professional Elegance" },
  { id: "public-spaces", title: "Public Spaces (Hotels & Lobbies)", tag: "Grand Installations" },
  { id: "weddings", title: "Weddings & Ceremonies", tag: "Bridal Heirloom" }
];

const SHOP_PRODUCTS = [
  { id: "p1", categoryId: "mothers-day", title: "Matriarch Royal Peony Urn", price: 185.00, img: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=600&q=80", desc: "Soft blush Royal Peonies layered with Italian Ranunculus and Silver Dollar Eucalyptus in a fluted crystal vessel." },
  { id: "p2", categoryId: "valentines", title: "Velvet Crimson Rose Grandeur", price: 210.00, img: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80", desc: "Deep crimson Heritage Garden Roses paired with Velvet Orchids and lush Fern fronds." },
  { id: "p3", categoryId: "birthdays", title: "Radiant Dahlia & Tulip Cascade", price: 165.00, img: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=600&q=80", desc: "Vibrant Dinnerplate Dahlias flanked by Dutch Tulips and Delicate Wisteria stems." },
  { id: "p4", categoryId: "holidays", title: "Winter Solstice Magnolia Pedestal", price: 240.00, img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=600&q=80", desc: "Cream Southern Magnolias, Stargazer Lilies, and frosted Eucalyptus sprigs." },
  { id: "p5", categoryId: "home-decor", title: "Serene Hydrangea & Lavender Bowl", price: 145.00, img: "https://images.unsplash.com/photo-1487070183336-b863922373d4?auto=format&fit=crop&w=600&q=80", desc: "Classic Blue Hydrangeas complemented by French Lavender and Monstera Palm Leaves in a ceramic cylinder." },
  { id: "p6", categoryId: "corporate", title: "Architectural Calla Lily Cylinder", price: 290.00, img: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80", desc: "Sculptural White Calla Lilies and Monstera leaves set in clear acrylic water gel." },
  { id: "p7", categoryId: "public-spaces", title: "Grand Atrium Cherry Blossom Tower", price: 450.00, img: "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=600&q=80", desc: "Towering Japanese Cherry Blossoms and Cascading Wisteria in a heavy vintage brass pedestal." },
  { id: "p8", categoryId: "weddings", title: "Eternal Bridal Peony Bouquet", price: 220.00, img: "https://images.unsplash.com/photo-1533616688419-b7a585564566?auto=format&fit=crop&w=600&q=80", desc: "Hand-tied white Royal Peonies, Anemones, and delicate Baby's Breath wrapped in satin ribbon." }
];

let cart = JSON.parse(localStorage.getItem('21_florals_cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('home-gallery')) initHomeGallery();
  if (document.getElementById('category-sections-container')) initShopCategories();
  if (document.getElementById('select-primary')) initCustomStudio();
  
  initLightbox();
  initCart();
});

function initHomeGallery() {
  const container = document.getElementById('home-gallery');
  const featured = SHOP_PRODUCTS.slice(0, 4);
  container.innerHTML = featured.map(prod => `
    <div class="floral-card">
      <div class="img-container" onclick="openLightbox('${prod.img}', '${escapeHtml(prod.title)}', '${escapeHtml(prod.desc)}')">
        <img src="${prod.img}" alt="${prod.title}" loading="lazy" />
        <div class="zoom-overlay"><i class="fa-solid fa-magnifying-glass-plus"></i> View Details</div>
      </div>
      <div class="card-info">
        <h4>${prod.title}</h4>
        <div class="price">$${prod.price.toFixed(2)}</div>
        <p>${prod.desc}</p>
        <button class="btn-card-add" onclick="addToCart('${prod.id}', '${escapeHtml(prod.title)}', ${prod.price}, '${prod.img}')">
          Add to Cart
        </button>
      </div>
    </div>
  `).join('');
}

function initShopCategories() {
  const container = document.getElementById('category-sections-container');
  container.innerHTML = CATALOG_CATEGORIES.map(cat => {
    const productsInCat = SHOP_PRODUCTS.filter(p => p.categoryId === cat.id);
    return `
      <div class="category-block" id="cat-${cat.id}">
        <div class="category-block-header">
          <h3>${cat.title}</h3>
          <span class="category-tag">${cat.tag}</span>
        </div>
        <div class="gallery-grid">
          ${productsInCat.map(prod => `
            <div class="floral-card">
              <div class="img-container" onclick="openLightbox('${prod.img}', '${escapeHtml(prod.title)}', '${escapeHtml(prod.desc)}')">
                <img src="${prod.img}" alt="${prod.title}" loading="lazy" />
                <div class="zoom-overlay"><i class="fa-solid fa-magnifying-glass-plus"></i> View Details</div>
              </div>
              <div class="card-info">
                <h4>${prod.title}</h4>
                <div class="price">$${prod.price.toFixed(2)}</div>
                <p>${prod.desc}</p>
                <button class="btn-card-add" onclick="addToCart('${prod.id}', '${escapeHtml(prod.title)}', ${prod.price}, '${prod.img}')">
                  Add to Cart
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');
}

function initCustomStudio() {
  const selectPrimary = document.getElementById('select-primary');
  const selectSecondary = document.getElementById('select-secondary');
  const selectSupporting = document.getElementById('select-supporting');

  const focalList = MASTER_21_SILK_FLORALS.filter(f => f.category === 'focal');
  const secondaryList = MASTER_21_SILK_FLORALS.filter(f => f.category === 'secondary');
  const supportingList = MASTER_21_SILK_FLORALS.filter(f => f.category === 'supporting');

  selectPrimary.innerHTML = focalList.map(item => `<option value="${item.name}">${item.name}</option>`).join('');
  selectSecondary.innerHTML = secondaryList.map(item => `<option value="${item.name}">${item.name}</option>`).join('');
  selectSupporting.innerHTML = supportingList.map(item => `<option value="${item.name}">${item.name}</option>`).join('');

  const formInputs = ['select-primary', 'select-secondary', 'select-supporting', 'select-color', 'select-vase', 'select-accent', 'check-bling'];
  formInputs.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', updateCustomSummary);
  });

  document.getElementById('add-custom-to-cart').addEventListener('click', addCustomArrangementToCart);
  updateCustomSummary();
}

function updateCustomSummary() {
  const primaryVal = document.getElementById('select-primary').value;
  const secondaryVal = document.getElementById('select-secondary').value;
  const supportingVal = document.getElementById('select-supporting').value;
  const colorVal = document.getElementById('select-color').value;

  const vaseEl = document.getElementById('select-vase');
  const vaseVal = vaseEl.value;
  const vasePrice = parseFloat(vaseEl.options[vaseEl.selectedIndex].dataset.price || 0);

  const accentEl = document.getElementById('select-accent');
  const accentVal = accentEl.value;
  const accentPrice = parseFloat(accentEl.options[accentEl.selectedIndex].dataset.price || 0);

  const blingChecked = document.getElementById('check-bling').checked;
  const blingPrice = blingChecked ? 25 : 0;

  const baseFloraCost = 105;
  const total = baseFloraCost + vasePrice + accentPrice + blingPrice;

  const summaryBox = document.getElementById('custom-summary-box');
  summaryBox.innerHTML = `
    <div class="summary-item"><span class="label">3 Focal Blooms:</span> <strong>${primaryVal}</strong></div>
    <div class="summary-item"><span class="label">5 Secondary Blooms:</span> <strong>${secondaryVal}</strong></div>
    <div class="summary-item"><span class="label">8 Supporting Stems:</span> <strong>${supportingVal}</strong></div>
    <div class="summary-item"><span class="label">Palette:</span> <strong>${colorVal}</strong></div>
    <div class="summary-item"><span class="label">Vessel:</span> <strong>${vaseVal}</strong></div>
    <div class="summary-item"><span class="label">Base Accent:</span> <strong>${accentVal}</strong></div>
    <div class="summary-item"><span class="label">Bling Upgrade:</span> <strong>${blingChecked ? 'Yes (+ $25)' : 'None'}</strong></div>
  `;

  document.getElementById('custom-total-price').innerText = `$${total.toFixed(2)}`;
}

function addCustomArrangementToCart() {
  const primaryVal = document.getElementById('select-primary').value;
  const secondaryVal = document.getElementById('select-secondary').value;
  const totalText = document.getElementById('custom-total-price').innerText;
  const price = parseFloat(totalText.replace('$', ''));

  const item = {
    id: 'custom-' + Date.now(),
    title: `Bespoke 3-5-8 Arrangement (${primaryVal} & ${secondaryVal})`,
    price: price,
    img: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=600&q=80",
    qty: 1
  };

  cart.push(item);
  saveCart();
  openCartDrawer();
}

function initLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const closeBtn = document.getElementById('lightbox-close');

  if (!modal) return;

  closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
}

function openLightbox(imgSrc, title, desc) {
  document.getElementById('lightbox-img').src = imgSrc;
  document.getElementById('lightbox-title').innerText = title;
  document.getElementById('lightbox-desc').innerText = desc;
  document.getElementById('lightbox-modal').classList.add('active');
}

function initCart() {
  const openBtn = document.getElementById('open-cart-btn');
  const closeBtn = document.getElementById('close-cart-btn');

  if (openBtn) openBtn.addEventListener('click', openCartDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeCartDrawer);
  renderCart();
}

function openCartDrawer() {
  document.getElementById('cart-drawer').classList.add('active');
}

function closeCartDrawer() {
  document.getElementById('cart-drawer').classList.remove('active');
}

function addToCart(id, title, price, img) {
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, title, price, img, qty: 1 });
  }
  saveCart();
  openCartDrawer();
}

function updateQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }
  saveCart();
}

function saveCart() {
  localStorage.setItem('21_florals_cart', JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  const list = document.getElementById('cart-items-list');
  const countEl = document.getElementById('cart-count');
  const totalEl = document.getElementById('cart-total-amount');

  if (!list) return;

  const totalItems = cart.reduce((acc, i) => acc + i.qty, 0);
  const subtotal = cart.reduce((acc, i) => acc + (i.price * i.qty), 0);

  if (countEl) countEl.innerText = totalItems;
  if (totalEl) totalEl.innerText = `$${subtotal.toFixed(2)}`;

  if (cart.length === 0) {
    list.innerHTML = `<p style="text-align:center; color:#888; padding:2rem 0;">Your cart is currently empty.</p>`;
    return;
  }

  list.innerHTML = cart.map(item => `
    <div class="cart-item-row">
      <img src="${item.img}" alt="${item.title}" />
      <div class="cart-item-details">
        <h5>${item.title}</h5>
        <div class="item-price">$${item.price.toFixed(2)}</div>
        <div class="qty-controls">
          <button class="qty-btn" onclick="updateQty('${item.id}', -1)">-</button>
          <span>${item.qty}</span>
          <button class="qty-btn" onclick="updateQty('${item.id}', 1)">+</button>
        </div>
      </div>
    </div>
  `).join('');
}

function escapeHtml(str) {
  return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}