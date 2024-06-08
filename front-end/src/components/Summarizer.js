import React, { useState } from 'react';
import './Summarizer.css';
import Footer from './Footer';
import { saveAs } from 'file-saver';
import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';
import Head from './Head';
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

const Summarizer = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');

  const handleSummarize = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (response.ok) {
        const data = await response.json();
        setSummary(data.summary);
      } else {
        console.error('Error summarizing text');
      }
    } catch (error) {
      console.error('Failed to fetch:', error);
    }
  };

  const handleClear = () => {
    setText('');
    setSummary('');
  };

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      if (fileType === 'application/pdf') {
        const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
        const text = await extractTextFromPDF(pdf);
        setText(text);
      } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
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

  const extractTextFromPDF = async (pdf) => {
    let text = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items.map(item => item.str);
      text += strings.join(' ') + '\n';
    }
    return text;
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
                <input type="file" accept=".txt,.pdf,.docx" onChange={handleUpload} style={{ display: 'none' }} />
              </label>
            </div>
          </div>
          <div className="summary-container">
            {summary ? <p>{summary}</p> : <p className="placeholder">Your text will appear here</p>}
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
