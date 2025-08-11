export const searchBusinesses = async (query) => {
  const url = `https://beekeys.com/nigeria/wp-json/geodir/v2/bsb?search=${encodeURIComponent(query)}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch results");

  return response.json();
};

export const fetchRegions = async () => {
  try {
    const response = await fetch("https://beekeys-proxy.onrender.com/api/regions");

    if (!response.ok) {
      throw new Error(`Failed to fetch regions. Status: ${response.status}`);
    }

    const json = await response.json();

    if (json && Array.isArray(json.data)) {
      return json.data;
    }

    return [];
  } catch (error) {
    console.error("Error fetching regions:", error.message);
    return [];
  }
};

export async function fetchMarkersByState(stateSlug) {
  const response = await fetch(`hhttps://beekeys-proxy.onrender.com/api/markers/${stateSlug}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch data");
  }

  return data.items || [];
}

