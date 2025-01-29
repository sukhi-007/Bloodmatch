import React from 'react';

function LoginForm({ name, setName, password, setPassword }) {
  return (
    <div className="form-group">
      <label>Username</label>
      <input
        type="text"
        placeholder="Enter username"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label>Password</label>
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </div>
  );
}

export default LoginForm;
