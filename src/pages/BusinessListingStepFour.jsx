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

  const API_BASE = "https://beekeys-proxy.onrender.com"; // Render backend

  const handleBack = () => navigate(-1);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // 1️⃣ Upload images via proxy
      let uploadedFiles = [];
      if (formData.images && formData.images.length > 0) {
        for (const file of formData.images) {
          const fileForm = new FormData();
          fileForm.append("file", file);

          const res = await fetch(`${API_BASE}/upload-ninja`, {
            method: "POST",
            body: fileForm,
          });
          const result = await res.json();

          if (!res.ok || !result.success) {
            throw new Error(result.error || "File upload failed");
          }

          // WP usually returns { data: { tmp_name, name, ... } }
          const tmpName = result.wpResponse?.data?.tmp_name;
          if (!tmpName) throw new Error("Upload response missing tmp_name");

          uploadedFiles.push({
            name: file.name,
            tmp_name: tmpName,
            fieldID: 164, // your WP upload field ID
          });
        }
      }

      // 2️⃣ Build Ninja Forms fields mapping
      const fields = {
        150: { id: 150, value: formData.firstName || "" },
        151: { id: 151, value: formData.lastName || "" },
        152: { id: 152, value: formData.phone || "" },
        154: { id: 154, value: formData.email || "" },
        155: { id: 155, value: formData.address || "" },
        156: { id: 156, value: formData.businessName || "" },
        157: { id: 157, value: formData.slogan || "" },
        158: { id: 158, value: formData.tags || "" },
        159: { id: 159, value: formData.description || "" },
        160: { id: 160, value: formData.website || "" },
        161: { id: 161, value: formData.isCACRegistered ? "Yes" : "No" },
        162: { id: 162, value: formData.hasBranches ? "Yes" : "No" },
        164: { id: 164, value: 1, files: uploadedFiles }, // file field
      };

      // 3️⃣ Build full payload
      const payload = {
        id: "8", // your form ID
        fields,
        settings: {
          objectType: "Form Setting",
          editActive: true,
          title: "Beekeys Contributor Application Form",
        },
      };

      // 4️⃣ Submit form via proxy
      const response = await fetch(`${API_BASE}/submit-ninja`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData: payload }),
      });

      const data = await response.json();
      console.log("Proxy Response:", data);

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Submission failed");
      }

      setShowModal(true);
    } catch (err) {
      console.error("Submission Error:", err);
      setErrorMessage(err.message);
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="font-sans bg-white min-h-screen flex flex-col relative">
      <NavbarNG />
      <div className="flex-grow pt-32 pb-24 px-4 max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-semibold">Beekeys Listing Form</h1>
          <p className="text-sm text-gray-600 mt-1">
            Fields marked with <span className="text-red-500">*</span> are required
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

        {/* Review Section */}
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
            <li><strong>Images:</strong> {formData.images?.length || 0} file(s) selected</li>
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
              onClick={() => {
                setShowModal(false);
                navigate("/");
              }}
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
              onClick={() => setShowErrorModal(false)}
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
