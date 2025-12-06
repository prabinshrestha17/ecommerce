import React, { useState, useEffect } from "react";
import {
  Minus,
  Plus,
  Check,
  SlidersHorizontal,
  ChevronDown,
  MoreHorizontal,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../../api/env";

const StarIcon = ({ filled, half }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={filled ? "#FFC633" : "transparent"}
    stroke={filled ? "#FFC633" : "transparent"}
    className="w-5 h-5"
  >
    <path
      fillRule="evenodd"
      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
      clipRule="evenodd"
    />
    {half && (
      <defs>
        <linearGradient id="half">
          <stop offset="50%" stopColor="#FFC633" />
          <stop offset="50%" stopColor="#e5e7eb" />
        </linearGradient>
      </defs>
    )}
  </svg>
);

const renderStars = rating => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<StarIcon key={i} filled={true} />);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(
        <div key={i} className="relative">
          <StarIcon filled={false} />
          <div className="absolute top-0 left-0 overflow-hidden w-1/2">
            <StarIcon filled={true} />
          </div>
        </div>
      );
    } else {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="none"
          className="w-5 h-5 text-gray-300"
        >
          <path
            fill="#e5e7eb"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          />
        </svg>
      );
    }
  }
  return stars;
};

const VerifiedBadge = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    className="ml-1 inline-block"
  >
    <circle cx="12" cy="12" r="10" fill="#01AB31" />
    <path
      d="M7.5 12L10.5 15L16.5 9"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const reviewsData = [
  {
    id: 1,
    name: "Samantha D.",
    rating: 5,
    date: "August 14, 2023",
    content:
      "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
  },
  {
    id: 2,
    name: "Alex M.",
    rating: 5,
    date: "August 15, 2023",
    content:
      "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
  },
  {
    id: 3,
    name: "Ethan R.",
    rating: 4.5,
    date: "August 16, 2023",
    content:
      "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
  },
  {
    id: 4,
    name: "Olivia P.",
    rating: 5,
    date: "August 17, 2023",
    content:
      "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
  },
];

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("reviews");

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/product/get-specific/${id}`
        );
        if (response.data.success) {
          const fetchedData = response.data.data;
          setProduct(fetchedData);

          if (fetchedData.colors && fetchedData.colors.length > 0) {
            setSelectedColor(fetchedData.colors[0]);
          }
          if (fetchedData.size && fetchedData.size.length > 0) {
            setSelectedSize(fetchedData.size[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  const handleQuantity = type => {
    if (type === "dec" && quantity > 1) setQuantity(quantity - 1);
    if (type === "inc") setQuantity(quantity + 1);
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      toast.error("Please login to add items to cart");
      setTimeout(() => navigate("/login"), 1500);
      return;
    }

    // Validation
    if (!selectedColor && product.colors?.length > 0) {
      toast.error("Please select a color");
      return;
    }
    if (!selectedSize && product.size?.length > 0) {
      toast.error("Please select a size");
      return;
    }

    try {
      const payload = {
        productId: product._id,
        quantity: quantity,
        color: selectedColor,
        size: selectedSize,
        price: product.priceAfterDiscount || product.price,
        productName: product.productName,
        productImage:
          product.productImage && product.productImage.length > 0
            ? product.productImage[selectedImage] // Send the selected image
            : "",
      };

      const response = await axios.post(`${baseUrl}/cart/add`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (
        response.data.success ||
        response.status === 200 ||
        response.status === 201
      ) {
        toast.success("Item added to cart successfully!");
        setTimeout(() => navigate("/mycart"), 1000);
      }
    } catch (error) {
      console.error(error);
      const errorMsg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to add to cart";
      toast.error(errorMsg);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white">
        <h2 className="text-2xl font-bold">Product not found</h2>
      </div>
    );
  }

  return (
    <div className="w-full bg-white min-h-screen pb-20">
      <ToastContainer position="top-right" autoClose={2000} theme="dark" />
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-8">
        <div className="flex flex-col lg:flex-row gap-10 mb-16">
          {/* Images Section */}
          <div className="w-full lg:w-1/2 flex flex-col-reverse lg:flex-row gap-4">
            <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible">
              {product.productImage &&
                product.productImage.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-24 h-24 lg:w-36 lg:h-40 bg-[#F0EEED] rounded-[20px] overflow-hidden flex-shrink-0 border-2 transition-all ${
                      selectedImage === idx
                        ? "border-black"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={img}
                      alt="Thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
            </div>

            <div className="relative w-full aspect-square bg-[#F0EEED] rounded-[20px] overflow-hidden">
              {product.productImage && product.productImage[selectedImage] ? (
                <img
                  src={product.productImage[selectedImage]}
                  alt="Main Product"
                  className="w-full h-full object-contain p-2 mix-blend-multiply hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <h1 className="text-4xl font-black uppercase tracking-tighter text-black">
              {product.productName}
            </h1>

            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {renderStars(product.rating || 0)}
              </div>
              <span className="text-gray-600 text-sm">
                {product.rating || 0}/5
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-black">
                ${product.priceAfterDiscount || product.price}
              </span>
              {product.discount && (
                <>
                  <span className="text-3xl font-bold text-gray-300 line-through">
                    ${product.price}
                  </span>
                  <span className="bg-red-100 text-red-500 px-3 py-1 rounded-full text-sm font-medium">
                    {product.discount}
                  </span>
                </>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed text-base border-b border-gray-200 pb-6">
              {product.description}
            </p>

            <div>
              <p className="text-gray-500 text-sm mb-3">Select Colors</p>
              <div className="flex flex-wrap gap-4">
                {product.colors &&
                  product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform active:scale-95 border shadow-sm ${
                        selectedColor === color
                          ? "border-black ring-1 ring-black"
                          : "border-gray-200"
                      }`}
                      style={{ backgroundColor: color }}
                      title={color}
                    >
                      {selectedColor === color && (
                        <Check
                          className={`w-4 h-4 ${
                            color.toLowerCase() === "white" ||
                            color === "#ffffff"
                              ? "text-black"
                              : "text-white"
                          }`}
                        />
                      )}
                    </button>
                  ))}
              </div>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <p className="text-gray-500 text-sm mb-3">Choose Size</p>
              <div className="flex flex-wrap gap-3">
                {product.size &&
                  product.size.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
                        selectedSize === size
                          ? "bg-black text-white"
                          : "bg-[#F0F0F0] text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-[#F0F0F0] rounded-full text-black flex items-center px-4 py-3 gap-6 w-fit">
                <button
                  onClick={() => handleQuantity("dec")}
                  className="hover:text-gray-600"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="font-medium w-4 text-center">{quantity}</span>
                <button
                  onClick={() => handleQuantity("inc")}
                  className="hover:text-gray-600"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-black text-white rounded-full py-3 px-8 font-medium hover:bg-gray-800 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <div className="w-full mb-12">
          <div className="flex justify-between border-b border-gray-200 mb-8">
            {["Product Details", "Rating & Reviews", "FAQs"].map(tab => {
              const key =
                tab === "Rating & Reviews"
                  ? "reviews"
                  : tab === "Product Details"
                  ? "details"
                  : "faqs";
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(key)}
                  className={`w-1/3 pb-4 text-center font-medium transition-colors ${
                    activeTab === key
                      ? "border-b-2 border-black text-black"
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {activeTab === "details" && (
            <div className="py-6 animate-in fade-in duration-300">
              <h3 className="text-xl text-black font-bold mb-4">
                Product Specifications
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>
          )}

          {activeTab === "faqs" && (
            <div className="py-6 animate-in fade-in duration-300">
              <h3 className="text-xl font-bold mb-4">
                Frequently Asked Questions
              </h3>
              <p className="text-gray-600">
                <strong>Q: How does the sizing run?</strong>
                <br />
                A: This runs true to size. We recommend ordering your usual size
                for a standard fit.
              </p>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="animate-in fade-in duration-300">
              <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  All Reviews{" "}
                  <span className="text-gray-500 text-base font-normal">
                    (451)
                  </span>
                </h3>
                <div className="flex gap-2.5">
                  <button className="w-10 h-10 rounded-full bg-[#F0F0F0]  text-black flex items-center justify-center hover:bg-gray-200">
                    <SlidersHorizontal className="w-5 h-5" />
                  </button>
                  <button className="px-4 h-10 rounded-full bg-[#F0F0F0] text-black flex items-center justify-between gap-4 font-medium hover:bg-gray-200">
                    Latest <ChevronDown className="w-4 h-4" />
                  </button>
                  <button className="px-6 h-10 rounded-full bg-black text-white font-medium hover:bg-gray-800">
                    Write a Review
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {reviewsData.map(review => (
                  <div
                    key={review.id}
                    className="border border-gray-200 rounded-[20px] p-7 flex flex-col gap-3"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex gap-1">
                        {renderStars(review.rating)}
                      </div>
                      <button className="text-gray-400 hover:text-black">
                        <MoreHorizontal className="w-6 h-6" />
                      </button>
                    </div>

                    <h4 className="font-bold text-lg flex items-center">
                      {review.name} <VerifiedBadge />
                    </h4>

                    <p className="text-gray-500 leading-relaxed text-sm">
                      "{review.content}"
                    </p>

                    <span className="text-gray-400 text-sm font-medium mt-2">
                      Posted on {review.date}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-10">
                <button className="px-8 py-3 border bg-gray-900 text-white border-gray-200 rounded-full font-medium hover:bg-black hover:text-white transition-colors">
                  Load More Reviews
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
