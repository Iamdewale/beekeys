// export const searchBusinesses = async (query) => {
//   const url = `https://beekeys.com/nigeria/wp-json/geodir/v2/bsb?search=${encodeURIComponent(query)}`;

//   const response = await fetch(url);
//   if (!response.ok) throw new Error("Failed to fetch results");

//   return response.json();
// };

// export async function fetchRegions() {
//   try {
//     const response = await fetch("https://fresh-beekeys-proxy-api.vercel.app/api/region");
//     if (!response.ok) {
//       throw new Error("Failed to fetch regions");
//     }

//     const data = await response.json();
//     return data?.data || []; // Return only the data array
//   } catch (error) {
//     console.error("Error fetching regions:", error);
//     return [];
//   }
// }

// src/services/api.js

export const fetchRegions = async () => {
  try {
    const response = await fetch("https://fresh-beekeys-proxy-api.vercel.app/api/region");

    if (!response.ok) {
      throw new Error(`Failed to fetch regions. Status: ${response.status}`);
    }

    const json = await response.json();

    // Validate and return data
    if (json && Array.isArray(json.data)) {
      return json.data;
    }

    console.error("Unexpected API format:", json);
    return [];
  } catch (error) {
    console.error("Error fetching regions:", error);
    return [];
  }
};
