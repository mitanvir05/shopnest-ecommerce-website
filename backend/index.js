require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
const authRoutes = require("./src/users/user.route");
const productRoutes = require("./src/products/products.route");
const reviewRoutes = require("./src/reviews/reviews.route")
const orderRoutes = require("./src/orders/orders.route")
const statsRoutes = require("./src/stats/stats.route")

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/stats", statsRoutes);
// Default Route
app.get("/", (req, res) => {
  res.send("Hello From Ecom!");
});

// Connect to MongoDB and Start Server
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("MongoDB is connected");
    app.listen(port, () => {
      console.log(`Ecommerce app listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
