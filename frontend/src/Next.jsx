import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIconShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import "./Next.css";
import { useLocation } from "react-router-dom";

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

  const { state } = useLocation();

  // Fallback donor location (New York)
  const fallbackDonor = { latitude: 13.0070, longitude: 77.5667 };

  // Retrieve donor data from previous page, or use fallback
  const donorsData = state?.donorsData || [fallbackDonor];
  console.log("Parsed donorsData:", donorsData);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("User Geolocation Coordinates:", latitude, longitude);
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

  if (isLoading) {
    return <p>Fetching location...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const userLatitude = parseFloat(location?.latitude);
  const userLongitude = parseFloat(location?.longitude);

  // Extract donor location
  const donorLocation = donorsData[0] || fallbackDonor;
  const donorLatitude = parseFloat(donorLocation.latitude) || fallbackDonor.latitude;
  const donorLongitude = parseFloat(donorLocation.longitude) || fallbackDonor.longitude;

  console.log("User Location: ", userLatitude, userLongitude);
  console.log("Donor Location: ", donorLatitude, donorLongitude);

  return (
    <div className="map-container">
      <MapContainer
        key={`${userLatitude}-${userLongitude}`}
        center={[userLatitude, userLongitude]}
        zoom={15}
        className="map-container"
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* User's Location Marker */}
        <Marker position={[userLatitude, userLongitude]}>
          <Popup>You are here!</Popup>
        </Marker>

        {/* Donor's Location Marker */}
        <Marker position={[donorLatitude, donorLongitude]}>
          <Popup>Donor's location</Popup>
        </Marker>

        {/* Draw Line between User and Donor */}
        <Polyline
          positions={[
            [userLatitude, userLongitude],
            [donorLatitude, donorLongitude],
          ]}
          color="blue"
          weight={4}
        />
      </MapContainer>
    </div>
  );
};

export default Next;
