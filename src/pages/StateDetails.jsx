// src/pages/StateDetails.jsx
import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavbarNG from "../components/NavbarNG";
import Footer from "../components/Footer";
import { fetchStateDetails } from "../services/api";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import StateHero from "../components/StateHero";  // ✅ correct import
import stateHeroImg from "../assets/images/statehero.jpg"; // ✅ adjust path if needed

// Default Leaflet marker icon
const DefaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});
L.Marker.prototype.options.icon = DefaultIcon;

const NoResults = ({ stateName }) => (
  <div className="text-gray-600 my-8 text-center">
    <p className="mb-2 font-medium">
      No services currently listed for {stateName}.
    </p>
    <p className="text-sm">Please check back later or try another state.</p>
  </div>
);

export default function StateDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [error, setError] = useState("");

  const displayName = useMemo(() => slug.replace(/-/g, " "), [slug]);

  useEffect(() => {
    const loadDetails = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchStateDetails(slug);
        setRegion(data.region);
        setMarkers(data.markers);
      } catch (err) {
        console.error(err);
        setError("Failed to load data for this state.");
      } finally {
        setLoading(false);
      }
    };
    loadDetails();
  }, [slug]);

  const renderRegionInfo = () =>
    region && (
      <div className="mb-6 text-gray-700">
        <p><strong>Region Name:</strong> {region.name}</p>
        <p><strong>Slug:</strong> {region.slug}</p>
      </div>
    );

  const renderMap = () => {
    if (!markers.length || !markers[0]?.lat || !markers[0]?.lng) return null;
    return (
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
              eventHandlers={{ click: () => navigate(`/business/${item.id}`) }}
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
    );
  };

  const renderGrid = () =>
    markers.length > 0 && (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {markers.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded shadow p-4 cursor-pointer hover:shadow-md transition"
            onClick={() => navigate(`/business/${item.id}`)}
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-gray-500">
              Lat: {item.lat}, Lng: {item.lng}
            </p>
            {item.icon && (
              <img src={item.icon} alt={item.title} className="w-10 h-10 mt-2" />
            )}
          </div>
        ))}
      </div>
    );

  return (
    <main className="font-sans">
      <NavbarNG />

      {/* ✅ Hero section now wired up properly */}
      <StateHero
        title={`Explore Services in ${displayName}`}
        subtitle={region?.name ? `Located in ${region.name} region` : ""}
        backgroundUrl={stateHeroImg}
      />

      <section className="px-6 pt-16 pb-16 max-w-6xl mx-auto">
        <button
          onClick={() => navigate("/nigeria")}
          className="mb-4 text-yellow-600 hover:underline"
        >
          ← Back to States
        </button>

        {loading && <p className="text-gray-600">Loading services...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <>
            {renderRegionInfo()}
            {markers.length > 0 ? (
              <>
                {renderMap()}
                {renderGrid()}
              </>
            ) : (
              <NoResults stateName={displayName} />
            )}
          </>
        )}
      </section>

      <Footer />
    </main>
  );
}
