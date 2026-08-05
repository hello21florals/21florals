# 21 Florals 🌸

**Silk Floral Arrangements** — [21florals.com](https://21florals.com)

A static e-commerce storefront with real **Stripe** and **PayPal** payment processing.

---

## Payment Integration

The checkout page supports two live payment methods:

| Method | Provider | What it does |
|---|---|---|
| Credit / Debit Card | **Stripe** | Stripe.js + Payment Intents API |
| PayPal | **PayPal** | PayPal JS SDK + Orders API v2 |

---

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` and fill in your credentials:

```env
# Stripe — https://dashboard.stripe.com/apikeys
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...   # optional

# PayPal — https://developer.paypal.com/dashboard/applications
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...
PAYPAL_ENV=sandbox                # change to "live" for production
```

### 3. Add your Stripe publishable key to checkout.html

In `checkout.html`, find this line near the bottom and replace the placeholder:

```js
const STRIPE_PUBLISHABLE_KEY = window.__STRIPE_KEY__ || 'pk_test_REPLACE_WITH_YOUR_PUBLISHABLE_KEY';
```

### 4. Run the server

```bash
npm start
# or for auto-reload during development:
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## API Endpoints

### Stripe

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/stripe/create-payment-intent` | Creates a PaymentIntent; returns `clientSecret` |
| `POST` | `/stripe/webhook` | Receives signed Stripe webhook events |

**Request body for `/stripe/create-payment-intent`:**
```json
{ "amount": 10999, "currency": "usd" }
```
> `amount` is in **cents** (e.g. `10999` = $109.99)

---

### PayPal

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/paypal/client-id` | Returns the public PayPal Client ID for the frontend SDK |
| `POST` | `/paypal/create-order` | Creates a PayPal order; returns order `id` |
| `POST` | `/paypal/capture-order` | Captures an approved PayPal order |

**Request body for `/paypal/create-order`:**
```json
{
  "purchase_units": [{
    "amount": { "currency_code": "USD", "value": "109.99" }
  }]
}
```

---

## Testing

### Stripe test cards

| Card number | Scenario |
|---|---|
| `4242 4242 4242 4242` | Payment succeeds |
| `4000 0000 0000 0002` | Card declined |
| `4000 0025 0000 3155` | Requires 3D Secure authentication |

Use any future expiry date and any 3-digit CVV.

### PayPal sandbox

Log in to the [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/accounts) to create sandbox buyer/seller accounts for testing.

---

## Stripe Webhooks (optional but recommended)

To receive payment confirmation events (e.g. for order fulfilment):

```bash
# Install Stripe CLI
stripe listen --forward-to localhost:3000/stripe/webhook
```

Copy the printed webhook secret into your `.env` as `STRIPE_WEBHOOK_SECRET`.

---

## Deployment

This site is hosted on **GitHub Pages** (`21florals.com`). Because GitHub Pages only serves static files, the Node.js payment server must be deployed separately to a platform such as:

- [Railway](https://railway.app) — recommended, free tier available
- [Render](https://render.com)
- [Fly.io](https://fly.io)
- Any VPS (DigitalOcean, Linode, etc.)

After deploying, update `SERVER_BASE` in `checkout.html`:

```js
const SERVER_BASE = 'https://your-backend.railway.app';
```

---

## Security Notes

- **Never** commit your `.env` file — it is listed in `.gitignore`
- The Stripe `secret key` and PayPal `client secret` must only ever be used server-side
- The Stripe `publishable key` and PayPal `client ID` are safe to expose in the frontend
- Stripe webhook signatures are verified server-side to prevent spoofed events
