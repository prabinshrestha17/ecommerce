const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    productImage: {
      type: [String],
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: String,
    },
    priceAfterDiscount: {
      type: Number,
    },
    description: {
      type: String,
      required: true,
    },
    colors: {
      type: [String],
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Kids", "Unisex"],
      required: true,
    },
    size: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;