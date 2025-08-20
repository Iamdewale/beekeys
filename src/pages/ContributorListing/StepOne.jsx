import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarNG from "../../components/NavbarNG";
import Footer from "../../components/Footer";

const StepOne = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    whatsapp: "",
    state: "",
    city: "",
    localGovernment: "",
    ageRange: "",
    hasExperience: "",
    experienceDesc: "",
    deviceUsed: "",
    otherDeviceName: "",
    deviceType: "",
    hasEditingSkills: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNext = () => {
    // Add validation here if needed
    navigate("/contributor-step-2");
  };

  return (
    <main className="bg-white font-sans min-h-screen flex flex-col">
      <NavbarNG />

      <div className="flex-grow pt-32 pb-20 px-4 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-2xl font-semibold">Beekeys Contributor Application Form</h1>
          <p className="text-sm text-gray-600 mt-1">
            Fields marked with an <span className="text-red-500">*</span> are required
          </p>
        </div>

        {/* Stepper */}
        <div className="flex justify-between items-center mb-10">
          {[
            "Personal information",
            "Image details",
            "Permission & Acknowledgement",
            "Payment details",
          ].map((label, index) => (
            <div key={index} className="flex-1 flex flex-col items-center text-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                  index === 0 ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-700"
                }`}
              >
                {index + 1}
              </div>
              <span className="mt-2 text-xs text-gray-600">{label}</span>
            </div>
          ))}
        </div>

        {/* Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          {/* Left Column */}
          <div>
            <label className="block font-semibold mb-1">First name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300"
              placeholder="Enter first name"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Last name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300"
              placeholder="Enter last name"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300"
              placeholder="Enter email address"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Phone number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300"
              placeholder="Enter phone number"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Whatsapp Number</label>
            <input
              type="text"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300"
              placeholder="Enter Whatsapp Number"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Current State</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300"
            >
              <option value="">Select state</option>
              <option value="Lagos">Lagos</option>
              <option value="Abuja">Abuja</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300"
              placeholder="Enter city"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Local Government</label>
            <input
              type="text"
              name="localGovernment"
              value={formData.localGovernment}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300"
              placeholder="Enter Local Government"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-semibold mb-2">Select age</label>
            {[
              "Under 18(with guardian consent)",
              "18–24",
              "25–34",
              "34–44",
              "44 and above",
            ].map((range, idx) => (
              <label key={idx} className="flex items-center space-x-2 mb-1">
                <input
                  type="radio"
                  name="ageRange"
                  value={range}
                  checked={formData.ageRange === range}
                  onChange={handleChange}
                />
                <span>{range}</span>
              </label>
            ))}
          </div>

          <div className="md:col-span-2">
            <label className="block font-semibold mb-2">
              Do you have any experience with photography or digital content creation? *
            </label>
            <label className="flex items-center space-x-2 mb-1">
              <input
                type="radio"
                name="hasExperience"
                value="Yes"
                checked={formData.hasExperience === "Yes"}
                onChange={handleChange}
              />
              <span>Yes</span>
            </label>
            <label className="flex items-center space-x-2 mb-3">
              <input
                type="radio"
                name="hasExperience"
                value="No"
                checked={formData.hasExperience === "No"}
                onChange={handleChange}
              />
              <span>No</span>
            </label>
            <textarea
              name="experienceDesc"
              value={formData.experienceDesc}
              onChange={handleChange}
              placeholder="Please briefly describe"
              className="w-full px-4 py-2 rounded-lg border border-gray-300"
              rows={3}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-semibold mb-2">What device do you use for photography?</label>
            {["Smartphone", "Digital camera", "Others(specify)"].map((device, i) => (
              <label key={i} className="flex items-center space-x-2 mb-1">
                <input
                  type="radio"
                  name="deviceUsed"
                  value={device}
                  checked={formData.deviceUsed === device}
                  onChange={handleChange}
                />
                <span>{device}</span>
              </label>
            ))}
          </div>

          <div>
            <label className="block font-semibold mb-1">Name of other devices</label>
            <input
              type="text"
              name="otherDeviceName"
              value={formData.otherDeviceName}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300"
              placeholder="Enter device name"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Specify Type</label>
            <input
              type="text"
              name="deviceType"
              value={formData.deviceType}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300"
              placeholder="Enter device type"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-semibold mb-2">
              Do you have basic editing skills or use photo-enhancement tools?
            </label>
            <label className="flex items-center space-x-2 mb-1">
              <input
                type="radio"
                name="hasEditingSkills"
                value="Yes"
                checked={formData.hasEditingSkills === "Yes"}
                onChange={handleChange}
              />
              <span>Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="hasEditingSkills"
                value="No"
                checked={formData.hasEditingSkills === "No"}
                onChange={handleChange}
              />
              <span>No</span>
            </label>
          </div>

          <div className="md:col-span-2 pt-4">
            <button
              type="button"
              onClick={handleNext}
              className="w-full bg-yellow-500 text-white font-medium py-3 rounded-full hover:bg-yellow-600 transition"
            >
              Continue to Step 2
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </main>
  );
};

export default StepOne;
