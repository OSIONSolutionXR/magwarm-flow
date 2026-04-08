import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AddBabyPage from './pages/AddBabyPage';
import BabyDetailPage from './pages/BabyDetailPage';
import LeapsOverviewPage from './pages/LeapsOverviewPage';
import './index.css';

function App() {
  const [resetKey, setResetKey] = useState(0);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Check for saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(newTheme);
  };

  const handleReset = () => {
    setResetKey(prev => prev + 1);
  };

  return (
    <div className={`min-h-screen ${theme} bg-transparent`} key={resetKey}>
      <Header onResetData={handleReset} onToggleTheme={toggleTheme} theme={theme} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddBabyPage />} />
        <Route path="/baby/:id" element={<BabyDetailPage />} />
        <Route path="/leaps" element={<LeapsOverviewPage />} />
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
