const express = require("express");
const User = require("../users/user.model");
const Order = require("../orders/orders.model");
const Reviews = require("../reviews/reviews.model");
const Products = require("../products/products.model");
const router = express.Router();

// user stats by email

router.get("/user-stats/:email", async (req, res) => {
  const { email } = req.params;
  if (!email) return res.status(400).send("Email is required");

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).send("User not found");
    }
    // sum of all orders
    const totalPaymentsResult = await Order.aggregate([
      { $match: { email: email } },
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
    ]);

    const totalPaymentsAmount =
      totalPaymentsResult.length > 0 ? totalPaymentsResult[0].totalAmount : 0;
    // total review

    const totalReviews = await Reviews.countDocuments({
      userId: user._id,
    });
    // total purchase of product
    const totalPurchasedProductIds = await Order.distinct(
      "products.productId",
      { email: email }
    );
    const totalPurchasedProducts = totalPurchasedProductIds.length;

    res.status(200).json({
      totalPayments: totalPaymentsAmount.toFixed(2),
      totalReviews,
      totalPurchasedProducts,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

//admin stats

router.get("/admin-stats", async (req, res) => {
  try {
    // total orders
    const totalOrders = await Order.countDocuments();
    // total products
    const totalProducts = await Products.countDocuments();
    // total users
    const totalUsers = await User.countDocuments();
    // total reviews
    const totalReviews = await Reviews.countDocuments();
    // calculate total earning
    const totalEarningsResult = await Order.aggregate([
      { $group: { _id: null, totalEarnings: { $sum: "$amount" } } },
    ]);

    const totalEarnings =
      totalEarningsResult.length > 0 ? totalEarningsResult[0].totalEarnings : 0;

    // monthly earning

    const monthlyEarningsResults = await Order.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          monthlyEarnings: { $sum: "$amount" },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);

    //FORMAT monthly earing
    const monthlyEarnings = monthlyEarningsResults.map((entry) => ({
      month: entry._id.month,
      year: entry._id.year,
      earnings: entry.monthlyEarnings.toFixed(2),
    }));

    res.status(200).json({
        totalOrders,
        totalProducts,
      totalUsers,
      totalReviews,
      totalEarnings,
      monthlyEarnings,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
