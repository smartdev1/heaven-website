import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicHeader from './components/layout/PublicHeader';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import ParoissesIndex from './pages/ParoissesIndex';
import ParoisseDetail from './pages/ParoisseDetail';
import ProgrammesIndex from './pages/ProgrammesIndex';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <PublicHeader />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/paroisses" element={<ParoissesIndex />} />
            <Route path="/paroisses/:slug" element={<ParoisseDetail />} />
            <Route path="/programmes" element={<ProgrammesIndex />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
