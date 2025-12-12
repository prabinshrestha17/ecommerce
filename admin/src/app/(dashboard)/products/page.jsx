"use client";
import React, { useEffect, useState, useCallback } from "react";
import {
  Plus,
  X,
  Loader2,
  UploadCloud,
  Image as ImageIcon,
  Pencil,
  Trash2,
  Eye,
} from "lucide-react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { baseurl } from "@/api/env";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingProduct, setViewingProduct] = useState(null);

  const [availableColors, setAvailableColors] = useState([
    "Black",
    "White",
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Navy",
    "Grey",
  ]);
  const [customColor, setCustomColor] = useState("");

  const [availableSizes, setAvailableSizes] = useState([
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "2XL",
    "3XL",
    "Free Size",
  ]);
  const [customSize, setCustomSize] = useState("");

  const [formData, setFormData] = useState({
    productName: "",
    files: [],
    previewUrls: [],
    rating: 0,
    price: 0,
    discount: "",
    description: "",
    colors: [],
    size: [],
    gender: "Male",
  });

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get(`${baseurl}/product/get-all`);
      if (response.data.success) {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddColor = e => {
    const colorToAdd = e.target.value;
    if (colorToAdd && !formData.colors.includes(colorToAdd)) {
      setFormData(prev => ({
        ...prev,
        colors: [...prev.colors, colorToAdd],
      }));
    }
    e.target.value = "";
  };

  const handleCreateCustomColor = () => {
    if (customColor && !availableColors.includes(customColor)) {
      setAvailableColors(prev => [...prev, customColor]);
      setFormData(prev => ({
        ...prev,
        colors: [...prev.colors, customColor],
      }));
      setCustomColor("");
      toast.success("New color added!");
    } else if (availableColors.includes(customColor)) {
      if (!formData.colors.includes(customColor)) {
        setFormData(prev => ({
          ...prev,
          colors: [...prev.colors, customColor],
        }));
      }
      setCustomColor("");
    }
  };

  const removeColor = colorToRemove => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.filter(c => c !== colorToRemove),
    }));
  };

  const handleAddSize = e => {
    const sizeToAdd = e.target.value;
    if (sizeToAdd && !formData.size.includes(sizeToAdd)) {
      setFormData(prev => ({
        ...prev,
        size: [...prev.size, sizeToAdd],
      }));
    }
    e.target.value = "";
  };

  const handleCreateCustomSize = () => {
    const formattedSize = customSize.trim();
    if (formattedSize && !availableSizes.includes(formattedSize)) {
      setAvailableSizes(prev => [...prev, formattedSize]);
      setFormData(prev => ({
        ...prev,
        size: [...prev.size, formattedSize],
      }));
      setCustomSize("");
      toast.success("New size added!");
    } else if (availableSizes.includes(formattedSize)) {
      if (!formData.size.includes(formattedSize)) {
        setFormData(prev => ({
          ...prev,
          size: [...prev.size, formattedSize],
        }));
      }
      setCustomSize("");
    }
  };

  const removeSize = sizeToRemove => {
    setFormData(prev => ({
      ...prev,
      size: prev.size.filter(s => s !== sizeToRemove),
    }));
  };

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles?.length) {
      const newPreviews = acceptedFiles.map(file => URL.createObjectURL(file));
      setFormData(prev => ({
        ...prev,
        files: [...prev.files, ...acceptedFiles],
        previewUrls: [...prev.previewUrls, ...newPreviews],
      }));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  const removeImage = index => {
    setFormData(prev => {
      const newFiles = [...prev.files];
      const newPreviews = [...prev.previewUrls];

      const urlToRemove = prev.previewUrls[index];

      const isFile = prev.files.find(
        f => URL.createObjectURL(f) === urlToRemove
      );

      if (urlToRemove.startsWith("blob:")) {
        URL.revokeObjectURL(urlToRemove);
        if (isFile) {
          newFiles.splice(newFiles.indexOf(isFile), 1);
        }
      }

      newPreviews.splice(index, 1);

      return { ...prev, files: newFiles, previewUrls: newPreviews };
    });
  };

  const uploadFiles = async files => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append("document", file);
    });

    const response = await axios.post(`${baseurl}/file/multiple`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data.urls;
  };

  const resetForm = () => {
    setFormData({
      productName: "",
      files: [],
      previewUrls: [],
      rating: 0,
      price: 0,
      discount: "",
      description: "",
      colors: [],
      size: [],
      gender: "Male",
    });
    setEditingId(null);
    setViewingProduct(null);
  };

  const handleOpenCreate = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleDelete = async id => {
    Swal.fire({
      title: "Are you sure?",
      text: "This product will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `${baseurl}/product/delete/${id}`
          );

          if (response.data.success) {
            Swal.fire("Deleted!", "Product has been deleted.", "success");
            fetchProducts(); // Reload list
          }
        } catch (error) {
          Swal.fire(
            "Error!",
            error.response?.data?.message || "Failed to delete.",
            "error"
          );
        }
      }
    });
  };

  const handleView = async id => {
    try {
      const response = await axios.get(`${baseurl}/product/get-specific/${id}`);
      if (response.data.success) {
        setViewingProduct(response.data.data);
        setIsViewModalOpen(true);
      }
    } catch (error) {
      toast.error("Failed to fetch product details");
    }
  };

  const handleEdit = async id => {
    try {
      const response = await axios.get(`${baseurl}/product/get-specific/${id}`);
      if (response.data.success) {
        const prod = response.data.data;
        setEditingId(id);
        setFormData({
          productName: prod.productName,
          files: [],
          previewUrls: prod.productImage || [],
          rating: prod.rating,
          price: prod.price,
          discount: prod.discount || "",
          description: prod.description,
          colors: prod.colors || [],
          size: prod.size || [],
          gender: prod.gender,
        });
        setIsModalOpen(true);
      }
    } catch (error) {
      toast.error("Failed to load product for editing");
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitLoading(true);

    try {
      let newImageUrls = [];
      if (formData.files.length > 0) {
        newImageUrls = await uploadFiles(formData.files);
      }

      const existingImages = formData.previewUrls.filter(
        url => !url.startsWith("blob:")
      );
      const finalImages = [...existingImages, ...newImageUrls];

      const payload = {
        productName: formData.productName,
        productImage: finalImages,
        rating: Number(formData.rating),
        price: Number(formData.price),
        discount: formData.discount,
        description: formData.description,
        colors: formData.colors,
        size: formData.size,
        gender: formData.gender,
      };

      let response;
      if (editingId) {
        response = await axios.put(
          `${baseurl}/product/update/${editingId}`,
          payload
        );
      } else {
        response = await axios.post(`${baseurl}/product/create`, payload);
      }

      if (response.data.success) {
        toast.success(editingId ? "Product Updated!" : "Product Created!");
        setIsModalOpen(false);
        resetForm();
        await fetchProducts();
      }
    } catch (error) {
      const msg =
        error.response?.data?.message || error.message || "Operation failed";
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach(err => toast.error(err));
      } else {
        toast.error(msg);
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  const getMainImage = product => {
    if (
      Array.isArray(product.productImage) &&
      product.productImage.length > 0
    ) {
      return product.productImage[0];
    }
    return null;
  };

  return (
    <div className="space-y-6 p-4 md:p-8">
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-100">Products</h1>
        <button
          onClick={handleOpenCreate}
          className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors"
        >
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 min-h-[400px]">
        {loading ? (
          <div className="flex items-center justify-center h-64 text-slate-400">
            <Loader2 className="animate-spin h-8 w-8 mr-2" /> Loading
            products...
          </div>
        ) : products.length === 0 ? (
          <div className="flex items-center justify-center h-64 text-slate-500">
            No products found. Add one to get started.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => {
              const mainImg = getMainImage(product);
              return (
                <div
                  key={product._id}
                  className="group relative rounded-lg border border-slate-800 bg-slate-950 p-4 hover:border-blue-500/50 transition-colors flex flex-col"
                >
                  <div className="aspect-square w-full rounded-md bg-slate-900 mb-4 flex items-center justify-center overflow-hidden relative">
                    {mainImg ? (
                      <>
                        <img
                          src={mainImg}
                          alt={product.productName}
                          className="w-full h-full object-cover"
                        />
                        {Array.isArray(product.productImage) &&
                          product.productImage.length > 1 && (
                            <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                              <ImageIcon className="w-3 h-3" />+
                              {product.productImage.length - 1}
                            </div>
                          )}
                      </>
                    ) : (
                      <span className="text-slate-600 text-sm">No Image</span>
                    )}
                  </div>
                  <h3 className="text-slate-200 font-medium truncate">
                    {product.productName}
                  </h3>
                  <div className="flex justify-between items-center text-xs text-slate-400 mb-1">
                    <span className="capitalize">
                      {product.gender || "Unisex"}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mb-1 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto mb-3">
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-slate-100">
                        ${product.priceAfterDiscount || product.price}
                      </span>
                      {product.discount && (
                        <span className="text-xs text-slate-500 line-through">
                          ${product.price}
                        </span>
                      )}
                    </div>
                    {product.discount && (
                      <span className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded">
                        {product.discount} %OFF
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-2 pt-3 border-t border-slate-800">
                    <button
                      onClick={() => handleView(product._id)}
                      className="flex items-center justify-center cursor-pointer gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200 py-1.5 rounded text-xs transition-colors"
                    >
                      <Eye className="w-3 h-3" /> View
                    </button>
                    <button
                      onClick={() => handleEdit(product._id)}
                      className="flex items-center justify-center cursor-pointer gap-1 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 py-1.5 rounded text-xs transition-colors"
                    >
                      <Pencil className="w-3 h-3" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="flex items-center justify-center cursor-pointer gap-1 bg-red-600/20 hover:bg-red-600/40 text-red-400 py-1.5 rounded text-xs transition-colors"
                    >
                      <Trash2 className="w-3 h-3" /> Del
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-slate-900 p-6 border-b border-slate-800 flex justify-between items-center z-10">
              <h2 className="text-xl font-bold text-slate-100">
                {editingId ? "Update Product" : "Create New Product"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-300">
                  Product Images{" "}
                  <span className="text-slate-500">(Add variety)</span>
                </label>

                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                    isDragActive
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-slate-700 hover:border-slate-500 bg-slate-950"
                  }`}
                >
                  <input {...getInputProps()} />
                  <UploadCloud className="w-10 h-10 text-slate-500 mx-auto mb-2" />
                  <p className="text-sm text-slate-400 text-center">
                    Drag & drop multiple images here, <br /> or click to select
                  </p>
                </div>

                {formData.previewUrls.length > 0 && (
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 mt-4">
                    {formData.previewUrls.map((url, idx) => (
                      <div key={idx} className="relative aspect-square group">
                        <img
                          src={url}
                          alt={`Preview ${idx}`}
                          className="w-full h-full object-cover rounded border border-slate-700"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute -top-1 -right-1 bg-red-500 rounded-full p-1 text-white shadow hover:bg-red-600 transition-opacity opacity-0 group-hover:opacity-100"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="productName"
                    required
                    value={formData.productName}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-slate-100 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-slate-100 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Kids">Kids</option>
                    <option value="Unisex">Unisex</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">
                    Rating (0-5)
                  </label>
                  <input
                    type="number"
                    name="rating"
                    min="0"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-slate-100 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    name="price"
                    required
                    min="0"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-slate-100 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">
                    Discount (%)
                  </label>
                  <input
                    type="text"
                    name="discount"
                    value={formData.discount}
                    onChange={handleChange}
                    placeholder="20%"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-slate-100 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">
                  Description
                </label>
                <textarea
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-slate-100 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">
                    Colors
                  </label>
                  <div className="flex gap-2">
                    <select
                      onChange={handleAddColor}
                      className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-slate-100 focus:border-blue-500 focus:outline-none"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select Color
                      </option>
                      {availableColors.map(color => (
                        <option key={color} value={color}>
                          {color}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <input
                      type="text"
                      value={customColor}
                      onChange={e => setCustomColor(e.target.value)}
                      placeholder="Add New"
                      className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-slate-100 focus:border-blue-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleCreateCustomColor}
                      className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-2 rounded-lg"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.colors.map((color, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-1 bg-slate-800 px-3 py-1 rounded-full border border-slate-700"
                      >
                        <span
                          className="w-3 h-3 rounded-full border border-slate-600"
                          style={{ backgroundColor: color }}
                        ></span>
                        <span className="text-sm text-slate-300">{color}</span>
                        <button
                          type="button"
                          onClick={() => removeColor(color)}
                          className="ml-1 text-slate-400 hover:text-red-400"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">
                    Sizes
                  </label>
                  <div className="flex gap-2">
                    <select
                      onChange={handleAddSize}
                      className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-slate-100 focus:border-blue-500 focus:outline-none"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select Size
                      </option>
                      {availableSizes.map(size => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <input
                      type="text"
                      value={customSize}
                      onChange={e => setCustomSize(e.target.value)}
                      placeholder="Add New"
                      className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-slate-100 focus:border-blue-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleCreateCustomSize}
                      className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-2 rounded-lg"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.size.map((s, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-1 bg-slate-800 px-3 py-1 rounded-full border border-slate-700"
                      >
                        <span className="text-sm text-slate-300">{s}</span>
                        <button
                          type="button"
                          onClick={() => removeSize(s)}
                          className="ml-1 text-slate-400 hover:text-red-400"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitLoading ? (
                    <>
                      <Loader2 className="animate-spin h-4 w-4" />{" "}
                      {editingId ? "Updating..." : "Creating..."}
                    </>
                  ) : editingId ? (
                    "Update Product"
                  ) : (
                    "Create Product"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isViewModalOpen && viewingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-100">
                  {viewingProduct.productName}
                </h2>
                <span className="text-slate-400 text-sm">
                  {viewingProduct.gender}
                </span>
              </div>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="aspect-square w-full rounded-xl bg-slate-950 overflow-hidden border border-slate-800">
                  {viewingProduct.productImage?.[0] ? (
                    <img
                      src={viewingProduct.productImage[0]}
                      alt="Main"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-600">
                      No Image
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {viewingProduct.productImage?.slice(1).map((img, idx) => (
                    <div
                      key={idx}
                      className="aspect-square rounded-lg bg-slate-950 overflow-hidden border border-slate-800"
                    >
                      <img
                        src={img}
                        alt={`Thumb ${idx}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-white">
                    ${viewingProduct.price}
                  </span>
                  {viewingProduct.discount && (
                    <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-sm">
                      {viewingProduct.discount} OFF
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-medium text-slate-400 mb-2">
                    Description
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    {viewingProduct.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-slate-400 mb-2">
                    Available Colors
                  </h3>
                  <div className="flex gap-2">
                    {viewingProduct.colors?.map((c, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700"
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-slate-600"
                          style={{ backgroundColor: c }}
                        ></span>
                        <span className="text-slate-200 text-sm">{c}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-slate-400 mb-2">
                    Available Sizes
                  </h3>
                  <div className="flex gap-2 flex-wrap">
                    {viewingProduct.size?.map((s, i) => (
                      <span
                        key={i}
                        className="bg-slate-800 text-slate-200 px-4 py-2 rounded-lg border border-slate-700 text-sm"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}