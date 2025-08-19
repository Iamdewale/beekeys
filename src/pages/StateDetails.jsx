// StateDetails.jsx
import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavbarNG from "../components/NavbarNG";
import Footer from "../components/Footer";
import { fetchStateDetails } from "../services/api";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import nigeria from "../assets/images/HeroNig.jpg";
import { FaSearch } from "react-icons/fa";

// ✅ Configure default Leaflet icons
const DefaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});
L.Marker.prototype.options.icon = DefaultIcon;

// Empty state component
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
  const [searchQuery, setSearchQuery] = useState("");

  const displayName = useMemo(() => slug.replace(/-/g, " "), [slug]);

  useEffect(() => {
    const loadDetails = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchStateDetails(slug);
        setRegion(data?.region || null);
        setMarkers(Array.isArray(data?.markers) ? data.markers : []);
      } catch (err) {
        console.error(err);
        setError("Failed to load data for this state.");
      } finally {
        setLoading(false);
      }
    };
    loadDetails();
  }, [slug]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const renderRegionInfo = () =>
    region && (
      <div className="mb-6 text-gray-700 text-center">
        <p>
          <strong>Region Name:</strong> {region.name}
        </p>
        <p>
          <strong>Slug:</strong> {region.slug}
        </p>
      </div>
    );

  const renderMap = () =>
    markers.length > 0 && markers[0]?.lat && markers[0]?.lng && (
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
    );

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
              <img
                src={item.icon}
                alt={item.title}
                className="w-10 h-10 mt-2"
              />
            )}
          </div>
        ))}
      </div>
    );

  return (
    <main className="font-sans">
      <NavbarNG />

      {/* Hero Section */}
      <section className="relative w-full text-white bg-gray-900 min-h-[299px]">
        <img
          src={nigeria}
          alt="Nigeria Map"
          className="absolute inset-0 w-full h-full object-cover z-0"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/60 z-0" />

        <div className="relative z-10 flex flex-col justify-center items-center h-full py-40 px-4 text-center">
          <h1 className="text-3xl font-bold mb-4 capitalize">
            Explore Services in {displayName}
          </h1>

          {/* Search Bar */}
          <div className="w-full max-w-3xl bg-white rounded-[10px] shadow-lg flex items-center px-4 h-12 min-h-[72px]">
            <FaSearch className="text-gray-400 text-lg mr-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search business / services / product or try @Beekeys"
              className="flex-1 text-gray-800 text-sm bg-transparent border-none focus:outline-none focus:ring-0"
              aria-label="Search input"
            />
            <button
              onClick={handleSearch}
              className="inline-flex items-center gap-2 bg-yellow-500 text-white text-sm font-medium py-3 px-6 rounded-full hover:bg-yellow-600 transition group whitespace-nowrap"
            >
              Search
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
            </button>
          </div>

          <button
            onClick={() => navigate("/nigeria")}
            className="mt-6 text-yellow-600 hover:underline"
          >
            ← Back to States
          </button>
        </div>

        {/* Loading & Error */}
        {loading && (
          <p className="text-gray-300 text-center mt-4">Loading services...</p>
        )}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {/* Region Info */}
        {!loading && !error && renderRegionInfo()}

        {/* Results */}
        {!loading && !error && (
          markers.length > 0 ? (
            <>
              {renderMap()}
              {renderGrid()}
            </>
          ) : (
            <NoResults stateName={displayName} />
          )
        )}
      </section>

      <Footer />
    </main>
  );
}
