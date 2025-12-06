import React, { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../../../api/env";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${baseUrl}/auth/register`, formData);

      if (response.data.success) {
        toast.success("Verification mail sent! Please check your inbox.");

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-white">
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-24 order-2 lg:order-1">
        <div className="w-full max-w-[480px]">
          <h1 className="text-4xl md:text-5xl font-black uppercase text-black mb-3">
            Create Account
          </h1>
          <p className="text-gray-500 mb-10">
            Join us today and start your style journey.
          </p>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-black ml-1">
                Full Name
              </label>
              <div className="relative group">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full bg-[#F0F0F0] text-black placeholder-gray-400 rounded-full py-4 pl-14 pr-6 outline-none focus:ring-2 focus:ring-black/5 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-black ml-1">
                Email
              </label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full bg-[#F0F0F0] text-black placeholder-gray-400 rounded-full py-4 pl-14 pr-6 outline-none focus:ring-2 focus:ring-black/5 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-black ml-1">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="w-full bg-[#F0F0F0] text-black placeholder-gray-400 rounded-full py-4 pl-14 pr-14 outline-none focus:ring-2 focus:ring-black/5 transition-all"
                  required
                  minLength="6"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p className="text-xs text-gray-500 ml-4">
                Must be at least 8 characters.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-4 rounded-full font-bold text-lg mt-4 hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-black/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Account"}
              {!loading && (
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              )}
            </button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">
                Or register with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 py-3 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-6 h-6"
              />
              <span className="font-medium text-black">Google</span>
            </button>
            <button className="flex items-center justify-center gap-3 py-3 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
              <img
                src="https://www.svgrepo.com/show/475647/apple-color.svg"
                alt="Apple"
                className="w-6 h-6"
              />
              <span className="font-medium text-black">Apple</span>
            </button>
          </div>

          <p className="text-center text-gray-500 mt-10">
            Already have an account?{" "}
            <Link to="/login" className="text-black font-bold hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex w-1/2 relative bg-[#F0F0F0] items-center justify-center overflow-hidden order-1 lg:order-2">
        <div className="absolute inset-0 bg-black/5 z-10" />
        <img
          src="https://cdn.pixabay.com/photo/2017/08/06/12/06/people-2591874_1280.jpg"
          alt="Signup Fashion"
          className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-1000"
        />
        <div className="absolute bottom-10 right-10 z-20 text-white p-8 backdrop-blur-md bg-black/30 rounded-[30px] max-w-md text-right">
          <h2 className="text-3xl font-black uppercase mb-2">Join The Club</h2>
          <p className="text-gray-200">
            Get early access to new drops, exclusive discounts, and personalized
            recommendations.
          </p>
        </div>
      </div>
    </div>
  );
}