const express = require("express");
const Order = require("./orders.model");
const router = express.Router(); 
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Create routes
router.post("/create-checkout-session", async (req, res) => {
  const { product } = req.body;

  if (!product || !Array.isArray(product)) {
    return res.status(400).send("Invalid products array");
  }

  try {
    const lineItems = product.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: 1, 
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}&payment_method`,
      cancel_url: `http://localhost:5173/cancel`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session", error);
    res.status(500).send("Server error");
  }
});


// Confirm payment
router.post("/confirm-payment", async (req, res) => { 
  const { session_id } = req.body;
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items", "payment_intent"],
    });
    const paymentIntentId = session.payment_intent.id;
    let order = await Order.findOne({ orderId: paymentIntentId });
    if (!order) {
      const lineItems = session.line_items.data.map((item) => ({
        productId: item.price.product,
        quantity: item.quantity,
      }));
      const amount = session.amount_total / 100;
      order = new Order({
        orderId: paymentIntentId,
        products: lineItems,
        amount,
        email: session.customer_details.email,
        status: session.payment_intent.status === "succeeded" ? "pending" : "failed", // Fixed typo here
      });
    } else {
      order.status = session.payment_intent.status === "succeeded" ? "pending" : "failed"; // Fixed typo here
    }
    await order.save();
    res.json({ order });
  } catch (error) {
    console.error("Error confirming payment", error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
