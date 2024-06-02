import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './styles.css';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="container">
      <div className="form-wrapper">
        <h1 className="title">Create An Account</h1>
        <p className="paragraph">Create an account to enjoy our services</p>
        <form>
          <input type="text" className="input" placeholder="Username" />
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
          <input type="password" className="input" placeholder="Confirm Password" />
          <button className="button">Create Account</button>
        </form>
        <div className="styled-link-wrapper">
          Already Have An Account? <Link to="/login" className="styled-link">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
