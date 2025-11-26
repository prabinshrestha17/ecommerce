const Cart = require("../model/cart.model");

exports.createCartService = ({ userId, products }) => {
  try {
    const result = new Cart.create({
      userId,
      products,
    });

    return result;
  } catch (error) {
    return error.message;
  }
};

exports.getAllCartService = async () => {
  try {
    const result = await Cart.find({}).populate("products.productId");
    return result;
  } catch (error) {
    return error.message;
  }
};

exports.getCartByUserIdService = async userId => {
  try {
    const result = await Cart.findOne({ userId }).populate(
      "products.productId"
    );
    return result;
  } catch (error) {
    return error.message;
  }
};

exports.updateCartService = async ({ userId, products }) => {
  try {
    const result = await Cart.findOneAndUpdate(
      { userId },
      { $set: { products } },
      { new: true }
    ).populate("products.productId");

    return result;
  } catch (error) {
    return error.message;
  }
};

exports.deleteCartService = async userId => {
  try {
    const result = await Cart.findOneAndDelete({ userId });
    return result;
  } catch (error) {
    return error.message;
  }
};
