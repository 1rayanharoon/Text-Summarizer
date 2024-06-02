import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './styles.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="container">
      <div className="form-wrapper">
        <h1 className="title">Sign In</h1>
        <p className="paragraph">Sign in to continue to our service.</p>
        <form>
          <input type="email" className="input" placeholder="Email Address" />
          <div className="password-input-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              className="password-input"
              placeholder="Password"
            />
            <button type="button" className="toggle-button" onClick={togglePasswordVisibility}>
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
          <button className="button">Sign In</button>
        </form>
        <div className="styled-link-wrapper">
          Don't Have An Account? <Link to="/signup" className="styled-link">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
