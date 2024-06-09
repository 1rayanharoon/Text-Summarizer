import React from 'react';
import Head from './Head';
import Footer from './Footer';
import aboutImage from './about.jpg';
import './About.css';

function About() {
  return (
    <div className="About">
      <Head/>
      <div className="about-container">
      <div className="about-text">
        <h1>This is Synapse Labs</h1>
        <p>
        At Synapse Labs, we share your vision for a world where customer connections are effortless and enriching.  We believe the key lies in unlocking the power of everyday interactions.  That's why we developed Parawrap, an AI-powered tool designed to simplify the complexities of customer service and transform those interactions into extraordinary experiences.
        </p>
        <p>
        We understand, because we're all customers too.  We've all experienced the frustration of a clunky support process, and the joy of a seamless resolution.  ParaWrap empowers businesses to deliver that joy consistently, making life a little bit better for everyone involved.
        </p>
      </div>
      <div className="about-image">
        <img src={aboutImage} alt="Zendesk Team" />
      </div>
    </div>
      <Footer />
    </div>
  );
}

export default About;
