import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Donor.css";

function Donor() {
  const [userType, setUserType] = useState(""); // Donor or Recipient
  const [bloodtype, setBloodType] = useState(""); // Blood type dropdown selection
  const [location, setLocation] = useState(null); // Location state
  const [error, setError] = useState(""); // Error state
  const navigate = useNavigate();

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          setError("Location access denied. Please enable location services.");
          console.error(err);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  const handleSave = () => {
    if (!userType || !bloodtype) {
      alert("Please select a user type and blood type.");
      return;
    }

    if (!location) {
      alert("Location is not available. Please enable location services.");
      return;
    }

    if (userType === "donor") {
      navigate("/donor-form", {
        state: {
          bloodtype,
          location
        }
      });
    } else {
      navigate("/location", {
        state: {
          userType: userType,
          bloodtype: bloodtype,
          latitude: location.latitude,
          longitude: location.longitude,
        },
      });
    }
  };

  return (
    <div className="Donor">
      <h1>Welcome to the Donor/Recipient Page</h1>

      {/* User Type Selection */}
      <div className="form-group">
        <label>Select if you are a Donor or Recipient</label>
        <div className="selection-boxes">
          <div
            className={`selection-box ${userType === "donor" ? "active" : ""}`}
            onClick={() => setUserType("donor")}
          >
            Donor
          </div>
          <div
            className={`selection-box ${userType === "recipient" ? "active" : ""}`}
            onClick={() => setUserType("recipient")}
          >
            Recipient
          </div>
        </div>
      </div>

      {/* Blood Type Dropdown */}
      <div className="form-group">
        <label>Select Blood Type</label>
        <select
          value={bloodtype}
          onChange={(e) => setBloodType(e.target.value)}
          required
        >
          <option value="">Select Blood Type</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>
      </div>

      {/* Display Selected Info */}
      <p>
        You are a: <strong>{userType || "Select a type"}</strong>
      </p>
      <p>
        Your Blood Type: <strong>{bloodtype || "Not Selected"}</strong>
      </p>
      {/* Save Button */}
      <button className="save-button" onClick={handleSave}>
        Save Information
      </button>
    </div>
  );
}

export default Donor;

