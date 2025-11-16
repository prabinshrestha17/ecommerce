import React, { useState } from "react";
import { Mail, ArrowUp, X } from "lucide-react";

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubscribe = e => {
    e.preventDefault();
    console.log("Submitting email:", email);
    setIsModalOpen(false);
    setEmail("");
  };

  const Modal = () => {
    if (!isModalOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
        <div
          className="absolute inset-0"
          onClick={() => setIsModalOpen(false)}
        ></div>

        <div
          className="relative bg-white p-8 rounded-lg shadow-2xl w-full max-w-sm z-10"
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-black transition-colors"
            aria-label="Close subscription form"
          >
            <X className="w-6 h-6" />
          </button>

          <h3 className="text-2xl font-bold mb-4 text-black">
            Subscribe to our listings
          </h3>
          <p className="text-gray-600 mb-6">
            Get the latest news and offers directly to your inbox.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              // FIX: Updated classNames to match the dark input field style from the video
              className="w-full px-4 py-3 border border-gray-700 bg-gray-800 text-white rounded-lg placeholder-gray-400 focus:border-white focus:ring-2 focus:ring-white transition-all"
            />

            <button
              type="submit"
              className="w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Subscribe Now
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <footer className="w-full bg-[#FCFBF8] text-gray-800 pt-20 pb-4 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-start mb-24">
          <div className="max-w-md">
            <h2 className="text-4xl sm:text-5xl font-normal leading-tight text-black mb-6">
              Stay in the loop with our latest listings
            </h2>
            {/* <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center border border-gray-400 rounded-full w-48 sm:w-64 p-2 cursor-pointer transition-colors duration-200 hover:bg-gray-50 text-left"
              aria-label="Open subscription form"
            >
              <span className="ml-3 text-lg">Subscribe</span>
              <Mail className="w-5 h-5 ml-auto mr-2" />
            </button> */}
          </div>

          <button
            onClick={scrollToTop}
            className="text-sm font-medium transition-colors duration-200 hover:text-black flex items-center group"
            aria-label="Back to top of the page"
          >
            Back To Top
            <ArrowUp className="w-4 h-4 ml-1 transform group-hover:-translate-y-1 transition duration-300" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 pb-16 text-sm">
          <div className="col-span-1">
            <p className="font-semibold mb-2 text-black">Paris</p>
            <p>T: (+33) 1 45 67 89 01</p>
            <p>23 Rue Saint-Honoré,</p>
            <p>75001 Paris, France</p>
          </div>

          <div className="col-span-1">
            <p className="font-semibold mb-2 text-black">Bordeaux</p>
            <p>T: (+33) 5 56 78 90 12</p>
            <p>15 Cours de l'Intendance,</p>
            <p>33000 Bordeaux, France</p>
          </div>

          <div className="hidden lg:block col-span-2"></div>

          <div className="col-span-1 text-right md:text-left">
            <p className="font-semibold mb-2 text-black">Products</p>
            <a href="/shop" className="block hover:underline">
              Shop
            </a>
            <a href="/news" className="block hover:underline">
              Latest News
            </a>
          </div>

          <div className="col-span-1 text-right">
            <p className="font-semibold mb-2 text-black">Instagram</p>
            <a href="/pinterest" className="block hover:underline">
              Pinterest
            </a>
            <a href="/youtube" className="block hover:underline">
              YouTube
            </a>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-300 text-xs">
          <p className="text-gray-600">
            All Rights Reserved - Copyright © 2025
          </p>
          <a href="/privacy" className="text-gray-600 hover:underline">
            Privacy Policy
          </a>
        </div>
      </div>

      <Modal />
    </footer>
  );
};

export default Footer;
