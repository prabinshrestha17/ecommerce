const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} = require("../controller/cart.controller");
const isAuthenticated = require("../middleware/isAuthenticated");

router.post("/add", isAuthenticated, addToCart);
router.get("/", isAuthenticated, getCart);
router.put("/item/:itemId", isAuthenticated, updateCartItem);
router.delete("/item/:itemId", isAuthenticated, removeCartItem);
router.delete("/clear", isAuthenticated, clearCart);

module.exports = router;