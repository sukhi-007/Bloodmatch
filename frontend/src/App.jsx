import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Donor from './Donor';
import LocationPage from './LocationPage';
import Next from './Next';
import "./App.css";
import DonorForm from './DonorForm';
import DonorLink from './DonorLink';

function LoginSignupPage() {
  const [formType, setFormType] = useState("login");
  const [email, setName] = useState("");
  const [passkey, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [phononum, setPhoneNumber] = useState("");

  const navigate = useNavigate();

  const toggleFormType = () => {
    setFormType(formType === "login" ? "signup" : "login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email,
      passkey,
      ...(formType === "signup" ? { city, state, country, phononum } : {})
    };

    const url = formType === "login" ? "http://localhost:3000/login" : "http://localhost:3000/signup";

    try {
      // Sending POST request to backend
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // If the response is successful, navigate to the Donor page
        navigate("/Donor");
      } else {
        // Handle error from the backend (e.g., invalid credentials or signup failure)
        const data = await response.json();
        alert(data.message || "Something went wrong!");
      }
    } catch (error) {
      // Handle network or other errors
      alert("Network error: " + error.message);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1>{formType === "login" ? "Login" : "Sign Up"}</h1>
        <form onSubmit={handleSubmit}>
          {formType === "login" ? (
            <LoginForm email={email} setName={setName} passkey={passkey} setPassword={setPassword} />
          ) : (
            <SignupForm
              name={email} setName={setName}
              country={country} setCountry={setCountry}
              state={state} setState={setState}
              city={city} setCity={setCity}
              phononum={phononum} setPhoneNumber={setPhoneNumber}
              password={passkey} setPassword={setPassword}
            />
          )}
          <button type="submit" className="btn">
            {formType === "login" ? "Login" : "Sign Up"}
          </button>
        </form>
        <p>
          {formType === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <button className="toggle-btn" onClick={toggleFormType}>
            {formType === "login" ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DonorLink />}></Route>
        <Route path="/LoginSignupPage" element={<LoginSignupPage />} />
        <Route path="/Donor" element={<Donor />} />
        <Route path="/location" element={<LocationPage />} />
        <Route path="/next" element={<Next />} />
        <Route path="/donor-form" element={<DonorForm />} />
      </Routes>
    </Router>
  );
}

export default App;