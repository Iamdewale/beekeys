import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarNG from "../components/NavbarNG";
import Footer from "../components/Footer";
import { useFormData } from "../contexts/FormDataContext";

const BusinessListingStepFour = () => {
  const navigate = useNavigate();
  const { formData } = useFormData();

  const [fieldMap, setFieldMap] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 🔹 Fetch Ninja Form field IDs dynamically
  useEffect(() => {
    async function fetchFields() {
      try {
        const res = await fetch(
          "https://beekeys-proxy.onrender.com/form-fields/4"
        );
        const data = await res.json();
        if (data.success) {
          const map = {};
          data.fields.forEach((f) => {
            map[f.label] = f.id;
          });
          setFieldMap(map);
        } else {
          console.error("Failed to load form fields:", data.error);
        }
      } catch (err) {
        console.error("Error fetching form fields:", err);
      }
    }
    fetchFields();
  }, []);

  const handleBack = () => navigate(-1);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // 1️⃣ Upload images
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
          console.log("Upload result:", result);

          if (
            !res.ok ||
            !result.success ||
            !result.wpResponse?.data?.tmp_name
          ) {
            throw new Error(result.error || "File upload failed");
          }

          uploadedFiles.push({
            name: file.name,
            tmp_name: result.wpResponse.data.tmp_name,
            fieldID: fieldMap["Upload files"], // use dynamic field ID
          });
        }
      }

      // 2️⃣ Build fields dynamically with fetched IDs
      const fields = {
        [fieldMap["What is the Full Name of your Business, Service or Brand"]]:
          { id: fieldMap["What is the Full Name of your Business, Service or Brand"], value: formData.businessName },
        [fieldMap["Email"]]: { id: fieldMap["Email"], value: formData.email },
        [fieldMap["Phone"]]: { id: fieldMap["Phone"], value: formData.phone },
        [fieldMap["Description"]]: { id: fieldMap["Description"], value: formData.description },
        [fieldMap["Upload files"]]: {
          id: fieldMap["Upload files"],
          value: uploadedFiles.length ? 1 : "",
          files: uploadedFiles,
        },
      };

      const formPayload = {
        id: "4", // 🔹 use Beekeys Listing Form
        fields,
        settings: {
          objectType: "Form Setting",
          editActive: true,
          title: "Beekeys Listing Form",
        },
      };

      // 3️⃣ Submit form
      const response = await fetch(
        "https://beekeys-proxy.onrender.com/submit-ninja",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ formData: formPayload }),
        }
      );

      const data = await response.json();
      console.log("Proxy Response:", data);

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Form submission failed");
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
        {/* ✅ Review Section */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Review your submission
          </h2>
          <ul className="text-sm text-gray-700 space-y-2">
            <li><strong>Business Name:</strong> {formData.businessName}</li>
            <li><strong>Email:</strong> {formData.email}</li>
            <li><strong>Phone:</strong> {formData.phone}</li>
            <li><strong>Description:</strong> {formData.description}</li>
            <li><strong>Images:</strong> {formData.images?.length || 0} file(s)</li>
          </ul>
        </div>

        {/* ✅ Actions */}
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
            disabled={isLoading || Object.keys(fieldMap).length === 0}
            className="w-1/2 bg-yellow-500 text-white font-medium py-3 rounded-full hover:bg-yellow-600 transition disabled:opacity-50"
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>

      <Footer />

      {/* ✅ Success Modal */}
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

      {/* ✅ Error Modal */}
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
