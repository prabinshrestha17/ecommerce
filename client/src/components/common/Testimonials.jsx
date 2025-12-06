import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const StarIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.0001 2.5L12.4456 7.21885L17.5953 8.03159L13.9179 11.6967L14.7262 16.8534L10.0001 14.475L5.27402 16.8534L6.08229 11.6967L2.40491 8.03159L7.55462 7.21885L10.0001 2.5Z"
      fill="#FFC633"
    />
  </svg>
);

const VerifiedIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="ml-2"
  >
    <circle cx="12" cy="12" r="10" fill="#01AB31" />
    <path
      d="M7.5 12L10.5 15L16.5 9"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowLeft = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 12H5M5 12L12 19M5 12L12 5"
      stroke="#6c757d"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowRight = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 12H19M19 12L12 5M19 12L12 19"
      stroke="#6c757d"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    rating: 5,
    text: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
  },
  {
    id: 2,
    name: "Alex K.",
    rating: 5,
    text: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
  },
  {
    id: 3,
    name: "James L.",
    rating: 5,
    text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
  },
  {
    id: 4,
    name: "Mooen",
    rating: 5,
    text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
  },
  {
    id: 5,
    name: "Emily R.",
    rating: 5,
    text: "The shipping was incredibly fast and the packaging was eco-friendly. I appreciate the attention to detail. The fit was perfect right out of the box!",
  },
];

export default function HappyCustomers() {
  const [swiperInstance, setSwiperInstance] = useState(null);

  return (
    <section className="w-full py-16 px-4 md:px-8 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 px-2">
          <h2 className="text-4xl md:text-5xl font-black uppercase text-black leading-none mb-6 md:mb-0">
            Our Happy Customers
          </h2>
          <div className="flex gap-8">
            <button
              onClick={() => swiperInstance?.slidePrev()}
              className="p-2 hover:opacity-70 bg-[#dee2e6] rounded-full  duration-300 transition-opacity"
              aria-label="Previous review"
            >
              <ArrowLeft />
            </button>
            <button
              onClick={() => swiperInstance?.slideNext()}
              className="p-2 hover:opacity-70 bg-[#dee2e6] rounded-full  duration-300 transition-opacity"
              aria-label="Next review"
            >
              <ArrowRight />
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <Swiper
            modules={[Navigation]}
            onSwiper={setSwiperInstance}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            className="!pb-10 !px-2"
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {testimonials.map(item => (
              <SwiperSlide key={item.id} className="h-auto">
                <div className="border border-gray-200 rounded-[20px] p-6 md:p-8 h-full flex flex-col justify-start bg-white hover:border-black/10 transition-colors">
                  <div className="flex gap-1 mb-4">
                    {[...Array(item.rating)].map((_, i) => (
                      <StarIcon key={i} />
                    ))}
                  </div>

                  <div className="flex items-center mb-3">
                    <span className="font-bold text-xl text-black">
                      {item.name}
                    </span>
                    <VerifiedIcon />
                  </div>

                  <p className="text-gray-600 text-[16px] leading-relaxed">
                    "{item.text}"
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
