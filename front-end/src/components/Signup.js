import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import validator from 'validator';
import './styles.css';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error on input change
  };

  const validateForm = () => {
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return false;
    }
    if (!validator.isEmail(formData.email)) {
      setError('Invalid email format');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    if (!/[A-Z]/.test(formData.password)) {
      setError('Password must contain at least one uppercase letter');
      return false;
    }
    if (!/[0-9]/.test(formData.password)) {
      setError('Password must contain at least one number');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        navigate('/login');
      } else {
        setError(data.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
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
            required
          />
          <input
            type="email"
            name="email"
            className="input"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <div className="password-input-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              className="password-input"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
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
            required
          />
          {error && <div className="error-message">{error}</div>}
          <button className="button" type="submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        <div className="styled-link-wrapper">
          Already Have An Account? <Link to="/login" className="styled-link">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
