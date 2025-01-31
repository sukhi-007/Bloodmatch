import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";  // Import axios for API calls
import "./DonorForm.css";

function DonorForm() {
    const [ageGroup, setAgeGroup] = useState(false);
    const [alcoholConsumption, setAlcoholConsumption] = useState(false);
    const [noIllness, setNoIllness] = useState(false);
    const location = useLocation();

    // Extract state data from the navigation state
    const { bloodtype, location: userLocation } = location.state || {};
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!ageGroup || !alcoholConsumption || !noIllness) {
            alert("Please confirm all the required fields.");
            return;
        }

        if (!userLocation) {
            alert("Location data is missing.");
            return;
        }

        const donorData = {
            bloodtype,
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
        };

        try {
            const response = await axios.post("http://localhost:3000/submitDonorLocation", donorData);
            if (response.status === 200) {
                alert("Thank you for registering as a donor!");
                navigate("/");
            }
        } catch (error) {
            console.error("Error submitting donor data:", error);
            alert("Failed to submit data. Please try again.");
        }
    };

    return (
        <div className="DonorForm">
            <h1>Donor Verification Form</h1>

            <div className="formgroup">
                <label>
                    <input type="checkbox" checked={ageGroup} onChange={() => setAgeGroup(!ageGroup)} />
                    <p>You are 18 years of age or older, as individuals under the age of 18 are not eligible for blood donation due to health and safety reasons.</p>
                </label>
            </div>

            <div className="formgroup">
                <label>
                    <input type="checkbox" checked={alcoholConsumption} onChange={() => setAlcoholConsumption(!alcoholConsumption)} />
                    <p>You have not consumed alcohol in the past 24 hours, as alcohol intake may affect your ability to safely donate blood and your overall health during the donation process.</p>
                </label>
            </div>

            <div className="formgroup">
                <label>
                    <input type="checkbox" checked={noIllness} onChange={() => setNoIllness(!noIllness)} />
                    <p>You are free from any current illness, such as infections, fever, or chronic conditions, that could affect your health or the safety of the donated blood</p>
                </label>
            </div>

            <p><strong>Blood Type:</strong> {bloodtype}</p>
            <p><strong>Current Location:</strong> {userLocation ? `${userLocation.latitude}, ${userLocation.longitude}` : "Not available"}</p>

            <button className="submit-button" onClick={handleSubmit}>
                Submit
            </button>
        </div>
    );
}

export default DonorForm;
