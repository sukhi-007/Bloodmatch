import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation for URL params
import "./LocationPage.css";


function LocationPage() {
  const [location, setLocation] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // For navigation
  const query = new URLSearchParams(useLocation().search);

  // Extract userType and bloodType from URL parameters
  const userType = query.get("userType");
  const bloodtype = query.get("bloodtype");

  useEffect(() => {
    if ("geolocation" in navigator) {
      requestLocationPermission();
    } else {
      setError("Geolocation is not available in your browser.");
    }
  }, []);

  const requestLocationPermission = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setPermissionStatus("granted");

        // Invoke respective API based on userType
        if (userType === "donor") {
          submitDonorLocation(latitude, longitude);
        } else if (userType === "recipient") {
          searchForDonors(latitude, longitude);
        }
      },
      (err) => {
        setError("Permission denied or unable to retrieve location.");
        setPermissionStatus("denied");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // API call for Donor
  const submitDonorLocation = async (latitude, longitude) => {
    try {
      if (latitude && longitude) {
        const response = await fetch("http://localhost:3000/submitDonorLocation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bloodtype,
            latitude,
            longitude,
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to submit donor location");
        }
        const data = await response.json();
        console.log("Donor submitted:", data);
      } else {
        setError("Location data is missing.");
      }
    } catch (error) {
      setError(`Error submitting donor: ${error.message}`);
      console.error("Error submitting donor:", error);
    }
  };

  // API call for Recipient
  const searchForDonors = async (latitude, longitude) => {
    try {
      if (latitude && longitude) {
        const response = await fetch("http://localhost:3000/searchDonor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bloodtype,
            latitude,
            longitude,
          }),
        });
        const data = await response.json();
        console.log("Donors found:", data);
      } else {
        setError("Location data is missing.");
      }
    } catch (error) {
      console.error("Error searching for donors:", error);
    }
  };

  const handleNextPage = () => {
    navigate("/next");
  };

  const handlePreviousPage = () => {
    navigate("/Donor");
  };

  return (
    <div className="location-page">
      <h1>Location Permission</h1>

      {permissionStatus === "granted" && location && (
        <div>
          <p>Your location is:</p>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
          <p>Location as JSON: {JSON.stringify(location)}</p>
          <div>
            <button onClick={handlePreviousPage}>Previous Page</button>
            <button onClick={handleNextPage}>Next Page</button>
          </div>
        </div>
      )}

      {permissionStatus === "denied" && error && (
        <div>
          <p>{error}</p>
          <button onClick={handlePreviousPage}>Previous Page</button>
        </div>
      )}

      {permissionStatus === "" && <p>Requesting location permission...</p>}
    </div>
  );
}

export default LocationPage;
