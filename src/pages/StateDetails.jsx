import React, { useEffect, useState, useMemo } from "react";
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

  const handleBoundsChange = async (bounds) => {
    if (!region?.slug) return;
    const params = {
      north: bounds.getNorthEast().lat,
      south: bounds.getSouthWest().lat,
      east: bounds.getNorthEast().lng,
      west: bounds.getSouthWest().lng,
      region: region.slug,
    };
    try {
      const data = await fetchMarkersInViewport(params);
      setMarkers(data.markers);
    } catch (err) {
      console.error("Failed to fetch viewport markers", err);
    }
  };

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

  const renderMap = () =>
    markers.length > 0 && (
      <div className="h-96 w-full mb-8 rounded-lg shadow overflow-hidden">
        <StateMap markers={markers} onBoundsChange={handleBoundsChange} />
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
