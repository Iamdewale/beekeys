import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-lg fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/" className="text-2xl font-bold">
            <img
              src="/assets/logos/beekeys-logo.png"
              alt="Beekeys Logo"
              className="h-8 w-auto"
            />
          </Link>
        </div>

        {/* Desktop Links */}
        <nav className="space-x-6 hidden md:flex">
          <Link to="" className="text-gray-700 hover:text-black">
            Features
          </Link>
          <Link to="" className="text-gray-700 hover:text-black">
            Pricing
          </Link>
          <Link to="" className="text-gray-700 hover:text-black">
            About
          </Link>
          {/* <Link to="/vendor" className="text-gray-700 hover:text-black">
            Vendor
          </Link>
          <Link to="/login" className="text-gray-700 hover:text-black">
            Login
          </Link> */}
        </nav>

        {/* CTA Button - Desktop */}
        <Link
          to="/explore"
          className="hidden md:inline-flex items-center gap-2 bg-customGold text-white text-sm font-medium py-3 px-6 rounded-full hover:bg-yellow-500 transition group whitespace-nowrap"
        >
          Explore location
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
          </svg>
        </Link>

        {/* Hamburger Icon */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white shadow transition-all duration-300 ease-in-out">
          <Link to="" className="block text-gray-700 hover:text-black">
            Features
          </Link>
          <Link to="" className="block text-gray-700 hover:text-black">
            Pricing
          </Link>
          {/* <Link to="/vendor" className="block text-gray-700 hover:text-black">
            Vendor
          </Link> */}
          <Link to="/about" className="block text-gray-700 hover:text-black">
            About
          </Link>
          {/* <Link to="/login" className="block text-gray-700 hover:text-black">
            Login
          </Link> */}
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 bg-customGold text-white text-sm font-medium py-3 px-6 rounded-full hover:bg-yellow-500 transition"
          >
            Explore location
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
            </svg>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
