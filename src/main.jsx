import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddBabyPage from './pages/AddBabyPage';
import BabyDetailPage from './pages/BabyDetailPage';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddBabyPage />} />
        <Route path="/baby/:id" element={<BabyDetailPage />} />
      </Routes>
    </HashRouter>
  </StrictMode>
);
