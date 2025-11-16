import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "/hero1.jpg",
    title: "NEW YEAR, NEW GOALS.",
    subtitle: "Elevate your performance with our latest running gear.",
    cta: "SHOP RUNNING",
    href: "/running-collection",
    textColor: "text-white",
    textPosition: "bottom-20 left-10 md:left-20",
  },
  {
    image: "/hero2.jpg",
    title: "THE ICON IS REIMAGINED.",
    subtitle: "Experience the perfect blend of comfort and style.",
    cta: "EXPLORE SNEAKERS",
    href: "/sneaker-collection",
    textColor: "text-white",
    textPosition: "bottom-20 left-10 md:left-20",
  },
  {
    image: "/hero3.jpg",
    title: "TRAIN WITHOUT LIMITS.",
    subtitle: "The pro gear for your toughest workouts is here.",
    cta: "SHOP TRAINING",
    href: "/training-collection",
    textColor: "text-white",
    textPosition: "bottom-20 left-10 md:left-20",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToNext = () => {
    setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length);
  };

  const goToPrev = () => {
    setCurrentSlide(
      prevSlide => (prevSlide - 1 + slides.length) % slides.length
    );
  };

  return (
    <div className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden bg-black">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`
            absolute inset-0 w-full h-full 
            transition-opacity duration-1000 ease-in-out 
            ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"}
          `}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center"
            loading="eager"
          />

          <div className={`absolute ${slide.textPosition} p-4 md:p-8 z-20`}>
            <h1
              className={`text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter mb-4 ${slide.textColor} drop-shadow-lg`}
            >
              {slide.title}
            </h1>
            <p
              className={`text-lg md:text-2xl font-medium mb-6 ${slide.textColor} drop-shadow-md`}
            >
              {slide.subtitle}
            </p>
            <a
              href={slide.href}
              className="inline-block px-8 py-3 rounded-full  bg-white text-black text-lg font-bold uppercase transition-all duration-300 hover:bg-gray-200 shadow-xl"
            >
              {slide.cta}
            </a>
          </div>
        </div>
      ))}

      <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between z-30 px-4 md:px-8">
        <button
          onClick={goToPrev}
          className="p-3 md:p-4 bg-gray-900/40 text-white rounded-full transition-colors duration-300 hover:bg-gray-900/70"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <button
          onClick={goToNext}
          className="p-3 md:p-4 bg-gray-900/40 text-white rounded-full transition-colors duration-300 hover:bg-gray-900/70"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white w-8" : "bg-gray-400 opacity-70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Hero;
