import React from "react";

const CTABanner = () => {
  const watchImage = "/watch.png";

  return (
    <div className="w-full py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden h-72 sm:h-80 md:h-96 w-full bg-black rounded-[48px]">
          <div className="absolute right-0 top-0 bottom-0 w-full flex items-center justify-end overflow-hidden">
            <img
              src={watchImage}
              alt="Smart Watch"
              className="h-[150%] sm:h-[130%] w-auto object-contain"
              style={{
                transform: "translateX(20%) translateY(0)",
                right: "0",
                bottom: "0",
              }}
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>

          <div className="absolute left-0 top-0 bottom-0 w-full sm:w-1/2 flex flex-col justify-center text-white p-6 sm:p-10 md:p-16 z-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
              Apple Watch Series 8
            </h2>
            <p className="text-base sm:text-lg mb-6 opacity-80">
              Don't miss the last opportunity
            </p>

            <a
              href="/apple-watch-series-8"
              className="inline-block px-8 py-3 w-fit text-lg font-semibold rounded-full text-white transition-all duration-300 
                         bg-blue-600 hover:bg-blue-700 
                         shadow-[0_4px_15px_rgba(0,123,255,0.4)]"
            >
              SHOP NOW
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTABanner;
