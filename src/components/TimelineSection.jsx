import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo, useEffect } from 'react';
import { CloudRain, Sun, Brain, Lightbulb, Activity, Heart, Sparkles, Navigation, Zap, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from './Card';
import { TEMPLATES } from '../pages/BabyDetailPage_TEMPLATES';

// ============================================
// FARBSYSTEM - NEU AB WOCHEN 76
// ============================================
// 
// 🟦 Blau (super) - Maximaler Umbruch (Super-Peak)
// 🟥 Rot (intense) - Kern-Storm-Phase
// 🟧 Orange/Light (light) - Phase-In, Frust steigt
// 🟨 Gelb (sunny) - Durchbruch, letzte Woche
// 🟩 Grün (calm) - Konsolidierung & Ruhe

// EXPLIZITE WOCHEN-ZUORDNUNG AB 76
// Format: { week: Farb-Key }
const WEEK_COLORS_76_156 = {
  // === SPRUNG 11: Die Entdeckung des „Ego" ===
  76: 'calm', 77: 'calm',                    // Erholung
  78: 'light', 79: 'light',                   // Phase-In
  80: 'intense', 81: 'intense', 82: 'intense', // Kern-Storm
  83: 'sunny',                                // Durchbruch
  84: 'calm', 85: 'calm', 86: 'calm', 87: 'calm', 88: 'calm', 89: 'calm', 90: 'calm', 91: 'calm', // Lange Konsolidierung
  
  // === SPRUNG 12: Wortschatz-Explosion (Super-Sprung) ===
  92: 'super', 93: 'super', 94: 'super',       // Extrem-Peak (22-Monats-Schub)
  95: 'intense', 96: 'intense', 97: 'intense', // Schlafregression
  98: 'light', 99: 'light',                    // Abklingen
  100: 'sunny',                               // Durchbruch
  101: 'calm', 102: 'calm', 103: 'calm', 104: 'calm', 105: 'calm',
  106: 'calm', 107: 'calm', 108: 'calm', 109: 'calm', 110: 'calm',
  111: 'calm', 112: 'calm', 113: 'calm', 114: 'calm', 115: 'calm',
  116: 'calm', 117: 'calm',                    // Sonnenschein-Phase
  
  // === SPRUNG 13: Die Autonomie-Ebene ===
  118: 'light', 119: 'light',                 // Strategische Tests
  120: 'intense', 121: 'intense', 122: 'intense', 123: 'intense', 124: 'intense', // Kern-Trotzphase
  125: 'sunny',                               // Symbolspiel-Durchbruch
  126: 'calm', 127: 'calm', 128: 'calm', 129: 'calm', 130: 'calm',
  131: 'calm', 132: 'calm', 133: 'calm', 134: 'calm', 135: 'calm',
  136: 'calm', 137: 'calm', 138: 'calm', 139: 'calm', 140: 'calm',
  141: 'calm',                                // Trockenwerden-Phase
  
  // === SPRUNG 14: Super-Sprung „Magische Welt" ===
  142: 'super', 143: 'super', 144: 'super', 145: 'super', // Irrationale Ängste
  146: 'intense', 147: 'intense', 148: 'intense',         // Einschlafprobleme
  149: 'light', 150: 'light', 151: 'light',               // Suche nach Erklärungen
  152: 'sunny',                                           // Warum-Phase
  153: 'calm', 154: 'calm', 155: 'calm', 156: 'calm',    // Kindergarten-Reife
};

// Fallback: Wochen ohne Eintrag sind "calm"
function getColorForWeek76Plus(week) {
  return WEEK_COLORS_76_156[week] || 'calm';
}

// ============================================
// HAUPT-FARBLOGIK
// ============================================
function getWeekColor(week) {
  // WOCHEN 1-75: Unangetastete klassische Logik
  if (week <= 75) {
    const template = TEMPLATES.find(t => week >= t.week && week <= t.weekEnd);
    
    if (template) {
      if (template.phase === 'Ruhephase') return 'calm';
      const isLastWeek = week === template.weekEnd;
      if (isLastWeek) return 'sunny';
      return 'intense';
    }
    
    const preLeapWeeks = [4, 7, 11, 18, 25, 36, 45, 54, 63, 74];
    if (preLeapWeeks.includes(week)) return 'transition';
    
    return 'calm';
  }
  
  // WOCHEN 76+: Neue Präzisions-Logik
  return getColorForWeek76Plus(week);
}

// ============================================
// WOCHEN-DATEN GENERIEREN
// ============================================
function generateWeekData(week) {
  const color = getWeekColor(week);
  const template = TEMPLATES.find(t => week >= t.week && week <= t.weekEnd);
  
  // Spezifische Titel & Beschreibungen für 76+
  const titles_76_156 = {
    // Sprung 11
    76: 'Erholungsphase', 77: 'Erholungsphase',
    78: 'Erster bewusster Widerstand', 79: 'Erster bewusster Widerstand',
    80: 'Heftiges Klammern', 81: 'Trennungsangst', 82: 'Trennungsangst-Peak',
    83: 'Spiegel-Erkennung',
    84: 'Haushalt-Helfer', 85: 'Haushalt-Helfer', 86: 'Haushalt-Helfer', 87: 'Haushalt-Helfer',
    88: 'Haushalt-Helfer', 89: 'Haushalt-Helfer', 90: 'Haushalt-Helfer', 91: 'Haushalt-Helfer',
    
    // Sprung 12
    92: '22-Monats-Schub', 93: '22-Monats-Schub', 94: '22-Monats-Schub',
    95: 'Neuronale Vernetzung', 96: 'Schlafregression', 97: 'Schlafregression',
    98: 'Erste Wortkombinationen', 99: 'Erste Wortkombinationen',
    100: 'Zwei-Wort-Sätze',
    101: 'Redseligkeit', 102: 'Redseligkeit', 103: 'Redseligkeit', 104: 'Redseligkeit',
    105: 'Spielfreude', 106: 'Spielfreude', 107: 'Spielfreude', 108: 'Spielfreude',
    109: 'Spielfreude', 110: 'Spielfreude', 111: 'Spielfreude', 112: 'Spielfreude',
    113: 'Spielfreude', 114: 'Spielfreude', 115: 'Spielfreude', 116: 'Spielfreude', 117: 'Spielfreude',
    
    // Sprung 13
    118: 'Strategische Tests', 119: 'Strategische Tests',
    120: 'Trotzphase-Kern', 121: 'Trotzphase-Kern', 122: 'Trotzphase-Kern',
    123: 'Trotzphase-Kern', 124: 'Trotzphase-Kern',
    125: 'Symbolspiel-Durchbruch',
    126: 'Trockenwerden-Interesse', 127: 'Parallelspiel', 128: 'Parallelspiel',
    129: 'Parallelspiel', 130: 'Parallelspiel', 131: 'Trockenwerden-Versuche',
    132: 'Trockenwerden-Versuche', 133: 'Trockenwerden-Versuche',
    134: 'Selbstständigkeit', 135: 'Selbstständigkeit', 136: 'Selbstständigkeit',
    137: 'Selbstständigkeit', 138: 'Selbstständigkeit', 139: 'Selbstständigkeit',
    140: 'Selbstständigkeit', 141: 'Selbstständigkeit',
    
    // Sprung 14
    142: 'Irrationale Ängste', 143: 'Monster-Angst', 144: 'Schatten-Angst',
    145: 'Fantasie-Explosion',
    146: 'Einschlafprobleme', 147: 'Einschlafprobleme', 148: 'Einschlafprobleme',
    149: 'Warum-Suche', 150: 'Warum-Suche', 151: 'Warum-Suche',
    152: 'Warum-Phase',
    153: 'Komplexe Sätze', 154: 'Komplexe Sätze', 155: 'Kindergarten-Reife',
    156: 'Kindergarten-Reife',
  };
  
  const descriptions_76_156 = {
    super: 'Maximaler Umbruch! Das Gehirn arbeitet auf Hochtouren. Das Kind versteht mehr als es ausdrücken kann - das ist frustrierend, aber unglaublich wichtig für die Entwicklung.',
    intense: 'Intensive Phase. Das Kind zeigt Regression, ist anhänglicher oder wütender als sonst. Das ist normal und zeigt, dass sich etwas Wichtiges im Gehirn verändert.',
    light: 'Unruhe beginnt. Das Kind spürt, dass etwas kommt und wird unruhiger, testet Grenzen. Die Intensität steigt noch an.',
    sunny: 'Durchbruch! Neue Fähigkeiten werden sichtbar. Das Kind ist stolz und entspannter. Genieße diese Erfolgsmomente.',
    calm: 'Konsolidierungsphase. Das Gehirn verarbeitet und festigt das Gelernte. Zeit zum Entspannen und Spielen.',
  };
  
  const stateLabels = {
    super: 'Super-Peak',
    intense: 'Storm-Phase',
    light: 'Phase-In',
    sunny: 'Sunny-Phase',
    calm: 'Ruhephase',
    transition: 'Vorbereitung',
  };
  
  // Spezieller Titel für 76+
  const title = week >= 76 ? (titles_76_156[week] || template?.title || `Woche ${week}`) : (template?.title || `Woche ${week}`);
  
  // Beschreibung basierend auf Farbe
  const description = week >= 76 ? descriptions_76_156[color] : (
    color === 'sunny' ? template?.sunnyPhase?.description :
    color === 'intense' || color === 'super' || color === 'light' ? template?.stormPhase?.description :
    'Zeit zur Verarbeitung und Festigung.'
  );
  
  return {
    week,
    type: color === 'calm' ? 'calm' : 'leap',
    title,
    subtitle: stateLabels[color] || 'Entwicklungsphase',
    phase: stateLabels[color] || 'Ruhephase',
    state: color,
    stateLabel: stateLabels[color] || 'Ruhephase',
    stateDescription: description,
    symptoms: template?.stormPhase?.symptoms || [],
    abilities: template?.sunnyPhase?.abilities || [],
    why: template?.why || 'Das Gehirn entwickelt sich stetig weiter.',
    actions: template?.actions || ['Genieße die Zeit mit deinem Kind.', 'Beobachte die kleinen Fortschritte.'],
  };
}

// ============================================
// ICON & STYLE HELPER
// ============================================
function getStateIcon(state) {
  switch (state) {
    case 'super': return Zap;
    case 'intense': return CloudRain;
    case 'light': return AlertTriangle;
    case 'sunny': return Sun;
    case 'transition': return Navigation;
    default: return Sparkles;
  }
}

function getStateColors(state) {
  switch (state) {
    case 'super':
      return {
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        text: 'text-blue-700 dark:text-blue-300',
        border: 'border-blue-200 dark:border-blue-800',
        badge: 'bg-blue-200 text-blue-800',
        marker: 'bg-blue-600',
      };
    case 'intense':
      return {
        bg: 'bg-red-50 dark:bg-red-900/20',
        text: 'text-red-700 dark:text-red-300',
        border: 'border-red-200 dark:border-red-800',
        badge: 'bg-red-200 text-red-800',
        marker: 'bg-rose-500',
      };
    case 'light':
      return {
        bg: 'bg-orange-50 dark:bg-orange-900/20',
        text: 'text-orange-700 dark:text-orange-300',
        border: 'border-orange-200 dark:border-orange-800',
        badge: 'bg-orange-200 text-orange-800',
        marker: 'bg-orange-400',
      };
    case 'sunny':
      return {
        bg: 'bg-amber-50 dark:bg-amber-900/20',
        text: 'text-amber-700 dark:text-amber-300',
        border: 'border-amber-200 dark:border-amber-800',
        badge: 'bg-amber-200 text-amber-800',
        marker: 'bg-amber-400',
      };
    case 'transition':
      return {
        bg: 'bg-yellow-50 dark:bg-yellow-900/20',
        text: 'text-yellow-700 dark:text-yellow-300',
        border: 'border-yellow-200 dark:border-yellow-800',
        badge: 'bg-yellow-200 text-yellow-800',
        marker: 'bg-amber-300',
      };
    default:
      return {
        bg: 'bg-green-50 dark:bg-green-900/20',
        text: 'text-green-700 dark:text-green-300',
        border: 'border-green-200 dark:border-green-800',
        badge: 'bg-green-200 text-green-800',
        marker: 'bg-green-400',
      };
  }
}

// ============================================
// HAUPTKOMPONENTE
// ============================================
export default function TimelineSection({ currentWeek }) {
  const [selectedWeek, setSelectedWeek] = useState(currentWeek);
  const maxWeek = 156;
  
  // Timeline scrollen
  useEffect(() => {
    const currentWeekElement = document.getElementById(`week-${currentWeek}`);
    if (currentWeekElement) {
      currentWeekElement.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [currentWeek]);
  
  const weeks = useMemo(() => Array.from({ length: maxWeek }, (_, i) => i + 1), []);
  const selectedWeekData = useMemo(() => generateWeekData(selectedWeek), [selectedWeek]);
  const currentStatus = getWeekColor(currentWeek);
  const selectedStatus = getWeekColor(selectedWeek);
  
  const currentColors = getStateColors(currentStatus);
  const selectedColors = getStateColors(selectedStatus);

  return (
    <div className="space-y-4">
      {/* Aktuelle Woche Info */}
      <Card className={`border-2 ${currentColors.border}`}>
        <CardContent className="py-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${currentColors.marker} text-white`}>
              <span className="text-lg font-bold">{currentWeek}</span>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Aktuelle Woche</p>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                {selectedWeekData.title}
              </h3>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <div>
        <div className="overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          <div className="flex gap-1 min-w-max">
            {weeks.map((week) => {
              const color = getWeekColor(week);
              const isCurrent = week === currentWeek;
              const isSelected = week === selectedWeek;
              const colors = getStateColors(color);
              
              return (
                <motion.button
                  key={week}
                  id={`week-${week}`}
                  onClick={() => setSelectedWeek(week)}
                  whileTap={{ scale: 0.9 }}
                  className={`
                    w-6 h-9 rounded flex flex-col items-center justify-center text-[8px] font-medium transition-all
                    ${colors.marker}
                    ${isCurrent ? 'ring-2 ring-orange-500 scale-110 z-10' : ''}
                    ${isSelected ? 'ring-2 ring-white' : ''}
                  `}
                >
                  <span className="text-white/70">W</span>
                  <span className="text-white">{week}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Phase Info */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedWeek}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className={`border ${selectedColors.border} overflow-hidden`}>
            {/* Header */}
            <div className={`p-4 border-b ${selectedColors.border} ${selectedColors.bg}`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${selectedColors.badge}`}>
                      Woche {selectedWeekData.week}
                    </span>
                    {selectedWeek === currentWeek && (
                      <span className="px-2 py-0.5 bg-orange-500 text-white text-xs rounded-full">Aktuell</span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">{selectedWeekData.title}</h3>
                </div>
              </div>
            </div>

            {/* Content */}
            <CardContent className="py-4">
              <div className="space-y-4">
                {/* Status Box */}
                <div className={`p-4 rounded-xl ${selectedColors.bg} ${selectedColors.border} border`}>
                  <div className="flex items-center gap-2 mb-3">
                    {(() => {
                      const Icon = getStateIcon(selectedWeekData.state);
                      return <Icon className={`h-5 w-5 ${selectedColors.text}`} />;
                    })()}
                    <span className={`font-semibold ${selectedColors.text}`}>
                      {selectedWeekData.stateLabel}
                    </span>
                  </div>
                  <p className="text-[hsl(25,22%,16%)] dark:text-white leading-relaxed">
                    {selectedWeekData.stateDescription}
                  </p>
                </div>

                {/* Symptoms */}
                {selectedWeekData.type === 'leap' && selectedWeekData.symptoms?.length > 0 && (
                  <div>
                    <p className="text-sm font-semibold text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)] mb-2">
                      Mögliche Anzeichen:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedWeekData.symptoms.slice(0, 4).map((s, i) => (
                        <span key={i} className="px-3 py-1.5 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-sm">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Abilities */}
                {selectedWeekData.abilities?.length > 0 && (
                  <div>
                    <p className="text-sm font-semibold text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)] mb-2">
                      Neue Fähigkeiten:
                    </p>
                    <div className="space-y-2">
                      {selectedWeekData.abilities.slice(0, 3).map((a, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <span className="text-green-500">✓</span>
                          <span className="text-[hsl(25,22%,16%)] dark:text-white text-sm">{a}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
