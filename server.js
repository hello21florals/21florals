// ============================================================
// 21 FLORALS — Payment Server (Stripe + PayPal)
// ============================================================
// Install:  npm install express node-fetch stripe dotenv cors
// Run:      node server.js
//
// Required environment variables (.env):
//   STRIPE_SECRET_KEY=sk_test_...
//   STRIPE_WEBHOOK_SECRET=whsec_...   (optional, for webhook verification)
//   PAYPAL_CLIENT_ID=...
//   PAYPAL_CLIENT_SECRET=...
//   PAYPAL_ENV=sandbox                (set to "live" for production)
//   PORT=3000
// ============================================================

import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ── Stripe client ────────────────────────────────────────────
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
});

// ── PayPal base URL ──────────────────────────────────────────
const PAYPAL_API_BASE = process.env.PAYPAL_ENV === 'live'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

// ── Middleware ───────────────────────────────────────────────
// Raw body needed for Stripe webhook signature verification
app.use('/stripe/webhook', express.raw({ type: 'application/json' }));
app.use(cors());
app.use(express.json());
app.use(express.static('.'));   // serve static HTML/CSS/JS files

// ============================================================
// STRIPE ROUTES
// ============================================================

/**
 * POST /stripe/create-payment-intent
 * Body: { amount: number (in cents), currency?: string, metadata?: object }
 * Returns: { clientSecret }
 */
app.post('/stripe/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency = 'usd', metadata = {} } = req.body;

    if (!amount || typeof amount !== 'number' || amount < 50) {
      return res.status(400).json({ error: 'Invalid amount. Must be a positive integer in cents (min 50).' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency,
      automatic_payment_methods: { enabled: true },
      metadata,
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error('[Stripe] create-payment-intent error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /stripe/webhook
 * Stripe sends signed events here. Configure in Stripe Dashboard.
 */
app.post('/stripe/webhook', (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    event = webhookSecret
      ? stripe.webhooks.constructEvent(req.body, sig, webhookSecret)
      : JSON.parse(req.body.toString());
  } catch (err) {
    console.error('[Stripe] Webhook signature error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'payment_intent.succeeded': {
      const pi = event.data.object;
      console.log(`[Stripe] ✅ Payment succeeded: ${pi.id} — $${(pi.amount / 100).toFixed(2)}`);
      // TODO: fulfil order, send confirmation email, etc.
      break;
    }
    case 'payment_intent.payment_failed': {
      const pi = event.data.object;
      console.log(`[Stripe] ❌ Payment failed: ${pi.id}`);
      break;
    }
    default:
      console.log(`[Stripe] Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
});

// ============================================================
// PAYPAL ROUTES
// ============================================================

/** Fetch a short-lived PayPal access token */
async function getPayPalAccessToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !secret) {
    throw new Error('PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET must be set in .env');
  }

  const auth = Buffer.from(`${clientId}:${secret}`).toString('base64');
  const res = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`PayPal token error: ${txt}`);
  }

  const data = await res.json();
  return data.access_token;
}

/**
 * POST /paypal/create-order
 * Body: { purchase_units: [{ amount: { currency_code, value } }] }
 * Returns: { id, status, links }
 */
app.post('/paypal/create-order', async (req, res) => {
  try {
    const accessToken = await getPayPalAccessToken();

    // Accept purchase_units from client, or fall back to a minimal default
    const { purchase_units } = req.body;
    if (!purchase_units || !Array.isArray(purchase_units) || purchase_units.length === 0) {
      return res.status(400).json({ error: 'purchase_units array is required.' });
    }

    const orderPayload = {
      intent: 'CAPTURE',
      purchase_units,
    };

    const createRes = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(orderPayload),
    });

    if (!createRes.ok) {
      const text = await createRes.text();
      return res.status(500).json({ error: text });
    }

    const order = await createRes.json();
    res.json(order);
  } catch (err) {
    console.error('[PayPal] create-order error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /paypal/capture-order
 * Body: { orderID: string }
 * Returns: PayPal capture response
 */
app.post('/paypal/capture-order', async (req, res) => {
  try {
    const { orderID } = req.body;
    if (!orderID) return res.status(400).json({ error: 'orderID is required.' });

    const accessToken = await getPayPalAccessToken();

    const capRes = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders/${orderID}/capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!capRes.ok) {
      const text = await capRes.text();
      return res.status(500).json({ error: text });
    }

    const capture = await capRes.json();
    console.log(`[PayPal] ✅ Order captured: ${orderID}`);
    // TODO: fulfil order, send confirmation email, etc.
    res.json(capture);
  } catch (err) {
    console.error('[PayPal] capture-order error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /paypal/client-id
 * Returns the public PayPal Client ID for the frontend SDK
 */
app.get('/paypal/client-id', (req, res) => {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  if (!clientId) return res.status(500).json({ error: 'PAYPAL_CLIENT_ID not configured.' });
  res.json({ clientId });
});

// ============================================================
// START
// ============================================================
app.listen(PORT, () => {
  console.log(`\n🌸 21 Florals payment server running on http://localhost:${PORT}`);
  console.log(`   Stripe:  ${process.env.STRIPE_SECRET_KEY ? '✅ configured' : '⚠️  STRIPE_SECRET_KEY missing'}`);
  console.log(`   PayPal:  ${process.env.PAYPAL_CLIENT_ID ? '✅ configured' : '⚠️  PAYPAL_CLIENT_ID missing'}`);
  console.log(`   PayPal env: ${process.env.PAYPAL_ENV || 'sandbox'}\n`);
});
