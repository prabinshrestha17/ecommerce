import React from "react";
import { ArrowRight } from "lucide-react";

const Products = () => {
  const imageAssets = {
    topRight: "/fashion.jpg",
    bottomLeft: "/jeans.jpg",
  };

  const DEFINITION_BOX_COLOR = "bg-[#CDE8E3]";
  const BRAND_BOX_GRADIENT = "bg-gradient-to-br from-[#E8F8D6] to-[#D9F5C5]";

  return (
    <div className="w-full min-h-[90vh] bg-white pt-16 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        <div className="flex flex-col justify-start lg:justify-center lg:pr-12">
          <p className="text-sm font-sans font-medium tracking-wider text-gray-800 mb-2">
            COLLECTION SPOTLIGHT
          </p>
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-sans font-normal leading-none tracking-tight mb-8 text-black">
            The New Drop <br className="hidden sm:block" /> Has Arrived
          </h1>

          <a
            href="/new-arrivals"
            className="inline-flex items-center gap-2 bg-black text-white text-lg font-medium rounded-full px-7 py-3 transition-all duration-300 w-fit hover:bg-gray-800 hover:scale-105 group"
          >
            SHOP NOW
            <ArrowRight
              size={20}
              className="w-5 h-5 opacity-0 transition-all duration-200 transform -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
            />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-4 aspect-square max-w-lg mx-auto lg:max-w-full">
          <div className="w-full h-full rounded-tl-[36px] overflow-hidden col-span-1 row-span-1">
            <img
              src={imageAssets.topRight}
              alt="Fashion product"
              className="w-full h-full object-cover"
            />
          </div>

          <div
            className={`p-6 md:p-8 w-full rounded-tr-[36px] h-full ${DEFINITION_BOX_COLOR} flex flex-col justify-center relative col-span-1 row-span-1 text-gray-900`}
          >
            <h3 className="text-xl font-medium mb-4">DEFINE YOUR STYLE</h3>
            <p className="text-base">
              Explore our curated selection of essential garments that embody
              modern elegance and comfort.
            </p>
            <div className="absolute top-6 right-6 flex items-center justify-center">
              <div className="w-10 h-10 border-2 border-[#A8DB4D] rounded-full absolute"></div>
              <div className="w-4 h-4 border-2 border-[#A8DB4D] rounded-full absolute translate-x-3 -translate-y-3 opacity-60"></div>
            </div>
          </div>

          <div className="w-full h-full overflow-hidden rounded-bl-[36px] col-span-1 row-span-1">
            <img
              src={imageAssets.bottomLeft}
              alt="Jeans product"
              className="w-full h-full object-cover"
            />
          </div>

          <div
            className={`p-6 md:p-8 w-full h-full ${BRAND_BOX_GRADIENT} rounded-br-[36px] flex flex-col justify-end items-center col-span-1 row-span-1`}
          >
            <h2 className="text-5xl md:text-6xl font-serif font-bold tracking-widest text-gray-900">
              TRENDS
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
