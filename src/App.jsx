import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import DashboardPage from './pages/DashboardPage';
import LibraryPage from './pages/LibraryPage';
import GameDetailsPage from './pages/GameDetailsPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-background text-on-surface font-body-md text-body-md antialiased overflow-x-hidden relative flex flex-col justify-between">
        {/* Ambient Cyber Backdrop Grid Lights */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-primary-container/10 rounded-full blur-[140px]"></div>
          <div className="absolute top-[40%] right-[-5%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[130px]"></div>
        </div>

        {/* Global Navigation Header */}
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* Dynamic Route View */}
        <main className="flex-grow relative z-10">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/library" element={<LibraryPage globalSearchQuery={searchQuery} />} />
            <Route path="/game/:id" element={<GameDetailsPage />} />
            {/* Fallback */}
            <Route path="*" element={<DashboardPage />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </Router>
  );
}
