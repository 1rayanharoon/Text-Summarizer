import React, { useState } from 'react';
import Head from './Head';
import Footer from './Footer';
import './Translator.css';

const Translator = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('English');
  const [targetLanguage, setTargetLanguage] = useState('Urdu');
  const [showTranslatedText, setShowTranslatedText] = useState(false);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSourceLanguageChange = (event) => {
    setSourceLanguage(event.target.value);
  };

  const handleTargetLanguageChange = (event) => {
    setTargetLanguage(event.target.value);
  };

  const handleSwapLanguages = () => {
    const temp = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(temp);
  };

  const languages = ['English', 'Urdu', 'Japanese', 'Spanish', 'French', 'German', 'Chinese', 'Russian', 'Arabic', 'Portuguese'];

  const translateText = async () => {
    const response = await fetch('http://localhost:5000/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: inputText, source: sourceLanguage, target: targetLanguage }),
    });
    const data = await response.json();
    setTranslatedText(data.translated_text);
    setShowTranslatedText(true);
  };

  return (
    <div className='main'>
      <Head />
      <div className='title'>
        <h1>Translate the world.</h1>
      </div>
      <div className="translator-container">
        <div className="translator">
          <div className="head">
            <h1>Translator</h1>
          </div>
          <div className="languages">
            <select value={sourceLanguage} onChange={handleSourceLanguageChange}>
              {languages.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
            <span className="swap" onClick={handleSwapLanguages}>&#x21c4;</span>
            <select value={targetLanguage} onChange={handleTargetLanguageChange}>
              {languages.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
          <div className="input-container">
            <textarea
              placeholder="Tap to enter text"
              value={inputText}
              onChange={handleInputChange}
            ></textarea>
            {showTranslatedText && (
              <textarea
                placeholder="Translated text will appear here"
                value={translatedText}
                readOnly
              ></textarea>
            )}
          </div>
          <div className="actions">
            <button className="round-button" onClick={translateText}>Translate</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Translator;
