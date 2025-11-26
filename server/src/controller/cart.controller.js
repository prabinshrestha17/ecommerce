const {
  createCartService,
  deleteCartService,
  updateCartService,
  getCartByUserIdService,
  getAllCartService,
} = require("../services/cart.service");

exports.createCartController = async (req, res) => {
  try {
    const result = await createCartService(req.body);
    res.status(201).json({
      success: true,
      message: "Cart created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllCartController = async (req, res) => {
  try {
    const result = await getAllCartService();
    res.status(200).json({
      success: true,
      message: "All Carts fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getCartByUserIdController = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await getCartByUserIdService(userId);
    res.status(200).json({
      success: true,
      message: "Cart fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateCartController = async (req, res) => {
  try {
    const { userId } = req.params;
    const products = req.body.products;
    const result = await updateCartService({ userId, products });
    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteCartController = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await deleteCartService(userId);
    res.status(200).json({
      success: true,
      message: "Cart deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
