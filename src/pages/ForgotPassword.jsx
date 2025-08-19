import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavbarNG from "../components/NavbarNG";
import Footer from "../components/Footer";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(""); // 'success' | 'error'
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const handleReset = async (e) => {
  e.preventDefault();
  setStatus("");
  setMessage("");

  if (!email.trim() || !validateEmail(email)) {
    setStatus("error");
    setMessage("Please enter a valid email address.");
    return;
  }

  setLoading(true);

  try {
    const response = await fetch("https://beekeys-proxy.onrender.com/api/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_login: email }),
    });

    const data = await response.json();

    if (!response.ok) {
      setStatus("error");
      setMessage(data?.message || data?.error || "Password reset failed.");
    } else {
      setStatus("success");
      setMessage("✅ Check your email for password reset instructions.");
      setEmail("");
    }
  } catch {
    setStatus("error");
    setMessage("Something went wrong. Please try again later.");
  } finally {
    setLoading(false);
  }
};


  return (
    <main className="font-sans bg-white min-h-screen flex flex-col">
      <NavbarNG />

      <div className="flex-grow pt-32 pb-24 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 space-y-6">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-black">
              Forgot Password
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Remembered it?{" "}
              <Link to="/login" className="text-customGold font-semibold">
                Go back to Login
              </Link>
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleReset}>
            {status && (
              <div
                className={`p-3 rounded-md text-sm animate-fadeIn ${
                  status === "error"
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {message}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-customGold disabled:opacity-50 disabled:cursor-not-allowed"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading
                  ? "bg-yellow-300 cursor-not-allowed"
                  : "bg-customGold hover:bg-yellow-500"
              } transition text-white font-semibold py-3 rounded-lg`}
            >
              {loading ? "Sending reset link..." : "Send Reset Link"}
            </button>
          </form>
        </div>
      </div>

      <Footer />

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-3px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }
      `}</style>
    </main>
  );
};

export default ForgotPassword;
