import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function StateDetails() {
  const { slug } = useParams();
  const [stateInfo, setStateInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStateData = async () => {
      try {
        const res = await fetch(`/api/state?slug=${slug}`);

        if (!res.ok) {
          throw new Error("Failed to load state data");
        }

        const data = await res.json();

        // Check if it's an error object instead of valid data
        if (data.error) {
          throw new Error(data.error || "Invalid content type from proxy");
        }

        setStateInfo(data);
      } catch (error) {
        console.error("Error loading state:", error.message);
        setError(error.message);
        setStateInfo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStateData();
  }, [slug]);

  if (loading) {
    return <div className="p-8 text-center text-lg">Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-600">
        ⚠️ Failed to load state data.
        <br />
        <span className="text-sm">{error}</span>
      </div>
    );
  }

  if (!stateInfo) {
    return <div className="p-8 text-center text-red-600">State not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{stateInfo.title}</h1>
      <p className="text-gray-600 mb-6">
        Country: {stateInfo.country_title || "Nigeria"}
      </p>

      <div className="bg-gray-100 p-4 rounded-md">
        <pre className="text-sm overflow-x-auto">
          {JSON.stringify(stateInfo, null, 2)}
        </pre>
      </div>
    </div>
  );
}
