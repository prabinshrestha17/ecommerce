import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, UserRound, Search, Framer } from "lucide-react";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const TopBarLinks = [
    { name: "Sign In", path: "/signin" },
    { name: "Find a Store", path: "/stores" },
    { name: "Help", path: "/help" },
  ];

  const navItems = [
    { name: "Men", path: "/products/men" },
    { name: "Women", path: "/products/women" },
    { name: "Kids", path: "/products/kids" },
    { name: "Sales", path: "/products/sales" },
    { name: "Electronics", path: "/products/electronics" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header className="bg-white shadow-md">
      <div className="bg-gray-100 py-3 text-xs text-gray-600 border-b border-gray-200 overflow-x-auto">
        <div className="min-w-max mx-auto flex items-center justify-between px-6 whitespace-nowrap">
          <div className="flex items-center space-x-4">
            <a
              href="#"
              className="hover:text-gray-900 font-semibold transition duration-150 flex-none"
            >
              <span className="font-semibold mr-1">New Arrivals</span>
            </a>
            <a
              href="#"
              className="hover:text-gray-900 font-semibold transition duration-150 flex-none"
            >
              Today's Picks
            </a>
          </div>

          <div className="flex items-center space-x-6">
            {TopBarLinks.map(item => (
              <Link
                key={item.name}
                to={item.path}
                className="flex-none font-semibold hover:text-gray-900 transition duration-150 whitespace-nowrap"
              >
                | {item.name} |
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 shadow-sm transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto w-full px-6">
          <nav className="flex items-center justify-between py-3">
            <Link to={"/"} className="flex items-center justify-center gap-1">
              <Framer className="text-gray-600 hover:text-gray-900 transition-all duration-300" />
              <h2 className="text-black italic font-bold ">Shoop!</h2>
            </Link>

            <div className="flex items-center justify-center gap-8 text-md font-medium text-gray-700">
              {navItems.map((value, index) => (
                <Link
                  key={index}
                  to={value.path}
                  className="hover:text-gray-900 font-semibold transition duration-150 whitespace-nowrap"
                >
                  {value.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center justify-center gap-7 text-gray-700">
              <div className="relative">
                <input
                  type="text"
                  className="bg-gray-200 px-4 py-1.5 text-sm rounded-full outline-none border border-none pr-10"
                />
                <button className="absolute top-0 right-0 h-full bg-gray-300 hover:bg-gray-400 rounded-r-full px-2.5 transition-colors">
                  <Search className="h-5 w-5" />
                </button>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Link
                  to="/account"
                  className="hover:text-gray-900 p-2 hover:bg-gray-200 hover:rounded-full transition-all duration-300"
                >
                  <UserRound className="w-5 h-5" />
                </Link>
                <Link
                  to="/wishlist"
                  className="hover:text-gray-900 p-2 hover:bg-gray-200 hover:rounded-full transition-all duration-300"
                >
                  <Heart className="w-5 h-5" />
                </Link>
                <Link
                  to="/cart"
                  className="hover:text-gray-900 p-2 hover:bg-gray-200 hover:rounded-full transition-all duration-300"
                >
                  <ShoppingBag className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
