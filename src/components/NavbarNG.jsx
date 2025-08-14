import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoNg from "../assets/images/beekeys-ng.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Function to check login token
  const checkLogin = () => {
    const token = localStorage.getItem("beekeys_token");
    setIsLoggedIn(!!token);
  };

  // Initial login check + listen for updates
  useEffect(() => {
    checkLogin();
    window.addEventListener("beekeys-login-status", checkLogin);

    return () => {
      window.removeEventListener("beekeys-login-status", checkLogin);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("beekeys_token");
    window.dispatchEvent(new Event("beekeys-login-status")); // Notify components
    navigate("/");
  };

  return (
    <header className="w-full bg-white shadow-lg fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          <img src={logoNg} alt="Beekeys Logo" className="h-8 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <nav className="space-x-6 hidden md:flex">
          <Link to="/features" className="text-gray-700 font-semibold hover:text-black">
            Features
          </Link>
          <Link to="/about" className="text-gray-700 font-semibold hover:text-black">
            About
          </Link>
        </nav>

        {/* Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-x-4">
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 bg-customGold text-white text-sm font-medium py-3 px-6 rounded-full hover:bg-yellow-500 transition"
          >
            Explore location
          </Link>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 border border-red-500 text-red-500 text-sm font-medium py-3 px-6 rounded-full hover:bg-red-500 hover:text-white transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-2 border border-yellow-500 text-yellow-500 text-sm font-medium py-3 px-6 rounded-full hover:bg-yellow-500 hover:text-white transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
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

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-white shadow">
          <Link to="/features" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-black">
            Features
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-black">
            About
          </Link>

          <Link
            to="/explore"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 bg-customGold text-white text-sm font-medium py-3 px-6 rounded-full hover:bg-yellow-500 transition max-w-fit"
          >
            Explore location
          </Link>

          {isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 border border-red-500 text-red-500 text-sm font-medium py-3 px-6 rounded-full hover:bg-red-500 hover:text-white transition max-w-fit"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 border border-yellow-500 text-yellow-500 text-sm font-medium py-3 px-6 rounded-full hover:bg-yellow-500 hover:text-white transition max-w-fit"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
