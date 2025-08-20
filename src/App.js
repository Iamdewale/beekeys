import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "leaflet/dist/leaflet.css";

import Home from "./pages/Home";
import ExploreLocation from "./pages/ExploreLocation";
import ExpNig from "./pages/ExpNig";
import StateDetails from "./pages/StateDetails";
import SearchResults from "./pages/SearchResults";
import About from "./pages/About";
import Vendor from "./pages/Vendor";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import RoleSelector from "./pages/RoleSelector";
import BusinessDetails from "./pages/BusinessDetails";
import NotFound from "./pages/NotFound";

import BusinessListingRoutes from "./routes/BusinessListingRoutes";
import ContributorsRoutes from "./routes/ContributorsRoutes.jsx";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Static pages */}
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<ExploreLocation />} />
        <Route path="/nigeria" element={<ExpNig />} />
        <Route path="/state/:slug" element={<StateDetails />} />
        <Route path="/business/:id" element={<BusinessDetails />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/about" element={<About />} />
        <Route path="/vendor" element={<Vendor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/select-role" element={<RoleSelector />} />

        {/* Multi-step forms */}
        <Route path="/listing/*" element={<BusinessListingRoutes />} />
        <Route path="/contributor/*" element={<ContributorsRoutes />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
