import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./DonorForm.css";

function DonorForm() {
    const [ageGroup, setAgeGroup] = useState(false);
    const [alcoholConsumption, setAlcoholConsumption] = useState(false);
    const [noIllness, setNoIllness] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);

    // Get userType and bloodtype from URL params
    const userType = query.get("userType");
    const bloodtype = query.get("bloodtype");

    const handleSubmit = () => {
        if (ageGroup && alcoholConsumption && noIllness) {
            alert("Thank you for registering as a donor!");
            // Proceed to next step or another page
        } else {
            alert("Please confirm all the required fields.");
        }
    };

    return (
        <div className="DonorForm">
            <h1>Donor Verification Form</h1>

            <div className="formgroup">
                <label>
                    <input
                        type="checkbox"
                        checked={ageGroup}
                        onChange={() => setAgeGroup(!ageGroup)}
                    />
                    <p>You are 18 years of age or older, as individuals under the age of 18 are not eligible for blood donation due to health and safety reasons.</p>
                </label>
            </div>

            <div className="formgroup">
                <label>
                    <input
                        type="checkbox"
                        checked={alcoholConsumption}
                        onChange={() => setAlcoholConsumption(!alcoholConsumption)}
                    />
                    <p>You have not consumed alcohol in the past 24 hours, as alcohol intake may affect your ability to safely donate blood and your overall health during the donation process.</p>
                </label>
            </div>

            <div className="formgroup">
                <label>
                    <input
                        type="checkbox"
                        checked={noIllness}
                        onChange={() => setNoIllness(!noIllness)}
                    />
                    <p>You are free from any current illness, such as infections, fever, or chronic conditions, that could affect your health or the safety of the donated blood</p>
                </label>
            </div>

            <div>
                <button className="submit-button" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </div>
    );
}

export default DonorForm;
