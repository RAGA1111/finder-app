
import PlaceFinderMap from "../components/PlaceFinderMap";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios"; // ✅ needed for POST request

export default function SearchPage() {
  const router = useRouter();
  const { type, location } = router.query;

  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  // Replace with actual user ID (from auth or context/localStorage)
  const userId = "raga111"; // ⚠️ Temporary placeholder — change this

    const saveBookmark = async (place) => {
        try {
            await fetch("http://localhost:5000/api/bookmarks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: place.properties.name,
                    address: place.properties.address_line1,
                    lat: place.geometry.coordinates[1],
                    lon: place.geometry.coordinates[0],
                    category: type,
                    placeId: place.properties.place_id,
                }),
                });
                alert("Saved!");
            } catch (err) {
                console.error(err);
                alert("Already bookmarked or failed.");
            }
            };


  useEffect(() => {
    const fetchGeoapifyPlaces = async () => {
      if (!type || !location) return;

      console.log("From query:", type, location);
      const [lat, lon] = location.split(',').map(Number);

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

      const category = categoryMap[type] || "commercial";

      try {
        const res = await fetch(
          `https://api.geoapify.com/v2/places?categories=${category}&filter=circle:${lon},${lat},5000&bias=proximity:${lon},${lat}&limit=20&apiKey=468ccff7cd5c44ada436cd15db1111c4`
        );
        const data = await res.json();
        setPlaces(data.features || []);
      } catch (err) {
        console.error("Geoapify error:", err);
        setPlaces([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGeoapifyPlaces();
  }, [type, location]);

  return (
    <div style={{ padding: "2rem", background: "#f8f8ff", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>
        Results for "{type}" near "{location}"
      </h1>

      {loading ? (
        <p>Loading places...</p>
      ) : places.length === 0 ? (
        <p>No places found.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "1.5rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          }}
        >
          {places.map((place, index) => {
            const props = place.properties;
            return (
              <div
                key={index}
                style={{
                  background: "white",
                  borderRadius: "1rem",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  padding: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <h2 style={{ fontSize: "1.1rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
                  {props.name || "Unnamed Place"}
                </h2>
                {props.address_line1 && <p>{props.address_line1}</p>}
                {props.address_line2 && <p>{props.address_line2}</p>}
                {props.distance && (
                  <p>📍 {(props.distance / 1000).toFixed(2)} km away</p>
                )}
                {props.website && (
                  <a
                    href={props.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#7c3aed",
                      textDecoration: "underline",
                      marginTop: "0.5rem",
                    }}
                  >
                    Visit Website
                  </a>
                )}
                <button
                    style={{
                        marginTop: "1rem",
                        padding: "0.5rem",
                        borderRadius: "0.5rem",
                        border: "none",
                        background: "#7c3aed",
                        color: "white",
                        fontWeight: "bold",
                        cursor: "pointer",
                    }}
                    onClick={async () => {
                        try {
                        const payload = {
                            name: props.name,
                            address: props.address_line1,
                            lat: place.geometry.coordinates[1],
                            lon: place.geometry.coordinates[0],
                            category: type,
                            placeId: props.place_id,
                        };

                        const res = await axios.post(
                            `http://localhost:5000/api/users/${userId}/bookmarks`,
                            payload
                        );

                        alert("✅ Saved to bookmarks!");
                        } catch (err) {
                        console.error(err);
                        alert("❌ Already bookmarked or error saving.");
                        }
                    }}
                    >
                    ❤️ Save
                    </button>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
