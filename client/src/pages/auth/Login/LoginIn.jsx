import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex w-full bg-white">
      <div className="hidden lg:flex w-1/2 relative bg-[#F0F0F0] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/5 z-10" />
        <img
          src="https://cdn.pixabay.com/photo/2016/11/19/15/32/laptop-1839876_1280.jpg"
          alt="Login Fashion"
          className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-1000"
        />
        <div className="absolute bottom-10 left-10 z-20 text-white p-8 backdrop-blur-md bg-black/30 rounded-[30px] max-w-md">
          <h2 className="text-3xl font-black uppercase mb-2">Welcome Back</h2>
          <p className="text-gray-200">
            Sign in to access your personalized shopping experience and
            exclusive offers.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-24">
        <div className="w-full max-w-[480px]">
          <h1 className="text-4xl md:text-5xl font-black uppercase text-black mb-3">
            Login
          </h1>
          <p className="text-gray-500 mb-10">
            Welcome back! Please enter your details.
          </p>

          <form className="flex flex-col gap-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-black ml-1">
                Email
              </label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors w-5 h-5" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-[#F0F0F0] text-black placeholder-gray-400 rounded-full py-4 pl-14 pr-6 outline-none focus:ring-2 focus:ring-black/5 transition-all"
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
                  placeholder="••••••••"
                  className="w-full bg-[#F0F0F0] text-black placeholder-gray-400 rounded-full py-4 pl-14 pr-14 outline-none focus:ring-2 focus:ring-black/5 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
                />
                <span className="text-gray-600">Remember me</span>
              </label>
              <a href="#" className="font-medium text-black hover:underline">
                Forgot password?
              </a>
            </div>

            <button className="w-full bg-black text-white py-4 rounded-full font-bold text-lg mt-4 hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-black/20">
              Sign In
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">
                Or continue with
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
            Don't have an account?{" "}
            <Link to="/signup" className="text-black font-bold hover:underline">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
