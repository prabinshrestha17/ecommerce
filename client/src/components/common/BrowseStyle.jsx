import React from "react";

const styleCategories = [
  {
    id: 1,
    title: "Casual",
    image: "/casual.png",
    className:
      "md:col-span-1 bg-white relative h-[289px] rounded-[20px] overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300",
  },
  {
    id: 2,
    title: "Formal",
    image: "/formal.png",
    className:
      "md:col-span-2 bg-white relative h-[289px] rounded-[20px] overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300",
  },
  {
    id: 3,
    title: "Party",
    image: "/party.png",
    className:
      "md:col-span-2 bg-white relative h-[289px] rounded-[20px] overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300",
  },
  {
    id: 4,
    title: "Gym",
    image: "/gym.png",
    className:
      "md:col-span-1 bg-white relative h-[289px] rounded-[20px] overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300",
  },
];

export default function BrowseByStyle() {
  return (
    <section className="w-full px-4 md:px-8 pb-16 bg-white">
      <div className="max-w-[1240px] mx-auto bg-[#F0F0F0] rounded-[40px] p-6 md:p-16">
        <h2 className="text-3xl md:text-5xl font-black text-center mb-10 md:mb-16 uppercase text-black">
          Browse by dress style
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {styleCategories.map(category => (
            <div key={category.id} className={category.className}>
              <h3 className="absolute top-6 left-6 z-10 text-2xl md:text-3xl font-bold text-black">
                {category.title}
              </h3>
              <div className="relative w-full h-full group">
                <img
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover object-top group-hover:scale-110 transition-transform duration-500 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
