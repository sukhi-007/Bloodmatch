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

  // Fallback donor locations (more than 3)
  const fallbackDonors = [
    { latitude: 13.0070, longitude: 77.5667, name: "Fallback Donor 1" },
    { latitude: 13.0600, longitude: 77.5790, name: "Fallback Donor 2" },
    { latitude: 13.120, longitude: 77.5000, name: "Fallback Donor 3" },
    { latitude: 13.0100, longitude: 77.7600, name: "Fallback Donor 4" },
    { latitude: 13.0300, longitude: 77.5100, name: "Fallback Donor 5" }
  ];

  // Retrieve donor data from previous page, or use fallback
  const donorsData = state?.donorsData?.length ? state.donorsData : fallbackDonors;

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          setIsLoading(false);
        },
        (err) => {
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

  // Function to calculate distance between two points using Haversine formula
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  // Sort donors by distance from the user and select the nearest 3
  const sortedDonors = donorsData
    .map((donor) => ({
      ...donor,
      distance: getDistance(userLatitude, userLongitude, donor.latitude, donor.longitude),
    }))
    .sort((a, b) => a.distance - b.distance);

  const nearestDonors = sortedDonors.slice(0, 1); // 

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

        {/* Donor Markers */}
        {donorsData.map((donor, index) => (
          <Marker key={index} position={[donor.latitude, donor.longitude]}>
            <Popup>{donor.name || `Donor ${index + 1}`}</Popup>
          </Marker>
        ))}

        {/* Draw Lines Only to Nearest 3 Donors */}
        {nearestDonors.map((donor, index) => (
          <Polyline
            key={index}
            positions={[
              [userLatitude, userLongitude],
              [donor.latitude, donor.longitude],
            ]}
            color="blue"
            weight={3}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default Next;
