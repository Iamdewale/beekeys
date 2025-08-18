// src/services/api.js

const BASE_URL = "https://beekeys-proxy.onrender.com";

/**
 * Generic JSON fetch helper with consistent error handling.
 * @param {string} endpoint - API endpoint (relative to BASE_URL).
 * @param {string} [errorMsg] - Custom error message on failure.
 * @returns {Promise<any>}
 */
async function fetchJSON(endpoint, errorMsg = "Request failed") {
  const res = await fetch(`${BASE_URL}${endpoint}`);
  let json;

  try {
    json = await res.json();
  } catch {
    throw new Error(`${errorMsg}: Invalid JSON`);
  }

  if (!res.ok) {
    throw new Error(json?.error || `${errorMsg} (status ${res.status})`);
  }

  return json;
}

/**
 * 🔎 Search businesses.
 * @param {string} query - Search term.
 */
export async function searchBusinesses(query) {
  const data = await fetchJSON(
    `/api/businesses?search=${encodeURIComponent(query)}`,
    "Failed to fetch business search results"
  );
  return data; // shape: { success, results }
}

/**
 * 📍 Get single business details by ID.
 * @param {number|string} id
 */
export async function fetchBusinessDetails(id) {
  const data = await fetchJSON(
    `/api/business/${id}`,
    "Failed to fetch business details"
  );
  return data.business || null;
}

/**
 * 🌍 Fetch all regions.
 */
export async function fetchRegions() {
  try {
    const data = await fetchJSON("/api/regions", "Failed to fetch regions");
    return Array.isArray(data.data) ? data.data : [];
  } catch (err) {
    console.error("Error fetching regions:", err.message);
    return [];
  }
}

/**
 * 📍 Get combined state details (region + markers).
 * @param {string} slug
 */
export async function fetchStateDetails(slug) {
  const data = await fetchJSON(
    `/api/state-details/${slug}`,
    "Failed to fetch state details"
  );
  return {
    region: data.region || null,
    markers: Array.isArray(data.markers) ? data.markers : []
  };
}

/**
 * 📝 Fetch dynamic form fields (from WP/Ninja backend).
 * @param {number} [formId=4]
 */
export async function getFormFields(formId = 4) {
  const data = await fetchJSON(
    `/form-fields/${formId}`,
    "Failed to fetch form fields"
  );
  return data; // backend should normalize
}
