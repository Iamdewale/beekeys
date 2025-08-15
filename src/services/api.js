// // Base URL for your proxy server
// const PROXY_BASE_URL = "https://beekeys-proxy.onrender.com/api";

// // Search businesses
// export const searchBusinesses = async (query) => {
//   const url = `${PROXY_BASE_URL}/businesses?search=${encodeURIComponent(query)}`;

//   const response = await fetch(url);
//   if (!response.ok) throw new Error("Failed to fetch results");

//   return response.json();
// };

// // Fetch regions
// export const fetchRegions = async () => {
//   try {
//     const response = await fetch(`${PROXY_BASE_URL}/regions`);

//     if (!response.ok) {
//       throw new Error(`Failed to fetch regions. Status: ${response.status}`);
//     }

//     const json = await response.json();

//     if (json && Array.isArray(json.data)) {
//       return json.data;
//     }

//     return [];
//   } catch (error) {
//     console.error("Error fetching regions:", error.message);
//     return [];
//   }
// };

// // Fetch markers by state
// export const fetchMarkersByState = async (stateSlug) => {
//   const response = await fetch(`${PROXY_BASE_URL}/markers/${stateSlug}`);
//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.error || "Failed to fetch data");
//   }

//   return data.items || [];
// };

// // Submit post (authenticated)
// export const submitPost = async (postData) => {
//   const response = await fetch(`${PROXY_BASE_URL}/submit`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(postData)
//   });

//   if (!response.ok) throw new Error("Failed to submit post");

//   return response.json();
// };


// src/api.js

export const searchBusinesses = async (query) => {
  const url = `https://beekeys-proxy.onrender.com/api/businesses?search=${encodeURIComponent(query)}`;

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
  const response = await fetch(`https://beekeys-proxy.onrender.com/api/markers/${stateSlug}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch data");
  }

  return data.items || [];
}
