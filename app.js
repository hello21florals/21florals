/* ==========================================================================
   21 FLORALS - APPLICATION LOGIC
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
  { id: "birthdays", title: "Birthday Celebrations", tag: "Joyful Blossoms" },
  { id: "home-decor", title: "Home Decor & Living Spaces", tag: "Everyday Luxury" },
  { id: "corporate", title: "Corporate Events & Suites", tag: "Professional Elegance" },
  { id: "public-spaces", title: "Public Spaces (Hotels & Lobbies)", tag: "Grand Installations" },
  { id: "weddings", title: "Weddings & Ceremonies", tag: "Bridal Heirloom" },
  { id: "holidays", title: "Holidays & Festivities", tag: "Seasonal Decor" }
];

const SHOP_PRODUCTS = [
  {
    id: "p-glitz-urn",
    categoryId: "home-decor",
    title: "Glittering Rose & Pearl Urn",
    price: 185.00,
    img: "e2c2697d-1931-4a9b-9fd0-d02592fdd798-1_all_222.jpg",
    desc: "A stunning centerpiece featuring frosted crimson and blush roses, pearls, and a decorative vessel."
  },
  {
    id: "p-wildflower-box",
    categoryId: "home-decor",
    title: "Vibrant Meadow & Butterfly Bouquet",
    price: 165.00,
    img: "e2c2697d-1931-4a9b-9fd0-d02592fdd798-1_all_310.jpg",
    desc: "Rich purple orchids, pink garden roses, and yellow blooms in a crystal lattice box accented with butterflies."
  },
  {
    id: "p-sunset-pedestal",
    categoryId: "holidays",
    title: "Sunset Crimson & Amber Pedestal",
    price: 145.00,
    img: "e2c2697d-1931-4a9b-9fd0-d02592fdd798-1_all_401.jpg",
    desc: "Warm amber, terracotta, and soft red roses styled in an antique urn with a deep purple ribbon."
  },
  {
    id: "p-meadow-jar",
    categoryId: "birthdays",
    title: "Bright Meadow Bloom Jar",
    price: 125.00,
    img: "e2c2697d-1931-4a9b-9fd0-d02592fdd798-1_all_415.jpg",
    desc: "Vivid magenta peonies, yellow freesia, and purple lavender in a ribbon-wrapped glass jar."
  },
  {
    id: "p-pastel-daisy",
    categoryId: "mothers-day",
    title: "Soft Blush Peony & Daisy Fluted Vase",
    price: 155.00,
    img: "e2c2697d-1931-4a9b-9fd0-d02592fdd798-1_all_422.jpg",
    desc: "Peach peonies, white field daisies, and pink blossoms set in a classic fluted glass vase."
  },
  {
    id: "p-gold-bling-planter",
    categoryId: "corporate",
    title: "Crystalline Dew Gold Sparkle Planter",
    price: 195.00,
    img: "e2c2697d-1931-4a9b-9fd0-d02592fdd798-1_all_424.jpg",
    desc: "Magenta and cream roses enhanced with micro-gold dew glitter in a lattice wooden planter."
  },
  {
    id: "p-amber-bottle-tall",
    categoryId: "birthdays",
    title: "Festive Amber Bottle & Striped Bow",
    price: 110.00,
    img: "e2c2697d-1931-4a9b-9fd0-d02592fdd798-1_all_446.jpg",
    desc: "Playful pink and purple focal blooms in a tall amber glass bottle finished with a red-and-white striped bow."
  },
  {
    id: "p-amber-bottle-short",
    categoryId: "home-decor",
    title: "Ruby & Plum Amber Accent Bottle",
    price: 105.00,
    img: "e2c2697d-1931-4a9b-9fd0-d02592fdd798-1_all_451.jpg",
    desc: "Dahlia-style ruby blooms and sprigs in an amber bottle filled with polished river stones."
  },
  {
    id: "p-pearl-tulip-jar",
    categoryId: "weddings",
    title: "Ethereal Pastel Tulip & Pearl Jar",
    price: 175.00,
    img: "e2c2697d-1931-4a9b-9fd0-d02592fdd798-1_all_488.jpg",
    desc: "Soft lavender and peach silk tulips in a clear glass vessel filled with luminous pearls."
  },
  {
    id: "p-impressionist-dahlia",
    categoryId: "public-spaces",
    title: "Impressionist Crimson Dahlia Masterpiece",
    price: 250.00,
    img: "e2c2697d-1931-4a9b-9fd0-d02592fdd798-1_all_456.jpg",
    desc: "A rich textured artistic canvas look featuring deep crimson dahlias and golden peonies resting on a pearl saucer."
  }
];

let cart = JSON.parse(localStorage.getItem('21_florals_cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('category-sections-container')) initShopCategories();
  if (document.getElementById('select-primary')) initCustomStudio();
  
  initLightbox();
  initCart();
});

function initShopCategories() {
  const container = document.getElementById('category-sections-container');
  if (!container) return;

  container.innerHTML = CATALOG_CATEGORIES.map(cat => {
    const productsInCat = SHOP_PRODUCTS.filter(p => p.categoryId === cat.id);
    if (productsInCat.length === 0) return ''; // Hide empty categories
    
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

  if (!selectPrimary) return;

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
    img: "e2c2697d-1931-4a9b-9fd0-d02592fdd798-1_all_310.jpg",
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
