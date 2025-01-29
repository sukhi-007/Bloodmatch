import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Use navigate from react-router-dom v6+
import "./LocationPage.css";

function LocationPage() {
  const [location, setLocation] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For navigation
  
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
        setPermissionStatus('granted');
      },
      (err) => {
        setError("Permission denied or unable to retrieve location.");
        setPermissionStatus('denied');
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const handleNextPage = () => {
    // Navigate to the next page, which is the "Next" component in your routing
    navigate("/next"); 
  };

  const handlePreviousPage = () => {
    // Navigate to the Donor page
    navigate("/Donor");
  };

  return (
    <div className="location-page">
      <h1>Location Permission</h1>

      {permissionStatus === 'granted' && location && (
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

      {permissionStatus === 'denied' && error && (
        <div>
          <p>{error}</p>
          <button onClick={handlePreviousPage}>Previous Page</button>
        </div>
      )}

      {permissionStatus === '' && <p>Requesting location permission...</p>}
    </div>
  );
}

export default LocationPage;

