import React, { useState, useEffect } from "react";
import { Trash2, Minus, Plus, ArrowRight, Tag, Loader2 } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../../api/env";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const navigate = useNavigate();

  const fetchCart = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${baseUrl}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data && response.data.products) {
        setCart(response.data);
        setCartItems(response.data.products);
      } else {
        setCart(null);
        setCartItems([]);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setCart(null);
        setCartItems([]);
      } else {
        toast.error("Failed to load cart");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeItem = async itemId => {
    const token = localStorage.getItem("accessToken");
    try {
      setActionLoading(true);
      const response = await axios.delete(`${baseUrl}/cart/item/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        toast.success("Item removed");
        fetchCart();
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to remove item");
    } finally {
      setActionLoading(false);
    }
  };

  const updateQuantity = async (itemId, currentQty, type) => {
    const token = localStorage.getItem("accessToken");
    const newQty = type === "inc" ? currentQty + 1 : currentQty - 1;

    if (newQty < 1) return;

    try {
      const response = await axios.put(
        `${baseUrl}/cart/item/${itemId}`,
        { quantity: newQty },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        fetchCart();
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to update quantity");
    }
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const discountRate = 0.2;
  const discountAmount = subtotal * discountRate;
  const deliveryFee = 15;
  const total = subtotal - discountAmount + deliveryFee;

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-black" />
      </div>
    );
  }

  if (!cart || cartItems.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-6">
          Looks like you haven't added anything yet.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 font-sans">
      <ToastContainer position="top-right" autoClose={2000} />
      <h1 className="text-4xl font-black uppercase mb-6 font-sans tracking-tight text-black">
        Your Cart
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-[60%] border border-gray-200 rounded-[20px] p-4 md:p-6 h-fit bg-white">
          {cartItems.map((item, index) => (
            <div key={item._id}>
              <div className="flex gap-4 md:gap-6 py-4">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-[#F0EEED] rounded-[10px] overflow-hidden flex-shrink-0 flex items-center justify-center">
                  {item.productImage ? (
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-full h-full object-contain mix-blend-multiply p-2"
                    />
                  ) : item.productId && item.productId.productImage ? (
                    <img
                      src={item.productId.productImage[0]}
                      alt={item.productId.productName}
                      className="w-full h-full object-contain mix-blend-multiply p-2"
                    />
                  ) : (
                    <span className="text-xs text-gray-400">No Image</span>
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg md:text-xl text-black mb-1">
                        {item.productName ||
                          (item.productId && item.productId.productName) ||
                          "Product"}
                      </h3>
                      <p className="text-sm text-black">
                        <span className="text-black">Size: </span>
                        <span className="text-gray-500">
                          {item.size || "N/A"}
                        </span>
                      </p>
                      <p className="text-sm text-black">
                        <span className="text-black">Color: </span>
                        <span
                          className="text-gray-500 inline-block w-3 h-3 rounded-full ml-1 border border-gray-300 align-middle"
                          style={{ backgroundColor: item.color }}
                          title={item.color}
                        ></span>
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item._id)}
                      disabled={actionLoading}
                      className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors disabled:opacity-50"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  <div className="flex justify-between items-end mt-2">
                    <span className="text-xl md:text-2xl font-bold text-black">
                      $
                      {item.price ||
                        (item.productId && item.productId.price) ||
                        0}
                    </span>

                    <div className="bg-[#F0F0F0] rounded-full flex items-center px-4 py-2 gap-4 md:gap-6">
                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.quantity, "dec")
                        }
                        className="text-black hover:text-gray-600 w-4 flex justify-center"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-medium text-sm text-black md:text-base w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.quantity, "inc")
                        }
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
                <span className="font-bold text-black">
                  ${cart.totalAmount || subtotal.toFixed(0)}
                </span>
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

            <button
              onClick={navigate("/thankyou")}
              className="w-full bg-black text-white py-4 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors group shadow-lg shadow-black/10"
            >
              Go to Checkout
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}