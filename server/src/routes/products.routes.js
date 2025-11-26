const express = require("express");
const {
  createProductController,
  getAllProductsController,
  updateProductController,
  deleteProductController,
  getSpecificproductsController,
} = require("../controller/product.controller");
const { validateCreateProduct } = require("../validation/product.validation");

const router = express.Router();

router.post("/create", validateCreateProduct, createProductController);
router.get("/get-all", getAllProductsController);
router.get("/get-specific/:id", getSpecificproductsController);
router.put("/update", updateProductController);
router.delete("/delete", deleteProductController);

module.exports = router;
