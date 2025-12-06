import React, { useState, useEffect } from "react";
import { Trash2, Minus, Plus, ArrowRight, Tag } from "lucide-react";

export default function Cart() {
  const initialData = [
    {
      id: 1,
      name: "Gradient Graphic T-shirt",
      size: "Large",
      color: "White",
      price: 145,
      image:
        "https://cdn.pixabay.com/photo/2016/11/23/06/57/isolated-t-shirt-1852113_1280.png",
      quantity: 1,
    },
    {
      id: 2,
      name: "Checkered Shirt",
      size: "Medium",
      color: "Red",
      price: 180,
      image:
        "https://cdn.pixabay.com/photo/2013/11/14/12/38/shirt-210459_1280.jpg",
      quantity: 1,
    },
    {
      id: 3,
      name: "Skinny Fit Jeans",
      size: "Large",
      color: "Blue",
      price: 240,
      image:
        "https://cdn.pixabay.com/photo/2014/08/26/21/48/jeans-428613_1280.jpg",
      quantity: 1,
    },
  ];

  const [cartItems, setCartItems] = useState(initialData);

  // 2. Effect: Load data from LocalStorage on mount (Optional: if you want persistence)
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      // If you want to merge dummy data with local storage, logic goes here.
      // For now, if local storage exists, we use it, otherwise we use dummy data.
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // 3. Effect: Save to LocalStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Logic: Remove Item
  const removeItem = id => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Logic: Update Quantity
  const updateQuantity = (id, type) => {
    setCartItems(prev =>
      prev.map(item => {
        if (item.id === id) {
          const newQuantity =
            type === "inc" ? item.quantity + 1 : item.quantity - 1;
          // Ensure quantity never goes below 1
          return { ...item, quantity: Math.max(1, newQuantity) };
        }
        return item;
      })
    );
  };

  // Logic: Calculations
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const discountRate = 0.2; // 20%
  const discountAmount = subtotal * discountRate;
  const deliveryFee = 15;
  const total = subtotal - discountAmount + deliveryFee;

  // Render Empty State
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <button
          onClick={() => setCartItems(initialData)}
          className="text-blue-600 underline"
        >
          Reset Dummy Data
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1240px] mx-auto px-4 md:px-8 py-8 font-sans">
      <h1 className="text-4xl font-black uppercase mb-6 font-sans tracking-tight text-black">
        Your Cart
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column: Cart Items */}
        <div className="w-full lg:w-[60%] border border-gray-200 rounded-[20px] p-4 md:p-6 h-fit bg-white">
          {cartItems.map((item, index) => (
            <div key={`${item.id}-${index}`}>
              <div className="flex gap-4 md:gap-6 py-4">
                {/* Image */}
                <div className="w-24 h-24 md:w-32 md:h-32 bg-[#F0EEED] rounded-[10px] overflow-hidden flex-shrink-0 flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain mix-blend-multiply p-2"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg md:text-xl text-black mb-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-black">
                        <span className="text-black">Size: </span>
                        <span className="text-gray-500">{item.size}</span>
                      </p>
                      <p className="text-sm text-black">
                        <span className="text-black">Color: </span>
                        <span className="text-gray-500">{item.color}</span>
                      </p>
                    </div>
                    {/* Delete Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  <div className="flex justify-between items-end mt-2">
                    <span className="text-xl md:text-2xl font-bold text-black">
                      ${item.price}
                    </span>

                    {/* Quantity Controls */}
                    <div className="bg-[#F0F0F0] rounded-full flex items-center px-4 py-2 gap-4 md:gap-6">
                      <button
                        onClick={() => updateQuantity(item.id, "dec")}
                        className="text-black hover:text-gray-600 w-4 flex justify-center"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-medium text-sm text-black md:text-base w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, "inc")}
                        className="text-black hover:text-gray-600 w-4 flex justify-center"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {index !== cartItems.length - 1 && (
                <div className="border-b border-gray-200 my-2"></div>
              )}
            </div>
          ))}
        </div>

        <div className="w-full lg:w-[40%] h-fit">
          <div className="border border-gray-200 rounded-[20px] p-6 bg-white">
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-black">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-base md:text-lg text-gray-500">
                <span>Subtotal</span>
                <span className="font-bold text-black">${subtotal}</span>
              </div>
              <div className="flex justify-between text-base md:text-lg text-gray-500">
                <span>Discount (-20%)</span>
                <span className="font-bold text-red-500">
                  -${discountAmount.toFixed(0)}
                </span>
              </div>
              <div className="flex justify-between text-base md:text-lg text-gray-500">
                <span>Delivery Fee</span>
                <span className="font-bold text-black">${deliveryFee}</span>
              </div>

              <div className="border-b border-gray-200 my-2"></div>

              <div className="flex justify-between text-lg md:text-xl font-bold text-black">
                <span>Total</span>
                <span>${total.toFixed(0)}</span>
              </div>
            </div>

            {/* Promo Code */}
            <div className="flex gap-3 mb-6">
              <div className="relative flex-1">
                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Add promo code"
                  className="w-full bg-[#F0F0F0] rounded-full py-3 pl-12 pr-4 outline-none text-gray-600 placeholder-gray-400 focus:ring-1 focus:ring-gray-300 transition-all"
                />
              </div>
              <button className="bg-black text-white px-6 py-3 rounded-full font-medium text-sm md:text-base hover:opacity-90 transition-opacity">
                Apply
              </button>
            </div>

            {/* Checkout Button */}
            <button className="w-full bg-black text-white py-4 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors group shadow-lg shadow-black/10">
              Go to Checkout
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
