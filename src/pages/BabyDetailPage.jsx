import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowLeft, Brain, Sprout, Lightbulb, Calendar, Cloud, ChevronDown, Heart, Phone, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '../components/Card';
import { PopCard, PopButton } from '../components/PopEffect';
import { TEMPLATES } from './BabyDetailPage_TEMPLATES.js';

const TABS = [
  { id: 1, label: 'Zustand', icon: Cloud, color: 'text-sky-500' },
  { id: 2, label: 'Warum', icon: Brain, color: 'text-violet-500' },
  { id: 3, label: 'Lernt', icon: Sprout, color: 'text-green-500' },
  { id: 4, label: 'Tun', icon: Lightbulb, color: 'text-amber-500' },
  { id: 5, label: 'Zeit', icon: Calendar, color: 'text-rose-500' },
];

function getCurrentWeek(dueDate) {
  const now = new Date();
  const due = new Date(dueDate);
  const diffTime = now.getTime() - due.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
}

function getLeapForWeek(week) {
  // Spezialfall: Neugeborenes (Woche 0-4)
  if (week < 5) {
    return {
      week: 0,
      weekEnd: 4,
      title: "Neugeborenen-Phase",
      isInLeap: false,
      phase: "Neugeborenes",
      age: "0-4 Wochen",
      description: "Die ersten Wochen des Lebens. Dein Baby passt sich an die Welt außerhalb des Mutterleibs an.",
      details: "Schlafen, Füttern, Bindung aufbauen - das sind die Prioritäten in den ersten Wochen.",
      stormPhase: {
        description: "Die ersten Wochen sind eine Zeit der Anpassung. Dein Baby lernt zu essen, zu schlafen und sich an das Leben außerhalb des Mutterleibs zu gewöhnen.",
        symptoms: [
          "Unregelmäßiger Schlaf-Wach-Rhythmus",
          "Häufiges Wachen zum Füttern",
          "Empfindlich auf Umweltreize",
          "Braucht viel Körperkontakt und Nähe"
        ]
      },
      sunnyPhase: {
        description: "In den ruhigen Momenten zeigt dein Baby erste Fortschritte. Es beginnt, die Welt zu erkennen und sich an sie zu gewöhnen.",
        abilities: [
          "Reagiert auf deine Stimme",
          "Saugt an der Brust oder dem Fläschchen",
          "Schläft nach dem Füttern ein",
          "Zeigt erste Reflexe (Greifreflex, Suchreflex)",
          "Beruhigt sich bei deiner Nähe"
        ]
      },
      why: "Die ersten Wochen sind geprägt von intensiver neurologischer Entwicklung. Millionen von Synapsen werden gebildet, während das Gehirn lernt, die Reize aus der neuen Umgebung zu verarbeiten.",
      actions: [
        "Halte dein Baby viel an deinem Körper",
        "Füttere nach Bedarf, nicht nach Uhrzeit",
        "Schaffe eine ruhige Umgebung",
        "Vertraue deinem Instinkt"
      ]
    };
  }
  
  for (const leap of TEMPLATES) {
    if (week >= leap.week && week <= leap.weekEnd) {
      return { ...leap, isInLeap: true };
    }
    // Wenn nach diesem Sprung aber vor dem nächsten
    const nextLeap = TEMPLATES[TEMPLATES.indexOf(leap) + 1];
    if (week > leap.weekEnd && (!nextLeap || week < nextLeap.week)) {
      return { ...leap, isInLeap: false };
    }
  }
  // Nach dem letzten Sprung
  return { ...TEMPLATES[TEMPLATES.length - 1], isInLeap: week <= TEMPLATES[TEMPLATES.length - 1].weekEnd };
}

// Sicherheitshinweis Komponente - klappbar und ohne Gender
function SafetyNotice() {
  const [isOpen, setIsOpen] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  return (
    <div className="mt-6 rounded-2xl border border-rose-200 dark:border-rose-800/50 overflow-hidden">
      {/* Hauptteil - immer sichtbar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 bg-gradient-to-r from-rose-50 to-orange-50 dark:from-rose-900/20 dark:to-orange-900/20 flex items-center justify-between hover:bg-rose-100/50 dark:hover:bg-rose-900/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-rose-100 dark:bg-rose-800/50 rounded-full flex items-center justify-center">
            <Heart className="h-5 w-5 text-rose-500" />
          </div>
          <div className="text-left">
            <h4 className="font-bold text-rose-700 dark:text-rose-300 text-[1.05rem]">
              Du fühlst dich überfordert?
            </h4>
            <p className="text-sm text-rose-600/70 dark:text-rose-400/70">
              Tippe hier für Unterstützung und Hilfe
            </p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-5 w-5 text-rose-500" />
        </motion.div>
      </button>

      {/* Aufklappbarer Inhalt */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-rose-50/50 to-orange-50/50 dark:from-rose-900/10 dark:to-orange-900/10"
          >
            <div className="p-4 pt-2 space-y-4">
              <p className="text-sm text-rose-700 dark:text-rose-300 leading-relaxed">
                Das ist völlig normal. Jeder braucht mal eine Pause. Wenn das Weinen zu viel wird, leg das Baby sicher in sein Bettchen und hol dir Unterstützung – von Partner, Familie, Freunden oder professioneller Hilfe.
              </p>

              {/* Schüttel-Warnung als separater Abschnitt */}
              <div className="pt-3 border-t border-rose-200/50 dark:border-rose-800/30">
                <button
                  onClick={() => setShowWarning(!showWarning)}
                  className="w-full flex items-center justify-between p-3 bg-rose-100/50 dark:bg-rose-900/30 rounded-xl hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-rose-500" />
                    <span className="text-sm font-medium text-rose-700 dark:text-rose-300">
                      Wichtiger Sicherheitshinweis
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: showWarning ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-4 w-4 text-rose-500" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {showWarning && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-2 p-3 bg-rose-100/30 dark:bg-rose-900/20 rounded-xl"
                    >
                      <p className="text-sm text-rose-700 dark:text-rose-300 font-medium mb-1">
                        Ein Baby niemals schütteln
                      </p>
                      <p className="text-xs text-rose-600/80 dark:text-rose-400/80">
                        Selbst kurzes Schütteln kann schwerwiegende gesundheitliche Schäden verursachen. Bei extremem Stress: Baby sicher ablegen, Raum verlassen, tief durchatmen und Hilfe holen.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Hilfsangebote */}
              <div className="flex flex-wrap gap-2 pt-2">
                <a
                  href="tel:08001110111"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-white/10 rounded-full text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-colors"
                >
                  <Phone className="h-3 w-3" />
                  Telefonseelsorge: 0800 111 0 111
                </a>
                <a
                  href="https://familien-helfer.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-white/10 rounded-full text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-colors"
                >
                  <span>👨‍⚕️</span>
                  familien-helfer.de
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function BabyDetailPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(1);
  const [baby, setBaby] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('flow-babies') || '[]');
    const found = stored.find(b => b.id === id);
    if (found) setBaby(found);
  }, [id]);

  if (!baby) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-[hsl(25,10%,45%)] mb-4">Baby nicht gefunden</p>
          <Link to="/" className="text-[hsl(17,75%,56%)] font-semibold">Zurück zur Übersicht</Link>
        </div>
      </div>
    );
  }

  const week = getCurrentWeek(baby.dueDate);
  const leap = getLeapForWeek(week);
  const isStorm = leap.isInLeap;
  const phaseData = isStorm ? leap.stormPhase : leap.sunnyPhase;
  const isToddler = week >= 76;

  // Bestimme das Alters-Label - GENAU berechnet vom dueDate
  const getExactAge = () => {
    const birthDate = new Date(baby.dueDate);
    const now = new Date();
    
    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();
    
    if (months < 0 || (months === 0 && now.getDate() < birthDate.getDate())) {
      years--;
      months += 12;
    }
    
    // Auch Tage berücksichtigen für präzise Monatsberechnung
    if (now.getDate() < birthDate.getDate()) {
      months--;
    }
    
    if (years === 0) {
      return `${months} Monate`;
    } else if (months === 0) {
      return `${years} Jahr${years > 1 ? 'e' : ''}`;
    } else {
      return `${years} Jahr${years > 1 ? 'e' : ''}, ${months} Monate`;
    }
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
            <h1 className="font-semibold text-[hsl(25,22%,16%)] dark:text-white">{baby.name}</h1>
            <div className="w-16"></div>
          </div>
        </div>
      </header>

      <main className="container max-w-3xl mx-auto px-6 py-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="space-y-6"
        >
          <div className="text-center py-4">
            <p className="text-sm text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)]">
              {isToddler ? getExactAge() : `Woche ${week}`}
            </p>
            <h2 className="text-[1.8rem] sm:text-[2.2rem] font-extrabold text-[hsl(25,22%,16%)] dark:text-white mt-1 leading-[1.1]">
              {leap.title}
            </h2>
            {leap.subtitle && (
              <p className="text-[hsl(17,75%,56%)] font-medium mt-1">{leap.subtitle}</p>
            )}
            <div className={`inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-full text-sm font-medium ${
              isStorm 
                ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300' 
                : 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300'
            }`}>
              <span className="text-lg">{isStorm ? '🌩️' : '☀️'}</span>
              {isStorm ? 'Stürmische Phase' : 'Sonnige Phase'}
            </div>
          </div>

          <Card>
            <CardContent>
              {activeTab === 1 && (
                <div className="space-y-6">
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0 text-5xl">{isStorm ? '🌩️' : '☀️'}</div>
                    <div>
                      <h3 className="text-[1.35rem] font-bold text-[hsl(25,22%,16%)] dark:text-white mb-2">
                        {isStorm ? 'Stürmische Phase' : 'Sonnige Phase'}
                      </h3>
                      <p className="text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)] leading-relaxed">
                        {phaseData.description}
                      </p>
                    </div>
                  </div>
                  
                  {isStorm && (
                    <div className="pt-4 border-t border-[hsl(25,20%,90%)] dark:border-[hsl(210,20%,20%)]">
                      <p className="text-sm text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)] mb-3 font-medium">Typische Anzeichen:</p>
                      <div className="flex flex-wrap gap-2">
                        {leap.stormPhase.symptoms.map((s, i) => (
                          <span key={i} className="px-3 py-1.5 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-sm">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Sicherheitshinweis bei Storm-Phasen - Klappbar */}
                  {isStorm && <SafetyNotice />}
                </div>
              )}

              {activeTab === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFE8DC] to-[#FFD2BE] text-[hsl(17,75%,56%)]">
                      <Brain className="h-6 w-6" />
                    </div>
                    <h3 className="text-[1.35rem] font-bold text-[hsl(25,22%,16%)] dark:text-white">Was im Kopf passiert</h3>
                  </div>
                  <p className="text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)] leading-relaxed pl-[3.75rem]">
                    {leap.why}
                  </p>
                </div>
              )}

              {activeTab === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-100 to-green-200 text-green-600">
                      <Sprout className="h-6 w-6" />
                    </div>
                    <h3 className="text-[1.35rem] font-bold text-[hsl(25,22%,16%)] dark:text-white">Neue Fähigkeiten</h3>
                  </div>
                  <div className="space-y-2 pl-[3.75rem]">
                    {leap.sunnyPhase.abilities.map((a, i) => (
                      <div key={i} className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                        <span className="text-green-500 text-lg">✓</span>
                        <span className="text-[hsl(25,22%,16%)] dark:text-white">{a}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 4 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-rose-100 to-rose-200 text-rose-500">
                      <Lightbulb className="h-6 w-6" />
                    </div>
                    <h3 className="text-[1.35rem] font-bold text-[hsl(25,22%,16%)] dark:text-white">Das hilft jetzt</h3>
                  </div>
                  <div className="space-y-3">
                    {leap.actions.map((a, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 bg-rose-50 dark:bg-rose-900/20 rounded-xl">
                        <span className="flex-shrink-0 w-8 h-8 bg-[hsl(17,75%,56%)] text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {i + 1}
                        </span>
                        <p className="text-[hsl(25,22%,16%)] dark:text-white pt-1 leading-relaxed">{a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 5 && (
                <div className="space-y-4">
                  {/* ALLE PHASEN BUTTON - DIREKT ÜBER ZEITLINIE */}
                  <Link to="/leaps">
                    <motion.div 
                      className="relative overflow-hidden p-5 bg-gradient-to-br from-[hsl(17,75%,56%)] to-[hsl(18,85%,58%)] rounded-2xl text-white shadow-[0_8px_30px_-10px_rgba(233,110,75,0.5)] cursor-pointer group"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                      
                      <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                            <span className="text-2xl">📊</span>
                          </div>
                          <div>
                            <p className="font-bold text-lg">Alle Phasen</p>
                            <p className="text-white/80 text-sm">Woche 1-156 im Überblick</p>
                          </div>
                        </div>
                        <motion.span 
                          className="text-2xl"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </div>
                    </motion.div>
                  </Link>

                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 text-blue-500">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <h3 className="text-[1.35rem] font-bold text-[hsl(25,22%,16%)] dark:text-white">Zeitlinie</h3>
                  </div>
                  <div className="space-y-3 pl-[3.75rem]">
                    <div className="p-5 bg-rose-50 dark:bg-rose-900/20 rounded-xl border-2 border-[hsl(17,75%,56%)]/20">
                      <p className="text-sm text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)]">
                        {isToddler ? getAgeLabel() : `Woche ${leap.week}–${leap.weekEnd}`}
                      </p>
                    </div>
                    
                    {leap.week < 156 && (
                      <div className="p-4 bg-gray-50 dark:bg-[hsl(210,20%,10%)]/50 rounded-xl">
                        <p className="text-sm text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)] mb-1">Nächste Phase</p>
                        <p className="font-medium text-[hsl(25,22%,16%)] dark:text-white">
                          {leap.weekEnd >= 156 ? 'Bereit für den Kindergarten!' : `Nächste Phase in ${leap.weekEnd - week + 1} Wochen`}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </main>

      {/* App-like Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-[hsl(210,25%,8%)]/95 backdrop-blur-xl border-t border-[hsl(25,20%,90%)] dark:border-[hsl(210,20%,20%)] pb-[env(safe-area-inset-bottom,0px)]">
        <div className="flex items-center justify-around max-w-3xl mx-auto px-2">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <PopButton
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center py-2 px-3 min-w-[64px] transition-all duration-200 ${
                  isActive ? 'scale-105' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <div className={`p-2 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-[hsl(17,75%,56%)]/10 shadow-[0_4px_12px_-4px_rgba(233,110,75,0.4)]' 
                    : ''
                }`}>
                  <Icon 
                    className={`h-5 w-5 sm:h-6 sm:w-6 transition-colors duration-200 ${
                      isActive ? 'text-[hsl(17,75%,56%)]' : 'text-[hsl(25,10%,50%)] dark:text-[hsl(30,10%,55%)]'
                    }`} 
                  />
                </div>
                <span className={`text-[10px] sm:text-xs font-semibold mt-1 transition-colors duration-200 ${
                  isActive 
                    ? 'text-[hsl(17,75%,56%)]' 
                    : 'text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,55%)]'
                }`}>
                  {tab.label}
                </span>
              </PopButton>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
