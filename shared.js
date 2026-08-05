// ============================================================
// 21 FLORALS — Shared JavaScript (cart, nav, promo logic)
// ============================================================

// ---------- PRODUCT CATALOG ----------
const PRODUCTS = [
  // ── HOME DECOR ──
  { id: 1, name: "Blush Peony Dream", category: "home", price: 89, badge: "Best Seller", desc: "A lush arrangement of soft blush peonies and eucalyptus — the perfect romantic centrepiece for any room.", img: "https://i.etsystatic.com/22099876/r/il/fd4fb2/3728140963/il_1080xN.3728140963_ksgn.jpg", tags: ["home","gift","mothers-day"] },
  { id: 3, name: "Lavender Fields", category: "home", price: 75, badge: "New Arrival", desc: "Rustic farmhouse charm meets soft lavender blooms — beautiful in any kitchen or living space.", img: "https://i.etsystatic.com/28055950/r/il/997c92/2982926362/il_570xN.2982926362_k68k.jpg", tags: ["home"] },
  { id: 4, name: "Sunlit Sunflower Jar", category: "home", price: 68, badge: "Fan Favourite", desc: "Cheerful yellow silk sunflowers bursting with warmth — brings instant sunshine to any space.", img: "https://m.media-amazon.com/images/I/71ALQ+Ut5GL.jpg", tags: ["home","gift"] },
  { id: 5, name: "White Orchid Luxe", category: "home", price: 125, badge: "Luxury", desc: "Sleek, sophisticated white silk orchids in a modern arrangement — pure elegance for any interior.", img: "https://www.lifelikeflowers.com/wp-content/uploads/product-S-FLA00036-white-orchid-silk-flower-arrangement-metallic-pot-1.jpg", tags: ["home","gift","sympathy"] },
  { id: 7, name: "Spring Wildflower Medley", category: "home", price: 72, badge: "Seasonal", desc: "A carefree mix of colourful silk wildflowers — like a meadow captured in a vase.", img: "https://cdn11.bigcommerce.com/s-r932bs4ubb/images/stencil/1600x1600/products/5296/5929/fla848-na-ot-ovh_zoom__37489.1619268799.jpg?c=1", tags: ["home","gift"] },
  { id: 10, name: "Pink & Peach Garden Rose", category: "home", price: 95, badge: "Popular", desc: "Romantic pink and peach silk garden roses in a glass vase — soft, dreamy, and utterly beautiful.", img: "https://i.etsystatic.com/22099876/r/il/5739e2/3604063378/il_570xN.3604063378_l7hv.jpg", tags: ["home","gift","valentines","mothers-day"] },
  { id: 11, name: "Eucalyptus & Bloom", category: "home", price: 78, badge: "Modern", desc: "Fresh eucalyptus and delicate blooms — a modern, minimalist arrangement for contemporary spaces.", img: "https://assets.wfcdn.com/im/10894666/compr-r85/2037/203734030/Silk+Eucalyptus+Arrangement+in+Vase.jpg", tags: ["home"] },

  // ── WEDDING ──
  { id: 2, name: "Ivory Rose Elegance", category: "wedding", price: 145, badge: "Wedding", desc: "Timeless ivory silk roses with trailing greenery — a bridal bouquet you'll treasure forever.", img: "https://i.etsystatic.com/10317049/r/il/d80ce4/6288303210/il_1080xN.6288303210_toni.jpg", tags: ["wedding","gift"] },
  { id: 8, name: "Magnolia White Grace", category: "wedding", price: 135, badge: "Wedding", desc: "Stunning white silk magnolias — a statement piece for weddings, entryways, and dining tables.", img: "https://silksareforever.com/cdn/shop/files/LFM756-WH_bcdf3a2b-51c7-446d-86b8-a21db04c78c7_1200x1200.jpg?v=1730501871", tags: ["wedding","home"] },
  { id: 12, name: "Eternal Bridal Bouquet", category: "wedding", price: 175, badge: "Signature", desc: "Our most beloved bridal bouquet — lush, romantic, and crafted to be kept and cherished forever.", img: "https://images.squarespace-cdn.com/content/v1/552d50f2e4b0ef77163cfc0f/1578333818811-99BRWK5212MSBQOFSP32/custom-silk-bridal-bouquet-centerpieces-wedding-flowers.jpg", tags: ["wedding"] },

  // ── GIFTS ──
  { id: 6, name: "Coral Dahlia Burst", category: "gift", price: 82, badge: "Gift Favourite", desc: "Vibrant coral and orange silk dahlias — a bold, joyful gift that lasts a lifetime.", img: "https://target.scene7.com/is/image/Target/GUEST_995e149a-bfec-4244-8f9d-83653a73da6f", tags: ["gift","home"] },
  { id: 9, name: "Pastel Tulip Garden", category: "gift", price: 65, badge: "Sweet Gift", desc: "Soft pastel silk tulips in a charming vase — a delightful gift for any occasion.", img: "https://assets.wfcdn.com/im/92720297/resize-h800-w800^compr-r85/1130/113009886/Silk+Tulip+Arrangement+in+Vase%2C+Cream.jpg", tags: ["gift","home","mothers-day"] },

  // ── VALENTINE'S DAY ──
  { id: 13, name: "Red Rose Romance", category: "valentines", price: 110, badge: "Valentine's", desc: "Classic deep red silk roses arranged in a luxurious bouquet — the ultimate symbol of love and passion.", img: "https://i.etsystatic.com/22099876/r/il/fd4fb2/3728140963/il_1080xN.3728140963_ksgn.jpg", tags: ["valentines","gift","home"] },
  { id: 14, name: "Heart & Bloom Box", category: "valentines", price: 98, badge: "Valentine's", desc: "A heart-shaped arrangement box filled with blush pink and red silk roses — romance in every petal.", img: "https://i.etsystatic.com/22099876/r/il/5739e2/3604063378/il_570xN.3604063378_l7hv.jpg", tags: ["valentines","gift"] },
  { id: 15, name: "Sweetheart Peony Duo", category: "valentines", price: 85, badge: "Romantic", desc: "Paired blush peonies in matching vases — a sweet, intimate gift for your special someone.", img: "https://i.etsystatic.com/28055950/r/il/997c92/2982926362/il_570xN.2982926362_k68k.jpg", tags: ["valentines","gift","home"] },

  // ── MOTHER'S DAY ──
  { id: 16, name: "Mom's Garden Bouquet", category: "mothers-day", price: 92, badge: "Mother's Day", desc: "A vibrant mix of pink peonies, lavender, and garden roses — handcrafted with love for the best mom ever.", img: "https://cdn11.bigcommerce.com/s-r932bs4ubb/images/stencil/1600x1600/products/5296/5929/fla848-na-ot-ovh_zoom__37489.1619268799.jpg?c=1", tags: ["mothers-day","gift","home"] },
  { id: 17, name: "Pink Orchid Elegance", category: "mothers-day", price: 115, badge: "Mother's Day", desc: "Graceful pink silk orchids in a ceramic planter — a sophisticated gift she'll cherish forever.", img: "https://www.lifelikeflowers.com/wp-content/uploads/product-S-FLA00036-white-orchid-silk-flower-arrangement-metallic-pot-1.jpg", tags: ["mothers-day","gift","home"] },
  { id: 18, name: "Pastel Rose Basket", category: "mothers-day", price: 88, badge: "For Mom", desc: "A charming wicker basket overflowing with soft pastel silk roses — warm, beautiful, and everlasting.", img: "https://i.etsystatic.com/10317049/r/il/d80ce4/6288303210/il_1080xN.6288303210_toni.jpg", tags: ["mothers-day","gift"] },

  // ── SYMPATHY ──
  { id: 19, name: "Peaceful Lily Tribute", category: "sympathy", price: 105, badge: "Sympathy", desc: "Serene white lilies and soft greenery — a gentle, respectful tribute to honour a loved one's memory.", img: "https://silksareforever.com/cdn/shop/files/LFM756-WH_bcdf3a2b-51c7-446d-86b8-a21db04c78c7_1200x1200.jpg?v=1730501871", tags: ["sympathy","gift"] },
  { id: 20, name: "Eternal Rest Wreath", category: "sympathy", price: 145, badge: "Memorial", desc: "A beautiful silk wreath of white roses and eucalyptus — a lasting memorial that never fades.", img: "https://images.squarespace-cdn.com/content/v1/552d50f2e4b0ef77163cfc0f/1578333818811-99BRWK5212MSBQOFSP32/custom-silk-bridal-bouquet-centerpieces-wedding-flowers.jpg", tags: ["sympathy"] },
  { id: 21, name: "Soft Comfort Arrangement", category: "sympathy", price: 85, badge: "Sympathy", desc: "Gentle white and lavender blooms in a classic vase — a comforting gesture during difficult times.", img: "https://assets.wfcdn.com/im/10894666/compr-r85/2037/203734030/Silk+Eucalyptus+Arrangement+in+Vase.jpg", tags: ["sympathy","gift"] },

  // ── HOLIDAYS ──
  { id: 22, name: "Christmas Poinsettia Luxe", category: "holiday", price: 79, badge: "Holiday", desc: "Rich red silk poinsettias with gold accents and pine — a festive centrepiece for the holiday season.", img: "https://m.media-amazon.com/images/I/71ALQ+Ut5GL.jpg", tags: ["holiday","home"] },
  { id: 23, name: "Winter White & Gold", category: "holiday", price: 120, badge: "Holiday", desc: "Elegant white roses, gold berries, and frosted eucalyptus — winter wonderland in a vase.", img: "https://silksareforever.com/cdn/shop/files/LFM756-WH_bcdf3a2b-51c7-446d-86b8-a21db04c78c7_1200x1200.jpg?v=1730501871", tags: ["holiday","home","gift"] },
  { id: 24, name: "Autumn Harvest Bouquet", category: "holiday", price: 88, badge: "Seasonal", desc: "Warm orange, burgundy, and gold silk blooms with fall foliage — perfect for Thanksgiving and autumn decor.", img: "https://target.scene7.com/is/image/Target/GUEST_995e149a-bfec-4244-8f9d-83653a73da6f", tags: ["holiday","home"] },
  { id: 25, name: "Easter Pastel Blooms", category: "holiday", price: 72, badge: "Spring", desc: "Soft pastel tulips, daisies, and hyacinths — a cheerful Easter arrangement that brings spring indoors.", img: "https://assets.wfcdn.com/im/92720297/resize-h800-w800^compr-r85/1130/113009886/Silk+Tulip+Arrangement+in+Vase%2C+Cream.jpg", tags: ["holiday","home","gift"] },
  { id: 26, name: "4th of July Patriot Blooms", category: "holiday", price: 75, badge: "Patriotic", desc: "Red, white, and blue silk flowers with star accents — celebrate Independence Day in style.", img: "https://cdn11.bigcommerce.com/s-r932bs4ubb/images/stencil/1600x1600/products/5296/5929/fla848-na-ot-ovh_zoom__37489.1619268799.jpg?c=1", tags: ["holiday","home"] },

  // ── 21 FLORALS ORIGINALS (Handcrafted by Us) ──
  { id: 27, name: "Butterfly Garden Crystal Vase", category: "gift", price: 129, badge: "Handcrafted", desc: "A stunning explosion of pink roses, lavender hydrangeas, coral alstroemeria, purple irises, and gold accents — adorned with monarch and purple butterflies in a sparkling crystal vase.", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663873689859/jqJrAzaOMBhTVubb.jpg", tags: ["gift","mothers-day","home"] },
  { id: 28, name: "Sunshine & Wildflower Medley", category: "home", price: 115, badge: "Vibrant", desc: "Bold sunflowers take centre stage surrounded by pink wildflowers, purple clematis, blue hydrangea, red berry sprays, and butterfly accents in a crystal vase on satin.", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663873689859/oSVxrFFEGpIrWqDV.jpg", tags: ["home","gift","holiday"] },
  { id: 29, name: "Sunflower Butterfly Luxe", category: "home", price: 125, badge: "Premium", desc: "Large golden sunflowers with pink blooms, purple accents, and butterfly details in a pearl-accented lattice vase with a preserved rose ornament — a true showstopper.", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663873689859/RzRstHIQIVtDQQnC.jpg", tags: ["home","gift","mothers-day"] },
  { id: 30, name: "Royal Crown Bouquet", category: "gift", price: 145, badge: "Luxury", desc: "A regal arrangement of vibrant fuchsia dahlias, pink hydrangeas, and red roses crowned with a jeweled gold tiara and monarch butterfly — fit for a queen.", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663873689859/tpcSywDTHQBqcWfT.jpg", tags: ["gift","valentines","mothers-day"] },
  { id: 31, name: "Sunset Romance Urn", category: "home", price: 135, badge: "Statement", desc: "Dramatic red, orange, coral, and yellow silk roses with lush greenery in an ornate ivory pedestal urn — a bold, romantic statement piece for any room.", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663873689859/duCaWLTjkRCQwulH.jpg", tags: ["home","sympathy","gift"] },
  { id: 32, name: "Blush Peony Romance", category: "wedding", price: 125, badge: "Romantic", desc: "Dreamy blush peonies, white roses, soft lavender blooms, and pink astilbe in an ornate cream pedestal vase — pure romance and elegance.", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663873689859/vUXPhlliSKmMlhyG.jpg", tags: ["wedding","mothers-day","home"] },
  { id: 33, name: "Bold Red Artisan Vase", category: "valentines", price: 110, badge: "Artisan", desc: "Striking red and magenta lilies with deep roses, orange ranunculus, and purple lavender in a unique stone pebble artisan vase with pink ribbon — bold and unforgettable.", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663873689859/lQfrCLPNbfYzMUhs.jpg", tags: ["valentines","home","gift"] },
  { id: 34, name: "Pink Daisy Garden Vase", category: "gift", price: 89, badge: "Garden Fresh", desc: "Delicate pink peonies, cheerful white daisies, hot pink mini blooms, and blush roses with purple dried accents in a clear glass vase — fresh garden charm.", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663873689859/huFACFvRGUkyGQAW.jpg", tags: ["gift","mothers-day","home"] },
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
  let items = [];
  cart.forEach(i => {
    const p = PRODUCTS.find(p => p.id === i.id);
    if (p) { for (let q = 0; q < i.qty; q++) items.push(p.price); }
  });
  items.sort((a, b) => a - b);
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
