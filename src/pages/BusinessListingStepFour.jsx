import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarNG from "../components/NavbarNG";
import Footer from "../components/Footer";
import { useFormData } from "../contexts/FormDataContext";

const BusinessListingStepFour = () => {
  const navigate = useNavigate();
  const { formData } = useFormData();
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      // 🔹 Step 1: Upload images (if any)
      const mediaIds = [];
      if (formData.images && formData.images.length > 0) {
        for (const file of formData.images) {
          const formDataMedia = new FormData();
          formDataMedia.append("file", file);

          const mediaResponse = await fetch(
            "https://beekeys-proxy.onrender.com/upload-media",
            {
              method: "POST",
              body: formDataMedia,
            }
          );

          const mediaResult = await mediaResponse.json();
          console.log("Media Upload Result:", mediaResult);

          if (!mediaResponse.ok || !mediaResult.success) {
            throw new Error(mediaResult.error || "Media upload failed");
          }

          // ✅ FIXED: use mediaResult.media.id
          mediaIds.push(mediaResult.media.id);
        }
      }

      // 🔹 Step 2: Prepare post data
      const postData = {
        title: formData.businessName || "Untitled Business",
        content: formData.description || "No description provided.",
        status: "publish",
        meta: {
          phone: formData.phone || "",
          email: formData.email || "",
          tags: formData.tags || "",
          isCACRegistered: formData.isCACRegistered || false,
          slogan: formData.slogan === "null" ? null : formData.slogan || "",
          hasBranches: formData.hasBranches || false,
          website: formData.website || "",
          address: formData.address || "",
          mediaIds,
        },
      };

      console.log("Post Data:", postData);

      // 🔹 Step 3: Send post data to proxy
      const response = await fetch("https://beekeys-proxy.onrender.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      const result = await response.json();
      console.log("Submit Result:", result);

      if (!response.ok || !result.success) {
        throw new Error(result.error || result.details || "Submission failed");
      }

      setShowModal(true);
    } catch (error) {
      console.error("Submission Error:", error);
      setErrorMessage(error.message);
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/");
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  return (
    <main className="font-sans bg-white min-h-screen flex flex-col relative">
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
                  step === 4 ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-700"
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

        {/* Review Summary */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Review your submission</h2>
          <ul className="text-sm text-gray-700 space-y-2">
            <li><strong>Business Name:</strong> {formData.businessName}</li>
            <li><strong>CAC Registered:</strong> {formData.isCACRegistered ? "Yes" : "No"}</li>
            <li><strong>Slogan:</strong> {formData.slogan}</li>
            <li><strong>Has Branches:</strong> {formData.hasBranches ? "Yes" : "No"}</li>
            <li><strong>Phone:</strong> {formData.phone}</li>
            <li><strong>Email:</strong> {formData.email}</li>
            <li><strong>Tags:</strong> {formData.tags}</li>
            <li><strong>Description:</strong> {formData.description}</li>
            <li><strong>Images:</strong> {formData.images.length} file(s) selected</li>
          </ul>
        </div>

        {/* Actions */}
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

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-sm mx-auto rounded-lg shadow-lg p-6 text-center animate-fadeIn">
            <h3 className="text-xl font-semibold text-green-600 mb-3">🎉 Submission Successful!</h3>
            <p className="text-sm text-gray-700 mb-6">Your business has been successfully listed.</p>
            <button
              onClick={handleCloseModal}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-full transition"
            >
              Go Home
            </button>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-sm mx-auto rounded-lg shadow-lg p-6 text-center animate-fadeIn">
            <h3 className="text-xl font-semibold text-red-600 mb-3">❌ Submission Failed</h3>
            <p className="text-sm text-gray-700 mb-6">{errorMessage}</p>
            <button
              onClick={handleCloseErrorModal}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default BusinessListingStepFour;
