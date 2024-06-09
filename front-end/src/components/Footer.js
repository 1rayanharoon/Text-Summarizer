import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const navigate = useNavigate();

  const handleServicesClick = (e) => {
    e.preventDefault();
    navigate('/', { state: { scrollTo: 'services' } });
  };

  return (
    <footer className="footer" id="footer">
      <div className="footer-container">
        <div className="logo">
          <p className="logo-text">Positivus</p>
        </div>
        <div className="footer-content">
          <div className="footer-right">
            <nav className="footer-nav">
              <a href="/about-us">About us</a>
              <a href="/" onClick={handleServicesClick}>Services</a>
            </nav>
          </div>
          <div className="footer-left">
            <div className="footer-contact">
              <button className="contact-button">Contact us:</button>
              <p>Email: info@positivus.com</p>
              <p>Phone: 555-567-8901</p>
              <p>Address: Bahria University<br />
                Islamabad H-11 ,Pakistan</p>
            </div>
          </div>
        </div>
        <div className="footer-social">
          <a href="https://facebook.com"><i className="fab fa-facebook"></i></a>
          <a href="https://linkedin.com"><i className="fab fa-linkedin"></i></a>
          <a href="https://twitter.com"><i className="fab fa-twitter"></i></a>
        </div>
        <div className="footer-bottom">
          <p>© 2023 Positivus. All Rights Reserved.</p>
          <a href="/privacy-policy">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
