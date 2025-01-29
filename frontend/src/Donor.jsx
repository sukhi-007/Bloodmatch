import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Donor.css";

function Donor() {
  const [userType, setUserType] = useState(""); // Donor or Recipient
  const [bloodType, setBloodType] = useState(""); // Blood type dropdown selection
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const handleSave = () => {
    if (!userType || !bloodType) {
      alert("Please select a user type and blood type.");
      return;
    }

    const userInfo = {
      type: userType,
      bloodType,
      name: "User's Name", // Placeholder
      contact: "User's Contact", // Placeholder
    };

    setUserData(userInfo);
    console.log("User Information:", JSON.stringify(userInfo));

    navigate("/location"); // Redirect to location page
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
          value={bloodType}
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
        Your Blood Type: <strong>{bloodType || "Not Selected"}</strong>
      </p>

      {/* Save Button */}
      <button className="save-button" onClick={handleSave}>
        Save Information
      </button>
    </div>
  );
}

export default Donor;
