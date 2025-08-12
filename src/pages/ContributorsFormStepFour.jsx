import React, { useState } from "react";
import NavbarNG from "../components/NavbarNG";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const ContributorFormStepFour = () => {
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [notes, setNotes] = useState("");

  const handleBack = () => {
    navigate("/contributor-step-3");
  };
const handleSubmit = async () => {
  if (!paymentMethod || !accountName || !accountNumber) {
    alert("Please fill in all required payment fields.");
    return;
  }

  try {
    const response = await fetch(`${window.wpApiSettings.root}beekeys/v1/contributor`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': window.wpApiSettings.nonce,
      },
      body: JSON.stringify({
        paymentMethod,
        accountName,
        accountNumber,
        bankName,
        notes,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.error || 'Error submitting form.');
      return;
    }

    alert('Form submitted successfully!');
    navigate('/thank-you');

  } catch (err) {
    console.error(err);
    alert('An error occurred. Please try again.');
  }
};

  return (
    <main className="bg-white font-sans min-h-screen flex flex-col">
      <NavbarNG />

      <div className="flex-grow pt-32 pb-20 px-4 max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-2xl font-semibold">Beekeys Contributor Application Form</h1>
          <p className="text-sm text-gray-600 mt-1">
            Fields marked with an <span className="text-red-500">*</span> are required
          </p>
        </div>

        {/* Stepper */}
        <div className="flex justify-between items-center mb-10">
          {["Personal information", "Image details", "Permission & Acknowledgement", "Payment details"].map(
            (label, index) => (
              <div key={index} className="flex-1 flex flex-col items-center text-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                    index === 3 ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {index + 1}
                </div>
                <span className="mt-2 text-xs text-gray-600">{label}</span>
              </div>
            )
          )}
        </div>

        {/* Payment Form */}
        <form className="space-y-6">
          {/* Payment Method */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Select Payment Method <span className="text-red-500">*</span>
            </label>
            {["Bank Transfer", "Mobile Money", "Other"].map((method, i) => (
              <label key={i} className="flex items-center space-x-2 mb-1">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>{method}</span>
              </label>
            ))}
          </div>

          {/* Account Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Account Holder Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300"
              placeholder="Enter full name on account"
            />
          </div>

          {/* Account Number */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Account Number / Mobile Wallet <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300"
              placeholder="Enter account or wallet number"
            />
          </div>

          {/* Bank Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Bank Name or Payment Platform
            </label>
            <input
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300"
              placeholder="E.g., GTBank, Opay, M-Pesa"
            />
          </div>

          {/* Optional Notes */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Additional Notes (Optional)
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300"
              placeholder="Add comments or notes..."
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={handleBack}
              className="bg-gray-200 text-gray-700 font-medium py-2 px-6 rounded-full hover:bg-gray-300 transition"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-yellow-500 text-white font-medium py-2 px-6 rounded-full hover:bg-yellow-600 transition"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </main>
  );
};

export default ContributorFormStepFour;
