import React, { useState } from 'react';
import Head from './Head';
import Footer from './Footer';
import './AI-Detect.css';

const AIDetector = () => {
  const [inputText, setInputText] = useState('');
  const [aiGeneratedPercentage, setAiGeneratedPercentage] = useState('');
  const [showAnalysisResult, setShowAnalysisResult] = useState(false);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const analyzeText = () => {
    if (inputText.trim() !== '') {
      const percentage = Math.min(100, Math.max(0, inputText.length * 0.5));
      setAiGeneratedPercentage(percentage.toFixed(2));
      setShowAnalysisResult(true);
    }
  };

  return (
    <div className='main'>
      <Head />
      <div className='title'>
        <h1>Trust your gut, verify with AI Detector.</h1>
      </div>
      <div className="aicontainer">
        <div className="detector">
          <div className="head">
            <h1>AI-Detector</h1>
          </div>
          <div className="input-container">
            <textarea
              placeholder="Tap to enter text"
              value={inputText}
              onChange={handleInputChange}
            ></textarea>
            <div className={`result-text ${showAnalysisResult ? 'visible' : ''}`}>
              <div className="percentage">{aiGeneratedPercentage}%</div>
              <div className="description">of text is likely AI-generated.</div>
            </div>
          </div>
          <div className="actions">
            <button className="round-button" onClick={analyzeText}>Analyze Text</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AIDetector;
