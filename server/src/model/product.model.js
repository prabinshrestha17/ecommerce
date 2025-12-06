const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    // FIX: Store as Array of Strings to handle multiple images
    productImage: {
      type: [String],
      required: true,
    },
    // FIX: Store as Number for calculations/sorting
    rating: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: String, // e.g., "20%"
    },
    priceAfterDiscount: {
      type: Number,
      // We calculate this in service, so it's fine
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
      enum: ["Male", "Female", "Kids", "Unisex"], // Restricts values to these options
      required: true,
    },

    // FIX: Key is 'size' to match frontend, removed strict ENUM to allow flexibility
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