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
 * 📍 Get combined state details (region + markers).
 * Works for any state slug if backend is configured as refactored.
 * @param {string} slug
 * @returns {Promise<{region: object|null, markers: any[]}>}
 */

export async function fetchStateDetails(slug) {
  const baseUrl = "https://app.beekeys.com/nigeria/wp-json/geodir/v2/listings";
  const variants = [
    slug,
    `${slug}-state`,
    slug.replace(/-state$/, ""),
    slug.replace(/\s+/g, "-"),
  ];

  let lastErr = null;

  for (const variant of variants) {
    try {
      const url = `${baseUrl}?country=nigeria&region=${variant}`;
      const res = await axios.get(url);
      // Normalise shape so StateDetails.jsx is happy
      return {
        region: { name: variant.replace(/-/g, " "), slug: variant },
        markers: Array.isArray(res.data) ? res.data : [],
      };
    } catch (err) {
      if (err.response?.status === 404) {
        // Try next variant
        continue;
      }
      lastErr = err;
    }
  }

  // If nothing matched, return a safe empty state
  if (!lastErr) {
    return { region: { name: slug.replace(/-/g, " "), slug }, markers: [] };
  }

  throw lastErr;
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
