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

          const res = await fetch(
            "https://beekeys-proxy.onrender.com/upload-ninja",
            { method: "POST", body: fileForm }
          );
          const result = await res.json();

          if (!res.ok || !result.success || !result.file?.data?.tmp_name) {
            throw new Error(result.error || "File upload failed");
          }

          uploadedFiles.push({
            name: file.name,
            tmp_name: result.file.data.tmp_name,
            fieldID: 164, // must match WP upload field
          });
        }
      }

      // 2️⃣ Prepare user data
      const payload = {
        businessName: formData.businessName,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        slogan: formData.slogan,
        tags: formData.tags,
        description: formData.description,
        isCACRegistered: formData.isCACRegistered,
        hasBranches: formData.hasBranches,
        website: formData.website,
        images: uploadedFiles,
      };

      // 3️⃣ Submit form via proxy
      const response = await fetch(
        "https://beekeys-proxy.onrender.com/submit-ninja",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

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
        {/* ... stepper + review stays the same ... */}

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
            <h3 className="text-xl font-semibold text-green-600 mb-3">
              🎉 Submission Successful!
            </h3>
            <p className="text-sm text-gray-700 mb-6">
              Your business has been successfully listed.
            </p>
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
            <h3 className="text-xl font-semibold text-red-600 mb-3">
              ❌ Submission Failed
            </h3>
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
