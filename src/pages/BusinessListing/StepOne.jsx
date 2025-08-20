import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import NavbarNG from "../../components/NavbarNG";
import Footer from "../../components/Footer";

import { useFormData } from "../../contexts/FormDataContext";
import useValidation from "../../hooks/useValidation";
import { stepValidationRules } from "../../validationRules";

import { FiUploadCloud } from "react-icons/fi";

const StepOne = () => {
  const navigate = useNavigate();
  const { formData, setFormData } = useFormData();
  const { errors, validate } = useValidation(stepValidationRules[1]);
  const [localImages, setLocalImages] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setLocalImages(files);
    setFormData((prev) => ({ ...prev, images: files }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    const errs = validate(formData);
    if (Object.keys(errs).length === 0) {
      navigate("/listing-step-2");
    }
  };

  return (
    <main className="font-sans bg-white min-h-screen flex flex-col">
      <NavbarNG />
      <div className="flex-grow pt-32 pb-24 px-4 max-w-3xl mx-auto">
        {/* Stepper + Form ... */}
        {/* Example for Business Name with errors: */}
        <form onSubmit={handleNext}>
          <input
            value={formData.businessName || ""}
            onChange={(e) => setFormData((p) => ({ ...p, businessName: e.target.value }))}
            className={errors.businessName ? "border-red-500" : ""}
          />
          {errors.businessName && <p className="text-red-500">{errors.businessName}</p>}
          {/* Additional fields */}
          <button type="submit">Next</button>
        </form>
      </div>
      <Footer />
    </main>
  );
};
export default StepOne;
