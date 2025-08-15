import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import NavbarNG from "../components/NavbarNG";
import Footer from "../components/Footer";
import { FiUploadCloud } from "react-icons/fi";
import { useFormData } from "../contexts/FormDataContext";

const BusinessListingStepOne = () => {
  const navigate = useNavigate();
  const { formData, setFormData } = useFormData();
  const [localImages, setLocalImages] = useState([]); // Local state for images

  const handleFileChange = (e) => {
    setLocalImages([...e.target.files]);
    setFormData((prev) => ({ ...prev, images: [...e.target.files] }));
  };

  const handleNext = () => {
    // Basic validation
    if (!formData.businessName.trim()) {
      alert("Business name is required.");
      return;
    }
    navigate("/listing-step-2");
  };

  return (
    <main className="font-sans bg-white min-h-screen flex flex-col">
      <NavbarNG />

      <div className="flex-grow pt-32 pb-24 px-4 max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-2xl font-semibold">Beekeys Listing Form</h1>
          <p className="text-sm text-gray-600 mt-1">
            Fields marked with an <span className="text-red-500">*</span> are
            required
          </p>
        </div>

        {/* Stepper */}
        <div className="flex justify-between items-center mb-10">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex flex-col items-center text-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                  step === 1
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {step}
              </div>
              <span className="mt-2 text-xs text-gray-600">
                {step === 1 && "Brand name/Business name"}
                {step === 2 && "Contact information"}
                {step === 3 && "Products and services tags"}
                {step === 4 && "Beekey"}
              </span>
            </div>
          ))}
        </div>

        {/* Form */}
        <form className="space-y-6">
          {/* Business Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Business full name or brand name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.businessName}
              onChange={(e) => setFormData((prev) => ({ ...prev, businessName: e.target.value }))}
              placeholder="Enter brand name or business name"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <label className="mt-2 flex items-center space-x-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={formData.isCACRegistered}
                onChange={(e) => setFormData((prev) => ({ ...prev, isCACRegistered: e.target.checked }))}
              />
              <span>Check if CAC Registered</span>
            </label>
          </div>

          {/* Slogan */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Slogan or motto
            </label>
            <input
              type="text"
              value={formData.slogan}
              onChange={(e) => setFormData((prev) => ({ ...prev, slogan: e.target.value }))}
              placeholder="Enter your preferred motto"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <label className="mt-2 flex items-center space-x-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={formData.hasBranches}
                onChange={(e) => setFormData((prev) => ({ ...prev, hasBranches: e.target.checked }))}
              />
              <span>Yes we have branch locations</span>
            </label>
          </div>

          {/* Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Upload images
            </label>
            <label
              htmlFor="upload"
              className="border-2 border-dashed border-gray-300 rounded-lg w-full py-10 flex flex-col items-center justify-center cursor-pointer text-center text-sm text-gray-500 hover:border-yellow-400"
            >
              <FiUploadCloud className="text-3xl text-blue-500 mb-2" />
              <span>Click or drag file to this area to upload</span>
              <span className="text-xs text-gray-400 mt-1">
                Support for a single or bulk upload.
              </span>
              <input
                id="upload"
                type="file"
                className="hidden"
                multiple
                onChange={handleFileChange}
              />
            </label>
            {localImages.length > 0 && (
              <p className="mt-2 text-sm text-gray-600">
                Selected files: {localImages.length}
              </p>
            )}
          </div>

          {/* Next Button */}
          <div className="pt-4">
            <button
              type="button"
              onClick={handleNext}
              className="w-full bg-yellow-500 text-white font-medium py-3 rounded-full hover:bg-yellow-600 transition"
            >
              Next
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </main>
  );
};

export default BusinessListingStepOne;