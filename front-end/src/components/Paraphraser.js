import React, { useState } from 'react';
import './Summarizer.css';
import Footer from './Footer';
import { saveAs } from 'file-saver';
import axios from 'axios';
import Head from './Head';
import mammoth from 'mammoth';

const Paraphraser = () => {
  const [text, setText] = useState('');
  const [paraphrase, setParaphrase] = useState('');

  const handleParaphrase = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/paraphrase', { text });
      setParaphrase(response.data.paraphrase);
    } catch (error) {
      console.error('Error paraphrasing text:', error);
    }
  };

  const handleClear = () => {
    setText('');
    setParaphrase('');
  };

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const arrayBuffer = e.target.result;
          const result = await mammoth.extractRawText({ arrayBuffer });
          setText(result.value);
        };
        reader.readAsArrayBuffer(file);
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target.result;
          setText(text);
        };
        reader.readAsText(file);
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(paraphrase);
  };

  const handleDownload = () => {
    const blob = new Blob([paraphrase], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'paraphrase.txt');
  };

  const highlightParaphrase = (original, paraphrased) => {
    const regex = new RegExp(`(${original})`, 'gi');
    return paraphrased.replace(regex, '<span class="highlight">$1</span>');
  };

  return (
    <div>
      <Head />
      <div className="summarizer-wrapper">
        <h1 className="main-header">Effortless Paraphrasing at Your Fingertips</h1>
        <div className="summarizer-container">
          <div className="textarea-container">
            <textarea
              className="textarea"
              placeholder="Type or paste the text you want to Paraphrase here."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="button-container">
              <button className="paraphrase-button" onClick={handleParaphrase}>
                Paraphrase
              </button>
              <button className="clear-button" onClick={handleClear}>
                Clear
              </button>
              <label className="upload-button">
                Upload
                <input type="file" accept=".txt,.docx" onChange={handleUpload} style={{ display: 'none' }} />
              </label>
            </div>
          </div>
          <div className="summary-container">
            {paraphrase ? (
              <p dangerouslySetInnerHTML={{ __html: highlightParaphrase(text, paraphrase) }} />
            ) : (
              <p className="placeholder">Your paraphrased text will appear here</p>
            )}
            <div className="bottom-button-container">
              <button className="bottom-button" onClick={handleCopy}>
                Copy
              </button>
              <button className="bottom-button" onClick={handleDownload}>
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Paraphraser;
