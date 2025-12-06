import React, { useState } from "react";

const StarIcon = ({ filled, half }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={filled ? "#FFC633" : "transparent"}
    stroke={filled ? "#FFC633" : "transparent"}
    className="w-4 h-4 mr-1"
  >
    <path
      fillRule="evenodd"
      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
      clipRule="evenodd"
    />
    {half && (
      <defs>
        <linearGradient id="half">
          <stop offset="50%" stopColor="#FFC633" />
          <stop offset="50%" stopColor="#e5e7eb" />
        </linearGradient>
      </defs>
    )}
  </svg>
);

const renderStars = rating => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<StarIcon key={i} filled={true} />);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(
        <div key={i} className="relative">
          <StarIcon filled={false} />
          <div className="absolute top-0 left-0 overflow-hidden w-1/2">
            <StarIcon filled={true} />
          </div>
        </div>
      );
    } else {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="none"
          className="w-4 h-4 mr-1 text-gray-300"
        >
          <path
            fill="#e5e7eb"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          />
        </svg>
      );
    }
  }
  return stars;
};

export default function NewArrivals() {
  const [showAll, setShowAll] = useState(false);

  const products = [
    {
      id: 1,
      name: "T-shirt with Tape Details",
      image:
        "https://cdn.pixabay.com/photo/2016/12/06/09/31/blank-1886008_1280.png",
      rating: 4.5,
      price: 120,
      oldPrice: null,
      discount: null,
    },
    {
      id: 2,
      name: "Skinny Fit Jeans",
      image:
        "https://cdn.pixabay.com/photo/2014/08/26/21/48/jeans-428613_1280.jpg",
      rating: 3.5,
      price: 240,
      oldPrice: 260,
      discount: "-20%",
    },
    {
      id: 3,
      name: "Checkered Shirt",
      image:
        "https://cdn.pixabay.com/photo/2013/11/14/12/38/shirt-210459_1280.jpg",
      rating: 4.5,
      price: 180,
      oldPrice: null,
      discount: null,
    },
    {
      id: 4,
      name: "Sleeve Striped T-shirt",
      image:
        "https://cdn.pixabay.com/photo/2016/11/23/06/57/isolated-t-shirt-1852114_1280.png",
      rating: 4.5,
      price: 130,
      oldPrice: 160,
      discount: "-30%",
    },
    {
      id: 5,
      name: "Casual Denim Jacket",
      image:
        "https://cdn.pixabay.com/photo/2016/06/29/08/42/wedding-dress-1486004_1280.jpg",
      rating: 4.0,
      price: 210,
      oldPrice: null,
      discount: null,
    },
    {
      id: 6,
      name: "Black Cargo Pants",
      image:
        "https://cdn.pixabay.com/photo/2016/03/27/19/31/fashion-1283863_1280.jpg",
      rating: 4.5,
      price: 150,
      oldPrice: 200,
      discount: "-25%",
    },
    {
      id: 7,
      name: "Polo T-Shirt",
      image:
        "https://cdn.pixabay.com/photo/2016/04/19/13/39/polo-shirt-1338714_1280.jpg",
      rating: 5.0,
      price: 95,
      oldPrice: null,
      discount: null,
    },
    {
      id: 8,
      name: "Comfort Hoodie",
      image:
        "https://cdn.pixabay.com/photo/2021/03/03/08/56/woman-6064819_1280.jpg",
      rating: 4.5,
      price: 180,
      oldPrice: 220,
      discount: "-15%",
    },
  ];

  const displayedProducts = showAll ? products : products.slice(0, 4);

  return (
    <section className="w-full py-16 px-4 md:px-8 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-12 uppercase tracking-tighter text-black">
          New Arrivals
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {displayedProducts.map(product => (
            <div
              key={product.id}
              className="group cursor-pointer flex flex-col"
            >
              <div className="bg-[#F0EEED] rounded-[20px] aspect-square relative overflow-hidden mb-4 transition-all duration-300 hover:shadow-md">
                <img
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-4 group-hover:scale-110 transition-transform duration-500 ease-in-out mix-blend-multiply"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>

              <h3 className="font-bold text-lg md:text-xl text-black truncate mb-1">
                {product.name}
              </h3>

              <div className="flex items-center mb-2">
                <div className="flex">{renderStars(product.rating)}</div>
                <span className="text-sm text-gray-600 ml-2 font-medium">
                  {product.rating}/5
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-black">
                  ${product.price}
                </span>
                {product.oldPrice && (
                  <>
                    <span className="text-2xl font-bold text-gray-400 line-through">
                      ${product.oldPrice}
                    </span>
                    <span className="bg-red-100 text-red-500 text-xs font-medium px-3 py-1 rounded-full">
                      {product.discount}
                    </span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="border border-gray-200 px-16 py-3 rounded-full font-medium text-black hover:bg-black hover:text-white transition-colors duration-300 w-full sm:w-auto text-sm md:text-base"
          >
            {showAll ? "View Less" : "View All"}
          </button>
        </div>
      </div>
    </section>
  );
}
