import React, { useState } from "react";
import { ArrowLeft, ShoppingBag } from "lucide-react";

const ProductsDescription = ({ product, onBack }) => {
  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <div className="p-8 text-center text-gray-500">
          Product not found or not selected.
        </div>
      </div>
    );
  }

  // Use the size from the product data as the default
  const [selectedSize, setSelectedSize] = useState(product.size);
  const availableSizes = ["S", "M", "L", "XL", "XXL"];

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pt-8">
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={16} />
            <span>Back to Products</span>
          </button>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12">
          <div className="lg:pr-10">
            <div className="aspect-h-1 aspect-w-1 overflow-hidden bg-gray-100 h-[600px] w-full">
              <img
                src={product.productImage}
                alt={product.productName}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          <div className="mt-8 lg:mt-0 lg:pl-10">
            <h1 className="text-base font-medium text-gray-900">
              {product.category}
            </h1>
            <h2 className="text-5xl font-extrabold tracking-tight text-gray-900 mt-1">
              {product.productName}
            </h2>
            <p className="mt-2 text-xl text-gray-800 font-medium">
              ${product.price}
            </p>

            <div className="mt-8">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">
                  Select Size (Current: {product.size.toUpperCase()})
                </h3>
                <a
                  href="#"
                  className="text-sm font-medium text-gray-500 hover:text-gray-900"
                >
                  Size Guide
                </a>
              </div>

              <div className="mt-4 grid grid-cols-5 gap-3 sm:grid-cols-6 lg:grid-cols-5">
                {availableSizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`group relative text-black flex items-center justify-center h-14 w-full text-sm font-medium uppercase border-2 focus:outline-none transition-colors ${
                      size.toLowerCase() === selectedSize.toLowerCase()
                        ? "border-black bg-white ring-2 ring-offset-1 ring-black"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() =>
                alert(
                  `Added ${
                    product.productName
                  } (${selectedSize.toUpperCase()}) to bag!`
                )
              }
              className={`mt-6 flex w-full items-center justify-center space-x-2 rounded-full border border-transparent px-8 py-4 text-base font-medium text-white shadow-sm transition-colors bg-black hover:bg-gray-800`}
            >
              <ShoppingBag size={20} />
              <span>Add to Bag</span>
            </button>

            <div className="mt-10">
              <h3 className="text-base font-bold text-gray-900">
                Product Description
              </h3>
              <div className="mt-3 space-y-6">
                <p className="text-base text-gray-600 leading-relaxed">
                  {product.productDescription}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-base font-bold text-gray-900">
                Product Details
              </h3>
              <div className="mt-3 text-sm text-gray-600">
                <ul className="list-disc space-y-1 pl-4">
                  {product.productDetails.map((detail, index) => (
                    <li key={detail._id || index}>
                      <span className="font-semibold">{detail.title}: </span>
                      {detail.description}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsDescription;
