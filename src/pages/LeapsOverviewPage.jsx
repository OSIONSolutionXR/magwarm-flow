import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, Navigation, Brain, Lightbulb, Activity, Heart, ChevronRight, Sparkles } from 'lucide-react';
import { Card, CardContent } from '../components/Card';
import { TEMPLATES } from './BabyDetailPage_TEMPLATES';

// Hauptphasen (Sprünge) mit ihren Wochenbereichen
const LEAP_PHASES = [
  { week: 5, weekEnd: 6, title: "Die ersten Sinneswellen", intensity: 'high', phase: "Jahr 1" },
  { week: 8, weekEnd: 9, title: "Muster im Chaos", intensity: 'high', phase: "Jahr 1" },
  { week: 12, weekEnd: 13, title: "Wenn Bewegung Sinn ergibt", intensity: 'high', phase: "Jahr 1" },
  { week: 19, weekEnd: 20, title: "Aha! Das hat Folgen", intensity: 'high', phase: "Jahr 1" },
  { week: 26, weekEnd: 27, title: "Die ersten Trennungen", intensity: 'high', phase: "Jahr 1" },
  { week: 37, weekEnd: 38, title: "Kategorien und Ordnung", intensity: 'high', phase: "Jahr 1" },
  { week: 46, weekEnd: 47, title: "Reihenfolgen verstehen", intensity: 'high', phase: "Jahr 1" },
  { week: 55, weekEnd: 56, title: "Flexible Programme", intensity: 'high', phase: "Jahr 1" },
  { week: 64, weekEnd: 65, title: "Regeln und Konsequenzen", intensity: 'high', phase: "Jahr 1" },
  { week: 75, weekEnd: 76, title: "Verbundenheit spüren", intensity: 'high', phase: "Jahr 1" },
  { week: 76, weekEnd: 90, title: "Die Konsolidierung", intensity: 'medium', phase: "Jahr 2", subtitle: "Welt der Worte" },
  { week: 91, weekEnd: 115, title: "Die Autonomie-Explosion", intensity: 'high', phase: "Jahr 2", subtitle: "Trotzphase" },
  { week: 116, weekEnd: 140, title: "Die Welt der Symbole", intensity: 'medium', phase: "Jahr 2-3", subtitle: "Fantasie erwacht" },
  { week: 141, weekEnd: 156, title: "Warum? & Magisches Denken", intensity: 'high', phase: "Jahr 3", subtitle: "Kindergarten-Ready" },
];

// Ruhephasen-Interpolation für Wochen zwischen den Hauptphasen
// Erzeugt sinnvolle Zwischeninhalte zwischen den Hauptphasen
function generateCalmPhaseContent(week) {
  // Finde die umgebenden Hauptphasen
  let prevPhase = null;
  let nextPhase = null;
  
  for (const phase of LEAP_PHASES) {
    if (phase.weekEnd < week) prevPhase = phase;
    if (phase.week > week && !nextPhase) nextPhase = phase;
  }
  
  // Wenn keine vorherige Phase (Wochen 1-4)
  if (!prevPhase && week <= 4) {
    return {
      type: 'calm',
      title: "Eingewöhnungsphase",
      stormPhase: {
        description: "Die ersten Wochen sind geprägt von Ankommen und Finden. Dein Baby passt sich an das Leben außerhalb des Mutterleibs an.",
        symptoms: [
          "Unruhiger Schlaf - Tag-Nacht-Rhythmus noch nicht etabliert",
          "Häufiges Trinken - kleine Portionen, oft",
          "Viel Schlaf - bis zu 18 Stunden pro Tag",
          "Reflexe dominieren - noch wenig bewusste Steuerung",
          "Sucht ständige Nähe - Körperkontakt ist essentiell",
          "Reagiert auf plötzliche Geräusche - Moro-Reflex",
          "Mögliche Koliken - Unruhe nach dem Essen",
          "Viel Weinen - die einzige Kommunikationsmöglichkeit"
        ]
      },
      sunnyPhase: {
        description: "Langsam entwickelt sich ein erstes Gefühl von Sicherheit. Dein Baby beginnt, sich an deine Stimme und deinen Geruch zu gewöhnen.",
        abilities: [
          "Erkennt die Stimme der Mutter - beruhigt sich beim Hören",
          "Reagiert auf Berührung - entspannt sich bei Hautkontakt",
          "Erste Lächel-Reflexe - noch nicht bewusst, aber herzerwärmend",
          "Kann kurze Zeit wach sein - Augen halten offen",
          "Sucht die Brust oder Flasche - Nahrungs-Such-Reflex",
          "Reagiert auf Licht und Bewegung - erste visuelle Wahrnehmung",
          "Kann den Kopf kurz heben - bei Bauchlage",
          "Erste Bindungsmomente entstehen - Vertrauen wächst"
        ]
      },
      why: "Das Neugeborene passt sich an die neue Umgebung an. Im Mutterleib war es warm, dunkel und gedämpft. Jetzt muss es lernen, mit Licht, Geräuschen und der Schwerkraft umzugehen. Das limbische System entwickelt sich und die ersten Bindungsstrukturen entstehen.",
      actions: [
        "💚 Genieße diese intensive Zeit - sie vergeht schneller als du denkst.",
        "🌟 Du lernst euch gegenseitig kennen - das braucht Zeit.",
        "Viel Hautkontakt halten - Känguruhen stärkt die Bindung",
        "Auf Babys Zeichen achten - füttere bei Hunger, nicht nach Uhrzeit",
        "Ruhige Umgebung schaffen - wenig Reize, gedämpftes Licht",
        "Bei Bedarf Hilfe annehmen - du musst nicht alles allein schaffen",
        "Schlafen, wenn das Baby schläft - deine Erholung ist wichtig",
        "Sanfte Musik oder Sprechen - deine Stimme beruhigt"
      ]
    };
  }
  
  // Wenn nach der letzten Phase (sollte nicht vorkommen, da max 156)
  if (!nextPhase) {
    return {
      type: 'calm',
      title: "Vorbereitung auf neue Herausforderungen",
      stormPhase: {
        description: "Dein Kind konsolidiert alle bisherigen Fähigkeiten und bereitet sich auf das Leben als Kindergartenkind vor.",
        symptoms: [
          "Möchte oft spielen und lernen - Ruhephasen werden kürzer",
          "Stellt viele Fragen - Wissensdurst ist unstillbar",
          "Entwickelt eigene Vorlieben - wird wählerischer",
          "Manchmal ängstlich - Fantasie und Realität verschwimmen",
          "Braucht klare Strukturen - Verlässlichkeit ist wichtig",
          "Kann frustriert werden - wenn es etwas nicht gleich kann",
          "Soziale Konflikte entstehen - mit Geschwistern oder Freunden",
          "Schlafrituale wichtig - Vorbereitung auf den Tag"
        ]
      },
      sunnyPhase: {
        description: "Ein selbstbewusstes, neugieriges Kind entwickelt sich. Bereit für den nächsten großen Schritt ins Leben.",
        abilities: [
          "Spricht in kompletten Sätzen - komplexe Gedanken ausdrücken",
          "Kann sich gut allein beschäftigen - konzentriert sich länger",
          "Zeigt echtes Interesse an anderen Kindern - Freundschaften entstehen",
          "Versteht Regeln und kann sie befolgen - soziale Kompetenz",
          "Hat eigene Vorlieben und Meinungen - Persönlichkeit zeigt sich",
          "Kann Geschichten erzählen und verstehen - abstraktes Denken",
          "Selbstständig bei Alltagsaufgaben - anziehen, essen, spielen",
          "Entwickelt Humor und Kreativität - eigene Ideen umsetzen"
        ]
      },
      why: "Das Gehirn ist zu fast 90% seiner Endgröße entwickelt. Die Grundlagen für alle weiteren Lernprozesse sind gelegt. Das Kind hat eine stabile Persönlichkeit entwickelt und ist bereit für neue soziale Herausforderungen wie den Kindergarten.",
      actions: [
        "💚 Du hast drei wunderbare Jahre begleitet - das ist eine Leistung!",
        "🌟 Dein Kind ist bereit für den nächsten Schritt - Kindergarten, neue Abenteuer.",
        "Kindergarten-Besuche planen - langsame Eingewöhnung ermöglichen",
        "Soziale Kompetenz stärken - Spieldates, Gruppenaktivitäten",
        "Selbstständigkeit fördern - allein anziehen, essen, spielen",
        "Gespräche führen - Fragen ermutigen, Gedanken ernst nehmen",
        "Rituale beibehalten - Sicherheit in Veränderungszeiten",
        "Die Entwicklung feiern - 'Schau, wie viel du schon kannst!'"
      ]
    };
  }
  
  // Interpoliere zwischen den Phasen
  const progress = (week - prevPhase.weekEnd) / (nextPhase.week - prevPhase.weekEnd);
  const phaseProgress = Math.round(progress * 100);
  
  // Generiere Interpolationsinhalte basierend auf den umliegenden Phasen
  return {
    type: 'calm',
    title: `Erholungsphase zwischen "${prevPhase.title}" und "${nextPhase.title}"`,
    subtitle: `Woche ${week}: Konsolidierung und Vorbereitung`,
    stormPhase: {
      description: `Nach dem intensiven ${prevPhase.title} ist Zeit zur Verarbeitung. Dein Baby festigt das Gelernte und bereitet sich auf ${nextPhase.title} vor. Eine ruhige Phase der Entwicklung, in der das Gehirn neue neuronale Verbindungen festigt.`,
      symptoms: [
        "Kann nach dem vorherigen Sprung müde sein - mehr Schlaf nötig",
        "Zeigt stolz neue Fähigkeiten - übt das Gelernte",
        "Manchmal nachdenklich - verarbeitet Erfahrungen",
        "Sucht vertraute Rituale - Sicherheit nach dem Wandel",
        "Ist anhänglicher als sonst - braucht Bestätigung",
        "Appetit kann schwanken - Wachstumsphasen bedingen Veränderungen",
        "Manchmal frustrierter - wenn neue Fähigkeiten noch nicht perfekt sitzen",
        "Reagiert empfindlicher auf Veränderungen - braucht Routine"
      ]
    },
    sunnyPhase: {
      description: `Die Fähigkeiten aus der ${prevPhase.title} werden immer sicherer. Dein Baby ist stolz auf seine Fortschritte und erkundet selbstbewusster die Welt. Gleichzeitig sammelt es Kraft für die nächste große Entwicklungsphase.`,
      abilities: [
        `Festigt Fähigkeiten aus der ${prevPhase.title} - wird sicherer im Alltag`,
        "Zeigt zunehmendes Selbstvertrauen - wagt mehr",
        "Entwickelt neue Interessen - Neugier wächst",
        "Kommuniziert besser - ob durch Laute, Gesten oder Worte",
        "Schläft wieder ruhiger - neue Fähigkeiten sind verarbeitet",
        "Ist ausgeglichener - das 'Neue' ist jetzt 'Normal'",
        "Spielt länger konzentriert - Aufmerksamkeit wächst",
        "Freut sich über Routine - vertraute Abläufe geben Sicherheit"
      ]
    },
    why: `Das Gehirn konsolidiert die neuen Verbindungen aus der ${prevPhase.title}. Myelinisierung schützt und beschleunigt die neuen Nervenbahnen. Gleichzeitig bereitet sich das Nervensystem auf die nächste große Umstrukturierung vor. Diese Ruhephasen sind essentiell für nachhaltiges Lernen.`,
    actions: [
      "💚 Diese ruhige Phase ist wichtig - das Gehirn verarbeitet und festigt.",
      "🌟 Bald kommt der nächste Sprung - genieße die ruhige Zeit jetzt.",
      "Neue Fähigkeiten feiern - zeige dich beeindruckt und stolz",
      "Vertraute Rituale pflegen - Sicherheit nach den Veränderungen",
      "Viel Spielzeit ermöglichen - Üben macht den Meister",
      "Auf die Zeichen des nächsten Sprungs achten - Unruhe, Anhänglichkeit",
      "Geduld haben bei Rückschritten - das ist normal und vorübergehend",
      "Qualitätszeit verbringen - nutze die ruhigere Zeit für Bindung"
    ]
  };
}

// Generiere detaillierte Inhalte für jede Woche
function generateWeekData(week) {
  // Finde zugehörige Template-Phase
  const template = TEMPLATES.find(t => week >= t.week && week <= t.weekEnd);
  const leapPhase = LEAP_PHASES.find(p => week >= p.week && week <= p.weekEnd);
  
  // Wenn in einer Hauptphase (Template vorhanden)
  if (template) {
    const isFirstWeek = week === template.week;
    const isLastWeek = week === template.weekEnd;
    
    return {
      week,
      type: 'leap',
      title: template.title,
      subtitle: template.subtitle || leapPhase?.subtitle,
      phase: leapPhase?.phase || "Entwicklungsphase",
      state: isFirstWeek ? 'storm-start' : isLastWeek ? 'sunny' : 'storm-peak',
      stateLabel: isFirstWeek ? 'Sprung beginnt' : isLastWeek ? 'Sunny Phase' : 'Intensivphase',
      stateDescription: isLastWeek 
        ? template.sunnyPhase.description 
        : template.stormPhase.description,
      why: template.why,
      learning: isLastWeek 
        ? template.sunnyPhase.abilities 
        : template.stormPhase.symptoms.map(s => s.replace(/^[💚🌟]\s*/, '').replace(/^[A-Z][a-z]+:\s*/, '')),
      actions: template.actions,
      symptoms: isLastWeek ? [] : template.stormPhase.symptoms,
      abilities: isLastWeek ? template.sunnyPhase.abilities : [],
      intensity: leapPhase?.intensity || 'high'
    };
  }
  
  // Ruhephase - interpoliere Inhalte
  const calmContent = generateCalmPhaseContent(week);
  return {
    week,
    type: 'calm',
    title: calmContent.title,
    subtitle: calmContent.subtitle,
    phase: "Ruhige Phase",
    state: 'calm',
    stateLabel: 'Konsolidierung',
    stateDescription: calmContent.sunnyPhase.description,
    why: calmContent.why,
    learning: calmContent.sunnyPhase.abilities,
    actions: calmContent.actions,
    symptoms: calmContent.stormPhase.symptoms,
    abilities: calmContent.sunnyPhase.abilities,
    intensity: 'low'
  };
}

// Generiere alle 156 Wochen einmalig
const ALL_WEEKS_DATA = Array.from({ length: 156 }, (_, i) => generateWeekData(i + 1));

function getCurrentWeek(dueDate) {
  const now = new Date();
  const due = new Date(dueDate);
  const diffTime = now.getTime() - due.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
}

function getWeekColor(intensity) {
  switch (intensity) {
    case 'high': return 'intense';
    case 'medium': return 'transition';
    default: return 'calm';
  }
}

// Tabs für die Detailansicht
const TABS = [
  { id: 'state', label: 'Zustand', icon: Activity },
  { id: 'why', label: 'Warum', icon: Brain },
  { id: 'learn', label: 'Lernt', icon: Lightbulb },
  { id: 'do', label: 'Tun', icon: Heart },
];

export default function LeapsOverviewPage() {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [babyName, setBabyName] = useState('');
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [activeTab, setActiveTab] = useState('state');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('flow-babies') || '[]');
    if (stored.length > 0) {
      const baby = stored[0];
      const week = getCurrentWeek(baby.dueDate);
      setCurrentWeek(week);
      setSelectedWeek(week);
      setBabyName(baby.name);
    } else {
      setSelectedWeek(1);
    }
  }, []);

  const selectedWeekData = useMemo(() => {
    return ALL_WEEKS_DATA.find(w => w.week === selectedWeek) || ALL_WEEKS_DATA[0];
  }, [selectedWeek]);

  const maxWeek = 156;
  const weeks = Array.from({ length: maxWeek }, (_, i) => i + 1);

  const getStatusColor = (intensity) => {
    switch (intensity) {
      case 'high': return 'bg-red-400 hover:bg-red-500';
      case 'medium': return 'bg-amber-300 hover:bg-amber-400';
      default: return 'bg-green-400 hover:bg-green-500';
    }
  };

  const getStateIcon = (state) => {
    switch (state) {
      case 'storm-start':
      case 'storm-peak':
        return <CloudRain className="h-5 w-5" />;
      case 'sunny':
        return <Sun className="h-5 w-5" />;
      default:
        return <Sparkles className="h-5 w-5" />;
    }
  };

  const getStateColor = (type) => {
    switch (type) {
      case 'leap':
        return selectedWeekData?.state === 'sunny' 
          ? 'bg-amber-100 dark:bg-amber-900/30 border-amber-300' 
          : 'bg-red-50 dark:bg-red-900/20 border-red-200';
      default:
        return 'bg-green-50 dark:bg-green-900/20 border-green-200';
    }
  };

  const getTabContent = () => {
    if (!selectedWeekData) return null;

    switch (activeTab) {
      case 'state':
        return (
          <div className="space-y-4">
            <div className={`p-4 rounded-xl border ${getStateColor(selectedWeekData.type)}`}>
              <div className="flex items-center gap-3 mb-3">
                {selectedWeekData.type === 'leap' && selectedWeekData.state !== 'sunny' ? (
                  <CloudRain className="h-6 w-6 text-red-500" />
                ) : selectedWeekData.state === 'sunny' ? (
                  <Sun className="h-6 w-6 text-amber-500" />
                ) : (
                  <Sparkles className="h-6 w-6 text-green-500" />
                )}
                <span className={`font-semibold ${
                  selectedWeekData.type === 'leap' && selectedWeekData.state !== 'sunny'
                    ? 'text-red-700 dark:text-red-300'
                    : selectedWeekData.state === 'sunny'
                    ? 'text-amber-700 dark:text-amber-300'
                    : 'text-green-700 dark:text-green-300'
                }`}>
                  {selectedWeekData.stateLabel}
                </span>
              </div>
              <p className="text-[hsl(25,22%,16%)] dark:text-white leading-relaxed">
                {selectedWeekData.stateDescription}
              </p>
            </div>
            
            {selectedWeekData.type === 'leap' && selectedWeekData.state !== 'sunny' && selectedWeekData.symptoms?.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold text-[hsl(25,22%,16%)] dark:text-white flex items-center gap-2">
                  <Activity className="h-4 w-4 text-red-500" />
                  Mögliche Anzeichen
                </h4>
                <ul className="space-y-2">
                  {selectedWeekData.symptoms.slice(0, 5).map((symptom, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)]">
                      <span className="text-red-400 mt-0.5">•</span>
                      {symptom}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {selectedWeekData.type === 'leap' && selectedWeekData.state === 'sunny' && selectedWeekData.abilities?.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold text-[hsl(25,22%,16%)] dark:text-white flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  Neue Fähigkeiten
                </h4>
                <ul className="space-y-2">
                  {selectedWeekData.abilities.slice(0, 5).map((ability, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)]">
                      <span className="text-amber-400 mt-0.5">✓</span>
                      {ability}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
        
      case 'why':
        return (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
              <div className="flex items-center gap-3 mb-3">
                <Brain className="h-6 w-6 text-blue-500" />
                <span className="font-semibold text-blue-700 dark:text-blue-300">
                  Neurologische Erklärung
                </span>
              </div>
              <p className="text-[hsl(25,22%,16%)] dark:text-white leading-relaxed">
                {selectedWeekData.why}
              </p>
            </div>
            
            <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800">
              <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Was passiert im Gehirn?
              </h4>
              <p className="text-sm text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)] leading-relaxed">
                {selectedWeekData.type === 'leap' 
                  ? "Das Gehirn durchläuft eine Phase intensiver Neuordnung. Neue neuronale Verbindungen werden gebildet, bestehende werden verstärkt. Diese Umstrukturierung ermöglicht neue kognitive Fähigkeiten, führt aber vorübergehend zu Unruhe und verändertem Verhalten."
                  : "In dieser Ruhephase werden die neuen Verbindungen aus dem vorherigen Sprung gefestigt. Myelinisierung schützt die Nervenbahnen und macht sie effizienter. Das Gehirn verarbeitet und speichert das Gelernte für langfristige Nutzung."
                }
              </p>
            </div>
          </div>
        );
        
      case 'learn':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              {selectedWeekData.learning?.slice(0, 8).map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-[hsl(210,20%,15%)] border border-[hsl(25,20%,90%)] dark:border-[hsl(210,20%,20%)]"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    selectedWeekData.type === 'leap'
                      ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600'
                      : 'bg-green-100 dark:bg-green-900/30 text-green-600'
                  }`}>
                    <span className="text-sm font-bold">{idx + 1}</span>
                  </div>
                  <p className="text-[hsl(25,22%,16%)] dark:text-white text-sm leading-relaxed pt-1">
                    {item}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        );
        
      case 'do':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              {selectedWeekData.actions?.slice(0, 8).map((action, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`flex items-start gap-3 p-3 rounded-lg border ${
                    action.startsWith('💚') || action.startsWith('🌟') || action.startsWith('💙')
                      ? 'bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 border-pink-100 dark:border-pink-800'
                      : 'bg-white dark:bg-[hsl(210,20%,15%)] border-[hsl(25,20%,90%)] dark:border-[hsl(210,20%,20%)]'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    action.startsWith('💚') || action.startsWith('🌟') || action.startsWith('💙')
                      ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-600'
                      : 'bg-[hsl(17,75%,56%)]/10 text-[hsl(17,75%,56%)]'
                  }`}>
                    <span className="text-sm font-bold">{idx + 1}</span>
                  </div>
                  <p className={`text-sm leading-relaxed pt-1 ${
                    action.startsWith('💚') || action.startsWith('🌟') || action.startsWith('💙')
                      ? 'text-pink-800 dark:text-pink-200 font-medium'
                      : 'text-[hsl(25,22%,16%)] dark:text-white'
                  }`}>
                    {action}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pb-8">
      <header className="sticky top-0 z-50 w-full border-b border-white/45 dark:border-white/5 bg-white/72 dark:bg-[hsl(210,25%,7%)]/72 backdrop-blur-xl">
        <div className="container max-w-3xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-[hsl(17,75%,56%)] hover:opacity-80 transition-opacity">
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
          {currentWeek > 0 && (
            <Card className={`border-2 ${
              selectedWeekData?.intensity === 'high' ? 'border-red-400/50 bg-red-500/5' :
              selectedWeekData?.intensity === 'medium' ? 'border-amber-400/50 bg-amber-500/5' :
              'border-green-400/50 bg-green-500/5'
            }`}>
              <CardContent className="py-6">
                <div className="flex items-start gap-4">
                  <div className={`w-16 h-16 rounded-2xl flex-shrink-0 flex items-center justify-center ${
                    selectedWeekData?.intensity === 'high' ? 'bg-red-500 text-white shadow-[0_8px_24px_-8px_rgba(239,68,68,0.5)]' :
                    selectedWeekData?.intensity === 'medium' ? 'bg-amber-500 text-white shadow-[0_8px_24px_-8px_rgba(245,158,11,0.5)]' :
                    'bg-green-500 text-white shadow-[0_8px_24px_-8px_rgba(34,197,94,0.5)]'
                  }`}>
                    <span className="text-2xl font-bold">{currentWeek}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)]">Aktuelle Woche</p>
                    <h2 className="text-xl font-bold text-[hsl(25,22%,16%)] dark:text-white">
                      {selectedWeekData?.title || `Woche ${currentWeek}`}
                    </h2>
                    {selectedWeekData?.subtitle && (
                      <p className="text-[hsl(17,75%,56%)] font-medium text-sm">
                        {selectedWeekData.subtitle}
                      </p>
                    )}
                    <p className="text-sm text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)] mt-1">
                      {selectedWeekData?.phase}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Wochen-Timeline */}
          <div>
            <h3 className="text-lg font-bold text-[hsl(25,22%,16%)] dark:text-white mb-4">Alle 156 Wochen</h3>
            
            <div className="relative">
              <div className="overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
                <div className="flex gap-1 min-w-max">
                  {weeks.map((week) => {
                    const weekData = ALL_WEEKS_DATA.find(w => w.week === week);
                    const color = getStatusColor(weekData?.intensity);
                    const isCurrent = week === currentWeek;
                    const isPast = week < currentWeek;
                    const isSelected = week === selectedWeek;
                    
                    return (
                      <motion.button
                        key={week}
                        onClick={() => {
                          setSelectedWeek(week);
                          setActiveTab('state');
                        }}
                        whileTap={{ scale: 0.95 }}
                        className={`
                          w-8 h-12 rounded-lg flex flex-col items-center justify-center text-[10px] font-medium transition-all
                          ${color}
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

          {/* Detaillierte Wochenansicht mit Tabs */}
          <AnimatePresence mode="wait">
            {selectedWeekData && (
              <motion.div
                key={selectedWeek}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Card className="border border-[hsl(25,20%,90%)] dark:border-[hsl(210,20%,20%)] overflow-hidden">
                  {/* Header der Detailansicht */}
                  <div className={`p-5 border-b border-[hsl(25,20%,90%)] dark:border-[hsl(210,20%,20%)] ${
                    selectedWeekData.type === 'leap'
                      ? selectedWeekData.state === 'sunny'
                        ? 'bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/10'
                        : 'bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/10'
                      : 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/10'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            selectedWeekData.type === 'leap'
                              ? selectedWeekData.state === 'sunny'
                                ? 'bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200'
                                : 'bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200'
                              : 'bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200'
                          }`}>
                            Woche {selectedWeekData.week}
                          </span>
                          {selectedWeek === currentWeek && (
                            <span className="px-3 py-1 bg-[hsl(17,75%,56%)] text-white text-xs font-semibold rounded-full">
                              Aktuell
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-[hsl(25,22%,16%)] dark:text-white">
                          {selectedWeekData.title}
                        </h3>
                        {selectedWeekData.subtitle && (
                          <p className="text-[hsl(17,75%,56%)] font-medium">
                            {selectedWeekData.subtitle}
                          </p>
                        )}
                        <p className="text-sm text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)]">
                          {selectedWeekData.phase}
                        </p>
                      </div>
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                        selectedWeekData.type === 'leap'
                          ? selectedWeekData.state === 'sunny'
                            ? 'bg-amber-400 shadow-[0_8px_24px_-8px_rgba(251,191,36,0.5)]'
                            : 'bg-red-400 shadow-[0_8px_24px_-8px_rgba(248,113,113,0.5)]'
                          : 'bg-green-400 shadow-[0_8px_24px_-8px_rgba(74,222,128,0.5)]'
                      }`}>
                        {selectedWeekData.type === 'leap' && selectedWeekData.state !== 'sunny' ? (
                          <CloudRain className="h-7 w-7 text-white" />
                        ) : selectedWeekData.state === 'sunny' ? (
                          <Sun className="h-7 w-7 text-white" />
                        ) : (
                          <Sparkles className="h-7 w-7 text-white" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Tabs Navigation */}
                  <div className="border-b border-[hsl(25,20%,90%)] dark:border-[hsl(210,20%,20%)]">
                    <div className="flex">
                      {TABS.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 flex items-center justify-center gap-2 py-4 px-2 text-sm font-medium transition-colors relative ${
                              isActive
                                ? 'text-[hsl(17,75%,56%)]'
                                : 'text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)] hover:text-[hsl(25,22%,16%)] dark:hover:text-white'
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                            <span className="hidden sm:inline">{tab.label}</span>
                            {isActive && (
                              <motion.div
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[hsl(17,75%,56%)]"
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Tab Content */}
                  <CardContent className="py-5">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {getTabContent()}
                      </motion.div>
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation zu aktueller Woche */}
          {currentWeek > 0 && selectedWeek !== currentWeek && (
            <button
              onClick={() => {
                setSelectedWeek(currentWeek);
                setActiveTab('state');
              }}
              className="w-full flex items-center justify-center gap-2 py-4 bg-[hsl(17,75%,56%)]/10 hover:bg-[hsl(17,75%,56%)]/15 rounded-xl transition-colors border border-[hsl(17,75%,56%)]/20 text-[hsl(17,75%,56%)] font-semibold"
            >
              <Navigation className="h-4 w-4" />
              Zur aktuellen Woche ({currentWeek})
            </button>
          )}
        </motion.div>
      </main>
    </div>
  );
}

// Hilfskomponenten für Icons
function CloudRain({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M16 14v6" />
      <path d="M8 14v6" />
      <path d="M12 16v6" />
    </svg>
  );
}

function Sun({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2" />
      <path d="M12 21v2" />
      <path d="M4.22 4.22l1.42 1.42" />
      <path d="M18.36 18.36l1.42 1.42" />
      <path d="M1 12h2" />
      <path d="M21 12h2" />
      <path d="M4.22 19.78l1.42-1.42" />
      <path d="M18.36 5.64l1.42-1.42" />
    </svg>
  );
}
