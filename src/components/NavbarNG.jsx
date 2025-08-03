import { useState } from "react";
import { Link } from "react-router-dom";
import logoNg from "../assets/images/beekeys-ng.png";

const DesktopNav = () => (
  <>
    <nav className="space-x-6 hidden md:flex">
      <Link to="/features" className="text-gray-700 hover:text-black">
        Features
      </Link>
      <Link to="/pricing" className="text-gray-700 hover:text-black">
        Pricing
      </Link>
      <Link to="/about" className="text-gray-700 hover:text-black">
        About
      </Link>
    </nav>

    {/* Wrap Explore and Login in a flex container with gap-x-4 (or smaller) */}
    <div className="hidden md:flex items-center gap-x-4">
      <Link
        to="/explore"
        className="inline-flex items-center gap-2 bg-customGold text-white text-sm font-medium py-3 px-6 rounded-full hover:bg-yellow-500 transition group whitespace-nowrap"
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
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 17L17 7M7 7h10v10"
          />
        </svg>
      </Link>

      <Link
        to="/login"
        className="inline-flex items-center gap-2 border border-yellow-500 text-yellow-500 text-sm font-medium py-3 px-6 rounded-full hover:bg-yellow-500 hover:text-white transition"
      >
        Login
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 17L17 7M7 7h10v10"
          />
        </svg>
      </Link>
    </div>
  </>
);

const MobileNav = ({ closeMenu }) => (
  <div className="md:hidden px-4 pb-4 space-y-2 bg-white shadow transition-all duration-300 ease-in-out">
    <Link
      to="/features"
      onClick={closeMenu}
      className="block text-gray-700 hover:text-black"
    >
      Features
    </Link>
    <Link
      to="/pricing"
      onClick={closeMenu}
      className="block text-gray-700 hover:text-black"
    >
      Pricing
    </Link>
    <Link
      to="/about"
      onClick={closeMenu}
      className="block text-gray-700 hover:text-black"
    >
      About
    </Link>
    <Link
      to="/explore"
      onClick={closeMenu}
      className="flex w-full items-center gap-2 bg-customGold text-white text-sm font-medium py-3 px-6 rounded-full hover:bg-yellow-500 transition"
    >
      Explore location
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
      </svg>
    </Link>
    <Link
      to="/login"
      onClick={closeMenu}
      className="flex w-full items-center gap-2 border border-yellow-500 text-yellow-500 text-sm font-medium py-3 px-6 rounded-full hover:bg-yellow-500 hover:text-white transition"
    >
      Login
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
      </svg>
    </Link>
  </div>
);

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((open) => !open);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="w-full bg-white shadow-lg fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/" className="text-2xl font-bold">
            <img src={logoNg} alt="Beekeys Logo" className="h-8 w-auto" />
          </Link>
        </div>

        {/* Desktop Nav */}
        <DesktopNav />

        {/* Hamburger Icon */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && <MobileNav closeMenu={closeMenu} />}
    </header>
  );
};

export default Navbar;
