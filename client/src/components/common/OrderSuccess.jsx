import React, { useEffect, useState } from "react";
import {
  Check,
  ArrowRight,
  ShoppingBag,
  Package,
  FileText,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function OrderSuccess() {
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    // Generate a random order ID for display
    const randomId = Math.floor(100000 + Math.random() * 900000);
    setOrderId(`#ORD-${randomId}`);

    // Optional: Clear cart state here if using global state management
  }, []);

  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center bg-white px-4 py-10">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8 flex justify-center">
          <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
            <div className="h-16 w-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-200">
              <Check className="h-10 w-10 text-white stroke-[3]" />
            </div>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-black mb-4">
          Thank You!
        </h1>

        <p className="text-gray-500 text-lg mb-8 max-w-sm mx-auto">
          Your order has been placed successfully. We have sent a confirmation
          email to your inbox.
        </p>

        <div className="bg-[#F0F0F0] rounded-[20px] p-6 mb-8 text-left">
          <h3 className="text-gray-500 text-sm uppercase font-bold tracking-wider mb-4">
            Order Details
          </h3>

          <div className="flex justify-between items-center mb-3 border-b border-gray-200 pb-3">
            <span className="text-gray-600">Order Number</span>
            <span className="font-bold text-black">{orderId}</span>
          </div>

          <div className="flex justify-between items-center mb-3 border-b border-gray-200 pb-3">
            <span className="text-gray-600">Date</span>
            <span className="font-bold text-black">
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Payment Method</span>
            <span className="font-bold text-black">Credit Card</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/account")}
            className="w-full bg-black text-white py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all shadow-lg shadow-black/20 group"
          >
            View Order Status
            <Package className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full bg-white text-black border border-gray-200 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-all"
          >
            Continue Shopping
            <ShoppingBag className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-100">
          <p className="text-sm text-gray-400">
            Need help?{" "}
            <Link to="/help" className="text-black underline font-medium">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
