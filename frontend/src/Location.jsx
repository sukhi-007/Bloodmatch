import React, { useState, useEffect } from 'react';

function Location({ onLocationSave }) {
  const [location, setLocation] = useState(null); 
  const [permissionStatus, setPermissionStatus] = useState(''); 
  const [error, setError] = useState(''); 

  useEffect(() => {
    if ("geolocation" in navigator) {
      getLocation();
    } else {
      setError("Geolocation is not available in your browser.");
    }
  }, []);

  const getLocation = () => {
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

  const handleSave = () => {
    if (location) {
      const locationData = {
        latitude: location.latitude,
        longitude: location.longitude
      };
      onLocationSave(locationData);

      console.log("Location saved:", JSON.stringify(locationData));
    }
  };

  return (
    <div className="location-container">
      <h2>Location</h2>

      {/* Display Location Permission Status */}
      {permissionStatus === '' && (
        <div>
          <p>We need your location to proceed. Would you like to share it?</p>
          <button onClick={getLocation}>Grant Location Permission</button>
        </div>
      )}

      {permissionStatus === 'granted' && location && (
        <div>
          <p>Your current location:</p>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
          <button onClick={handleSave}>Save Location</button>
        </div>
      )}

      {permissionStatus === 'denied' && error && (
        <div>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default Location;
