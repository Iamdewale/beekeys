import React from "react";
import { useNavigate } from "react-router-dom";
import NavbarNG from "../components/NavbarNG";
import Footer from "../components/Footer";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="font-sans bg-white min-h-screen flex flex-col">
      <NavbarNG />
      <div className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-6xl font-bold text-yellow-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-gray-600 max-w-md mb-6">
          Oops! The page you’re looking for doesn’t exist, has been moved, or is temporarily unavailable.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-yellow-500 text-white px-6 py-3 rounded-full hover:bg-yellow-600 transition"
        >
          Back to Home
        </button>
      </div>
      <Footer />
    </main>
  );
}
