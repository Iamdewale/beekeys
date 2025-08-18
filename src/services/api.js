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

// 📍 Single business details
export async function fetchBusinessDetails(id) {
  const response = await fetch(`https://beekeys-proxy.onrender.com/api/business/${id}`);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error || "Failed to fetch business details");
  }

  return json.business || null;
}

// 🌍 Fetch regions
export const fetchRegions = async () => {
  try {
    const response = await fetch("https://beekeys-proxy.onrender.com/api/regions");
    if (!response.ok) throw new Error(`Failed to fetch regions`);
    const json = await response.json();
    return Array.isArray(json.data) ? json.data : [];
  } catch (error) {
    console.error("Error fetching regions:", error.message);
    return [];
  }
};

// 📍 Combined state details (region + markers)
export async function fetchStateDetails(slug) {
  const response = await fetch(`https://beekeys-proxy.onrender.com/api/state-details/${slug}`);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error || "Failed to fetch state details");
  }

  return {
    region: json.region || null,
    markers: Array.isArray(json.markers) ? json.markers : []
  };
}

// 📝 Fetch form fields (dynamic from WP/Ninja)
export async function getFormFields(formId = 4) {
  const response = await fetch(`https://beekeys-proxy.onrender.com/form-fields/${formId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch form fields (status ${response.status})`);
  }

  return response.json(); // backend should normalize
}
