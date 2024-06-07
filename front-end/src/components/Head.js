import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Head.css';

const Head = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = (e) => {
    if (e) {
      e.stopPropagation();
    }
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener('click', closeSidebar);
      document.body.classList.add('sidebar-open'); // Add class to body to hide scrollbar
    } else {
      document.removeEventListener('click', closeSidebar);
      document.body.classList.remove('sidebar-open'); // Remove class from body to restore scrollbar
    }
    return () => {
      document.removeEventListener('click', closeSidebar);
      document.body.classList.remove('sidebar-open'); // Clean up class from body on unmount
    };
  }, [isSidebarOpen]);

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const handleContactClick = () => {
    navigate('/', { state: { scrollTo: 'footer' } });
  };

  return (
    <>
      <button className="menu-button" onClick={toggleSidebar}>
        &#9776;
      </button>
      <header className="header">
        <div className="logo">
          <Link to="/" className="logo-text" onClick={() => setSidebarOpen(false)}>Parawrap</Link>
        </div>
        <div class="nav-container">
        <nav className="nav-links">
          <Link to="/about-us">About us</Link>
          <Link to="/" state={{ scrollTo: 'services' }} onClick={() => setSidebarOpen(false)}>Services</Link>
          <a href="#" onClick={handleContactClick}>Contact</a>
        </nav>
        <button className="sign-out">Sign Out</button>
        </div>
      </header>
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`} onClick={stopPropagation}>
        <nav className="sidebar-nav">
          <Link to="/about-us" onClick={() => toggleSidebar()}>About us</Link>
          <Link to="/" state={{ scrollTo: 'services' }} onClick={() => toggleSidebar()}>Services</Link>
          <a href="#" onClick={() => { handleContactClick(); toggleSidebar(); }}>Contact</a>
          <button className="sign-out" onClick={toggleSidebar}>Sign Out</button>
        </nav>
      </aside>
    </>
  );
};

export default Head;
