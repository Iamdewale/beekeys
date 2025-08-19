import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarNG from "../components/NavbarNG";
import Footer from "../components/Footer";
import { useFormData } from "../contexts/FormDataContext";
import { getFormFields, uploadNinjaFile, submitBusinessForm } from "../services/api"; 

const BusinessListingStepFour = () => {
  const navigate = useNavigate();
  const { formData } = useFormData();

  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fieldMap, setFieldMap] = useState(null);

  // ✅ Fetch fieldMap once on mount
  useEffect(() => {
    if (fieldMap) return;
    (async () => {
      try {
        const res = await getFormFields(4);
        setFieldMap(res.fieldMap || {});
      } catch {
        setErrorMessage("Could not load form fields.");
        setShowErrorModal(true);
      }
    })();
  }, [fieldMap]);

  const handleBack = () => navigate(-1);

  const handleSubmit = async () => {
    if (!fieldMap) {
      setErrorMessage("Form fields not loaded.");
      setShowErrorModal(true);
      return;
    }

    setIsLoading(true);
    try {
      // 1️⃣ Upload any images first
      let uploadedFiles = [];
      if (Array.isArray(formData.images) && formData.images.length > 0) {
        uploadedFiles = await Promise.all(
          formData.images.map(async (file) => {
            const result = await uploadNinjaFile(file);
            if (!result?.success || !result.wpResponse?.data?.tmp_name) {
              throw new Error(result?.error || "File upload failed");
            }
            return { name: file.name, tmp_name: result.wpResponse.data.tmp_name };
          })
        );
      }

      // 2️⃣ Just pass friendly‑keyed data & files to API helper
      const data = await submitBusinessForm(formData, 4, uploadedFiles);

      if (!data.success) {
        throw new Error(data.error || "Form submission failed");
      }
      setShowModal(true);
    } catch (err) {
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
        {/* Review */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Review your submission
          </h2>
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
          <div className="bg-white w-full max-w-sm mx-auto rounded-lg shadow-lg p-6 text-center">
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
          <div className="bg-white w-full max-w-sm mx-auto rounded-lg shadow-lg p-6 text-center">
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
