// src/routes/ContributorsRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { FormDataProvider } from "../contexts/FormDataContext";
import StepOne from "../pages/ContributorListing/StepOne";
import StepTwo from "../pages/ContributorListing/StepTwo";
import StepThree from "../pages/ContributorListing/StepThree";
import StepFour from "../pages/ContributorListing/StepFour";

import { Navigate } from "react-router-dom";

export default function ContributorsRoutes() {
  return (
    <FormDataProvider>
      <Routes>
        <Route index element={<Navigate to="step-1" replace />} />
        <Route path="step-1" element={<StepOne />} />
        <Route path="step-2" element={<StepTwo />} />
        <Route path="step-3" element={<StepThree />} />
        <Route path="step-4" element={<StepFour />} />
      </Routes>
    </FormDataProvider>
  );
}
