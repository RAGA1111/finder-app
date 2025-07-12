import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GEOAPIFY_KEY = "468ccff7cd5c44ada436cd15db1111c4"; 

const categoryMap = {
  restaurant: "catering.restaurant",
  hospital: "healthcare.hospital",
  school: "education.school",
  gym: "leisure.gym",
  park: "leisure.park",
  library: "education.library",
  playground: "leisure.playground",
  supermarket: "shop.supermarket",
  theatre: "entertainment.cinema",
  market: "commercial.marketplace",
  store: "shop",
};

const displayNameMap = {
  restaurant: "Restaurants",
  hospital: "Hospitals",
  school: "Schools",
  gym: "Gyms",
  park: "Parks",
  library: "Libraries",
  playground: "Playgrounds",
  supermarket: "Supermarkets",
  theatre: "Theatres",
  market: "Markets",
  store: "Stores",
};

const PlaceFinderMap = ({ type, location }) => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!type || !location) return;

    const category = categoryMap[type] || "commercial";
    const [lat, lon] = location.split(',').map(Number);

    const fetchPlaces = async () => {
      try {
        const res = await axios.get("https://api.geoapify.com/v2/places", {
          params: {
            categories: category,
            filter: `circle:${lon},${lat},5000`,
            bias: `proximity:${lon},${lat}`,
            limit: 20,
            apiKey: GEOAPIFY_KEY,
          },
        });
        setPlaces(res.data.features || []);
      } catch (err) {
        console.error("Geoapify Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [type, location]);

  if (!type || !location) return null;

  return (
    <div className="p-4 max-w-2xl mx-auto bg-white shadow-lg rounded-lg mt-4">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Nearby {displayNameMap[type] || "Places"}
      </h2>
      {loading ? (
        <p className="text-center text-gray-500">Loading places...</p>
      ) : places.length === 0 ? (
        <p className="text-center text-gray-500">No places found.</p>
      ) : (
        <ul className="space-y-4">
          {places.map((place, idx) => (
            <li key={idx} className="border-b pb-2">
              <strong>{place.properties.name || "Unnamed Place"}</strong><br />
              {place.properties.address_line1}<br />
              {place.properties.address_line2}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlaceFinderMap;
