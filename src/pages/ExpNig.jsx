import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import NavbarNG from "../components/NavbarNG";
import Footer from "../components/Footer";
import nigeria from "../assets/images/HeroNig.jpg";
import { fetchRegions } from "../services/api";

export default function ExpNig() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllStates, setShowAllStates] = useState(false);
  const [states, setStates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadRegions = async () => {
      const regions = await fetchRegions();
      const regionNames = regions.map((region) => region.name);
      setStates(regionNames);
    };

    loadRegions();
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <main className="font-sans">
      <NavbarNG />

      {/* Hero Section */}
      <section className="relative w-full text-white bg-gray-900 min-h-[899px] md:min-h-[899px] sm:aspect-[16/9]">
        <img
          src={nigeria}
          alt="Nigeria Map"
          className="absolute inset-0 w-full h-full object-cover z-0"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/60 z-0" />

        <div className="relative z-10 flex flex-col justify-center items-center h-full py-40 px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Discover Amazing Places <br /> Around You
          </h1>
          <p className="text-base md:text-lg text-gray-100 max-w-2xl mb-20">
            The simplest, smartest way to find businesses, services, and hidden
            gems across Nigeria. Your local discovery starts here
          </p>

          <div className="w-full max-w-3xl bg-white rounded-[10px] shadow-lg flex items-center px-4 h-12 min-h-[72px]">
            <FaSearch className="text-gray-400 text-lg mr-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search business / services / product or try @Beekeys"
              className="flex-1 text-gray-800 text-sm bg-transparent border-none focus:outline-none focus:ring-0"
              aria-label="Search input"
            />

            {/* 🔥 Updated to show on all screens */}
            <button
              onClick={handleSearch}
              className="inline-flex items-center gap-2 bg-yellow-500 text-white text-sm font-medium py-3 px-6 rounded-full hover:bg-yellow-600 transition group whitespace-nowrap"
            >
              Search
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 17L17 7M7 7h10v10"
                />
              </svg>
            </button>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {["Distance", "Open hours", "Accessibility", "Verification"].map(
              (filter, idx) => (
                <button
                  key={idx}
                  className="bg-white text-gray-700 px-4 py-1.5 rounded-full text-sm font-medium shadow-sm hover:bg-gray-100"
                >
                  {filter} <span className="ml-1">▼</span>
                </button>
              )
            )}
          </div>
        </div>
      </section>

      {/* Nigerian States Section */}
      <section className="py-12 px-4 pt-16 md:pt-20">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
          Explore Nigerian States
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {(showAllStates ? states : states.slice(0, 6)).map((state, index) => (
            <Link
              key={index}
              to={`/state/${state.toLowerCase().replace(/\s+/g, "-")}`}
              className="bg-gray-300 h-40 flex items-center justify-center text-gray-600 font-semibold hover:bg-yellow-400 transition"
            >
              {state} State
            </Link>
          ))}
        </div>

        {!showAllStates && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAllStates(true)}
              className="bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition"
            >
              Explore More
            </button>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
