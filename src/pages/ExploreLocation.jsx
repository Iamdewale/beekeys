import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import worldMap from "../assets/images/worldmap.png";

import nigeriaFlag from "../assets/flags/nigeria.png";
import cameroonFlag from "../assets/flags/cameroon.png";
import ghanaFlag from "../assets/flags/ghana.png";

export default function ExploreLocation() {
  const [showModal, setShowModal] = useState(false);

  const countries = [
    {
      name: "Nigeria",
      href: "/country/nigeria",
      flag: nigeriaFlag,
    },
    {
      name: "Cameroon",
      href: "/country/cameroon",
      flag: cameroonFlag,
    },
    {
      name: "Ghana",
      href: "/country/ghana",
      flag: ghanaFlag,
    },
  ];

  return (
    <div className="relative z-0 font-sans">
      <Navbar />
      <div className="h-16 md:h-20"></div>

      <section className="text-center py-12 px-4">
        <h2 className="text-2xl md:text-3xl font-semibold">
          Explore Our Active Locations. Watch the Progress
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          Click on the map and follow the links on the popup to go to the
          country portal
        </p>

        {/* Desktop Map + Overlays */}
        <div className="relative mt-6 mx-auto max-w-4xl w-full hidden md:block">
          <img src={worldMap} alt="Map" className="w-full" />

          {/* Overlay Buttons */}
          <a
            href="/country/nigeria"
            className="absolute top-[50%] left-[45%] flex items-center gap-2 bg-primary text-white text-xs px-2 py-1 rounded-full hover:bg-primary-dark transition"
          >
            <img src={nigeriaFlag} alt="Nigeria flag" className="w-4 h-4 rounded-full" />
            Nigeria
          </a>
          <a
            href="/country/cameroon"
            className="absolute top-[50%] left-[47%] flex items-center gap-2 bg-primary text-white text-xs px-2 py-1 rounded-full hover:bg-primary-dark transition"
          >
            <img src={cameroonFlag} alt="Cameroon flag" className="w-4 h-4 rounded-full" />
            Cameroon
          </a>
          <a
            href="/country/ghana"
            className="absolute top-[52%] left-[42%] flex items-center gap-2 bg-primary text-white text-xs px-2 py-1 rounded-full hover:bg-primary-dark transition"
          >
            <img src={ghanaFlag} alt="Ghana flag" className="w-4 h-4 rounded-full" />
            Ghana
          </a>
        </div>

        {/* Mobile Button */}
        <div className="mt-8 md:hidden">
          <button
            onClick={() => setShowModal(true)}
            className="bg-primary text-white px-6 py-2 text-sm rounded-full hover:bg-primary-dark transition font-medium"
          >
            Explore Locations
          </button>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          ></div>

          {/* Modal Card */}
          <div className="relative z-60 bg-white rounded-xl p-6 w-full max-w-sm shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Active Locations</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                ✕
              </button>
            </div>
            <ul className="space-y-3">
              {countries.map((country) => (
                <li key={country.name}>
                  <a
                    href={country.href}
                    className="flex items-center gap-3 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition text-sm"
                  >
                    <img
                      src={country.flag}
                      alt={`${country.name} flag`}
                      className="w-5 h-5 rounded-full"
                    />
                    {country.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
