// src/components/StateHero.jsx
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function StateHero({
  title,
  subtitle,
  backgroundUrl,
  ctaText,
  ctaOnClick,
  onSearch
}) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim() && onSearch) {
      onSearch(query.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <section
      className="relative w-full h-[60vh] flex flex-col items-center justify-center text-center text-white px-4"
      style={{
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl w-full flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-2xl font-light drop-shadow-md mb-6">
            {subtitle}
          </p>
        )}

        {/* Search bar */}
        <div className="w-full max-w-xl bg-white rounded-lg shadow-lg flex items-center px-4 h-12 mb-4">
          <FaSearch className="text-gray-400 text-lg mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search businesses/services in this state"
            className="flex-1 text-gray-800 text-sm bg-transparent border-none focus:outline-none focus:ring-0"
          />
          <button
            onClick={handleSearch}
            className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600 transition"
          >
            Search
          </button>
        </div>

        {ctaText && (
          <button
            onClick={ctaOnClick}
            className="bg-yellow-500 text-white px-6 py-3 rounded-full font-medium text-base md:text-lg hover:bg-yellow-600 transition-colors shadow-lg"
          >
            {ctaText}
          </button>
        )}
      </div>
    </section>
  );
}
