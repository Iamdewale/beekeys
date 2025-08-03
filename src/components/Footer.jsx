import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      {/* CTA Section */}
      <div
        className="bg-cover bg-center bg-no-repeat rounded-t-3xl overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1584931423298-c576fda54bd2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <div className="bg-black bg-opacity-70">
          <div className="max-w-7xl mx-auto text-center text-white py-24 px-4">
            <h2 className="text-3xl md:text-5xl font-semibold mb-4">
              More than a directory. It’s a local visibility engine
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto mb-8">
              We have created a scalable community that makes it easier for
              people to find, list, and share accurate contact information for
              trusted local businesses and services across towns, cities and
              even countries.
            </p>

            {/* Link instead of Button */}
            <Link
              to="/explore"
              className="inline-block bg-yellow-400/50 border border-yellow-400 px-10 py-2 rounded-md hover:bg-yellow-400 transition group"
            >
              <span className="text-yellow-400 group-hover:text-black font-medium">
                Explore location
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Actual Footer */}
      <footer className="bg-black text-white pb-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="pt-10 grid md:grid-cols-3 gap-8">
            {/* Brand Section */}
            <div>
              <img
                src="./assets/logos/beekey-ng.png"
                alt="Beekeys Logo"
                className="h-10 mb-4"
              />
              <p className="text-sm text-gray-400 mb-4">
                Your Shortcut to the Real World of Trusted Businesses, Services
                and Brands
              </p>
              <div className="flex space-x-3 mt-2">
                <a
                  href="#"
                  className="bg-gray-800 p-2 rounded hover:bg-yellow-400 hover:text-black transition"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="#"
                  className="bg-gray-800 p-2 rounded hover:bg-yellow-400 hover:text-black transition"
                >
                  <FaInstagram />
                </a>
                <a
                  href="#"
                  className="bg-gray-800 p-2 rounded hover:bg-yellow-400 hover:text-black transition"
                >
                  <FaXTwitter />
                </a>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-bold mb-3">Contact</h3>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>partnership@beekeys.com</li>
                <li>298B Victoria Island, Lagos</li>
                <li>Nigeria: +2349135454645</li>
                <li>Ghana: +233551566444</li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-3">Quick Links</h3>
              <ul className="text-sm text-gray-400 space-y-1">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Contact us</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Privacy policy</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Note */}
          <p className="text-center text-gray-600 text-xs mt-10">
            © 2024. All Rights Reserved. Beekeys
          </p>
        </div>
      </footer>
    </>
  );
}
