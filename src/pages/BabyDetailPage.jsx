import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowLeft, Brain, Sprout, Lightbulb, Users, Cloud, ChevronDown, Heart, Phone, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '../components/Card';
import { PopCard, PopButton } from '../components/PopEffect';
import { TEMPLATES } from './BabyDetailPage_TEMPLATES.js';
import { getSignsForWeek } from '../data/weeklySigns';
import { getBrainForWeek } from '../data/weeklyBrain';
import { getAbilityForWeek } from '../data/weeklyAbilities';
import { getActionForWeek } from '../data/weeklyActions';
import NotesSection from '../components/NotesSection';
import CommunitySection from '../components/CommunitySection';
import TimelineSection from '../components/TimelineSection';

const TABS = [
  { id: 0, label: 'Zustand', icon: Cloud, color: 'text-sky-500' },
  { id: 1, label: 'Warum', icon: Brain, color: 'text-violet-500' },
  { id: 2, label: 'Lernt', icon: Sprout, color: 'text-green-500' },
  { id: 3, label: 'Tun', icon: Lightbulb, color: 'text-amber-500' },
  { id: 4, label: 'Erfahrungen', icon: Users, color: 'text-rose-500' },
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
      ],
      signs: getSignsForWeek(week)
    };
  }
  
  // Explizite Ruhephasen (keine Storm/Sunny, immer calm)
  const calmPhases = [
    { week: 77, weekEnd: 90, title: "Die Konsolidierung", phase: "Jahr 2", age: "18-21 Monate", isInLeap: false }
  ];
  
  for (const calm of calmPhases) {
    if (week >= calm.week && week <= calm.weekEnd) {
      const template = TEMPLATES.find(t => week >= t.week && week <= t.weekEnd);
      const weeklyAbility = getAbilityForWeek(week);
      return {
        ...calm,
        stormPhase: { description: "", symptoms: [] },
        sunnyPhase: {
          description: "",
          abilities: weeklyAbility ? [weeklyAbility] : (template?.sunnyPhase?.abilities || [])
        },
        why: getBrainForWeek(week) || template?.why || "",
        actions: template?.actions || [],
        signs: getSignsForWeek(week)
      };
    }
  }
  
  for (const leap of TEMPLATES) {
    if (week >= leap.week && week <= leap.weekEnd) {
      // Prüfe ob es ein echter Sprung ist (in LEAPS_TIMELINE)
      const weeklyAbility = getAbilityForWeek(week);
      const isRealLeap = [5, 8, 12, 19, 26, 37, 46, 55, 64, 75, 91, 116, 141].includes(leap.week);
      return { 
        ...leap, 
        isInLeap: isRealLeap, 
        signs: getSignsForWeek(week), 
        why: getBrainForWeek(week) || leap.why,
        sunnyPhase: {
          description: leap.sunnyPhase?.description || "",
          abilities: weeklyAbility ? [weeklyAbility] : (leap.sunnyPhase?.abilities || [])
        }
      };
    }
    // Wenn nach diesem Sprung aber vor dem nächsten
    const nextLeap = TEMPLATES[TEMPLATES.indexOf(leap) + 1];
    if (week > leap.weekEnd && (!nextLeap || week < nextLeap.week)) {
      const weeklyAbility = getAbilityForWeek(week);
      return { 
        ...leap, 
        isInLeap: false, 
        signs: getSignsForWeek(week), 
        why: getBrainForWeek(week) || leap.why,
        sunnyPhase: {
          description: leap.sunnyPhase?.description || "",
          abilities: weeklyAbility ? [weeklyAbility] : (leap.sunnyPhase?.abilities || [])
        }
      };
    }
  }
  // Nach dem letzten Sprung
  const lastLeap = TEMPLATES[TEMPLATES.length - 1];
  const weeklyAbility = getAbilityForWeek(week);
  return { 
    ...lastLeap, 
    isInLeap: week <= lastLeap.weekEnd, 
    signs: getSignsForWeek(week), 
    why: getBrainForWeek(week) || lastLeap.why,
    sunnyPhase: {
      description: lastLeap.sunnyPhase?.description || "",
      abilities: weeklyAbility ? [weeklyAbility] : (lastLeap.sunnyPhase?.abilities || [])
    }
  };
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
  const [showErfahrungen, setShowErfahrungen] = useState(false);
  const [baby, setBaby] = useState(null);
  const [displayWeekOverride, setDisplayWeekOverride] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('flow-babies') || '[]');
    const found = stored.find(b => b.id === id);
    if (found) setBaby(found);
  }, [id]);

  // Scroll zum Seitenanfang wenn displayWeekOverride sich ändert
  useEffect(() => {
    if (displayWeekOverride !== null) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [displayWeekOverride]);

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

  const currentWeek = getCurrentWeek(baby.dueDate);
  const week = displayWeekOverride !== null ? displayWeekOverride : currentWeek;
  
  // Detail-Modus: User betrachtet eine andere Woche
  const isDetailView = displayWeekOverride !== null && displayWeekOverride !== currentWeek;
  
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

  // Alias für getExactAge (für Abwärtskompatibilität)
  const getAgeLabel = getExactAge;

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b border-white/45 dark:border-white/5 bg-white/72 dark:bg-[hsl(210,25%,7%)]/72 backdrop-blur-xl">
        <div className="container max-w-3xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-[hsl(17,75%,56%)] hover:opacity-80 transition-opacity">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Zurück</span>
            </Link>
            <div className="flex flex-col items-center">
              <h1 className="font-semibold text-[hsl(25,22%,16%)] dark:text-white">{baby.name}</h1>
              {isDetailView && (
                <span className="text-[10px] text-[hsl(17,75%,56%)]">Woche {week}</span>
              )}
            </div>
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
            <div className="flex items-center justify-center gap-2">
              <p className="text-sm text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)]">
                {isToddler ? getExactAge() : `Woche ${week}`}
                {displayWeekOverride !== null && displayWeekOverride !== currentWeek && (
                  <span className="ml-2 text-xs text-[hsl(17,75%,56%)]">(Ansicht: Woche {week})</span>
                )}
              </p>
              {displayWeekOverride !== null && (
                <button
                  onClick={() => setDisplayWeekOverride(null)}
                  className="ml-2 px-2 py-1 bg-[hsl(17,75%,56%)]/10 text-[hsl(17,75%,56%)] text-xs rounded-full hover:bg-[hsl(17,75%,56%)]/20 transition-colors"
                >
                  Zurück zu Woche {currentWeek}
                </button>
              )}
            </div>
            {isToddler && (
              <p className="text-xs text-[hsl(25,10%,55%)] dark:text-[hsl(30,10%,50%)] mt-1">
                Alter abgeleitet vom errechneten Geburtstermin
              </p>
            )}
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

          {/* Timeline Section - Enthält alle Tabs inkl. Zustand */}
          <Card>
            <CardContent>
              <TimelineSection 
                currentWeek={currentWeek} 
                onSelectWeek={(selectedWeek) => {
                  setDisplayWeekOverride(selectedWeek);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
              
              {/* Sicherheitshinweis bei Storm-Phasen - Klappbar - GANZ UNTEN */}
              {isStorm && <SafetyNotice />}
            </CardContent>
          </Card>
        </motion.div>
      </main>

      {/* Erfahrungen FAB - immer sichtbar */}
      <button
        onClick={() => setShowErfahrungen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-[hsl(17,75%,56%)] hover:bg-[hsl(17,75%,46%)] text-white rounded-full shadow-lg transition-all hover:scale-110"
        title="Erfahrungen"
      >
        <Users className="h-6 w-6" />
      </button>

      {/* Erfahrungen Modal */}
      <AnimatePresence>
        {showErfahrungen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center"
            onClick={() => setShowErfahrungen(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-3xl bg-white dark:bg-[hsl(210,25%,10%)] rounded-t-2xl sm:rounded-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white dark:bg-[hsl(210,25%,10%)] border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Erfahrungen</h2>
                <button
                  onClick={() => setShowErfahrungen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-4 space-y-6">
                <NotesSection baby={baby} currentWeek={week} />
                <CommunitySection currentWeek={week} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
