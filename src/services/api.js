// src/services/api.js
import axios from "axios";

const BASE_URL = "https://beekeys-proxy.onrender.com";

/**
 * Generic JSON fetch helper with consistent error handling.
 * @template T
 * @param {string} endpoint - API endpoint (relative to BASE_URL).
 * @param {string} [errorMsg="Request failed"] - Custom error message on failure.
 * @param {T} [fallback=null] - Value to return if request fails.
 * @returns {Promise<T>}
 */
async function fetchJSON(endpoint, errorMsg = "Request failed", fallback = null) {
  try {
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
  } catch (err) {
    console.error(`❌ ${errorMsg}:`, err.message);
    return fallback;
  }
}

/**
 * 🔎 Search businesses.
 * @param {string} query - Search term.
 * @returns {Promise<{success: boolean, results: any[]}>}
 */
export async function searchBusinesses(query) {
  return fetchJSON(
    `/api/businesses?search=${encodeURIComponent(query)}`,
    "Failed to fetch business search results",
    { success: false, results: [] }
  );
}

/**
 * 📍 Get single business details by ID.
 * @param {number|string} id
 * @returns {Promise<object|null>}
 */
export async function fetchBusinessDetails(id) {
  const data = await fetchJSON(
    `/api/business/${id}`,
    "Failed to fetch business details",
    { business: null }
  );
  return data?.business || null;
}

/**
 * 🌍 Fetch all regions.
 * @returns {Promise<any[]>}
 */
export async function fetchRegions() {
  const data = await fetchJSON(
    "/api/regions",
    "Failed to fetch regions",
    { data: [] }
  );
  return Array.isArray(data?.data) ? data.data : [];
}

/**
 * 📍 Get combined state details (region + markers) via proxy backend.
 * @param {string} slug
 * @returns {Promise<{region: object|null, markers: any[]}>}
 */
export async function fetchStateDetails(slug) {
  const data = await fetchJSON(
    `/api/state-details/${encodeURIComponent(slug)}`,
    `Failed to fetch state details for ${slug}`,
    { region: null, markers: [] }
  );

  return {
    region: data?.region || null,
    markers: Array.isArray(data?.markers) ? data.markers : []
  };
}


/**
 * 📝 Fetch dynamic form fields (from WP/Ninja backend).
 * @param {number} [formId=4]
 * @returns {Promise<any>}
 */
export async function getFormFields(formId = 4) {
  return fetchJSON(
    `/form-fields/${formId}`,
    "Failed to fetch form fields",
    {}
  );
}
