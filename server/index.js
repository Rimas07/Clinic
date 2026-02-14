const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Create Checkout Session endpoint
app.post("/create-checkout-session", async (req, res) => {
  try {
    const { priceId, successUrl, cancelUrl } = req.body;

    if (!priceId) {
      return res.status(400).json({
        error: "priceId is required",
      });
    }

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl || `${req.headers.origin || "http://localhost:5173"}?payment=success`,
      cancel_url: cancelUrl || `${req.headers.origin || "http://localhost:5173"}?payment=cancelled`,
    });

    res.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({
      error: error.message || "Failed to create checkout session",
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Stripe backend server running on http://localhost:${PORT}`);
  console.log(`📝 Make sure STRIPE_SECRET_KEY is set in your .env file`);
});


