import React from 'react';
import './global.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Fahrplan from './pages/Fahrplan.js';
import Speiseplan from './pages/Speiseplan.js';
import Vertretungsplan from './pages/Vertretungsplan.js';
import Wetter from './pages/Wetter.js';
import News from './pages/News.js';

function App() {  
  return (
    <div className="max-h-screen min-h-screen flex flex-col">
    <Router>
      <Navbar />
      <Routes>
        <Route path="" element={<News />} />
        <Route path="fahrplan" element={<Fahrplan />} />
        <Route path="speiseplan" element={<Speiseplan />} />
        <Route path="vertretungsplan" element={<Vertretungsplan/>} />
        <Route path="wetter" element={<Wetter/>} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;