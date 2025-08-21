import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavbarNG from "../components/NavbarNG";
import Footer from "../components/Footer";
import { fetchStateDetails, fetchMarkersInViewport } from "../services/api";
import StateHero from "../components/StateHero";
import StateMap from "../components/StateMap";
import stateHeroImg from "../assets/images/statehero.jpg";

// 🔹 Constants
const CATEGORIES = ["all", "hospital", "clinic", "fire-station"];

// 🔹 UI Components
const NoResults = ({ stateName }) => (
  <div className="text-gray-600 my-8 text-center">
    <p className="mb-2 font-medium">No services currently listed for {stateName}.</p>
    <p className="text-sm">Please check back later or try another state.</p>
  </div>
);

const RegionInfo = ({ name, slug }) => (
  <div className="mb-6 text-gray-700">
    <p><strong>Region Name:</strong> {name}</p>
    <p><strong>Slug:</strong> {slug}</p>
  </div>
);

const Filters = ({ selectedCategory, setSelectedCategory, viewMode, setViewMode }) => (
  <div className="flex flex-wrap gap-4 items-center mb-6">
    {/* Category filters */}
    <div className="flex gap-2">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          className={`px-3 py-1 rounded ${
            selectedCategory === cat
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setSelectedCategory(cat)}
        >
          {cat === "all" ? "All Services" : cat.replace("-", " ")}
        </button>
      ))}
    </div>
    {/* Toggle view */}
    <button
      className="ml-auto px-3 py-1 border rounded text-sm"
      onClick={() => setViewMode(viewMode === "map" ? "grid" : "map")}
    >
      Switch to {viewMode === "map" ? "Grid" : "Map"} View
    </button>
  </div>
);

const Summary = ({ count, stateName }) => (
  <p className="text-sm text-gray-600 mb-4">
    Showing {count} service{count !== 1 ? "s" : ""} in {stateName}
  </p>
);

const ServiceMapWrapper = ({ markers, loading, onBoundsChange }) => (
  <div className="h-96 w-full mb-8 rounded-lg shadow overflow-hidden relative">
    {loading && (
      <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center z-10">
        <p className="text-gray-600 text-sm">Updating map...</p>
      </div>
    )}
    <StateMap markers={markers} onBoundsChange={onBoundsChange} />
  </div>
);

const ServiceGrid = ({ markers, onNavigate }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
    {markers.map(({ id, title, lat, lng, icon }) => (
      <div
        key={id}
        className="bg-white rounded shadow p-4 cursor-pointer hover:shadow-md transition"
        onClick={() => onNavigate(`/business/${id}`)}
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-500">Lat: {lat}, Lng: {lng}</p>
        {icon && <img src={icon} alt={title} className="w-10 h-10 mt-2" />}
      </div>
    ))}
  </div>
);

// 🔹 Main Component
export default function StateDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // State
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [region, setRegion] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [viewportLoading, setViewportLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("map");

  const displayName = useMemo(() => slug.replace(/-/g, " "), [slug]);

  // Fetch state details
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

  // Handle viewport change (map bounds)
  const handleBoundsChange = useCallback(
    async (bounds) => {
      if (!region?.slug) return;
      setViewportLoading(true);
      try {
        const params = {
          north: bounds.getNorthEast().lat,
          south: bounds.getSouthWest().lat,
          east: bounds.getNorthEast().lng,
          west: bounds.getSouthWest().lng,
          region: region.slug,
        };
        const data = await fetchMarkersInViewport(params);
        setMarkers(data.markers);
      } catch (err) {
        console.error("Failed to fetch viewport markers", err);
      } finally {
        setViewportLoading(false);
      }
    },
    [region]
  );

  // Filter markers
  const filteredMarkers = useMemo(() => {
    return selectedCategory === "all"
      ? markers
      : markers.filter((m) => m.category === selectedCategory);
  }, [markers, selectedCategory]);

  // 🔹 Render
  return (
    <main className="font-sans">
      <NavbarNG />
      <StateHero
        title={`Explore Services in ${displayName}`}
        subtitle={region?.name ? `Located in ${region.name} region` : ""}
        backgroundUrl={stateHeroImg}
        ctaText="← Back to States"
        ctaOnClick={() => navigate("/nigeria")}
        onSearch={(query) =>
          navigate(`/search?query=${encodeURIComponent(query)}&state=${slug}`)
        }
      />

      <section className="px-6 pt-16 pb-16 max-w-6xl mx-auto">
        {loading && <p className="text-gray-600">Loading services...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <>
            {region && <RegionInfo name={region.name} slug={region.slug} />}
            <Filters
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />
            <Summary count={filteredMarkers.length} stateName={displayName} />

            {filteredMarkers.length > 0 ? (
              viewMode === "map" ? (
                <ServiceMapWrapper
                  markers={filteredMarkers}
                  loading={viewportLoading}
                  onBoundsChange={handleBoundsChange}
                />
              ) : (
                <ServiceGrid markers={filteredMarkers} onNavigate={navigate} />
              )
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
