import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavbarNG from "../components/NavbarNG";
import Footer from "../components/Footer";
import { fetchBusinessDetails } from "../services/api";

export default function BusinessDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [business, setBusiness] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBusiness = async () => {
      try {
        const data = await fetchBusinessDetails(id);
        setBusiness(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load business details.");
      } finally {
        setLoading(false);
      }
    };

    loadBusiness();
  }, [id]);

  return (
    <main className="font-sans">
      <NavbarNG />
      <section className="px-6 pt-32 py-16 max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-yellow-600 hover:underline"
        >
          ← Back
        </button>

        {loading && <p className="text-gray-600">Loading business...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {business && (
          <div className="bg-white rounded shadow p-6">
            <h1 className="text-3xl font-bold mb-4">{business.post_title}</h1>

            {business.featured_image && (
              <img
                src={business.featured_image}
                alt={business.post_title}
                className="w-full h-64 object-cover rounded mb-4"
              />
            )}

            <p className="text-gray-700 mb-4">{business.post_content}</p>

            {business.address && (
              <p className="text-gray-600 mb-2">
                📍 {business.address}
              </p>
            )}

            {business.phone && (
              <p className="text-gray-600 mb-2">📞 {business.phone}</p>
            )}

            {business.email && (
              <p className="text-gray-600 mb-2">✉️ {business.email}</p>
            )}

            {business.website && (
              <p className="text-blue-600 underline">
                <a href={business.website} target="_blank" rel="noreferrer">
                  Visit Website
                </a>
              </p>
            )}
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
