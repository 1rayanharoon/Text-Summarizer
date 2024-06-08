import React from 'react';
import Head from './Head';
import Footer from './Footer';
import aboutImage from './about.jpg';
import './About.css';

function About() {
  return (
    <div className="About">
      <Head isAboutPage={true} />
      <div className="about-image-container">
        <img src={aboutImage} alt="Intro" className="about-image" />
      </div>
      <div className="about-text">
        <p>
          Welcome to [Company Name], where innovation meets artificial intelligence. At [Company Name], we are passionate about harnessing the power of AI to drive transformative solutions for businesses and individuals alike.
        </p>
        <p>
          As a leading AI company, our mission is simple yet profound: to empower humanity through cutting-edge AI technology. We believe in the potential of artificial intelligence to revolutionize industries, streamline processes, and enhance decision-making.
        </p>
        {/* Add more paragraphs here if needed */}
      </div>
      <Footer />
    </div>
  );
}

export default About;
