import React from "react";

import { ArrowLeft, Home, Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white px-4 py-16 md:py-24">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
          <div className="space-y-4">
            <h1 className="text-8xl md:text-9xl font-black text-black tracking-tighter">
              404
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 uppercase tracking-wide">
              Oops! This rack is empty.
            </h2>
            <p className="text-gray-500 text-lg max-w-md mx-auto lg:mx-0 leading-relaxed">
              We tried on every URL, but this one doesn't fit. The page you are
              looking for has been moved, removed, or possibly never existed in
              our collection.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              to={"/"}
              className="group flex items-center justify-center gap-2 bg-black text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:bg-gray-800 hover:scale-105 active:scale-95"
            >
              <Home className="w-5 h-5" />
              Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="group flex items-center justify-center gap-2 bg-white text-black border border-gray-200 px-8 py-4 rounded-full font-medium transition-all duration-300 hover:border-black hover:bg-gray-50 active:scale-95"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Go Back
            </button>
          </div>

          <div className="w-full max-w-md mt-8">
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Or search our store
            </p>
            <div className="relative group">
              <input
                type="text"
                placeholder="Search for clothes, shoes, accessories..."
                className="w-full bg-[#F0F0F0] text-black rounded-full py-4 pl-6 pr-14 outline-none focus:ring-2 focus:ring-black/5 transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-sm hover:scale-110 transition-transform cursor-pointer">
                <Search className="w-5 h-5 text-black" />
              </button>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2 relative w-full aspect-square md:aspect-[4/3] lg:aspect-square rounded-[30px] overflow-hidden bg-[#F0F0F0]">
          <img
            src="https://cdn.pixabay.com/photo/2016/11/22/19/08/hangers-1850082_1280.jpg"
            alt="Empty clothes hangers representing 404 Not Found"
            fill
            className="object-cover hover:scale-110 transition-transform duration-1000 ease-in-out"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
