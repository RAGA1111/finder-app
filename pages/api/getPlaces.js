import axios from 'axios';

const GEOAPIFY_KEY = "468ccff7cd5c44ada436cd15db1111c4"; // Replace this

export const getPlacesData = async (lat, lon, category = "healthcare.hospital", radius = 5000, limit = 20) => {
  try {
    const response = await axios.get("https://api.geoapify.com/v2/places", {
      params: {
        categories: category,
        filter: `circle:${lon},${lat},${radius}`,
        bias: `proximity:${lon},${lat}`,
        limit,
        apiKey: GEOAPIFY_KEY,
      }
    });

    return response.data.features; // array of places
  } catch (error) {
    console.error("Error fetching places from Geoapify:", error);
    return [];
  }
};
