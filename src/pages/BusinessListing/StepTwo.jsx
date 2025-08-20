import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import NavbarNG from "../../components/NavbarNG";
import Footer from "../../components/Footer";

import { useFormData } from "../../contexts/FormDataContext";
import useValidation from "../../hooks/useValidation";
import { stepValidationRules } from "../../validationRules";

import { FiUploadCloud } from "react-icons/fi";
const StepTwo = () => {
  const navigate = useNavigate();
  const { formData, setFormData } = useFormData();
  const { errors, validate } = useValidation(stepValidationRules[2]);

  const handleBack = () => navigate("/listing/step-1");

  const handleNext = (e) => {
    e.preventDefault();
    const newErrors = validate(formData);
    if (Object.keys(newErrors).length === 0) {
      navigate("/listing/step-3");
    }
  };

  return (
    <main className="font-sans bg-white min-h-screen flex flex-col">
      <NavbarNG />
      <div className="flex-grow pt-32 pb-24 px-4 max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-2xl font-semibold">Beekeys Listing Form</h1>
          <p className="text-sm text-gray-600 mt-1">
            Fields marked with an <span className="text-red-500">*</span> are required
          </p>
        </div>

        {/* Stepper */}
        <div className="flex justify-between items-center mb-10">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex flex-col items-center text-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                  step === 2 ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-700"
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
        <form className="space-y-6" onSubmit={handleNext}>
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Business email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email || ""}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              placeholder="Enter business email"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-yellow-400`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Phone number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={formData.phone || ""}
              onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
              placeholder="Enter business phone number"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-yellow-400`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          {/* Website (optional) */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Website (optional)
            </label>
            <input
              type="url"
              value={formData.website || ""}
              onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
              placeholder="https://yourbusiness.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Physical Address */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Physical address <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              value={formData.address || ""}
              onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
              placeholder="Enter full address of your business location"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.address ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-yellow-400`}
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>

          {/* Navigation Buttons */}
          <div className="pt-4 flex gap-4">
            <button
              type="button"
              onClick={handleBack}
              className="w-1/2 bg-gray-200 text-gray-800 font-medium py-3 rounded-full hover:bg-gray-300 transition"
            >
              Back
            </button>
            <button
              type="submit"
              className="w-1/2 bg-yellow-500 text-white font-medium py-3 rounded-full hover:bg-yellow-600 transition"
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

export default StepTwo;
