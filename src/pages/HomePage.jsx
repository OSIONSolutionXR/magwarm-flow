import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Baby, Plus, ChevronDown } from 'lucide-react';
import { Card, CardContent } from '../components/Card';

const LEAPS = [
  { id: 1, week: 5, weekEnd: 6, title: "Die ersten Sinneswellen", phase: "Jahr 1" },
  { id: 2, week: 8, weekEnd: 9, title: "Muster im Chaos", phase: "Jahr 1" },
  { id: 3, week: 12, weekEnd: 13, title: "Wenn Bewegung Sinn ergibt", phase: "Jahr 1" },
  { id: 4, week: 19, weekEnd: 20, title: "Aha! Das hat Folgen", phase: "Jahr 1" },
  { id: 5, week: 26, weekEnd: 27, title: "Die ersten Trennungen", phase: "Jahr 1" },
  { id: 6, week: 37, weekEnd: 38, title: "Kategorien und Ordnung", phase: "Jahr 1" },
  { id: 7, week: 46, weekEnd: 47, title: "Reihenfolgen verstehen", phase: "Jahr 1" },
  { id: 8, week: 55, weekEnd: 56, title: "Flexible Programme", phase: "Jahr 1" },
  { id: 9, week: 64, weekEnd: 65, title: "Regeln und Konsequenzen", phase: "Jahr 1" },
  { id: 10, week: 75, weekEnd: 76, title: "Verbundenheit spüren", phase: "Jahr 1" },
  { id: 11, week: 76, weekEnd: 90, title: "Die Konsolidierung", phase: "Jahr 2", age: "18-21 Monate", intensity: 'medium' },
  { id: 12, week: 91, weekEnd: 115, title: "Die Autonomie-Explosion", phase: "Jahr 2", age: "2 Jahre", subtitle: "Trotzphase", intensity: 'high' },
  { id: 13, week: 116, weekEnd: 140, title: "Die Welt der Symbole", phase: "Jahr 2-3", age: "ca. 2,5 Jahre", intensity: 'medium' },
  { id: 14, week: 141, weekEnd: 156, title: "Warum? & Magisches Denken", phase: "Jahr 3", age: "3 Jahre", subtitle: "Kindergarten-Ready", intensity: 'high' },
];

function getCurrentWeek(dueDate) {
  const now = new Date();
  const due = new Date(dueDate);
  const diffTime = now.getTime() - due.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
}

function getLeapForWeek(week) {
  for (const leap of LEAPS) {
    if (week >= leap.week && week <= leap.weekEnd) {
      return { ...leap, isInLeap: true };
    }
    // Wenn nach diesem Sprung aber vor dem nächsten
    const nextLeap = LEAPS[LEAPS.indexOf(leap) + 1];
    if (week > leap.weekEnd && (!nextLeap || week < nextLeap.week)) {
      return { ...leap, isInLeap: false };
    }
  }
  // Nach dem letzten Sprung
  return { ...LEAPS[LEAPS.length - 1], isInLeap: week <= LEAPS[LEAPS.length - 1].weekEnd };
}

export default function HomePage() {
  const [babies, setBabies] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('flow-babies');
    if (stored) {
      setBabies(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="min-h-screen pb-24">
      <main className="container max-w-3xl mx-auto px-6 py-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="space-y-6"
        >
          <div className="flex flex-col items-center text-center gap-4 pt-2 pb-1">
            <div className="flex h-[4.8rem] w-[4.8rem] items-center justify-center rounded-[1.8rem] bg-gradient-to-br from-[hsl(17,75%,56%)] to-[hsl(18,85%,62%)] text-white shadow-[0_16px_30px_-18px_rgba(233,110,75,0.8)]">
              <Baby className="h-9 w-9" strokeWidth={2.1} />
            </div>
            <div className="space-y-3 max-w-2xl">
              <h1 className="text-[hsl(25,22%,16%)] dark:text-white text-[1.8rem] sm:text-[2.2rem] font-extrabold leading-[1.1] tracking-tight">
                MagWarm Flow
              </h1>
              <p className="text-[1.2rem] sm:text-[1.4rem] text-[hsl(17,75%,56%)] dark:text-[hsl(18,85%,65%)] font-semibold">
                Verstehe, was dein Baby gerade braucht
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            {babies.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)] mb-4">
                  Noch keine Babys angelegt
                </p>
                <Link
                  to="/add"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[hsl(17,75%,56%)] to-[hsl(18,85%,62%)] text-white font-semibold rounded-full shadow-[0_16px_30px_-18px_rgba(233,110,75,0.8)] hover:brightness-[1.02] transition-all"
                >
                  <Plus className="h-5 w-5" />
                  Erstes Baby anlegen
                </Link>
              </Card>
            ) : (
              babies.map((baby, index) => {
                const week = getCurrentWeek(baby.dueDate);
                const leap = getLeapForWeek(week);
                const isStorm = leap.isInLeap;
                const isToddler = week >= 76;
                
                return (
                  <motion.div
                    key={baby.id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.38, delay: 0.1 + index * 0.06 }}
                  >
                    <Link to={`/baby/${baby.id}`} className="block">
                      <Card className="group hover:shadow-[0_20px_50px_rgba(0,0,0,0.12),0_6px_16px_rgba(0,0,0,0.08)] transition-shadow">
                        <CardContent className="flex items-center gap-5 py-1">
                          <div className={`flex-shrink-0 flex h-[4.4rem] w-[4.4rem] items-center justify-center rounded-[1.2rem] shadow-[0_12px_24px_-18px_rgba(233,110,75,0.45)] transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-[0_18px_32px_-18px_rgba(233,110,75,0.5)] ${
                            isStorm 
                              ? 'bg-gradient-to-br from-amber-100 to-amber-200 text-amber-600' 
                              : 'bg-gradient-to-br from-green-100 to-green-200 text-green-600'
                          }`}>
                            <span className="text-2xl">{isStorm ? '🌩️' : '☀️'}</span>
                          </div>
                          <div className="flex-1 min-w-0 text-left">
                            <h2 className="text-[1.45rem] sm:text-[1.6rem] font-bold text-[hsl(25,22%,16%)] dark:text-white mb-1 tracking-tight">{baby.name}</h2>
                            <p className="text-[0.98rem] sm:text-base text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)]">
                              {isToddler 
                                ? `${leap.phase} · ${leap.age || `Woche ${week}`}` 
                                : `Woche ${week} · ${leap.title}`}
                            </p>
                          </div>
                          <span className="text-2xl text-[hsl(17,75%,56%)]">→</span>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })
            )}
            
            {babies.length > 0 && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.38, delay: 0.1 + babies.length * 0.06 }}
                >
                  <Link to="/add" className="block">
                    <Card className="border-2 border-dashed border-[hsl(17,75%,56%)]/30 text-[hsl(17,75%,56%)] hover:bg-[hsl(17,75%,56%)]/5 transition-colors">
                      <CardContent className="flex items-center justify-center py-6">
                        <div className="flex items-center gap-3">
                          <Plus className="h-6 w-6" />
                          <span className="font-semibold">Weiteres Baby hinzufügen</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
                
                {/* SCROLL HINWEIS */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="flex flex-col items-center pt-8 pb-4"
                >
                  <p className="text-sm text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)] mb-2 text-center">
                    Scrolle nach unten für mehr Infos
                  </p>
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="cursor-pointer"
                    onClick={() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })}
                  >
                    <ChevronDown className="h-8 w-8 text-[hsl(17,75%,56%)]" />
                  </motion.div>
                </motion.div>
              </>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
