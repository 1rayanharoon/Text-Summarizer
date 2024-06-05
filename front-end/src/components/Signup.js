import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './styles.css';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      console.log('Submitting form data:', formData);
      const response = await fetch('http://localhost:5000/api/users/signup', { // Ensure this URL is correct
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      console.log('Response data:', data);
      if (response.ok) {
        // Handle successful signup (e.g., redirect to login page)
        console.log('Signup successful', data);
      } else {
        // Handle errors
        console.error('Signup error', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <h1 className="title">Create An Account</h1>
        <p className="paragraph">Create an account to enjoy our services</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            className="input"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
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
          <input
            type="password"
            name="confirmPassword"
            className="input"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <button className="button" type="submit">Create Account</button>
        </form>
        <div className="styled-link-wrapper">
          Already Have An Account? <Link to="/login" className="styled-link">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
