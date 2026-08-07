// ============================================================
// 21 FLORALS — Shared JavaScript (cart, nav, promo logic)
// ============================================================

// ---------- PRODUCT CATALOG ----------
const PRODUCTS = [
  { id: 1, name: "Blush Peony Dream", category: "home", price: 89, badge: "Best Seller", desc: "A lush arrangement of soft blush peonies and eucalyptus — the perfect romantic centrepiece for any room.", img: "https://i.etsystatic.com/22099876/r/il/fd4fb2/3728140963/il_1080xN.3728140963_ksgn.jpg", tags: ["home","gift"] },
  { id: 2, name: "Ivory Rose Elegance", category: "wedding", price: 145, badge: "Wedding", desc: "Timeless ivory silk roses with trailing greenery — a bridal bouquet you'll treasure forever.", img: "https://i.etsystatic.com/10317049/r/il/d80ce4/6288303210/il_1080xN.6288303210_toni.jpg", tags: ["wedding","gift"] },
  { id: 3, name: "Lavender Fields", category: "home", price: 75, badge: "New Arrival", desc: "Rustic farmhouse charm meets soft lavender blooms — beautiful in any kitchen or living space.", img: "https://i.etsystatic.com/28055950/r/il/997c92/2982926362/il_570xN.2982926362_k68k.jpg", tags: ["home"] },
  { id: 4, name: "Sunlit Sunflower Jar", category: "home", price: 68, badge: "Fan Favourite", desc: "Cheerful yellow silk sunflowers bursting with warmth — brings instant sunshine to any space.", img: "https://m.media-amazon.com/images/I/71ALQ+Ut5GL.jpg", tags: ["home","gift"] },
  { id: 5, name: "White Orchid Luxe", category: "home", price: 125, badge: "Luxury", desc: "Sleek, sophisticated white silk orchids in a modern arrangement — pure elegance for any interior.", img: "https://www.lifelikeflowers.com/wp-content/uploads/product-S-FLA00036-white-orchid-silk-flower-arrangement-metallic-pot-1.jpg", tags: ["home","gift"] },
  { id: 6, name: "Coral Dahlia Burst", category: "gift", price: 82, badge: "Gift Favourite", desc: "Vibrant coral and orange silk dahlias — a bold, joyful gift that lasts a lifetime.", img: "https://target.scene7.com/is/image/Target/GUEST_995e149a-bfec-4244-8f9d-83653a73da6f", tags: ["gift","home"] },
  { id: 7, name: "Spring Wildflower Medley", category: "home", price: 72, badge: "Seasonal", desc: "A carefree mix of colourful silk wildflowers — like a meadow captured in a vase.", img: "https://cdn11.bigcommerce.com/s-r932bs4ubb/images/stencil/1600x1600/products/5296/5929/fla848-na-ot-ovh_zoom__37489.1619268799.jpg?c=1", tags: ["home","gift"] },
  { id: 8, name: "Magnolia White Grace", category: "wedding", price: 135, badge: "Wedding", desc: "Stunning white silk magnolias — a statement piece for weddings, entryways, and dining tables.", img: "https://silksareforever.com/cdn/shop/files/LFM756-WH_bcdf3a2b-51c7-446d-86b8-a21db04c78c7_1200x1200.jpg?v=1730501871", tags: ["wedding","home"] },
  { id: 9, name: "Pastel Tulip Garden", category: "gift", price: 65, badge: "Sweet Gift", desc: "Soft pastel silk tulips in a charming vase — a delightful gift for any occasion.", img: "https://assets.wfcdn.com/im/92720297/resize-h800-w800^compr-r85/1130/113009886/Silk+Tulip+Arrangement+in+Vase%2C+Cream.jpg", tags: ["gift","home"] },
  { id: 10, name: "Pink & Peach Garden Rose", category: "home", price: 95, badge: "Popular", desc: "Romantic pink and peach silk garden roses in a glass vase — soft, dreamy, and utterly beautiful.", img: "https://i.etsystatic.com/22099876/r/il/5739e2/3604063378/il_570xN.3604063378_l7hv.jpg", tags: ["home","gift"] },
  { id: 11, name: "Eucalyptus & Bloom", category: "home", price: 78, badge: "Modern", desc: "Fresh eucalyptus and delicate blooms — a modern, minimalist arrangement for contemporary spaces.", img: "https://assets.wfcdn.com/im/10894666/compr-r85/2037/203734030/Silk+Eucalyptus+Arrangement+in+Vase.jpg", tags: ["home"] },
  { id: 12, name: "Eternal Bridal Bouquet", category: "wedding", price: 175, badge: "Signature", desc: "Our most beloved bridal bouquet — lush, romantic, and crafted to be kept and cherished forever.", img: "https://images.squarespace-cdn.com/content/v1/552d50f2e4b0ef77163cfc0f/1578333818811-99BRWK5212MSBQOFSP32/custom-silk-bridal-bouquet-centerpieces-wedding-flowers.jpg", tags: ["wedding"] }
];

// ---------- CART ----------
function getCart() {
  return JSON.parse(localStorage.getItem('21florals_cart') || '[]');
}
function saveCart(cart) {
  localStorage.setItem('21florals_cart', JSON.stringify(cart));
  updateCartCount();
}
function addToCart(productId, qty = 1) {
  const cart = getCart();
  const existing = cart.find(i => i.id === productId);
  if (existing) { existing.qty += qty; } else { cart.push({ id: productId, qty }); }
  saveCart(cart);
  showCartToast();
}
function removeFromCart(productId) {
  saveCart(getCart().filter(i => i.id !== productId));
}
function updateQty(productId, qty) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (item) { item.qty = qty; if (item.qty <= 0) return removeFromCart(productId); }
  saveCart(cart);
}
function getCartTotal() {
  const cart = getCart();
  return cart.reduce((sum, i) => {
    const p = PRODUCTS.find(p => p.id === i.id);
    return sum + (p ? p.price * i.qty : 0);
  }, 0);
}
function getCartCount() {
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}

// ---------- PROMO: Buy 3 Get 4th Free ----------
function calcPromoDiscount() {
  const cart = getCart();
  // Flatten all items sorted by price ascending
  let items = [];
  cart.forEach(i => {
    const p = PRODUCTS.find(p => p.id === i.id);
    if (p) { for (let q = 0; q < i.qty; q++) items.push(p.price); }
  });
  items.sort((a, b) => a - b);
  // Every 4th item (cheapest) is free
  let discount = 0;
  for (let i = 3; i < items.length; i += 4) discount += items[i];
  return discount;
}
function getPromoSets() {
  return Math.floor(getCart().reduce((s, i) => s + i.qty, 0) / 4);
}

// ---------- UI HELPERS ----------
function updateCartCount() {
  document.querySelectorAll('.cart-count').forEach(el => {
    const c = getCartCount();
    el.textContent = c;
    el.style.display = c > 0 ? 'flex' : 'none';
  });
}
function showCartToast() {
  let toast = document.getElementById('cart-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'cart-toast';
    toast.style.cssText = `position:fixed;bottom:30px;left:50%;transform:translateX(-50%);background:#b06080;color:#fff;padding:14px 28px;border-radius:50px;font-size:0.9rem;font-family:'Raleway',sans-serif;font-weight:500;z-index:9999;box-shadow:0 8px 24px rgba(176,96,128,0.4);transition:opacity 0.4s;`;
    document.body.appendChild(toast);
  }
  toast.textContent = '🌸 Added to your cart!';
  toast.style.opacity = '1';
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => { toast.style.opacity = '0'; }, 2500);
}
function formatPrice(n) { return '$' + n.toFixed(2); }

// ---------- NAV ACTIVE STATE ----------
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  const path = window.location.pathname.split('/').pop();
  document.querySelectorAll('nav ul a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });
});