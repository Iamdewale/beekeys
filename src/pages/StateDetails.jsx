import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // <-- added useNavigate here
import NavbarNG from "../components/NavbarNG";
import Footer from "../components/Footer";
import { fetchMarkersByState } from "../services/api"; 

export default function StateDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();  // <-- moved here for clarity

  const [loading, setLoading] = useState(true);
  const [markers, setMarkers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMarkers = async () => {
      try {
        const data = await fetchMarkersByState(slug);
        setMarkers(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load data for this state.");
      } finally {
        setLoading(false);
      }
    };

    loadMarkers();
  }, [slug]);

  return (
    <main className="font-sans">
      <NavbarNG />
      <section className="px-6 pt-32 py-16 max-w-6xl mx-auto">
        <button
          onClick={() => navigate("/nigeria")}
          className="mb-4 text-yellow-600 hover:underline"
        >
          ← Back to States
        </button>

        <h1 className="text-3xl font-bold mb-4 capitalize">
          Explore Services in {slug.replace(/-/g, " ")}
        </h1>

        {loading && <p className="text-gray-600">Loading services...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {markers.map((item) => (
            <div key={item.id} className="bg-white rounded shadow p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500">Lat: {item.lat}, Lng: {item.lng}</p>
              {item.icon && (
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-10 h-10 mt-2"
                />
              )}
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
