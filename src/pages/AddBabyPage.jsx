import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowLeft, Baby } from 'lucide-react';
import { Card, CardContent } from '../components/Card';
import { PopButton } from '../components/PopEffect';

export default function AddBabyPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name.trim() || !dueDate) {
      setError('Bitte fülle alle Felder aus');
      return;
    }

    const newBaby = {
      id: Date.now().toString(),
      name: name.trim(),
      dueDate,
      createdAt: new Date().toISOString()
    };

    const existing = JSON.parse(localStorage.getItem('flow-babies') || '[]');
    localStorage.setItem('flow-babies', JSON.stringify([...existing, newBaby]));
    navigate('/');
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b border-white/45 dark:border-white/5 bg-white/72 dark:bg-[hsl(210,25%,7%)]/72 backdrop-blur-xl">
        <div className="container max-w-3xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-[hsl(17,75%,56%)] hover:opacity-80 transition-opacity">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Zurück</span>
            </Link>
            <h1 className="font-semibold text-[hsl(25,22%,16%)] dark:text-white">Baby hinzufügen</h1>
            <div className="w-16"></div>
          </div>
        </div>
      </header>

      <main className="container max-w-3xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Card>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center mb-8">
                  <div className="flex h-[4rem] w-[4rem] items-center justify-center rounded-2xl bg-gradient-to-br from-[hsl(17,75%,56%)] to-[hsl(18,85%,62%)] text-white shadow-[0_16px_30px_-18px_rgba(233,110,75,0.8)] mx-auto mb-4">
                    <Baby className="h-7 w-7" strokeWidth={2} />
                  </div>
                  <h2 className="text-[1.5rem] font-bold text-[hsl(25,22%,16%)] dark:text-white">
                    Neues Baby anlegen
                  </h2>
                  <p className="text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)] mt-2">
                    Gib den Namen und den errechneten Geburtstermin an
                  </p>
                </div>

                {error && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 rounded-xl text-sm">
                    {error}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-[hsl(25,22%,16%)] dark:text-white mb-2">
                      Name des Babys
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="z.B. Emma"
                      className="w-full px-4 py-3.5 rounded-xl border border-[hsl(25,20%,90%)] dark:border-[hsl(210,20%,20%)] bg-white dark:bg-[hsl(210,25%,7%)] text-[hsl(25,22%,16%)] dark:text-white focus:outline-none focus:ring-2 focus:ring-[hsl(17,75%,56%)]/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[hsl(25,22%,16%)] dark:text-white mb-2">
                      Errechneter Geburtstermin
                    </label>
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl border border-[hsl(25,20%,90%)] dark:border-[hsl(210,20%,20%)] bg-white dark:bg-[hsl(210,25%,7%)] text-[hsl(25,22%,16%)] dark:text-white focus:outline-none focus:ring-2 focus:ring-[hsl(17,75%,56%)]/50"
                    />
                    <p className="text-xs text-[hsl(25,10%,55%)] dark:text-[hsl(30,10%,50%)] mt-2">
                      Dieses Datum ist entscheidend für die Berechnung der Entwicklungsphasen. Ein zu früh oder zu spät geborenes Baby entwickelt sich trotzdem nach diesem ursprünglichen Termin.
                    </p>
                  </div>
                </div>

                <PopButton
                  className="w-full block mt-2"
                >
                  <button
                    type="submit"
                    disabled={!name.trim() || !dueDate}
                    className="w-full py-5 px-8 bg-gradient-to-r from-[hsl(17,75%,56%)] to-[hsl(18,85%,62%)] text-white font-bold text-xl rounded-2xl shadow-[0_16px_30px_-18px_rgba(233,110,75,0.8)] hover:brightness-[1.02] disabled:opacity-50 disabled:cursor-not-allowed transition-all pointer-events-none"
                  >
                    Baby speichern
                  </button>
                </PopButton>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
