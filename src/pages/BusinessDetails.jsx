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
        setError("Failed to load business details");
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

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {business && (
          <div className="bg-white shadow rounded p-6">
            <h1 className="text-3xl font-bold mb-4">{business.post_title}</h1>
            <p className="text-gray-700 mb-2">{business.post_content}</p>
            {business.featured_image && (
              <img
                src={business.featured_image}
                alt={business.post_title}
                className="rounded mt-4"
              />
            )}
            <p className="mt-4 text-sm text-gray-500">
              Address: {business.address || "N/A"}
            </p>
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
