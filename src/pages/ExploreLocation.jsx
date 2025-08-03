import { useState } from "react";
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
      href: "/nigeria",
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
    <main className="font-sans">
      <Navbar />
      <div className="h-16 md:h-20" />

      <section className="text-center py-12 px-4">
        <h2 className="text-2xl md:text-3xl font-semibold">
          Explore Our Active Locations. Watch the Progress
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          Click on the map and follow the links on the popup to go to the country portal
        </p>

        {/* Desktop: Map with overlay buttons */}
        <div className="relative mt-6 mx-auto max-w-4xl w-full hidden md:block">
          <img src={worldMap} alt="Map showing active locations" className="w-full" />

          {/* Overlay Buttons */}
          {countries.map((country, index) => (
            <a
              key={country.name}
              href={country.href}
              className={`absolute ${
                index === 0
                  ? "top-[50%] left-[45%]"
                  : index === 1
                  ? "top-[50%] left-[47%]"
                  : "top-[52%] left-[42%]"
              } flex items-center gap-2 bg-primary text-white text-xs px-2 py-1 rounded-full hover:bg-primary-dark transition`}
            >
              <img src={country.flag} alt={`${country.name} flag`} className="w-4 h-4 rounded-full" />
              {country.name}
            </a>
          ))}
        </div>

        {/* Mobile: Button to trigger modal */}
        <div className="mt-8 md:hidden">
          <button
            onClick={() => setShowModal(true)}
            className="bg-customGold text-white px-6 py-2 text-sm rounded-full hover:bg-yellow-500 transition font-medium"
          >
            Explore Location
          </button>
        </div>

        {/* Mobile: Modal */}
        {showModal && (
          <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Active Locations</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  &times;
                </button>
              </div>
              <ul className="space-y-3">
                {countries.map((country) => (
                  <li key={country.name}>
                    <a
                      href={country.href}
                      className="flex items-center gap-3 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition text-sm"
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
      </section>

      <Footer />
    </main>
  );
}
