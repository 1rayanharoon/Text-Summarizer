import React, { useState } from 'react';
import './Summarizer.css';
import Footer from './Footer';
import { saveAs } from 'file-saver';
import * as pdfjsLib from 'pdfjs-dist';
import Head from './Head';
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

const Summarizer = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');

  const handleSummarize = () => {
    // Placeholder summarization logic, replace with backend integration
    setSummary(text.split(' ').slice(0, 10).join(' ') + '...');
  };

  const handleClear = () => {
    setText('');
    setSummary('');
  };

  const handleUpload = async (event) => {
    console.log("File selected:", event.target.files[0]);
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log("File contents:", e.target.result);
        const text = e.target.result;
        console.log("Setting text state:", text);
        setText(text);
      };
      reader.readAsText(file);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
  };

  const handleDownload = () => {
    const blob = new Blob([summary], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'summary.txt');
  };

  return (
    <div>
      <Head/>
    <div className="summarizer-wrapper">
      <h1 className="main-header">Effortless Summarization at Your Fingertips</h1>
      <div className="summarizer-container">
        <div className="textarea-container">
          <textarea
            className="textarea"
            placeholder="Type or paste the text you want to summarize here."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="button-container">
            <button className="summarize-button" onClick={handleSummarize}>
              Summarize
            </button>
            <button className="clear-button" onClick={handleClear}>
              Clear
            </button>
            <label className="upload-button">
              Upload
              <input type="file" accept=".txt" onChange={handleUpload} style={{ display: 'none' }} />
            </label>
          </div>
        </div>
        <div className="summary-container">
          {summary? <p>{summary}</p> : <p className="placeholder">Your text will appear here</p>}

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
    <Footer/>
    </div>
  );
};

export default Summarizer;