import { useState, useRef, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun, Menu, X, Trash2 } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export default function Header({ onResetData }) {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const handleResetClick = () => {
    setMenuOpen(false);
    setShowResetConfirm(true);
  };

  const confirmReset = () => {
    localStorage.removeItem('flow-babies');
    localStorage.removeItem('flow-theme');
    setShowResetConfirm(false);
    if (onResetData) onResetData();
    window.location.reload();
  };

  const handleThemeToggle = () => {
    toggleTheme();
    setMenuOpen(false);
  };

  return (
    <Fragment>
      <header className="sticky top-0 z-50 w-full border-b border-white/45 dark:border-white/5 bg-white/72 dark:bg-[hsl(210,25%,7%)]/72 backdrop-blur-xl transition-all duration-300">
        <div className="container max-w-3xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity duration-300">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[hsl(17,75%,56%)] to-[hsl(18,85%,62%)] text-white shadow-[0_16px_30px_-18px_rgba(233,110,75,0.8)]">
                <span className="text-lg font-bold leading-none">F</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[1.35rem] font-extrabold tracking-tight text-[hsl(17,75%,56%)]">MagWarm Flow</span>
                <span className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-[hsl(25,22%,16%)]/45 dark:text-white/45">Verstehe dein Baby</span>
              </div>
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-[hsl(17,75%,56%)] hover:bg-[hsl(17,75%,56%)]/10 transition-colors"
                aria-label={theme === 'light' ? 'Zu dunklem Modus wechseln' : 'Zu hellem Modus wechseln'}
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </button>
              
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-[hsl(17,75%,56%)] hover:bg-[hsl(17,75%,56%)]/10 transition-colors"
                  aria-label="Menü öffnen"
                >
                  {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
                
                {menuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 rounded-[1.2rem] bg-white dark:bg-[#0B0F14] shadow-[0_20px_50px_rgba(0,0,0,0.25)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-[#E5E5E5] dark:border-[#1C2530] overflow-hidden z-50">
                    <div className="py-2">
                      <button
                        onClick={handleThemeToggle}
                        className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-[hsl(17,75%,56%)]/10 dark:hover:bg-[hsl(17,75%,56%)]/20 transition-colors"
                      >
                        {theme === 'light' ? <Moon className="h-5 w-5 text-[hsl(17,75%,56%)]" /> : <Sun className="h-5 w-5 text-[hsl(17,75%,56%)]" />}
                        <div>
                          <p className="font-semibold text-sm text-[hsl(25,22%,16%)] dark:text-white">Erscheinungsbild</p>
                          <p className="text-xs text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)]">Auf {theme === 'light' ? 'Dunkel' : 'Hell'} wechseln</p>
                        </div>
                      </button>
                      
                      <div className="mx-4 my-2 h-px bg-[#E5E5E5]/50 dark:bg-[#2A3542]/50" />
                      
                      <button
                        onClick={handleResetClick}
                        className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-500"
                      >
                        <Trash2 className="h-5 w-5" />
                        <div>
                          <p className="font-semibold text-sm">Daten zurücksetzen</p>
                          <p className="text-xs text-red-400">Alle Daten löschen</p>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#0B0F14] rounded-2xl p-6 max-w-sm w-full shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
                <Trash2 className="h-6 w-6 text-red-500" />
              </div>
              
              <h3 className="text-lg font-bold text-[hsl(25,22%,16%)] dark:text-white mb-2">
                Alle Daten löschen?
              </h3>
              <p className="text-sm text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)] mb-6">
                Diese Aktion kann nicht rückgängig gemacht werden. Alle Babys und Einstellungen werden gelöscht.
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 py-3 rounded-xl border border-[hsl(25,20%,90%)] dark:border-[hsl(210,20%,20%)] text-[hsl(25,22%,16%)] dark:text-white font-medium hover:bg-gray-50 dark:hover:bg-[hsl(210,20%,15%)] transition-colors"
                >
                  Abbrechen
                </button>
                <button
                  onClick={confirmReset}
                  className="flex-1 py-3 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
                >
                  Löschen
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
