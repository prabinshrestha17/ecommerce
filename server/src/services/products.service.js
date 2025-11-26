const Product = require("../model/product.model");

exports.createProductService = async ({
  productName,
  productTitle,
  productDescription,
  price,
  productImage,
  size,
  category,
  productDetails,
}) => {
  try {
    const response = await Product.create({
      productName,
      productTitle,
      productDescription,
      price,
      productImage,
      productDetails,
      category,
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
