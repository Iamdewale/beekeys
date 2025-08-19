import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavbarNG from "../components/NavbarNG";
import Footer from "../components/Footer";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Close modal with ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setShowModal(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://app.beekeys.com/nigeria/wp-json/jwt-auth/v1/token",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: email, password }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Login failed");
        setShowModal(true);
        setLoading(false);
        return;
      }

      const data = await response.json();
      localStorage.setItem("beekeys_token", data.token);
      window.dispatchEvent(new Event("beekeys-login-status"));
      navigate("/select-role");
    } catch (err) {
      setError("An error occurred during login");
      setShowModal(true);
      setLoading(false);
    }
  };

  return (
    <main className="font-sans bg-white min-h-screen flex flex-col">
      <NavbarNG />

      {/* Error Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full relative animate-scaleIn">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ×
            </button>
            <h2 className="text-xl font-semibold text-red-600 mb-2">
              Login Failed
            </h2>
            <div
              className="text-gray-700"
              dangerouslySetInnerHTML={{
                __html: error || "Invalid credentials",
              }}
            />
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-grow pt-32 pb-24 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 space-y-6">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-black">Welcome Back</h2>
            <p className="mt-2 text-sm text-gray-600">
              Don’t have an account yet?{" "}
              <Link to="/signup" className="text-customGold font-semibold">
                Sign up
              </Link>
            </p>
          </div>

          {/* Login Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email */}
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
                placeholder="Enter your email address"
                className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-customGold focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                required
                disabled={loading}
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-customGold focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                required
                disabled={loading}
              />
              <div className="text-right mt-1">
                <Link
                  to="/forgot-password"
                  className="text-sm text-red-600 hover:underline"
                >
                  Forget password
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading
                  ? "bg-yellow-300 cursor-not-allowed"
                  : "bg-customGold hover:bg-yellow-500"
              } transition text-white font-semibold py-3 rounded-lg`}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>

      <Footer />

      {/* Animation styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }
      `}</style>
    </main>
  );
};

export default LoginPage;
