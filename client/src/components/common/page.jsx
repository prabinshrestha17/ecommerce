import React from "react";
import Hero from "./Hero";
import Products from "./Products";
import BrandsSection from "./BrandSection";
import ElectronicsCategories from "./ElectronicsCategories";
import CTABanner from "./CTABanner";
import NewArrivals from "./NewArrival";
import BrowseByStyle from "./BrowseStyle";
import HappyCustomers from "./Testimonials";
const Landing = () => {
  return (
    <div>
      <Hero />
      <Products />
      <BrandsSection />
      <ElectronicsCategories />
      <CTABanner />
      <NewArrivals />
      <BrowseByStyle />
      <HappyCustomers />
    </div>
  );
};

export default Landing;
