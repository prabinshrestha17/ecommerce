"use client";

import React, { useState, useMemo, useEffect } from "react";
import ProductsDescription from "./ProductsDescription";
import ProductCard from "./ProductCard";
import axios from "axios";
import { baseUrl } from "../../../api/env";
import { getUniqueCategories } from "./data";

const ProductsPage = () => {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("All Products");
  const [products, setProducts] = useState([]);
  const [selectedProductDetails, setSelectedProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get(`${baseUrl}/product/get-all`);
        setProducts(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching all products:", error);
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  const handleProductClick = async productId => {
    setSelectedProductId(productId);
    setSelectedProductDetails(null);
    setDetailsLoading(true);
    try {
      // HIT THE SPECIFIC API
      const response = await axios.get(
        `${baseUrl}/product/get-specific/${productId}`
      );
      setSelectedProductDetails(response.data.data);
      setDetailsLoading(false);
    } catch (error) {
      console.error("Error fetching specific product:", error);
      setDetailsLoading(false);
      // Fallback: If specific fetch fails, use the data from the all products list
      const fallbackProduct = products.find(p => p._id === productId);
      if (fallbackProduct) {
        setSelectedProductDetails(fallbackProduct);
      }
    }
  };

  const categories = useMemo(() => getUniqueCategories(products), [products]);

  const filteredProducts = useMemo(() => {
    if (categoryFilter === "All Products") {
      return products;
    }
    return products.filter(p => p.category === categoryFilter);
  }, [categoryFilter, products]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-xl font-medium">Loading Products...</p>
      </div>
    );
  }

  if (selectedProductId && (detailsLoading || selectedProductDetails)) {
    if (detailsLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white">
          <p className="text-xl font-medium">Loading Product Details...</p>
        </div>
      );
    }

    return (
      <ProductsDescription
        product={selectedProductDetails}
        onBack={() => {
          setSelectedProductId(null);
          setSelectedProductDetails(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-6">
          Shop Our Collection
        </h1>

        <div className="lg:grid lg:grid-cols-4 lg:gap-x-8">
          <div className="lg:col-span-1 border-r pr-8 hidden lg:block">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Filters</h2>

            <div className="py-4 border-b">
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Category
              </h3>
              <ul className="space-y-2">
                {categories.map(category => (
                  <li key={category}>
                    <button
                      onClick={() => setCategoryFilter(category)}
                      className={`text-sm ${
                        categoryFilter === category
                          ? "font-bold text-black border-b border-black"
                          : "text-gray-600 hover:text-black"
                      }`}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="py-4 border-b">
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Size (Available)
              </h3>
              <div className="flex flex-wrap gap-2">
                {[...new Set(products.map(p => p.size))]
                  .slice(0, 5)
                  .map(size => (
                    <span
                      key={size}
                      className="px-3 py-1 text-xs border rounded-full bg-gray-50 text-gray-600"
                    >
                      {size.toUpperCase()}
                    </span>
                  ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-gray-600">
                Showing {filteredProducts.length} result
                {filteredProducts.length !== 1 ? "s" : ""} for "{categoryFilter}
                "
              </p>
              <select className="border border-gray-300 rounded-md p-2 text-sm">
                <option>Sort By: Newest</option>
                <option>Sort By: Price: Low-High</option>
                <option>Sort By: Price: High-Low</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:gap-x-8">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onClick={handleProductClick}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
