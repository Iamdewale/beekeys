import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import ExploreLocation from './pages/ExploreLocation';
import ExpNig from './pages/ExpNig';
import About from './pages/About';
import Vendor from './pages/Vendor';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<ExploreLocation />} />
        <Route path="/nigeria" element={<ExpNig />} />
        <Route path="/about" element={<About />} />
        <Route path="/vendor" element={<Vendor />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
