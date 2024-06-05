// Login.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './styles.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting login data:', formData);
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Response data:', data);
      if (response.ok) {
        navigate('/'); // Redirect to dashboard upon successful login
      } else {
        console.error('Login error', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <h1 className="title">Sign In</h1>
        <p className="paragraph">Sign in to continue to our service.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            className="input"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />
          <div className="password-input-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              className="password-input"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <button type="button" className="toggle-button" onClick={togglePasswordVisibility}>
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
          <button className="button" type="submit">Sign In</button>
        </form>
        <div className="styled-link-wrapper">
          Don't Have An Account? <Link to="/signup" className="styled-link">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
