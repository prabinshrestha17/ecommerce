import React from "react";

const categories = [
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

const ElectronicsCategories = () => {
  return (
    <div className="w-full py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-10 text-gray-900 tracking-tight">
          Shop Our Top Electronics Category
        </h2>

        <div className="flex overflow-x-auto pb-4 gap-4 lg:grid lg:grid-cols-6 lg:gap-6">
          {categories.map((category, index) => (
            <a
              key={index}
              href={category.link}
              className="flex-shrink-0 w-40 sm:w-48 lg:w-auto aspect-[3/4] relative overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:scale-[1.02] group"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover object-center brightness-90 group-hover:brightness-100 transition duration-300"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

              <p className="absolute top-4 left-4 text-white text-lg font-semibold drop-shadow-md">
                {category.name}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ElectronicsCategories;
