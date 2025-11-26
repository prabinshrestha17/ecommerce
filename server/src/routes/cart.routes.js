const express = require("express");
const {
  createCartController,
  getAllCartController,
  updateCartController,
  deleteCartController,
  getCartByUserIdController,
} = require("../controller/cart.controller");

const router = express.Router();

router.post("/create", createCartController);
router.get("/cart", getAllCartController);
router.get("/get/:userId", getCartByUserIdController);
router.put("/update/:userId", updateCartController);
router.delete("/delete/:userId", deleteCartController);

module.exports = router;
