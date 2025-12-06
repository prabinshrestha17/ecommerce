const {
  createProductService,
  deleteProductService,
  getAllProductsService,
  getSpecificProductService,
  updateProductService,
} = require("../services/products.service");

exports.createProductController = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await createProductService(data);

    res.status(201).json({
      success: true,
      message: "Product Created Successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllProductsController = async (req, res) => {
  try {
    const result = await getAllProductsService();

    res.status(200).json({
      success: true,
      message: "All Products fetched Successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getSpecificproductsController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getSpecificProductService(id);
    if (!result.id) {
      throw new Error("product Not found");
    }
    res.status(200).json({
      success: true,
      message: "Product fetched Successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await updateProductService({ id, data });

    res.status(200).json({
      success: true,
      message: "Product fetched Successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteProductService(id);
    if (!result) {
      throw new Error("Product not found or deleted");
    }
    res.status(200).json({
      success: true,
      message: "Product deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
