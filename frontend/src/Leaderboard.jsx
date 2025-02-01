import React from "react";
import "./Leaderboard.css"; // Import CSS for styling

// Dummy data: Array of donors with names and blood donated (in liters)
const donors = [
    { name: "Amit Kumar", bloodDonated: 6 },
    { name: "John Doe", bloodDonated: 5 },
    { name: "Lisa Ray", bloodDonated: 5 },
    { name: "Sarah Khan", bloodDonated: 5 },
    { name: "David Singh", bloodDonated: 4 },
    { name: "Priya Sharma", bloodDonated: 4 },
    { name: "Rahul Verma", bloodDonated: 4 },
    { name: "Emily Thomas", bloodDonated: 3 },
    { name: "Arjun Reddy", bloodDonated: 3 },
    { name: "Sneha Patel", bloodDonated: 2 }
];

// Sort donors by blood donated in descending order
const sortedDonors = [...donors].sort((a, b) => b.bloodDonated - a.bloodDonated);

function Leaderboard() {
    return (
        <div className="leaderboard-container">
            <h2>Blood Donation Leaderboard 🏆</h2>
            <ul className="leaderboard">
                {sortedDonors.map((donor, index) => (
                    <li key={index} className="leaderboard-item">
                        <span className="rank">{index + 1}.</span>
                        <span className="donor-name">
                            {donor.name} {index === 0 ? "👑" : index < 10 ? "⭐" : ""}
                        </span>
                        <span className="blood-donated">{donor.bloodDonated} times</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Leaderboard;
