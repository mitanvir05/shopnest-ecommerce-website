const express = require("express");
const Products = require("./products.model");
const Reviews = require("../reviews/reviews.model");

const router = express.Router();

// Create a new product
router.post("/create-product", async (req, res) => {
  try {
    // Ensure 'author' is a valid ObjectId
    if (!req.body.author || !req.body.author.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send({ error: "Invalid author ID format" });
    }

    const newProduct = new Products({ ...req.body });
    const savedProduct = await newProduct.save();
    res.status(201).send(savedProduct);
    // calculate reviews
    const reviews = await Reviews.find({ productId: savedProduct._id });
    if (reviews.length > 0) {
      const totalRating = reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      const averageRating = totalRating / reviews.length;
      savedProduct.rating = averageRating;
      await savedProduct.save();
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// get all products

router.get("/", async (req, res) => {
    try {
      const { category, color, minPrice, maxPrice, limit = 10, page = 1 } = req.query;
      
      let filter = {};
      
      if (category && category !== "all") {
        filter.category = category;
      }
      
      if (color && color !== "all") {
        filter.color = color;
      }
      
      if (minPrice && maxPrice) {
        const min = parseFloat(minPrice);
        const max = parseFloat(maxPrice);
        if (!isNaN(min) && !isNaN(max)) {
          filter.price = { $gte: min, $lte: max };
        }
      }
  
      const limitNum = parseInt(limit);
      const skip = (parseInt(page) - 1) * limitNum;
  
      const totalProducts = await Products.countDocuments(filter);
      const totalPages = Math.ceil(totalProducts / limitNum);
  
      const products = await Products.find(filter)
        .skip(skip)
        .limit(limitNum)
        .populate("author", "email")
        .sort({ createdAt: -1 });
  
      res.status(200).json({ products, totalPages, totalProducts });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  });
  

module.exports = router;
