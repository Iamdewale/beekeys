import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import NavbarNG from "../../components/NavbarNG";
import Footer from "../../components/Footer";

import { useFormData } from "../../contexts/FormDataContext";
import { submitBusinessForm } from "../../services/api";

import useValidation from "../../hooks/useValidation";
import { stepValidationRules } from "../../validationRules";

const StepFour = () => {
  const navigate = useNavigate();
  const { formData } = useFormData();
  const { errors, validate } = useValidation(stepValidationRules[4]);

  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState({ type: null, message: "" });

  const handleBack = () => navigate(-1);

  const handleSubmit = async () => {
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) return;

    setIsLoading(true);
    try {
      const response = await submitBusinessForm(formData);
      if (!response.success) {
        throw new Error(response.error || "Form submission failed");
      }

      setModal({ type: "success", message: "Your business has been successfully listed." });
    } catch (err) {
      setModal({ type: "error", message: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  const renderReviewItem = (label, value, errorKey) => (
    <li>
      <strong>{label}:</strong> {value}
      {errors[errorKey] && <p className="text-red-500 text-xs">{errors[errorKey]}</p>}
    </li>
  );

  return (
    <main className="font-sans bg-white min-h-screen flex flex-col relative">
      <NavbarNG />

      <div className="flex-grow pt-32 pb-24 px-4 max-w-3xl mx-auto">
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Review your submission</h2>
          <ul className="text-sm text-gray-700 space-y-2">
            {renderReviewItem("Business Name", formData.businessName, "businessName")}
            <li><strong>CAC Registered:</strong> {formData.isCACRegistered ? "Yes" : "No"}</li>
            <li><strong>Slogan:</strong> {formData.slogan}</li>
            <li><strong>Has Branches:</strong> {formData.hasBranches ? "Yes" : "No"}</li>
            {renderReviewItem("Phone", formData.phone, "phone")}
            {renderReviewItem("Email", formData.email, "email")}
            {renderReviewItem("Tags", formData.tags, "tags")}
            <li><strong>Description:</strong> {formData.description}</li>
            <li><strong>Images:</strong> {formData.images?.length || 0} file(s) selected</li>
          </ul>
        </div>

        <div className="pt-4 flex gap-4">
          <button
            type="button"
            onClick={handleBack}
            className="w-1/2 bg-gray-200 text-gray-800 font-medium py-3 rounded-full hover:bg-gray-300 transition"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-1/2 bg-yellow-500 text-white font-medium py-3 rounded-full hover:bg-yellow-600 transition disabled:opacity-50"
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>

      <Footer />

      {modal.type && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-sm mx-auto rounded-lg shadow-lg p-6 text-center">
            <h3
              className={`text-xl font-semibold mb-3 ${
                modal.type === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {modal.type === "success" ? "🎉 Submission Successful!" : "❌ Submission Failed"}
            </h3>
            <p className="text-sm text-gray-700 mb-6">{modal.message}</p>
            <button
              onClick={() => {
                setModal({ type: null, message: "" });
                if (modal.type === "success") navigate("/");
              }}
              className={`px-6 py-2 rounded-full transition ${
                modal.type === "success"
                  ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                  : "bg-red-500 hover:bg-red-600 text-white"
              }`}
            >
              {modal.type === "success" ? "Go Home" : "Close"}
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default StepFour;
