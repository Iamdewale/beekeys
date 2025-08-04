import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavbarNG from "../components/NavbarNG";
import Footer from "../components/Footer";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="font-sans bg-white min-h-screen flex flex-col">
      {/* Navbar (assumed fixed) */}
      <NavbarNG />

      {/* Content */}
      <div className="flex-grow pt-32 pb-24 flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6">
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

          {/* Form */}
          <form className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-customGold focus:border-transparent"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-customGold focus:border-transparent"
              />
              <div className="text-right mt-1">
                <Link to="/forgot-password" className="text-sm text-red-600 hover:underline">
                  Forget password
                </Link>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-customGold hover:bg-yellow-500 transition text-white font-semibold py-3 rounded-lg"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default LoginPage;
