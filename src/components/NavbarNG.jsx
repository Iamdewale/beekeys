import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoNg from "../assets/images/beekeys-ng.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check login status and listen for custom login/logout events
  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("beekeys_token");
      setIsLoggedIn(!!token);
    };

    checkLogin();

    window.addEventListener("beekeys-login-status", checkLogin);

    return () => {
      window.removeEventListener("beekeys-login-status", checkLogin);
    };
  }, []);

  const toggleMenu = () => setMenuOpen((open) => !open);
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("beekeys_token");
    window.dispatchEvent(new Event("beekeys-login-status"));
    navigate("/");
  };

  return (
    <header className="w-full bg-white shadow-lg fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="/">
            <img src={logoNg} alt="Beekeys Logo" className="h-8 w-auto" />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="space-x-6 hidden md:flex">
          <Link to="/features" className="text-gray-700 font-semibold hover:text-black">
            Features
          </Link>
          <Link to="/about" className="text-gray-700 font-semibold hover:text-black">
            About
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-x-4">
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 bg-customGold text-white text-sm font-medium py-3 px-6 rounded-full hover:bg-yellow-500 transition"
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

        {/* Mobile Menu Icon */}
        <button
          onClick={toggleMenu}
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
        <div className="md:hidden font-semibold px-4 pb-4 space-y-3 bg-white shadow transition-all duration-300 ease-in-out">
          <Link to="/features" onClick={closeMenu} className="block text-gray-700 hover:text-black">
            Features
          </Link>
          <Link to="/about" onClick={closeMenu} className="block text-gray-700 hover:text-black">
            About
          </Link>
          <div className="flex flex-col space-y-3 pt-2 items-start">
            <Link
              to="/explore"
              onClick={closeMenu}
              className="flex items-center gap-2 bg-customGold text-white text-sm font-medium py-3 px-6 rounded-full hover:bg-yellow-500 transition max-w-fit"
            >
              Explore location
            </Link>
            {isLoggedIn ? (
              <button
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
                className="flex items-center gap-2 border border-red-500 text-red-500 text-sm font-medium py-3 px-6 rounded-full hover:bg-red-500 hover:text-white transition max-w-fit"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={closeMenu}
                className="flex items-center gap-2 border border-yellow-500 text-yellow-500 text-sm font-medium py-3 px-6 rounded-full hover:bg-yellow-500 hover:text-white transition max-w-fit"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
