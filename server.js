// Minimal Express server to create/capture PayPal Orders.
// Install: npm i express node-fetch body-parser dotenv
// Run: PAYPAL_CLIENT_ID=... PAYPAL_CLIENT_SECRET=... node server.js

import express from 'express';
import fetch from 'node-fetch'; // or use global fetch if available
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

// Use sandbox endpoint for testing
const PAYPAL_API_BASE = process.env.PAYPAL_ENV === 'live'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

async function getAccessToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_CLIENT_SECRET;
  const auth = Buffer.from(`${clientId}:${secret}`).toString('base64');

  const res = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error('Failed to fetch token: ' + txt);
  }
  const data = await res.json();
  return data.access_token;
}

// Create order
app.post('/create-order', async (req, res) => {
  try {
    const accessToken = await getAccessToken();
    // Take purchase_units from client or compute on server from cart data.
    const orderPayload = req.body || {
      intent: 'CAPTURE',
      purchase_units: [{
        amount: { currency_code: 'USD', value: '35.00' }
      }]
    };

    const createRes = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(orderPayload)
    });

    if (!createRes.ok) {
      const text = await createRes.text();
      return res.status(500).send(text);
    }

    const order = await createRes.json();
    res.json(order); // return the whole order object (includes id)
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Capture order
app.post('/capture-order', async (req, res) => {
  try {
    const { orderID } = req.body;
    if (!orderID) return res.status(400).json({ error: 'orderID required' });
    const accessToken = await getAccessToken();

    const capRes = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders/${orderID}/capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!capRes.ok) {
      const text = await capRes.text();
      return res.status(500).send(text);
    }

    const capture = await capRes.json();
    res.json(capture);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
