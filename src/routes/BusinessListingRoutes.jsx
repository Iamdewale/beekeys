// src/routes/BusinessListingRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { FormDataProvider } from "../contexts/FormDataContext";
import StepOne from "../pages/BusinessListing/StepOne";
import StepTwo from "../pages/BusinessListing/StepTwo";
import StepThree from "../pages/BusinessListing/StepThree";
import StepFour from "../pages/BusinessListing/StepFour";

export default function BusinessListingRoutes() {
  return (
    <FormDataProvider>
      <Routes>
        <Route path="step-1" element={<StepOne />} />
        <Route path="step-2" element={<StepTwo />} />
        <Route path="step-3" element={<StepThree />} />
        <Route path="step-4" element={<StepFour />} />
      </Routes>
    </FormDataProvider>
  );
}
