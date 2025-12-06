const Cart = require("../model/cart.model");
const Product = require("../model/product.model");

exports.addToCartService = async (
  userId,
  { productId, quantity = 1, color, size }
) => {
  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = await Cart.create({
      userId,
      products: [
        {
          productId,
          quantity,
          color,
          size,
          price: product.price,
          productName: product.productName,
          productImage: product.productImage[0],
        },
      ],
    });
  } else {
    const existingProduct = cart.products.find(
      item =>
        item.productId.toString() === productId &&
        item.color === color &&
        item.size === size
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({
        productId,
        quantity,
        color,
        size,
        price: product.price,
        productName: product.productName,
        productImage: product.productImage[0],
      });
    }

    await cart.save();
  }

  return await Cart.findById(cart._id).populate("products.productId");
};

exports.getCartByUserIdService = async userId => {
  const cart = await Cart.findOne({ userId }).populate("products.productId");
  if (!cart) throw new Error("Cart not found");
  return cart;
};

exports.updateCartItemService = async (userId, itemId, { quantity }) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) throw new Error("Cart not found");

  const item = cart.products.id(itemId);
  if (!item) throw new Error("Item not found in cart");

  item.quantity = quantity;
  await cart.save();

  return await Cart.findById(cart._id).populate("products.productId");
};

exports.removeCartItemService = async (userId, itemId) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) throw new Error("Cart not found");

  cart.products.pull({ _id: itemId });
  await cart.save();

  return await Cart.findById(cart._id).populate("products.productId");
};

exports.clearCartService = async userId => {
  const cart = await Cart.findOneAndUpdate(
    { userId },
    { $set: { products: [], totalAmount: 0, totalItems: 0 } },
    { new: true }
  );
  return cart;
};