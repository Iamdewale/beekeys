import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavbarNG from "../components/NavbarNG";
import Footer from "../components/Footer";

const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    const { email, phone, password, confirmPassword, agreeTerms } = form;

    if (!email || !phone || !password || !confirmPassword) {
      return setError("Please fill all the fields.");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    if (!agreeTerms) {
      return setError("You must agree to the Terms and Conditions.");
    }

    const username = email.split("@")[0] + Math.floor(Math.random() * 10000);

    setLoading(true);

    try {
      const response = await fetch(
        "https://app.beekeys.com/wp-json/userswp/v1/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
            phone,
          }),
        }
      );

      const data = await response.json();
      console.log("Signup response:", data); // 🔍 Log the response for debugging

      if (!response.ok || !data.success) {
        return setError(
          data.message || "Registration failed. Please try again."
        );
      }

      // ✅ Check token in data.data.token
      const token = data?.data?.token;
      if (token) {
        localStorage.setItem("token", token);
        setSuccessMsg("Registration successful! Logging you in...");

        setTimeout(() => {
          navigate("/dashboard"); // redirect to your main page
        }, 1500);
      } else {
        setError(data.message || "Registered, but could not auto-login.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="font-sans bg-white min-h-screen flex flex-col">
      <NavbarNG />

      <div className="flex-grow pt-32 pb-24 flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-black">Register</h2>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-customGold font-semibold">
                Sign In
              </Link>
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && <p className="text-red-500">{error}</p>}
            {successMsg && <p className="text-green-600">{successMsg}</p>}

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
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-customGold"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-gray-800"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-customGold"
                required
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
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-customGold"
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-gray-800"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-customGold"
                required
              />
            </div>

            {/* Terms */}
            <div className="flex items-center text-sm text-gray-600">
              <input
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                checked={form.agreeTerms}
                onChange={handleChange}
                className="w-4 h-4 mr-2 border-gray-300"
              />
              <label htmlFor="agreeTerms">
                I agree to the{" "}
                <Link to="/terms" className="text-customGold hover:underline">
                  Terms and Conditions
                </Link>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-customGold hover:bg-yellow-500 transition text-white font-semibold py-3 rounded-lg disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default SignUp;
