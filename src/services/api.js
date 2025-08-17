// api.js

// 🔎 Business search
export const searchBusinesses = async (query) => {
  const url = `https://beekeys-proxy.onrender.com/api/businesses?search=${encodeURIComponent(query)}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch results (status ${response.status})`);
  }

  return response.json();
};

// 🌍 Fetch regions
export const fetchRegions = async () => {
  try {
    const response = await fetch("https://beekeys-proxy.onrender.com/api/regions");
    if (!response.ok) {
      throw new Error(`Failed to fetch regions (status ${response.status})`);
    }

    const json = await response.json();
    // ✅ expect backend already normalizes into { data: [...] }
    return Array.isArray(json.data) ? json.data : [];
  } catch (error) {
    console.error("Error fetching regions:", error.message);
    return [];
  }
};

// 📍 Fetch markers by state
export async function fetchMarkersByState(stateSlug) {
  const response = await fetch(`https://beekeys-proxy.onrender.com/api/markers/${stateSlug}`);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error || "Failed to fetch markers");
  }

  // ✅ backend already returns { data: [...] }
  return json.data || [];
}

// 📝 Fetch form fields (dynamic from WP/Ninja)
export async function getFormFields(formId = 4) {
  const response = await fetch(`https://beekeys-proxy.onrender.com/form-fields/${formId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch form fields (status ${response.status})`);
  }

  return response.json(); // backend should normalize
}
