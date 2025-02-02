const { Schema, model, Types } = require("mongoose");

const ReviewSchema = new Schema(
  {
    comment: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    productId: { type: Types.ObjectId, ref: "Product", required: true },
    userId: { type: Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Reviews = model("Review", ReviewSchema);
module.exports = Reviews;
