import { buildNinjaFormsPayload } from "../utils/buildPayload";

const BASE_URL = "https://beekeys-proxy.onrender.com";

/**
 * Generic JSON fetch helper with consistent error handling.
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
 */
export async function getFormFields(formId = 4) {
  return fetchJSON(
    `/form-fields/${formId}`,
    "Failed to fetch form fields",
    {}
  );
}

/**
 * 📤 Upload a single file to Ninja Forms via proxy.
 */
export async function uploadNinjaFile(file) {
  try {
    const fileForm = new FormData();
    fileForm.append("file", file);
    const res = await fetch(`${BASE_URL}/upload-ninja`, {
      method: "POST",
      body: fileForm
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json?.error || `Upload failed (status ${res.status})`);
    }
    return json;
  } catch (err) {
    console.error("❌ File upload failed:", err.message);
    throw err;
  }
}

export async function submitBusinessForm(formData, uploadedFiles = []) {
  const payload = {
    ...formData,
    uploadedFiles, // Include files if needed
  };

  try {
    const res = await fetch("/submit-business", {
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
    } catch (parseErr) {
      console.warn("⚠️ Failed to parse JSON:", parseErr);
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

