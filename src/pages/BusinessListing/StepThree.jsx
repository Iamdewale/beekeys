import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import NavbarNG from "../../components/NavbarNG";
import Footer from "../../components/Footer";

import { useFormData } from "../../contexts/FormDataContext";
import useValidation from "../../hooks/useValidation";
import { stepValidationRules } from "../../validationRules";

import { FiUploadCloud } from "react-icons/fi";

const StepThree = () => {
  const navigate = useNavigate();
  const { formData, setFormData } = useFormData();
  const { errors, validate } = useValidation(stepValidationRules[3]);

  const handleNext = (e) => {
    e.preventDefault();
    const newErrors = validate(formData);
    if (Object.keys(newErrors).length === 0) {
      navigate("/listing/step-4");
    }
  };

  const handleBack = () => {
    navigate(-1);
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
                  step === 3 ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-700"
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
          {/* Tags */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Products or Services Tags <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.tags || ""}
              onChange={(e) => setFormData((prev) => ({ ...prev, tags: e.target.value }))}
              placeholder="e.g. photography, catering, logistics"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.tags ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-yellow-400`}
            />
            {errors.tags && <p className="text-red-500 text-xs mt-1">{errors.tags}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Short description or service summary
            </label>
            <textarea
              rows={4}
              value={formData.description || ""}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Tell us briefly what your business offers"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.description ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-yellow-400`}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
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

export default StepThree;
