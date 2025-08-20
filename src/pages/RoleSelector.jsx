import React, { useState, useEffect } from "react";
import { FaStore, FaUser } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import NavbarNG from "../components/NavbarNG";
import Footer from "../components/Footer";

const RoleSelector = () => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const options = [
    {
      key: "business",
      title: "List Business",
      description: "Represent your brand in a simple effective way",
      icon: <FaStore className="text-xl" />,
      route: "/listing",
    },
    {
      key: "contributor",
      title: "As a Contributor",
      description:
        "Empower yourself to enhance the accuracy and richness of our business directory platform",
      icon: <FaUser className="text-xl" />,
      route: "/contributor",
    },
  ];

  // When selected changes, navigate immediately
  useEffect(() => {
    if (selected) {
      const selectedOption = options.find((opt) => opt.key === selected);
      if (selectedOption) {
        navigate(selectedOption.route);
      }
    }
  }, [selected, navigate, options]);

  const handleContinue = () => {
    if (!selected) return;
    // Just in case user clicks continue without auto navigation working
    const selectedOption = options.find((opt) => opt.key === selected);
    if (selectedOption) {
      navigate(selectedOption.route);
    }
  };

  return (
    <main className="font-sans bg-white min-h-screen flex flex-col">
      <NavbarNG />

      <div className="flex-grow pt-32 pb-24 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md space-y-6">
          <h2 className="text-2xl font-semibold text-center text-black">
            Here are the things <br /> you can do
          </h2>

          {/* Options */}
          <div className="space-y-4">
            {options.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setSelected(opt.key)}
                className={`w-full flex items-start p-4 border rounded-lg transition ${
                  selected === opt.key
                    ? "border-yellow-500 bg-yellow-50"
                    : "border-gray-300"
                }`}
              >
                <div className="mr-4 mt-1">{opt.icon}</div>
                <div className="text-left">
                  <h3 className="text-md font-semibold text-black">{opt.title}</h3>
                  <p className="text-sm text-gray-500">{opt.description}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Continue */}
          <button
            onClick={handleContinue}
            disabled={!selected}
            className={`w-full flex justify-center items-center gap-2 text-sm font-medium transition ${
              selected
                ? "text-black hover:text-yellow-600"
                : "text-gray-400 cursor-not-allowed"
            }`}
          >
            Continue <FiArrowRight />
          </button>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default RoleSelector;
