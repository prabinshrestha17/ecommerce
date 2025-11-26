// data.js

export const getUniqueCategories = products => {
  if (!Array.isArray(products) || products.length === 0) {
    return ["All Products"];
  }
  const categories = products.map(p => p.category);
  return ["All Products", ...new Set(categories)];
};
