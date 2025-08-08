import React, { useState } from "react";
import NavbarNG from "../components/NavbarNG";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const ContributorFormStepThree = () => {
  const navigate = useNavigate();
  const [agreement, setAgreement] = useState(false);
  const [fullName, setFullName] = useState("");

  const handleNext = () => {
    if (!agreement || fullName.trim() === "") {
      alert("Please acknowledge and provide your full name.");
      return;
    }

    navigate("/contributor-step-4");
  };

  const handleBack = () => {
    navigate("/contributor-step-2");
  };

  return (
    <main className="bg-white font-sans min-h-screen flex flex-col">
      <NavbarNG />

      <div className="flex-grow pt-32 pb-20 px-4 max-w-3xl mx-auto">
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
                    index === 2 ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {index + 1}
                </div>
                <span className="mt-2 text-xs text-gray-600">{label}</span>
              </div>
            )
          )}
        </div>

        {/* Permission Section */}
        <form className="space-y-6">
          <div>
            <p className="text-sm text-gray-700 leading-relaxed">
              By submitting this form, you acknowledge that:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-700 mt-2 space-y-1">
              <li>You are the rightful owner of the images submitted.</li>
              <li>You grant Beekeys permission to use your content for publication and promotional purposes.</li>
              <li>Your content complies with copyright and intellectual property rules.</li>
              <li>You understand your images may be reviewed before approval.</li>
            </ul>
          </div>

          {/* Agreement */}
          <div>
            <label className="flex items-center space-x-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={agreement}
                onChange={(e) => setAgreement(e.target.checked)}
              />
              <span>I have read and agree to the terms stated above.</span>
            </label>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Enter your full name as a digital signature <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
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
              Continue to Step 4
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </main>
  );
};

export default ContributorFormStepThree;
