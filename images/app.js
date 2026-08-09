/* =========================================
   21 FLORALS — APP.JS
   Product shop, cart, and custom builder
========================================= */

const botanicals = [
  { name: "Garden Rose", type: "Primary", icon: "✿" },
  { name: "Peony", type: "Primary", icon: "❀" },
  { name: "Dahlia", type: "Primary", icon: "✿" },
  { name: "Ranunculus", type: "Primary", icon: "✾" },
  { name: "Orchid", type: "Primary", icon: "❁" },
  { name: "Anemone", type: "Primary", icon: "✿" },
  { name: "Hydrangea", type: "Primary", icon: "❀" },
  { name: "Magnolia", type: "Primary", icon: "✾" },
  { name: "Tulip", type: "Primary", icon: "❁" },

  { name: "Lisianthus", type: "Secondary", icon: "✿" },
  { name: "Spray Rose", type: "Secondary", icon: "❀" },
  { name: "Cosmos", type: "Secondary", icon: "✾" },
  { name: "Sweet Pea", type: "Secondary", icon: "❁" },
  { name: "Poppy", type: "Secondary", icon: "✿" },
  { name: "Camellia", type: "Secondary", icon: "❀" },
  { name: "Scabiosa", type: "Secondary", icon: "✾" },

  { name: "Cherry Blossom", type: "Supporting", icon: "❁" },
  { name: "Eucalyptus", type: "Supporting", icon: "❀" },
  { name: "Olive Branch", type: "Supporting", icon: "✿" },
  { name: "Fern", type: "Supporting", icon: "✾" },
  { name: "Baby’s Breath", type: "Supporting", icon: "❁" }
];

const products = [
  {
    name: "The Amour",
    category: "Valentine’s Day",
    price: 125,
    icon: "✿",
    flowerColor: "#c9787a",
    backgroundColor: "#f0c6c0"
  },
  {
    name: "The Keepsake",
    category: "Mother’s Day",
    price: 138,
    icon: "❀",
    flowerColor: "#bc8792",
    backgroundColor: "#e7d2d2"
  },
  {
    name: "The Celebration",
    category: "Birthdays",
    price: 118,
    icon: "✾",
    flowerColor: "#d69363",
    backgroundColor: "#f2dac5"
  },
  {
    name: "The Conservatory",
    category: "Home Decor",
    price: 156,
    icon: "❁",
    flowerColor: "#6d9275",
    backgroundColor: "#d2dfca"
  },
  {
    name: "The Vow",
    category: "Weddings",
    price: 185,
    icon: "✿",
    flowerColor: "#d9b1a0",
    backgroundColor: "#f1ddd4"
  },
  {
    name: "The Welcome",
    category: "Public Spaces",
    price: 220,
    icon: "❀",
    flowerColor: "#698572",
    backgroundColor: "#cfddd2"
  },
  {
    name: "The Statement",
    category: "Corporate",
    price: 245,
    icon: "✾",
    flowerColor: "#b58b57",
    backgroundColor: "#e6d8bb"
  },
  {
    name: "The Solstice",
    category: "Holidays",
    price: 145,
    icon: "❁",
    flowerColor: "#a4665f",
    backgroundColor: "#e6c0b2"
  }
];

/* =========================================
   DOM ELEMENTS
========================================= */

const productGrid = document.querySelector("#productGrid");
const filters = document.querySelector("#filters");

const cartPanel = document.querySelector("#cart");
const cartOpenButton = document.querySelector("#cartOpen");
const cartCloseButton = document.querySelector("#cartClose");
const overlay = document.querySelector("#overlay");
const cartItems = document.querySelector("#cartItems");
const cartCount = document.querySelector("#cartCount");
const subtotal = document.querySelector("#subtotal");
const checkoutButton = document.querySelector("#checkout");

const customModal = document.querySelector("#customModal");
const customStartButton = document.querySelector("#customStart");
const modalCloseButton = document.querySelector(".modal-close");
const customForm = document.querySelector("#customForm");
const flowerPicks = document.querySelector("#flowerPicks");
const selectionStatus = document.querySelector("#selection");

/* =========================================
   CART STORAGE
========================================= */

let cart = JSON.parse(localStorage.getItem("21FloralsCart")) || [];
let selectedFlowers = [];

const selectionLimits = {
  Primary: 3,
  Secondary: 5,
  Supporting: 8
};

/* =========================================
   PRODUCT CATEGORIES
========================================= */

const categories = [
  "All",
  ...new Set(products.map((product) => product.category))
];

function createFilters() {
  filters.innerHTML = categories
    .map((category, index) => {
      const activeClass = index === 0 ? "active" : "";

      return `
        <button
          type="button"
          class="${activeClass}"
          data-category="${category}"
        >
          ${category}
        </button>
      `;
    })
    .join("");
}

function renderProducts(category = "All") {
  const visibleProducts = products.filter((product) => {
    return category === "All" || product.category === category;
  });

  productGrid.innerHTML = visibleProducts
    .map((product) => {
      const productIndex = products.indexOf(product);

      return `
        <article class="product">
          <div
            class="product-art"
            style="
              --color: ${product.flowerColor};
              --bg: ${product.backgroundColor};
            "
          >
            <span>${product.icon}</span>
          </div>

          <div class="product-info">
            <p>${product.category.toUpperCase()}</p>
            <h3>${product.name}</h3>

            <div>
              <strong>$${product.price}</strong>

              <button
                class="add"
                type="button"
                data-product-index="${productIndex}"
              >
                Add to bag
              </button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  document.querySelectorAll(".add").forEach((button) => {
    button.addEventListener("click", () => {
      const productIndex = Number(button.dataset.productIndex);
      const product = products[productIndex];

      addToCart(product.name, product.price);
    });
  });
}

filters.addEventListener("click", (event) => {
  const selectedButton = event.target.closest("button");

  if (!selectedButton) return;

  const selectedCategory = selectedButton.dataset.category;

  document.querySelectorAll(".filters button").forEach((button) => {
    button.classList.remove("active");
  });

  selectedButton.classList.add("active");
  renderProducts(selectedCategory);
});

/* =========================================
   OCCASION BUTTONS
========================================= */

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.filter;
    const matchingFilter = document.querySelector(
      `.filters button[data-category="${category}"]`
    );

    document.querySelector("#collections").scrollIntoView({
      behavior: "smooth"
    });

    if (matchingFilter) {
      matchingFilter.click();
    }
  });
});

/* =========================================
   SHOPPING CART
========================================= */

function saveCart() {
  localStorage.setItem("21FloralsCart", JSON.stringify(cart));
}

function formatCurrency(amount) {
  return `$${amount.toFixed(2)}`;
}

function addToCart(name, price) {
  cart.push({
    id: Date.now(),
    name,
    price
  });

  saveCart();
  renderCart();
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);

  saveCart();
  renderCart();
}

function renderCart() {
  const itemCount = cart.length;
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  cartCount.textContent = itemCount;
  subtotal.textContent = formatCurrency(total);

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <p class="empty-cart">
        Your bag is waiting for something beautiful.
      </p>
    `;

    return;
  }

  cartItems.innerHTML = cart
    .map((item) => {
      return `
        <div class="cart-item">
          <span>
            ${item.name}<br />
            <strong>${formatCurrency(item.price)}</strong>
          </span>

          <button
            type="button"
            data-remove-id="${item.id}"
          >
            Remove
          </button>
        </div>
      `;
    })
    .join("");

  document.querySelectorAll("[data-remove-id]").forEach((button) => {
    button.addEventListener("click", () => {
      removeFromCart(Number(button.dataset.removeId));
    });
  });
}

function openCart() {
  cartPanel.classList.add("open");
  overlay.classList.add("open");
}

function closeCart() {
  cartPanel.classList.remove("open");
  overlay.classList.remove("open");
}

cartOpenButton.addEventListener("click", openCart);
cartCloseButton.addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);

/* =========================================
   CHECKOUT PLACEHOLDER
========================================= */

checkoutButton.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your bag is empty. Add an arrangement before checking out.");
    return;
  }

  alert(
    "Checkout is ready for Stripe or PayPal integration. " +
    "Before accepting real payments, connect this button to a secure serverless payment endpoint."
  );
});

/* =========================================
   CUSTOM BUILDER — FLOWER PICKER
========================================= */

function renderFlowerPicks() {
  flowerPicks.innerHTML = botanicals
    .map((flower, index) => {
      return `
        <button
          class="pick"
          type="button"
          data-flower-index="${index}"
        >
          <span>${flower.icon}</span>
          ${flower.name}<br />
          <small>${flower.type}</small>
        </button>
      `;
    })
    .join("");
}

function getSelectedCount(type) {
  return selectedFlowers.filter((index) => {
    return botanicals[index].type === type;
  }).length;
}

function updateFlowerSelectionUI() {
  document.querySelectorAll(".pick").forEach((button) => {
    const flowerIndex = Number(button.dataset.flowerIndex);

    button.classList.toggle(
      "selected",
      selectedFlowers.includes(flowerIndex)
    );
  });

  const primaryCount = getSelectedCount("Primary");
  const secondaryCount = getSelectedCount("Secondary");
  const supportingCount = getSelectedCount("Supporting");

  selectionStatus.textContent =
    `Primary ${primaryCount}/3 · ` +
    `Secondary ${secondaryCount}/5 · ` +
    `Supporting ${supportingCount}/8`;
}

flowerPicks.addEventListener("click", (event) => {
  const clickedButton = event.target.closest(".pick");

  if (!clickedButton) return;

  const flowerIndex = Number(clickedButton.dataset.flowerIndex);
  const flower = botanicals[flowerIndex];
  const isAlreadySelected = selectedFlowers.includes(flowerIndex);

  if (isAlreadySelected) {
    selectedFlowers = selectedFlowers.filter(
      (index) => index !== flowerIndex
    );

    updateFlowerSelectionUI();
    return;
  }

  const selectedCountForType = getSelectedCount(flower.type);
  const limit = selectionLimits[flower.type];

  if (selectedCountForType >= limit) {
    alert(
      `You may select only ${limit} ${flower.type.toLowerCase()} florals.`
    );

    return;
  }

  selectedFlowers.push(flowerIndex);
  updateFlowerSelectionUI();
});

/* =========================================
   CUSTOM BUILDER — MODAL
========================================= */

function resetCustomBuilder() {
  selectedFlowers = [];

  customForm.reset();

  document.querySelectorAll(".pick").forEach((button) => {
    button.classList.remove("selected");
  });

  selectionStatus.textContent =
    "Choose 3 / 5 / 8 stems to continue.";
}

customStartButton.addEventListener("click", () => {
  resetCustomBuilder();
  customModal.showModal();
});

modalCloseButton.addEventListener("click", () => {
  customModal.close();
});

customModal.addEventListener("click", (event) => {
  const dialogDimensions = customModal.getBoundingClientRect();

  const clickedOutsideDialog =
    event.clientX < dialogDimensions.left ||
    event.clientX > dialogDimensions.right ||
    event.clientY < dialogDimensions.top ||
    event.clientY > dialogDimensions.bottom;

  if (clickedOutsideDialog) {
    customModal.close();
  }
});

/* =========================================
   CUSTOM BUILDER — SUBMIT ORDER
========================================= */

function customBuilderIsComplete() {
  return (
    getSelectedCount("Primary") === 3 &&
    getSelectedCount("Secondary") === 5 &&
    getSelectedCount("Supporting") === 8
  );
}

customForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!customBuilderIsComplete()) {
    alert(
      "Please complete your arrangement with exactly 3 primary, 5 secondary, and 8 supporting florals."
    );

    return;
  }

  const formData = new FormData(customForm);

  const palette = formData.get("palette");
  const vase = formData.get("vase");
  const accent = formData.get("accent");
  const hasBlingUpgrade = formData.get("bling") === "on";

  const basePrice = 185;
  const blingPrice = 18;
  const totalPrice = basePrice + (hasBlingUpgrade ? blingPrice : 0);

  const flowerNames = selectedFlowers.map((index) => {
    return botanicals[index].name;
  });

  const customArrangementName =
    `Custom ${palette} Arrangement — ${vase}`;

  cart.push({
    id: Date.now(),
    name: customArrangementName,
    price: totalPrice,
    customDetails: {
      palette,
      vase,
      accent,
      bling: hasBlingUpgrade,
      flowers: flowerNames
    }
  });

  saveCart();
  renderCart();

  customModal.close();
  openCart();

  alert(
    `Your custom arrangement has been added to the bag.

` +
    `Palette: ${palette}
` +
    `Vase: ${vase}
` +
    `Accent: ${accent}
` +
    `Bling Upgrade: ${hasBlingUpgrade ? "Yes" : "No"}`
  );
});

/* =========================================
   INITIAL PAGE LOAD
========================================= */

createFilters();
renderProducts();
renderCart();
renderFlowerPicks();