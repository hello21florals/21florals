// ============================================================
// 21 FLORALS PAYMENT SERVER
// Stripe + Optional PayPal
// ============================================================

import express from "express";
import cors from "cors";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;


// ==============================
// STRIPE SETUP
// ==============================

if (!process.env.STRIPE_SECRET_KEY) {
    console.error("Missing STRIPE_SECRET_KEY");
    process.exit(1);
}


const stripe = new Stripe(
    process.env.STRIPE_SECRET_KEY
);


// ==============================
// MIDDLEWARE
// ==============================

app.use(cors());

app.use(express.json());


// ==============================
// TEST ROUTE
// ==============================

app.get("/", (req,res)=>{

    res.json({
        status:"online",
        service:"21 Florals Stripe Server"
    });

});


// ==============================
// CREATE STRIPE PAYMENT INTENT
// ==============================

app.post(
"/stripe/create-payment-intent",
async(req,res)=>{

try {


const {
amount,
currency="usd"
}=req.body;



if(
!amount ||
amount < 50
){

return res.status(400).json({

error:"Invalid payment amount"

});

}



const paymentIntent =
await stripe.paymentIntents.create({

amount:Math.round(amount),

currency,

automatic_payment_methods:{
enabled:true
}

});



res.json({

clientSecret:
paymentIntent.client_secret

});


}

catch(error){

console.error(
"Stripe Error:",
error.message
);


res.status(500).json({

error:error.message

});


}


});



// ==============================
// STRIPE WEBHOOK
// ==============================

app.post(
"/stripe/webhook",
express.raw({
type:"application/json"
}),
(req,res)=>{


console.log(
"Stripe webhook received"
);


res.json({
received:true
});


});



// ==============================
// START SERVER
// ==============================


app.listen(
PORT,
()=>{


console.log(
`
🌸 21 Florals Backend Online

Port:
${PORT}

Stripe:
${process.env.STRIPE_SECRET_KEY 
?"CONNECTED"
:"MISSING"}

`

);


});