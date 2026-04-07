import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AddBabyPage from './pages/AddBabyPage';
import BabyDetailPage from './pages/BabyDetailPage';
import './index.css';

function App() {
  const [resetKey, setResetKey] = useState(0);

  const handleReset = () => {
    setResetKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen" key={resetKey}>
      <Header onResetData={handleReset} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddBabyPage />} />
        <Route path="/baby/:id" element={<BabyDetailPage />} />
      </Routes>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>
);
