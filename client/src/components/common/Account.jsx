import React, { useState, useEffect } from "react";
import {
  User,
  Package,
  Settings,
  LogOut,
  Camera,
  MapPin,
  Phone,
  Mail,
  Edit2,
  Check,
  X,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { baseUrl } from "../../../api/env";

export default function Account() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    avatar:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get(`${baseUrl}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        const user = response.data.user;
        setUserData({
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || "",
          address: user.address || "",
          avatar:
            user.avatar ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        });
      }
    } catch (error) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const orders = [
    {
      id: "#ORD-7721",
      date: "Oct 12, 2023",
      status: "Delivered",
      total: 245.0,
      items: 3,
      image:
        "https://cdn.pixabay.com/photo/2016/11/23/06/57/isolated-t-shirt-1852113_1280.png",
    },
    {
      id: "#ORD-7720",
      date: "Sep 28, 2023",
      status: "Processing",
      total: 120.5,
      items: 1,
      image:
        "https://cdn.pixabay.com/photo/2013/11/14/12/38/shirt-210459_1280.jpg",
    },
    {
      id: "#ORD-7699",
      date: "Aug 15, 2023",
      status: "Cancelled",
      total: 55.0,
      items: 1,
      image:
        "https://cdn.pixabay.com/photo/2014/08/26/21/48/jeans-428613_1280.jpg",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    toast.info("Logged out successfully");
    setTimeout(() => navigate("/login"), 1000);
  };

  const handleSaveProfile = async e => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");

    try {
      await axios.put(`${baseUrl}/auth/profile`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const handlePasswordChange = async e => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    const token = localStorage.getItem("accessToken");

    try {
      const response = await axios.put(
        `${baseUrl}/auth/change-password`,
        {
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Password changed successfully! Please login again.");

        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });

        setTimeout(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("user");
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to change password");
    }
  };

  const handlePasswordInputChange = e => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputChange = e => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const getStatusColor = status => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-600";
      case "Processing":
        return "bg-yellow-100 text-yellow-600";
      case "Cancelled":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-black uppercase mb-8 text-black">
          My Account
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200">
                  <img
                    src={userData.avatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-black">{userData.name}</h3>
                  <p className="text-xs text-gray-500">{userData.email}</p>
                </div>
              </div>

              <nav className="flex flex-col gap-2">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                    activeTab === "profile"
                      ? "bg-black text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <User className="w-5 h-5" />
                  Profile Details
                </button>
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                    activeTab === "orders"
                      ? "bg-black text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Package className="w-5 h-5" />
                  My Orders
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                    activeTab === "settings"
                      ? "bg-black text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  Account Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-red-500 hover:bg-red-50 mt-4"
                >
                  <LogOut className="w-5 h-5" />
                  Log Out
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="w-full lg:w-3/4">
            {activeTab === "profile" && (
              <div className="bg-white rounded-[20px] p-6 md:p-8 shadow-sm border border-gray-100 animate-in fade-in duration-300">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold">Personal Information</h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2 text-sm text-black font-medium bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition-colors"
                  >
                    {isEditing ? (
                      <>
                        <X className="w-4 h-4" /> Cancel
                      </>
                    ) : (
                      <>
                        <Edit2 className="w-4 h-4" /> Edit Profile
                      </>
                    )}
                  </button>
                </div>

                <form onSubmit={handleSaveProfile}>
                  <div className="flex flex-col items-center mb-8">
                    <div className="relative group cursor-pointer">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-100">
                        <img
                          src={userData.avatar}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {isEditing && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                          <Camera className="w-8 h-8 text-white" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-500">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          name="name"
                          value={userData.name}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-black/5 disabled:text-gray-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-500">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="email"
                          name="email"
                          value={userData.email}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-black/5 disabled:text-gray-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-500">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          name="phone"
                          value={userData.phone}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-black/5 disabled:text-gray-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-500">
                        Delivery Address
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          name="address"
                          value={userData.address}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-black/5 disabled:text-gray-500"
                        />
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="mt-8 flex justify-end">
                      <button
                        type="submit"
                        className="bg-black text-white px-8 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-gray-800 transition-colors"
                      >
                        <Check className="w-4 h-4" /> Save Changes
                      </button>
                    </div>
                  )}
                </form>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="bg-white rounded-[20px] p-6 md:p-8 shadow-sm border border-gray-100 animate-in fade-in duration-300">
                <h2 className="text-2xl font-bold mb-6">Order History</h2>
                <div className="space-y-4">
                  {orders.map(order => (
                    <div
                      key={order.id}
                      className="border border-gray-100 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-4 w-full md:w-auto mb-4 md:mb-0">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={order.image}
                            alt="Product"
                            className="w-full h-full object-contain mix-blend-multiply"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-black">{order.id}</h4>
                          <p className="text-sm text-gray-500">
                            {order.date} • {order.items} Items
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between w-full md:w-auto gap-6">
                        <span className="font-bold text-black">
                          ${order.total.toFixed(2)}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                        <button className="text-gray-400 hover:text-black">
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="bg-white rounded-[20px] p-6 md:p-8 shadow-sm border border-gray-100 animate-in fade-in duration-300">
                <h2 className="text-2xl font-bold mb-6">Change Password</h2>
                <form onSubmit={handlePasswordChange}>
                  <div className="space-y-6 max-w-lg">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Current Password
                      </label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={passwordForm.currentPassword}
                        onChange={handlePasswordInputChange}
                        placeholder="••••••••"
                        className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-black/5"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        New Password
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        value={passwordForm.newPassword}
                        onChange={handlePasswordInputChange}
                        placeholder="••••••••"
                        className="w-full px-4 py-3 bg-gray-50 rounded-xl text-black outline-none focus:ring-2 focus:ring-black/5"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={passwordForm.confirmPassword}
                        onChange={handlePasswordInputChange}
                        placeholder="••••••••"
                        className="w-full px-4 py-3 bg-gray-50 text-black rounded-xl outline-none focus:ring-2 focus:ring-black/5"
                        required
                      />
                    </div>
                    <div className="pt-4">
                      <button
                        type="submit"
                        className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors w-full md:w-auto"
                      >
                        Update Password
                      </button>
                    </div>
                  </div>
                </form>
                <div className="mt-12 pt-8 border-t bg-red-100 p-3 border border-red-200  rounded-md ">
                  <h3 className="text-red-500 font-bold mb-2">Danger Zone</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Once you delete your account, there is no going back.
                  </p>
                  <button className="border border-red-200 text-red-50 bg-red-500 px-6 py-2 rounded-full text-sm font-medium hover:bg-red-600 transition-colors">
                    Delete Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
