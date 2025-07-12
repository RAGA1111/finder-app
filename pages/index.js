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

  const handleSearch = () => {
    if (!location) {
      alert("Please enter a location.");
      return;
    }
    console.log("Searching:", type, location);
    router.push(`/search?type=${type}&location=${encodeURIComponent(location)}`);
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
            onClick={() =>
              navigator.geolocation.getCurrentPosition(
                ({ coords: { latitude, longitude } }) => {
                  setLocation(`${latitude},${longitude}`);
                },
                () => alert("Location access denied.")
              )
            }
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

