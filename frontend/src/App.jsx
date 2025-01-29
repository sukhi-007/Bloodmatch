import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import LoginForm from './LoginForm'; 
import SignupForm from './SignupForm'; 
import Donor from './Donor'; 
import LocationPage from './LocationPage';
import Next from './Next';
import "./App.css";

function LoginSignupPage() {
  const [formType, setFormType] = useState("login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const navigate = useNavigate();

  const toggleFormType = () => {
    setFormType(formType === "login" ? "signup" : "login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formType === "login" || formType === "signup") {
      navigate("/Donor");
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1>{formType === "login" ? "Login" : "Sign Up"}</h1>
        <form onSubmit={handleSubmit}>
          {formType === "login" ? (
            <LoginForm name={name} setName={setName} password={password} setPassword={setPassword} />
          ) : (
            <SignupForm 
              name={name} setName={setName} 
              bloodType={bloodType} setBloodType={setBloodType}
              country={country} setCountry={setCountry}
              state={state} setState={setState}
              city={city} setCity={setCity}
              phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}
              password={password} setPassword={setPassword} 
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
        <Route path="/" element={<LoginSignupPage />} />
        <Route path="/Donor" element={<Donor />} />
        <Route path="/location" element={<LocationPage />} />
        <Route path="/next" element={<Next />} />
      </Routes>
    </Router>
  );
}

export default App;
