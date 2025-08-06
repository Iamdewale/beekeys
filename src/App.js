import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from "./components/ScrollToTop"

import Home from './pages/Home';
import ExploreLocation from './pages/ExploreLocation';
import ExpNig from './pages/ExpNig';
import SearchResults from './pages/SearchResults';
import About from './pages/About';
import Vendor from './pages/Vendor';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import RoleSelector from './pages/RoleSelector';
import BusinessListingStepOne from './pages/BusinessListingStepOne';
import BusinessListingStepTwo from './pages/BusinessListingStepTwo';
import BusinessListingStepThree  from './pages/BusinessListingStepThree';
import BusinessListingStepFour  from './pages/BusinessListingStepFour';


function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<ExploreLocation />} />
        <Route path="/nigeria" element={<ExpNig />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/about" element={<About />} />
        <Route path="/vendor" element={<Vendor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/select-role" element={<RoleSelector />} />
        <Route path="/listing-step-1" element={<BusinessListingStepOne />} />
        <Route path="/listing-step-2" element={<BusinessListingStepTwo />} />
        <Route path="/listing-step-3" element={<BusinessListingStepThree />} />
        <Route path="/listing-step-4" element={<BusinessListingStepFour />} />
      </Routes>
    </Router>
  );
}

export default App;
