// src/services/api.js

const BASE_URL = "https://beekeys-proxy.onrender.com";

/**
 * 🛠 Generic JSON fetch helper with consistent error handling.
 */
async function fetchJSON(endpoint, errorMsg = "Request failed", fallback = null) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`);
    const text = await res.text();

    let data = {};
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      throw new Error(`${errorMsg}: Invalid JSON`);
    }

    if (!res.ok) {
      throw new Error(data?.error || `${errorMsg} (status ${res.status})`);
    }

    return data;
  } catch (err) {
    console.error(`❌ ${errorMsg}:`, err.message);
    return fallback;
  }
}

/**
 * 🔎 Search businesses by query.
 */
async function searchBusinesses(query) {
  return fetchJSON(
    `/api/businesses?search=${encodeURIComponent(query)}`,
    "Failed to fetch business search results",
    { success: false, results: [] }
  );
}

/**
 * 📍 Get single business details by ID.
 */
async function fetchBusinessDetails(id) {
  const data = await fetchJSON(
    `/api/business/${id}`,
    "Failed to fetch business details",
    { business: null }
  );
  return data.business;
}

/**
 * 🌍 Fetch all regions.
 */
async function fetchRegions() {
  const data = await fetchJSON("/api/regions", "Failed to fetch regions", { data: [] });
  return Array.isArray(data.data) ? data.data : [];
}

/**
 * 🗺️ Get combined state details (region + markers).
 */
async function fetchStateDetails(slug) {
  const data = await fetchJSON(
    `/api/state-details/${encodeURIComponent(slug)}`,
    `Failed to fetch state details for ${slug}`,
    { region: null, markers: [] }
  );
  return {
    region: data.region,
    markers: Array.isArray(data.markers) ? data.markers : []
  };
}

/**
 * 📍 Fetch markers within a viewport.
 */
async function fetchMarkersInViewport({ north, south, east, west, region }) {
  const params = new URLSearchParams({ north, south, east, west, region });
  return fetchJSON(
    `/api/markers-in-viewport?${params}`,
    "Failed to fetch viewport markers",
    { markers: [] }
  );
}

/**
 * 📤 Submit business form with optional file uploads.
 */
async function submitBusinessForm(formData, uploadedFiles = []) {
  const payload = { ...formData, uploadedFiles };

  try {
    const res = await fetch(`${BASE_URL}/submit-business`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Proxy-Secret": process.env.REACT_APP_PROXY_SECRET
      },
      body: JSON.stringify(payload)
    });

    const text = await res.text();
    let data = {};

    try {
      data = text ? JSON.parse(text) : {};
    } catch (err) {
      console.warn("⚠️ Failed to parse JSON:", err);
    }

    if (!res.ok) {
      throw new Error(data?.error || `Form submission failed (status ${res.status})`);
    }

    return data;
  } catch (err) {
    console.error("❌ submitBusinessForm error:", err);
    return { success: false, error: err.message };
  }
}

// 🧾 Export all functions
export {
  searchBusinesses,
  fetchBusinessDetails,
  fetchRegions,
  fetchStateDetails,
  fetchMarkersInViewport,
  submitBusinessForm
};
