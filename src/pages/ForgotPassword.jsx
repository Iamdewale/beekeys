import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavbarNG from "../components/NavbarNG";
import Footer from "../components/Footer";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(""); // success or error
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setStatus("");
    setMessage("");

    if (!email.trim()) {
      setStatus("error");
      setMessage("Please enter your email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://app.beekeys.com/wp-json/custom/v1/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_login: email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setMessage(data.message || "Password reset failed.");
        setEmail("");
      } else {
        setStatus("success");
        setMessage("Check your email for password reset instructions.");
      }
    } catch (err) {
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
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-black">Forgot Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Remembered it?{" "}
              <Link to="/login" className="text-customGold font-semibold">
                Go back to Login
              </Link>
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleReset}>
            {status && (
              <p className={`text-sm ${status === "error" ? "text-red-500" : "text-green-600"}`}>
                {message}
              </p>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-customGold"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-customGold hover:bg-yellow-500 transition text-white font-semibold py-3 rounded-lg disabled:opacity-50"
            >
              {loading ? "Sending reset link..." : "Send Reset Link"}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default ForgotPassword;
