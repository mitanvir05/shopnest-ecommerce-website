const express = require("express");
const Products = require("./products.model");
const Reviews = require("../reviews/reviews.model");
const verifyToken = require("../middleware/verifyToken");

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
    res.status(500).send("Server Error on get all products");
  }
});

// get all products

router.get("/", async (req, res) => {
  try {
    const {
      category,
      color,
      minPrice,
      maxPrice,
      limit = 10,
      page = 1,
    } = req.query;

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
//   get single product
router.get("/:id", async (req, res) => {
  try {
    const product = await Products.findById(req.params.id).populate(
      "author",
      "email username"
    );
    if (!product) return res.status(404).send("Product not found");

    const reviews = await Reviews.find({ productId: req.params.id }).populate(
      "userId",
      "email username"
    );
    res.status(200).json({ product, reviews });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error on single products fetching");
  }
});

// Update product

router.patch("/update-product/:id", verifyToken, async (req, res) => {
  try {
    const product = await Products.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) return res.status(404).send("Product not found");
    res.status(200).send({
      message: "Product updated successfully",
      product: product,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error on updating product");
  }
});

// Delete product

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const product = await Products.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).send("Product not found");
    // delete reviews related product
    await Reviews.deleteMany({ productId: req.params.id });
    res.status(200).send({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error on deleting product");
  }
});

//get related products
router.get("/related/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(404).send("Product id not found");
    const product = await Products.findById(id);
    if (!product) return res.status(404).send("Product not found");

    const titleRegex = new RegExp(
      product.name
        .split(" ")
        .filter((word) => word.length > 1)
        .join("|"),
      "i"
    );
    const relatedProducts = await Products.find({
      _id: { $ne: id },
      $or: [{ name: { $regex: titleRegex } }, { category: product.category }],
    });
    res.status(200).send(relatedProducts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error on get related products");
  }
});

module.exports = router;
