const Product = require("../model/product.model");

exports.createProductService = async data => {
  try {
    const {
      productName,
      productImage,
      rating,
      price,
      discount,
      description,
      gender,
      colors,
      size,
    } = data;

    const numericDiscount = discount ? parseInt(discount.replace("%", "")) : 0;

    const priceAfterDiscount = price - (price * numericDiscount) / 100;

    const response = await Product.create({
      productName,
      productImage,
      rating,
      price,
      discount,
      priceAfterDiscount,
      description,
      gender,
      colors,
      size,
    });

    return response;
  } catch (error) {
    return error.message;
  }
};

exports.getAllProductsService = async () => {
  try {
    const data = await Product.find({});
    return data;
  } catch (error) {
    return error.message;
  }
};

exports.getSpecificProductService = async id => {
  try {
    const res = await Product.findById(id);
    if (!res) {
      throw new Error("product not found ");
    }
    return res;
  } catch (error) {
    return error.message;
  }
};

exports.updateProductService = async ({ id, data }) => {
  try {
    const res = await Product.findByIdAndUpdate(id, data, { new: true });
    return res;
  } catch (error) {
    return error.message;
  }
};

exports.deleteProductService = async id => {
  try {
    const res = await Product.findByIdAndDelete(id);
    return res;
  } catch (error) {
    return error.message;
  }
};
