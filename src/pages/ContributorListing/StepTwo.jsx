import React, { useState } from "react";
import NavbarNG from "../../components/NavbarNG";
import Footer from "../../components/Footer";
import { FiUploadCloud } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const StepTwo = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");

  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleNext = () => {
    // You can add validation here
    navigate("/contributor-step-3");
  };

  const handleBack = () => {
    navigate("/contributor-step-1");
  };

  return (
    <main className="bg-white font-sans min-h-screen flex flex-col">
      <NavbarNG />

      <div className="flex-grow pt-32 pb-20 px-4 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-2xl font-semibold">Beekeys Contributor Application Form</h1>
          <p className="text-sm text-gray-600 mt-1">
            Fields marked with an <span className="text-red-500">*</span> are required
          </p>
        </div>

        {/* Stepper */}
        <div className="flex justify-between items-center mb-10">
          {["Personal information", "Image details", "Permission & Acknowledgement", "Payment details"].map(
            (label, index) => (
              <div key={index} className="flex-1 flex flex-col items-center text-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                    index === 1 ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {index + 1}
                </div>
                <span className="mt-2 text-xs text-gray-600">{label}</span>
              </div>
            )
          )}
        </div>

        {/* Upload Section */}
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Upload your images <span className="text-red-500">*</span>
            </label>
            <label
              htmlFor="upload"
              className="border-2 border-dashed border-gray-300 rounded-lg w-full py-10 flex flex-col items-center justify-center cursor-pointer text-center text-sm text-gray-500 hover:border-yellow-400"
            >
              <FiUploadCloud className="text-3xl text-blue-500 mb-2" />
              <span>Click or drag file to this area to upload</span>
              <span className="text-xs text-gray-400 mt-1">
                You can upload multiple images at once (JPG, PNG).
              </span>
              <input
                id="upload"
                type="file"
                className="hidden"
                multiple
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
            {images.length > 0 && (
              <div className="mt-4 text-sm text-gray-600">
                <p>{images.length} file(s) selected:</p>
                <ul className="list-disc ml-5 mt-2">
                  {Array.from(images).map((file, i) => (
                    <li key={i}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Describe the content or theme of your images <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="E.g., These images showcase local culture and street photography from Lagos."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            ></textarea>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={handleBack}
              className="bg-gray-200 text-gray-700 font-medium py-2 px-6 rounded-full hover:bg-gray-300 transition"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="bg-yellow-500 text-white font-medium py-2 px-6 rounded-full hover:bg-yellow-600 transition"
            >
              Continue to Step 3
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </main>
  );
};

export default StepTwo;
