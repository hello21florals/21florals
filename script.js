
/* =========================================================
   21 FLORALS — SHARED JAVASCRIPT
   Cart, navigation, lightbox and small UI utilities
   ========================================================= */

const CART_KEY = "21florals_cart_v1";

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}
function cartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}
function addToCart(id, name, price, amount = 1) {
  const cart = getCart();
  const item = cart.find(x => x.id === id);
  if (item) item.qty += amount;
  else if (amount > 0) cart.push({ id, name, price: Number(price), qty: amount });
  if (item && item.qty <= 0) cart.splice(cart.indexOf(item), 1);
  saveCart(cart);
  toast(amount > 0 ? `${name} added to cart` : `${name} removed from cart`);
  renderProductSteppers();
  renderCart();
}
function changeCartQty(id, delta) {
  const cart = getCart();
  const item = cart.find(x => x.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart.splice(cart.indexOf(item), 1);
  saveCart(cart);
  renderProductSteppers();
  renderCart();
}
function removeFromCart(id) {
  const cart = getCart().filter(x => x.id !== id);
  saveCart(cart);
  renderProductSteppers();
  renderCart();
}
function updateCartBadge() {
  document.querySelectorAll("[data-cart-count]").forEach(el => el.textContent = cartCount());
}

function renderProductSteppers() {
  const cart = getCart();
  document.querySelectorAll("[data-product-id]").forEach(card => {
    const item = cart.find(x => x.id === card.dataset.productId);
    const qty = card.querySelector("[data-product-qty]");
    if (qty) qty.textContent = item ? item.qty : "0";
  });
}

function renderCart() {
  const list = document.querySelector("#cartList");
  const empty = document.querySelector("#emptyCart");
  const totalEl = document.querySelector("#cartTotal");
  if (!list) return;

  const cart = getCart();
  list.innerHTML = "";

  if (!cart.length) {
    if (empty) empty.hidden = false;
    if (totalEl) totalEl.textContent = "$0.00";
    return;
  }
  if (empty) empty.hidden = true;

  let total = 0;
  cart.forEach(item => {
    const subtotal = item.price * item.qty;
    total += subtotal;
    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <div>
        <h3>${escapeHtml(item.name)}</h3>
        <div class="cart-meta">$${item.price.toFixed(2)} each</div>
      </div>
      <div class="cart-qty">
        <button type="button" aria-label="Decrease quantity" data-cart-minus="${item.id}">−</button>
        <span>${item.qty}</span>
        <button type="button" aria-label="Increase quantity" data-cart-plus="${item.id}">+</button>
      </div>
      <strong>$${subtotal.toFixed(2)}</strong>
      <button class="remove-btn" type="button" data-remove="${item.id}">Remove</button>
    `;
    list.appendChild(row);
  });

  if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
  list.querySelectorAll("[data-cart-minus]").forEach(btn =>
    btn.addEventListener("click", () => changeCartQty(btn.dataset.cartMinus, -1))
  );
  list.querySelectorAll("[data-cart-plus]").forEach(btn =>
    btn.addEventListener("click", () => changeCartQty(btn.dataset.cartPlus, 1))
  );
  list.querySelectorAll("[data-remove]").forEach(btn =>
    btn.addEventListener("click", () => removeFromCart(btn.dataset.remove))
  );
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, c => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;"
  }[c]));
}

function toast(message) {
  let el = document.querySelector(".toast");
  if (!el) {
    el = document.createElement("div");
    el.className = "toast";
    document.body.appendChild(el);
  }
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => el.classList.remove("show"), 1800);
}

function setupNavigation() {
  document.querySelectorAll(".nav-btn[data-page]").forEach(btn => {
    btn.addEventListener("click", () => {
      window.location.href = btn.dataset.page;
    });
  });
}

function setupLightbox() {
  const modal = document.querySelector("#lightboxModal");
  if (!modal) return;
  document.querySelectorAll("[data-lightbox]").forEach(card => {
    card.addEventListener("click", () => {
      const title = card.dataset.lightbox;
      const target = modal.querySelector("[data-lightbox-title]");
      if (target) target.textContent = title + " — 1000 × 1000";
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
    });
  });
  modal.addEventListener("click", e => {
    if (e.target === modal || e.target.closest("[data-close-modal]")) {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
    }
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") modal.classList.remove("open");
  });
}

function setupProductControls() {
  document.querySelectorAll("[data-product-id]").forEach(card => {
    const id = card.dataset.productId;
    const name = card.dataset.productName;
    const price = Number(card.dataset.productPrice);
    card.querySelector("[data-product-plus]")?.addEventListener("click", () => addToCart(id, name, price, 1));
    card.querySelector("[data-product-minus]")?.addEventListener("click", () => {
      const item = getCart().find(x => x.id === id);
      if (item) addToCart(id, name, price, -1);
    });
  });
  renderProductSteppers();
}

document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  setupLightbox();
  setupProductControls();
  renderCart();
  updateCartBadge();
});
