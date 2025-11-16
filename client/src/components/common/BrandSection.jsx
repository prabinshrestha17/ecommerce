import React from "react";

const brands = [
  {
    name: "Headphone",
    image:
      "https://cdn.pixabay.com/photo/2017/08/06/02/49/headphones-2588056_1280.jpg",
    link: "/category/headphones",
  },
  {
    name: "Laptop",
    image:
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    link: "/category/laptops",
  },
  {
    name: "Smart Watch",
    image:
      "https://cdn.pixabay.com/photo/2018/03/19/15/54/clock-3240331_1280.jpg",
    link: "/category/smart-watches",
  },
  {
    name: "Cellphone",
    image:
      "https://cdn.pixabay.com/photo/2021/12/08/19/36/cellphone-6856566_1280.jpg",
    link: "/category/cellphones",
  },
  {
    name: "iPhone Charger",
    image:
      "https://cdn.pixabay.com/photo/2020/04/16/19/00/iphone-5051984_960_720.jpg",
    link: "/category/chargers",
  },
  {
    name: "Echo Dot",
    image:
      "https://cdn.pixabay.com/photo/2020/01/11/18/13/alexa-4758340_1280.jpg",
    link: "/category/speakers",
  },
];

// const backgroundImage = {
//   image:
//     "https://cdn.pixabay.com/photo/2024/02/26/14/13/energy-8598060_1280.jpg",
// };

const BrandsSection = () => {
  return (
    <div className="relative w-full py-20 overflow-hidden bg-gray-900 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: `url(https://cdn.pixabay.com/photo/2024/02/26/14/13/energy-8598060_1280.jpg)`,
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-white">
          Choose By Brands
        </h2>

        <div className="flex overflow-x-auto pb-4 gap-6 lg:grid lg:grid-cols-6 lg:gap-6">
          {brands.map((brand, index) => (
            <a
              key={index}
              href={brand.link}
              className={`
                flex-shrink-0 w-36 sm:w-40 lg:w-full aspect-[3/4] relative overflow-hidden rounded-xl 
                transition-all duration-300 transform hover:scale-[1.03] group
                ${
                  brand.highlight
                    ? "border-2 border-[#FFD700] shadow-[0_0_15px_rgba(255,215,0,0.5)]"
                    : "border-0"
                }
              `}
            >
              <img
                src={brand.image}
                alt={brand.name}
                className="w-full h-full object-cover object-center opacity-70 group-hover:opacity-100 transition duration-300"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

              <p className="absolute top-4 left-4 text-white text-lg font-semibold drop-shadow-lg">
                {brand.name}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandsSection;
