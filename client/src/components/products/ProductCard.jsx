import React from "react";

const ProductCard = ({ product, onClick }) => (
  <div
    className="group cursor-pointer p-2 hover:shadow-lg transition-shadow duration-300"
    onClick={() => onClick(product._id)}
  >
    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-100 rounded-lg">
      <img
        src={product.productImage}
        alt={product.productName}
        className="h-full w-full object-cover object-center group-hover:opacity-75"
      />
    </div>
    <div className="mt-4 flex flex-col">
      <h3 className="text-sm text-gray-700">{product.category}</h3>
      <p className="text-base font-medium text-gray-900">
        {product.productName}
      </p>
      <p className="mt-1 text-sm font-medium text-gray-500">${product.price}</p>
    </div>
  </div>
);

export default ProductCard;
