import { useEffect, useState } from "react";
import axios from "axios";

export default function Saved() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!userId || !token) {
      alert("You must be logged in to view saved places.");
      return;
    }

    const fetchBookmarks = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/bookmarks/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookmarks(res.data);
      } catch (err) {
        console.error("Error fetching bookmarks:", err);
        alert("Failed to load saved places.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [userId, token]);

  if (loading) return <p>Loading your saved places...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Saved Places</h1>
      {bookmarks.length === 0 ? (
        <p>No saved places yet.</p>
      ) : (
        <ul>
          {bookmarks.map((place, index) => (
            <li key={index} style={{ marginBottom: "1rem", borderBottom: "1px solid #ccc", paddingBottom: "1rem" }}>
              <h3>{place.name}</h3>
              <p>Type: {place.type}</p>
              <p>Location: {place.location}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
