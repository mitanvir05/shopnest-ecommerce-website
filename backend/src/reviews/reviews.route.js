const express = require("express");
const Reviews = require("./reviews.model");
const Products = require("../products/products.model");
const router = express.Router();

// Post a new review
router.post("/post-review", async (req, res) => {
  try {
    const { comment, rating, productId, userId } = req.body;

    if (!comment || !rating || !productId || !userId) {
      return res.status(400).send("All fields are required");
    }

    let message;
    let review;

    const existingReview = await Reviews.findOne({ productId, userId });

    if (existingReview) {
      // Update existing review
      existingReview.comment = comment;
      existingReview.rating = rating;
      review = await existingReview.save();
      message = "Review updated successfully";
    } else {
      // Create new review
      review = new Reviews({ comment, rating, productId, userId });
      await review.save();
      message = "Review saved successfully";
    }

    // Calculate average rating
    const reviews = await Reviews.find({ productId });

    if (reviews.length > 0) {
      const totalRating = reviews.reduce((acc, r) => acc + r.rating, 0);
      const averageRating = totalRating / reviews.length;

      const product = await Products.findById(productId);
      if (product) {
        product.rating = averageRating;
        await product.save({ validateBeforeSave: false });
      } else {
        return res.status(404).send("Product not found");
      }
    }

    // Send final response
    return res.status(200).send({ message, review });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error for review");
  }
});

// tottal reviews count
router.get("/total-reviews", async (req, res) => {
  try {
    const totalReviews = await Reviews.countDocuments({});
    return res.status(200).send({ totalReviews });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error for total reviews");
  }
});

// Get reviews by user ID

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  if (!userId) return res.status(400).send("User ID is required");
  try {
    const reviews = await Reviews.find({ userId: userId }).sort({
      createdAt: -1,
    });
    if (reviews.length === 0) return res.status(404).send("No reviews found");
    return res.status(200).send({ reviews });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error for reviews by user");
  }
});

module.exports = router;
