import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavbarNG from "../components/NavbarNG";
import Footer from "../components/Footer";
import { fetchStateDetails, fetchMarkersInViewport } from "../services/api";
import StateHero from "../components/StateHero";
import StateMap from "../components/StateMap";
import stateHeroImg from "../assets/images/statehero.jpg";

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
  const [viewportLoading, setViewportLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("map");

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

  const handleBoundsChange = useCallback(async (bounds) => {
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
  }, [region]);

  const filteredMarkers = useMemo(() => {
    if (selectedCategory === "all") return markers;
    return markers.filter((m) => m.category === selectedCategory);
  }, [markers, selectedCategory]);

  const renderRegionInfo = () =>
    region && (
      <div className="mb-6 text-gray-700">
        <p>
          <strong>Region Name:</strong> {region.name}
        </p>
        <p>
          <strong>Slug:</strong> {region.slug}
        </p>
      </div>
    );

  const renderFilters = () => {
    const categories = ["all", "hospital", "clinic", "fire-station"];
    return (
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <div className="flex gap-2">
          {categories.map((cat) => (
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
        <div className="ml-auto">
          <button
            className="px-3 py-1 border rounded text-sm"
            onClick={() =>
              setViewMode((prev) => (prev === "map" ? "grid" : "map"))
            }
          >
            Switch to {viewMode === "map" ? "Grid" : "Map"} View
          </button>
        </div>
      </div>
    );
  };

  const renderSummary = () => (
    <p className="text-sm text-gray-600 mb-4">
      Showing {filteredMarkers.length} service
      {filteredMarkers.length !== 1 ? "s" : ""} in {displayName}
    </p>
  );

  const renderMap = () =>
    filteredMarkers.length > 0 && (
      <div className="h-96 w-full mb-8 rounded-lg shadow overflow-hidden relative">
        {viewportLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center z-10">
            <p className="text-gray-600 text-sm">Updating map...</p>
          </div>
        )}
        <StateMap markers={filteredMarkers} onBoundsChange={handleBoundsChange} />
      </div>
    );

  const renderGrid = () =>
    filteredMarkers.length > 0 && (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {filteredMarkers.map((item) => (
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
            {renderRegionInfo()}
            {renderFilters()}
            {renderSummary()}
            {filteredMarkers.length > 0 ? (
              viewMode === "map" ? renderMap() : renderGrid()
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
