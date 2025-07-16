import PlaceFinderMap from '../components/PlaceFinderMap';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import React from 'react';



    
  


export default function Home() {
  const router = useRouter();
  const [type, setType] = useState("restaurant");
  const [location, setLocation] = useState("");
  const [fetchedType, setFetchedType] = useState(null);


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        const coords = `${latitude},${longitude}`;
        setLocation(coords);
      },
      (err) => {
        console.warn("Geolocation error:", err);
      }
    );
  }, []);

  const handleSearch = async () => {
    if (!location) {
      alert("Please enter a location.");
      return;
    }

    console.log('Raw location input:', location);
    // Check if input is coordinates (simple regex: numbers, comma, numbers)
    const coordRegex = /^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/;
    let coords = location;

    if (!coordRegex.test(location.trim())) {
      console.log('Treating input as city name, will geocode');
      // Not coordinates, so geocode the city name
      try {
        const geoRes = await fetch(
          `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(location)}&apiKey=468ccff7cd5c44ada436cd15db1111c4`
        );
        const geoData = await geoRes.json();
        console.log('Geoapify geocoding response:', geoData); // Debug log
        if (geoData.features && geoData.features.length > 0) {
          const { lat, lon } = geoData.features[0].properties;
          coords = `${lat},${lon}`;
        } else {
          alert("Could not find location. Please enter a valid city or coordinates.");
          return;
        }
      } catch (err) {
        alert("Error finding location. Please try again.");
        return;
      }
    } else {
      console.log('Treating input as coordinates, skipping geocoding');
    }
    console.log("Searching:", type, coords);
    router.push(`/search?type=${type}&location=${encodeURIComponent(coords)}`);
  };

  return (
    <div className="centered-page">
      <div className="card">
        <h1>The Finder</h1>

        <div className="form-group">
          <label>Choose Place Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="restaurant">Restaurant</option>
            <option value="hospital">Hospital</option>
            <option value="school">School</option>
            <option value="gym">Gym</option>
            <option value="park">Park</option>
            <option value="library">Library</option>
            <option value="playground">Playground</option>
            <option value="shopping_mall">Shopping Mall</option>
            <option value="supermarket">Supermarket</option>
            <option value="movie_theater">Theatre</option>
            <option value="market">Market</option>
            <option value="store">General Store</option>
          </select>
        </div>

        <div className="min-h-screen bg-purple-50">
            <PlaceFinderMap />
        </div>

        <div className="form-group">
          <label>Enter Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City or coordinates"
          />
          <button
            onClick={() => {
              console.log('Use my current location button clicked');
              navigator.geolocation.getCurrentPosition(
                ({ coords: { latitude, longitude } }) => {
                  console.log('Geolocation success:', latitude, longitude);
                  setLocation(`${latitude},${longitude}`);
                },
                (err) => {
                  console.error('Geolocation error:', err);
                  alert("Location access denied.");
                }
              );
            }}
            className="link-button"
          >
            📍 Use my current location
          </button>
        </div>

        <button className="button" onClick={handleSearch}>
          🔍 Search Places
        </button>
      </div>
    </div>
  );
}

