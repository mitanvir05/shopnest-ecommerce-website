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
      success_url: `https://shopnest-ecommerce-7be02.web.app/success?session_id={CHECKOUT_SESSION_ID}&payment_method`,
      cancel_url: `https://shopnest-ecommerce-7be02.web.app:5173/cancel`,
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
        status:
          session.payment_intent.status === "succeeded" ? "pending" : "failed", // Fixed typo here
      });
    } else {
      order.status =
        session.payment_intent.status === "succeeded" ? "pending" : "failed"; // Fixed typo here
    }
    await order.save();
    res.json({ order });
  } catch (error) {
    console.error("Error confirming payment", error);
    res.status(500).send("Server error");
  }
});

// get order by email

router.get("/:email", async (req, res) => {
  const { email } = req.params;
  if (!email) {
    return res.status(400).send("Invalid email");
  }
  try {
    const orders = await Order.find({ email: email });
    if (orders.length === 0) return res.status(404).send("No orders found");
    res.send(orders);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error getting orders:" + error.message);
  }
});

//get order by id

router.get("/order/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send("Invalid ID");
  }
  try {
    const order = await Order.findById(id);
    if (!order) return res.status(404).send("Order not found");
    res.send(order);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error getting order:" + error.message);
  }
});

// get all orders

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    if (orders.length === 0) return res.status(404).send("No orders found");
    res.send(orders);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error getting orders:" + error.message);
  }
});

// update order status

router.patch("/update-order-status/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!id || !status) {
    return res.status(400).send("Invalid ID or status");
  }

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        status,
        updatedAt: new Date(),
      },
      {
        new: true,
        runvalidators: true,
      }
    );
    if (!updatedOrder) return res.status(404).send("Order not found");
    res.send(updatedOrder);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error updating order status:" + error.message);
  }
});


//delete order

router.delete("/delete-order/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) return res.status(404).send("Order not found");
    res.json({ message: "Order deleted successfully", deletedOrder }); 
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error deleting order:" + error.message);
  }
});



module.exports = router;
