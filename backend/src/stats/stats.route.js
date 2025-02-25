const express = require("express");
const User = require("../users/user.model");
const Order = require("../orders/orders.model");
const Reviews = require("../reviews/reviews.model");
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
  })
  // 
    } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
