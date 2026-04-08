import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, Navigation } from 'lucide-react';
import { Card, CardContent } from '../components/Card';

const LEAPS = [
  // Jahr 1: Die 10 klassischen Sprünge
  { week: 5, weekEnd: 6, intensity: 'high', title: "Die ersten Sinneswellen", phase: "Jahr 1" },
  { week: 8, weekEnd: 9, intensity: 'high', title: "Muster im Chaos", phase: "Jahr 1" },
  { week: 12, weekEnd: 13, intensity: 'high', title: "Wenn Bewegung Sinn ergibt", phase: "Jahr 1" },
  { week: 19, weekEnd: 20, intensity: 'high', title: "Aha! Das hat Folgen", phase: "Jahr 1" },
  { week: 26, weekEnd: 27, intensity: 'high', title: "Die ersten Trennungen", phase: "Jahr 1" },
  { week: 37, weekEnd: 38, intensity: 'high', title: "Kategorien und Ordnung", phase: "Jahr 1" },
  { week: 46, weekEnd: 47, intensity: 'high', title: "Reihenfolgen verstehen", phase: "Jahr 1" },
  { week: 55, weekEnd: 56, intensity: 'high', title: "Flexible Programme", phase: "Jahr 1" },
  { week: 64, weekEnd: 65, intensity: 'high', title: "Regeln und Konsequenzen", phase: "Jahr 1" },
  { week: 75, weekEnd: 76, intensity: 'high', title: "Verbundenheit spüren", phase: "Jahr 1" },
  // Jahr 2-3: Die 4 neuen Phasen
  { week: 76, weekEnd: 90, intensity: 'medium', title: "Die Konsolidierung", phase: "Jahr 2", age: "18-21 Monate" },
  { week: 91, weekEnd: 115, intensity: 'high', title: "Die Autonomie-Explosion", phase: "Jahr 2", age: "2 Jahre", subtitle: "Trotzphase" },
  { week: 116, weekEnd: 140, intensity: 'medium', title: "Die Welt der Symbole", phase: "Jahr 2-3", age: "ca. 2,5 Jahre" },
  { week: 141, weekEnd: 156, intensity: 'high', title: "Warum? & Magisches Denken", phase: "Jahr 3", age: "3 Jahre", subtitle: "Kindergarten-Ready" },
];

// Übergangsphasen (1 Woche vor Sprung)
const TRANSITIONS = [4, 7, 11, 18, 25, 36, 45, 54, 63, 74, 90, 115, 140];

function getCurrentWeek(dueDate) {
  const now = new Date();
  const due = new Date(dueDate);
  const diffTime = now.getTime() - due.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
}

function getWeekColor(week) {
  // Prüfe ob in Sprung
  const inLeap = LEAPS.some(l => week >= l.week && week <= l.weekEnd);
  if (inLeap) return 'intense';
  
  // Prüfe ob Übergangsphase
  const inTransition = TRANSITIONS.includes(week);
  if (inTransition) return 'transition';
  
  return 'calm';
}

export default function LeapsOverviewPage() {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [babyName, setBabyName] = useState('');
  const [selectedWeek, setSelectedWeek] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('flow-babies') || '[]');
    if (stored.length > 0) {
      const baby = stored[0];
      const week = getCurrentWeek(baby.dueDate);
      setCurrentWeek(week);
      setSelectedWeek(week);
      setBabyName(baby.name);
    }
  }, []);

  const currentLeap = useMemo(() => {
    return LEAPS.find(l => currentWeek >= l.week && currentWeek <= l.weekEnd);
  }, [currentWeek]);

  const currentStatus = getWeekColor(currentWeek);
  
  const statusText = {
    calm: { text: 'Ruhige Phase', desc: 'Dein Baby ist entspannt und ausgeglichen.' },
    transition: { text: 'Sanfte Veränderung', desc: 'Eine neue Phase zeichnet sich ab.' },
    intense: { text: 'Intensive Phase', desc: 'Dein Baby verarbeitet viele neue Eindrücke.' }
  };

  const maxWeek = 80;
  const weeks = Array.from({ length: maxWeek }, (_, i) => i + 1);

  return (
    <div className="min-h-screen pb-8">
      <header className="sticky top-0 z-50 w-full border-b border-white/45 dark:border-white/5 bg-white/72 dark:bg-[hsl(210,25%,7%)]/72 backdrop-blur-xl">
        <div className="container max-w-3xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to={`/baby/${babyName.toLowerCase()}`} className="flex items-center gap-2 text-[hsl(17,75%,56%)] hover:opacity-80 transition-opacity">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Zurück</span>
            </Link>
            <h1 className="font-semibold text-[hsl(25,22%,16%)] dark:text-white">Entwicklungs-Timeline</h1>
            <div className="w-16"></div>
          </div>
        </div>
      </header>

      <main className="container max-w-3xl mx-auto px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="space-y-6"
        >
          {/* Aktueller Status */}
          <Card className={`border-2 ${
            currentStatus === 'intense' ? 'border-red-400/50 bg-red-500/5' :
            currentStatus === 'transition' ? 'border-amber-400/50 bg-amber-500/5' :
            'border-green-400/50 bg-green-500/5'
          }`}>
            <CardContent className="py-6">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                  currentStatus === 'intense' ? 'bg-red-500 text-white shadow-[0_8px_24px_-8px_rgba(239,68,68,0.5)]' :
                  currentStatus === 'transition' ? 'bg-amber-500 text-white shadow-[0_8px_24px_-8px_rgba(245,158,11,0.5)]' :
                  'bg-green-500 text-white shadow-[0_8px_24px_-8px_rgba(34,197,94,0.5)]'
                }`}>
                  <span className="text-2xl font-bold">{currentWeek}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)]">Aktuelle Woche</p>
                  <h2 className="text-xl font-bold text-[hsl(25,22%,16%)] dark:text-white">
                    {statusText[currentStatus].text}
                  </h2>
                  <p className="text-sm text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)] mt-1">
                    {currentLeap ? currentLeap.title : statusText[currentStatus].desc}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Wochen-Timeline */}
          <div>
            <h3 className="text-lg font-bold text-[hsl(25,22%,16%)] dark:text-white mb-4">Wochenübersicht</h3>
            
            {/* Scrollbare Timeline */}
            <div className="relative">
              <div className="overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
                <div className="flex gap-1 min-w-max">
                  {weeks.map((week) => {
                    const color = getWeekColor(week);
                    const isCurrent = week === currentWeek;
                    const isPast = week < currentWeek;
                    const isSelected = week === selectedWeek;
                    
                    return (
                      <motion.button
                        key={week}
                        onClick={() => setSelectedWeek(week)}
                        whileTap={{ scale: 0.95 }}
                        className={`
                          w-8 h-12 rounded-lg flex flex-col items-center justify-center text-[10px] font-medium transition-all
                          ${color === 'intense' ? 'bg-red-400 hover:bg-red-500' : 
                            color === 'transition' ? 'bg-amber-300 hover:bg-amber-400' : 
                            'bg-green-400 hover:bg-green-500'}
                          ${isPast ? 'opacity-60' : 'opacity-100'}
                          ${isCurrent ? 'ring-2 ring-white dark:ring-gray-800 ring-offset-2 ring-offset-[hsl(17,75%,56%)] scale-110 z-10' : ''}
                          ${isSelected && !isCurrent ? 'ring-2 ring-[hsl(17,75%,56%)]' : ''}
                        `}
                      >
                        <span className="text-white/70 text-[8px]">W</span>
                        <span className="text-white">{week}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
              
              {/* Aktuelle Position Anzeige */}
              {currentWeek > 0 && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[hsl(17,75%,56%)] to-transparent opacity-50"></div>
              )}
            </div>

            {/* Legende */}
            <div className="flex items-center justify-center gap-6 mt-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-green-400"></div>
                <span className="text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)]">Ruhig</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-amber-300"></div>
                <span className="text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)]">Übergang</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-red-400"></div>
                <span className="text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)]">Intensiv</span>
              </div>
            </div>
          </div>

          {/* Details zur ausgewählten Woche */}
          {selectedWeek && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={selectedWeek}
            >
              <Card className="border border-[hsl(25,20%,90%)] dark:border-[hsl(210,20%,20%)]">
                <CardContent className="py-5">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-[hsl(25,22%,16%)] dark:text-white">Woche {selectedWeek}</h4>
                    {selectedWeek === currentWeek && (
                      <span className="px-2 py-1 bg-[hsl(17,75%,56%)]/10 text-[hsl(17,75%,56%)] text-xs font-medium rounded-full">
                        Aktuell
                      </span>
                    )}
                  </div>
                  
                  <div className={`
                    p-4 rounded-xl
                    ${getWeekColor(selectedWeek) === 'intense' ? 'bg-red-50 dark:bg-red-900/20' :
                      getWeekColor(selectedWeek) === 'transition' ? 'bg-amber-50 dark:bg-amber-900/20' :
                      'bg-green-50 dark:bg-green-900/20'}
                  `}>
                    <p className="text-[hsl(25,22%,16%)] dark:text-white font-medium">
                      {statusText[getWeekColor(selectedWeek)].text}
                    </p>
                    
                    {(() => {
                      const leap = LEAPS.find(l => selectedWeek >= l.week && selectedWeek <= l.weekEnd);
                      if (leap) {
                        return (
                          <p className="text-sm text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)] mt-1">
                            {leap.title}
                          </p>
                        );
                      }
                      const nextLeap = LEAPS.find(l => l.week > selectedWeek);
                      if (nextLeap) {
                        return (
                          <p className="text-sm text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)] mt-1">
                            Nächste Entwicklungsphase: Woche {nextLeap.week}
                          </p>
                        );
                      }
                      return null;
                    })()}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Navigation zu aktueller Woche */}
          <button
            onClick={() => setSelectedWeek(currentWeek)}
            className="w-full flex items-center justify-center gap-2 py-4 bg-[hsl(17,75%,56%)]/10 hover:bg-[hsl(17,75%,56%)]/15 rounded-xl transition-colors border border-[hsl(17,75%,56%)]/20 text-[hsl(17,75%,56%)] font-semibold"
          >
            <Navigation className="h-4 w-4" />
            Zur aktuellen Woche
          </button>
        </motion.div>
      </main>
    </div>
  );
}
