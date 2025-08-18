// StateDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavbarNG from "../components/NavbarNG";
import Footer from "../components/Footer";
import { fetchStateDetails } from "../services/api";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

export default function StateDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const data = await fetchStateDetails(slug);
        setRegion(data.region);
        setMarkers(data.markers || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load data for this state.");
      } finally {
        setLoading(false);
      }
    };
    loadDetails();
  }, [slug]);

  // Default icon fix for React Leaflet (so markers show up properly)
  const DefaultIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  });
  L.Marker.prototype.options.icon = DefaultIcon;

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

        {/* Region meta info */}
        {region && (
          <div className="mb-6 text-gray-700">
            <p>
              <strong>Region Name:</strong> {region.name}
            </p>
            <p>
              <strong>Slug:</strong> {region.slug}
            </p>
          </div>
        )}

        {/* Map Section */}
        {markers.length > 0 && (
          <div className="h-96 w-full mb-8 rounded-lg shadow overflow-hidden">
            <MapContainer
              center={[markers[0].lat, markers[0].lng]}
              zoom={7}
              className="h-full w-full"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {markers.map((item) => (
                <Marker
                  key={item.id}
                  position={[item.lat, item.lng]}
                  eventHandlers={{
                    click: () => navigate(`/business/${item.id}`),
                  }}
                >
                  <Popup>
                    <div className="text-center">
                      <h3 className="font-semibold">{item.title}</h3>
                      <button
                        onClick={() => navigate(`/business/${item.id}`)}
                        className="mt-2 text-blue-600 hover:underline text-sm"
                      >
                        View Details
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        )}

        {/* Grid View */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {markers.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded shadow p-4 cursor-pointer hover:shadow-md"
              onClick={() => navigate(`/business/${item.id}`)}
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500">
                Lat: {item.lat}, Lng: {item.lng}
              </p>
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
