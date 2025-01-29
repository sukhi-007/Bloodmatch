import React from "react";

function SignupForm({ name, setName, country, setCountry, state, setState, city, setCity, phoneNumber, setPhoneNumber, password, setPassword }) {
  return (
    <div>
      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          placeholder="Enter username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Country</label>
        <input
          type="text"
          placeholder="Enter your country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>State</label>
        <input
          type="text"
          placeholder="Enter your state"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>City</label>
        <input
          type="text"
          placeholder="Enter your city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Phone Number</label>
        <input
          type="tel"
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
    </div>
  );
}

export default SignupForm;