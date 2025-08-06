import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { searchBusinesses } from "../services/api";
import NavbarNG from "../components/NavbarNG";
import Footer from "../components/Footer";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResults() {
  const query = useQuery().get("q");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await searchBusinesses(query);
        setResults(data);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchResults();
  }, [query]);

  return (
    <main className="font-sans bg-white min-h-screen flex flex-col">
      <NavbarNG />

      <div className="flex-grow pt-32 pb-24 px-4 max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-4 py-2 bg-yellow-500 text-white text-sm font-medium rounded-md hover:bg-yellow-600 transition"
          >
            ← Back to previous page
          </button>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold mb-6">
          Search Results for: <span className="text-yellow-500">"{query}"</span>
        </h1>

        {/* Results */}
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : results.length === 0 ? (
          <p className="text-gray-600">No results found.</p>
        ) : (
          <div className="space-y-4">
            {results.map((biz) => (
              <div
                key={biz.id}
                className="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
              >
                <h2 className="text-lg font-bold text-gray-800">
                  {biz.title.rendered}
                </h2>
                <p className="text-gray-600 mb-2">
                  {biz.city}, {biz.region}
                </p>
                <a
                  href={biz.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline text-sm"
                >
                  View Listing
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
