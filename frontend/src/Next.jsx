import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIconShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import "./Next.css"; // Import custom CSS

// Fix for default marker icon
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerIconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const Next = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const fallbackLocation = { latitude: 12.9716, longitude: 77.5946 }; // Bengaluru fallback

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Raw Geolocation Coordinates:", latitude, longitude);
          setLocation({ latitude, longitude });
          setIsLoading(false);
        },
        (err) => {
          console.error("Geolocation error:", err);
          setError("Unable to retrieve location.");
          setIsLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
      setIsLoading(false);
    }
  }, []);

  const centerLocation = location || fallbackLocation;
  const latitude = parseFloat(centerLocation?.latitude ?? fallbackLocation.latitude);
  const longitude = parseFloat(centerLocation?.longitude ?? fallbackLocation.longitude);

  console.log("Coordinates Passed to Leaflet: Latitude:", latitude, "Longitude:", longitude);

  return (
    <div className="map-container">
      {isLoading ? (
        <p>Fetching location...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <MapContainer
          key={`${latitude}-${longitude}`}
          center={[latitude, longitude]}
          zoom={15}
          className="map-container"
          style={{ height: "100vh", width: "100%" }}
          whenReady={() => console.log("Map is ready!")}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[latitude, longitude]}>
            <Popup>You are here!</Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default Next;
