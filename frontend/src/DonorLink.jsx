import React from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import './DonorLink.css';

const DonorLink = () => {
    const navigate = useNavigate();

    return (
        <div className="image-container">
            {/* Login/Signup Button */}
            <button className="login-button" onClick={() => navigate('/LoginSignupPage')}>
                Login / Signup
            </button>

            {/* Image Stack */}
            <div className="image-stack">
                <img src="/1p1.jpg" alt="Image 1" className="image" />
                <img src="/2p1.jpg" alt="Image 2" className="image" />
                <img src="/3p1.jpg" alt="Image 3" className="image" />
                <img src="/4p1.jpg" alt="Image 4" className="image" />
            </div>
        </div>
    );
};

export default DonorLink;