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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const isFormValid =
    form.email &&
    form.phone &&
    form.password &&
    form.confirmPassword &&
    form.password === form.confirmPassword &&
    form.agreeTerms;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!isFormValid) {
      return setError("Please complete the form correctly.");
    }

    const username = `${form.email.split("@")[0]}${Math.floor(
      Math.random() * 10000
    )}`;
    setLoading(true);

    try {
      const res = await fetch(
        "https://app.beekeys.com/nigeria/wp-json/userswp/v1/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_login: username,
            user_email: form.email,
            user_pass: form.password,
            phone: form.phone,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok || data.success === false) {
        throw new Error(data.message || "Registration failed. Please try again.");
      }

      const token = data?.data?.token;
      if (token) {
        localStorage.setItem("token", token);
        setSuccessMsg("Registration successful! Redirecting...");
        setTimeout(() => navigate("/select-role"), 1500); // 🔄 Updated redirect
      } else {
        setError("Registered, but could not auto-login.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="font-sans bg-gray-50 min-h-screen flex flex-col">
      <NavbarNG />

      <div className="flex-grow pt-28 pb-24 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-black">Register</h2>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-customGold font-semibold">
                Sign In
              </Link>
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && <p className="text-red-500">{error}</p>}
            {successMsg && <p className="text-green-600">{successMsg}</p>}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
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
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-800">
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
              <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-customGold pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <small className="text-gray-500">
                At least 8 characters, 1 uppercase, 1 number
              </small>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-800">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-customGold pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
              {form.password &&
                form.confirmPassword &&
                form.password !== form.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    Passwords do not match
                  </p>
                )}
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

            <button
              type="submit"
              disabled={!isFormValid || loading}
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
