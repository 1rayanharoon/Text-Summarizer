import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './HomePage.css';
import sampleImage from './sample.png';
// import Head from './Head';
// import Footer from './Footer';

function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo === 'footer') {
      const footerElement = document.getElementById('footer');
      if (footerElement) {
        footerElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (location.state?.scrollTo === 'services') {
      const servicesElement = document.getElementById('services');
      if (servicesElement) {
        servicesElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className="HomePage">
      {/* <Head /> */}
      <header className="intro-section">
        <div className="intro-text">
          <h1>Navigating the digital landscape for success</h1>
          <p>
            Our AI-powered platform helps individuals and businesses enhance their written content and communication with advanced services such as text summarization, paraphrasing, translation, and more.
          </p>
        </div>
        
        <div className="intro-image">
          <img src={sampleImage} alt="Intro" />
        </div>
      </header>
      
      <section className="services-section" id="services">
        <div className="services-header">
          <span className="services-title">Services</span>
          <p>At our AI platform, we offer services to enhance written content and communication. These services include:</p>
        </div>
        
        <div className="services-cards">
          <Link to="/summarizer" className="card">Text Summarization</Link>
          <Link to="/paraphraser" className="card">Paraphraser</Link>
          <Link to="/translator" className="card">Translator</Link>
          <Link to="/fourthcard" className="card">Fourth</Link>
        </div>
      </section>
      {/* <footer id="footer">
        <Footer />
      </footer> */}
    </div>
  );
}

export default HomePage;
