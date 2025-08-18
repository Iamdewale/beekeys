import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from "./components/ScrollToTop";

import Home from './pages/Home';
import ExploreLocation from './pages/ExploreLocation';
import ExpNig from './pages/ExpNig';
import StateDetails from "./pages/StateDetails";
import SearchResults from './pages/SearchResults';
import About from './pages/About';
import Vendor from './pages/Vendor';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import RoleSelector from './pages/RoleSelector';
import BusinessListingStepOne from './pages/BusinessListingStepOne';
import BusinessListingStepTwo from './pages/BusinessListingStepTwo';
import BusinessListingStepThree from './pages/BusinessListingStepThree';
import BusinessListingStepFour from './pages/BusinessListingStepFour';
import ContributorsFormStepOne from './pages/ContributorsFormStepOne';
import ContributorsFormStepTwo from './pages/ContributorsFormStepTwo';
import ContributorsFormStepThree from './pages/ContributorsFormStepThree';
import ContributorsFormStepFour from './pages/ContributorsFormStepFour';
import { FormDataProvider } from './contexts/FormDataContext';
import BusinessDetails from './pages/BusinessDetails';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Regular pages */}
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

        {/* Business Listing Steps with scoped FormDataProvider */}
        <Route
          path="/listing-step-1"
          element={
            <FormDataProvider>
              <BusinessListingStepOne />
            </FormDataProvider>
          }
        />
        <Route
          path="/listing-step-2"
          element={
            <FormDataProvider>
              <BusinessListingStepTwo />
            </FormDataProvider>
          }
        />
        <Route
          path="/listing-step-3"
          element={
            <FormDataProvider>
              <BusinessListingStepThree />
            </FormDataProvider>
          }
        />
        <Route
          path="/listing-step-4"
          element={
            <FormDataProvider>
              <BusinessListingStepFour />
            </FormDataProvider>
          }
        />

        {/* Contributor Steps with scoped FormDataProvider */}
        <Route
          path="/contributor-step-1"
          element={
            <FormDataProvider>
              <ContributorsFormStepOne />
            </FormDataProvider>
          }
        />
        <Route
          path="/contributor-step-2"
          element={
            <FormDataProvider>
              <ContributorsFormStepTwo />
            </FormDataProvider>
          }
        />
        <Route
          path="/contributor-step-3"
          element={
            <FormDataProvider>
              <ContributorsFormStepThree />
            </FormDataProvider>
          }
        />
        <Route
          path="/contributor-step-4"
          element={
            <FormDataProvider>
              <ContributorsFormStepFour />
            </FormDataProvider>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
