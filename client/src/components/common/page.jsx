import React from "react";
import Hero from "./Hero";
import Products from "./Products";
import BrandsSection from "./BrandSection";
import ElectronicsCategories from "./ElectronicsCategories";
import CTABanner from "./CTABanner";
const Landing = () => {
  return (
    <div>
      <Hero />
      <Products />
      <BrandsSection />
      <ElectronicsCategories />
      <CTABanner />
    </div>
  );
};

export default Landing;
