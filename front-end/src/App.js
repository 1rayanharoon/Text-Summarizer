import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import HomePage from './components/HomePage';
import About from './components/About';
import Summarizer from './components/Summarizer';
import Paraphraser from './components/Paraphraser';
import Translator from './components/Translator';
import AIDetect from './components/AI-Detect';

const ScrollToTop = ({ children }) => {
  const { pathname, state } = useLocation();

  React.useEffect(() => {
    if (state?.scrollTo) {
      const element = document.getElementById(state.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, state]);

  return <>{children}</>;
};

const App = () => {
  return (
    <Router>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/services" element={<HomePage />} />
          <Route path="/summarizer" element={<Summarizer />} />
        <Route path="/paraphraser" element={<Paraphraser />} />
        <Route path="/translator" element={<Translator />} />
        <Route path="/aidetector" element={<AIDetect />} />
        </Routes>
      </ScrollToTop>
    </Router>
  );
};

export default App;
