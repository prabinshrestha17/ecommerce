const {
  addToCartService,
  getCartByUserIdService,
  updateCartItemService,
  removeCartItemService,
  clearCartService,
} = require("../services/cart.service");

exports.addToCart = async (req, res) => {
  try {
    const result = await addToCartService(req.user.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const result = await getCartByUserIdService(req.user.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const result = await updateCartItemService(
      req.user.id,
      req.params.itemId,
      req.body
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.removeCartItem = async (req, res) => {
  try {
    const result = await removeCartItemService(req.user.id, req.params.itemId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const result = await clearCartService(req.user.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};