import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo, useEffect } from 'react';
import { CloudRain, Sun, Brain, Lightbulb, Activity, Heart, Sparkles, Navigation } from 'lucide-react';
import { Card, CardContent } from './Card';
import { TEMPLATES } from '../pages/BabyDetailPage_TEMPLATES';

// Hauptphasen (Sprünge)
const LEAPS_TIMELINE = [
  { week: 5, weekEnd: 6, title: "Die ersten Sinneswellen", intensity: 'high' },
  { week: 8, weekEnd: 9, title: "Muster im Chaos", intensity: 'high' },
  { week: 12, weekEnd: 13, title: "Wenn Bewegung Sinn ergibt", intensity: 'high' },
  { week: 19, weekEnd: 20, title: "Aha! Das hat Folgen", intensity: 'high' },
  { week: 26, weekEnd: 27, title: "Die ersten Trennungen", intensity: 'high' },
  { week: 37, weekEnd: 38, title: "Kategorien und Ordnung", intensity: 'high' },
  { week: 46, weekEnd: 47, title: "Reihenfolgen verstehen", intensity: 'high' },
  { week: 55, weekEnd: 56, title: "Flexible Programme", intensity: 'high' },
  { week: 64, weekEnd: 65, title: "Regeln und Konsequenzen", intensity: 'high' },
  { week: 75, weekEnd: 76, title: "Verbundenheit spüren", intensity: 'high' },
  { week: 91, weekEnd: 115, title: "Die Autonomie-Explosion", intensity: 'high' },
  { week: 116, weekEnd: 140, title: "Die Welt der Symbole", intensity: 'medium' },
  { week: 141, weekEnd: 156, title: "Warum? & Magisches Denken", intensity: 'high' },
];

const TABS = [
  { id: 'state', label: 'Zustand', icon: CloudRain },
  { id: 'why', label: 'Warum', icon: Brain },
  { id: 'learn', label: 'Lernt', icon: Activity },
  { id: 'do', label: 'Tun', icon: Lightbulb },
];

function getWeekColor(week) {
  for (const leap of LEAPS_TIMELINE) {
    if (week >= leap.week && week <= leap.weekEnd) return 'intense';
  }
  const preLeapWeeks = [4, 7, 11, 18, 25, 36, 45, 54, 63, 74, 90, 115];
  if (preLeapWeeks.includes(week)) return 'transition';
  return 'calm';
}

// Generiere detaillierte Inhalte für jede Woche
function generateWeekData(week) {
  // Prüfe erst, ob diese Woche ein ECHTER Sprung ist (muss in LEAPS_TIMELINE sein)
  const leap = LEAPS_TIMELINE.find(l => week >= l.week && week <= l.weekEnd);
  const template = TEMPLATES.find(t => week >= t.week && week <= t.weekEnd);
  
  // Nur echte Sprünge behandeln (die in LEAPS_TIMELINE definiert sind)
  if (leap && template) {
    const isFirstWeek = week === leap.week;
    const isLastWeek = week === leap.weekEnd;
    
    return {
      week,
      type: 'leap',
      title: template.title,
      subtitle: isLastWeek ? 'Sunny Phase' : isFirstWeek ? 'Sprung beginnt' : 'Intensivphase',
      phase: isLastWeek ? 'Sunny Phase' : 'Storm Phase',
      state: isLastWeek ? 'sunny' : 'storm',
      stateLabel: isLastWeek ? 'Sunny Phase' : isFirstWeek ? 'Sprung beginnt' : 'Intensivphase',
      stateDescription: isLastWeek ? template.sunnyPhase.description : template.stormPhase.description,
      symptoms: isLastWeek ? [] : template.stormPhase.symptoms,
      abilities: isLastWeek ? template.sunnyPhase.abilities : [],
      why: template.why,
      actions: template.actions
    };
  }
  
  // Ruhephase (auch wenn Template existiert, aber nicht in LEAPS_TIMELINE)
  let prevLeap = null;
  let nextLeap = null;
  for (const l of LEAPS_TIMELINE) {
    if (l.weekEnd < week) prevLeap = l;
    if (l.week > week && !nextLeap) nextLeap = l;
  }
  
  const prevTitle = prevLeap?.title || 'Geburt';
  const nextTitle = nextLeap?.title || 'Kindergarten';
  
  // Verwende Template-Daten falls vorhanden (für Titel), sonst generische
  const title = template?.title || `Ruhephase nach "${prevTitle}"`;
  const subtitle = template?.subtitle || `Vorbereitung auf "${nextTitle}"`;
  
  return {
    week,
    type: 'calm',
    title: title,
    subtitle: subtitle,
    phase: 'Ruhige Entwicklung',
    state: 'calm',
    stateLabel: 'Ruhige Phase',
    stateDescription: template?.sunnyPhase?.description || `Nach dem intensiven ${prevTitle} ist Zeit zur Verarbeitung. Dein Baby festigt das Gelernte und bereitet sich auf ${nextTitle} vor.`,
    symptoms: template?.stormPhase?.symptoms || [
      "Kann nach dem vorherigen Sprung müde sein",
      "Zeigt stolz neue Fähigkeiten",
      "Sucht vertraute Rituale",
      "Ist ausgeglichener und zufriedener"
    ],
    abilities: template?.sunnyPhase?.abilities || [
      "Festigt neu erworbene Fähigkeiten",
      "Wird sicherer im Alltag",
      "Entwickelt zunehmendes Selbstvertrauen"
    ],
    why: template?.why || "Das Gehirn konsolidiert und festigt neue Verbindungen. Myelinisierung schützt die Nervenbahnen.",
    actions: template?.actions || [
      "💚 Diese ruhige Phase ist wichtig - das Gehirn verarbeitet",
      "🌟 Genieße die ausgeglichene Zeit mit deinem Baby",
      "Neue Fähigkeiten feiern und üben"
    ]
  };
}

export default function TimelineSection({ currentWeek }) {
  const [selectedWeek, setSelectedWeek] = useState(currentWeek);
  const [activeTab, setActiveTab] = useState('state');
  const maxWeek = 156;
  
  // Timeline automatisch auf currentWeek positionieren beim ersten Rendern
  useEffect(() => {
    // Scrolle zur aktuellen Woche
    const currentWeekElement = document.getElementById(`week-${currentWeek}`);
    if (currentWeekElement) {
      currentWeekElement.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [currentWeek]);
  
  const weeks = useMemo(() => Array.from({ length: maxWeek }, (_, i) => i + 1), []);
  const selectedWeekData = useMemo(() => generateWeekData(selectedWeek), [selectedWeek]);
  const currentStatus = getWeekColor(currentWeek);
  const selectedStatus = getWeekColor(selectedWeek);

  const getTabContent = () => {
    switch (activeTab) {
      case 'state':
        return (
          <div className="space-y-4">
            <div className={`p-4 rounded-xl ${
              selectedWeekData.state === 'sunny' ? 'bg-amber-50 dark:bg-amber-900/20' :
              selectedWeekData.state === 'storm' ? 'bg-red-50 dark:bg-red-900/20' :
              'bg-green-50 dark:bg-green-900/20'
            }`}>
              <div className="flex items-center gap-2 mb-3">
                {selectedWeekData.state === 'sunny' ? (
                  <Sun className="h-5 w-5 text-amber-600" />
                ) : selectedWeekData.state === 'storm' ? (
                  <CloudRain className="h-5 w-5 text-red-600" />
                ) : (
                  <Sparkles className="h-5 w-5 text-green-600" />
                )}
                <span className={`font-semibold ${
                  selectedWeekData.state === 'sunny' ? 'text-amber-700 dark:text-amber-300' :
                  selectedWeekData.state === 'storm' ? 'text-red-700 dark:text-red-300' :
                  'text-green-700 dark:text-green-300'
                }`}>
                  {selectedWeekData.stateLabel}
                </span>
              </div>
              <p className="text-[hsl(25,22%,16%)] dark:text-white leading-relaxed">
                {selectedWeekData.stateDescription}
              </p>
            </div>
            
            {selectedWeekData.type === 'leap' && selectedWeekData.symptoms?.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)] mb-2">
                  Mögliche Anzeichen:
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedWeekData.symptoms.map((s, i) => (
                    <span key={i} className="px-3 py-1.5 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-sm">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {selectedWeekData.abilities?.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)] mb-2">
                  Neue Fähigkeiten:
                </p>
                <div className="space-y-2">
                  {selectedWeekData.abilities.map((a, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <span className="text-green-500">✓</span>
                      <span className="text-[hsl(25,22%,16%)] dark:text-white text-sm">{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      case 'why':
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex-shrink-0">
                <Brain className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-[hsl(25,22%,16%)] dark:text-white mb-2">
                  Was im Gehirn passiert
                </p>
                <p className="text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)] leading-relaxed">
                  {selectedWeekData.why}
                </p>
              </div>
            </div>
          </div>
        );
      case 'learn':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Activity className="h-5 w-5 text-green-600" />
              </div>
              <p className="font-semibold text-[hsl(25,22%,16%)] dark:text-white">
                Neue Fähigkeiten diese Woche
              </p>
            </div>
            <div className="grid gap-2">
              {(selectedWeekData.abilities?.length > 0 ? selectedWeekData.abilities : selectedWeekData.symptoms)?.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-[hsl(25,50%,97%)] dark:bg-[hsl(210,20%,12%)] rounded-xl">
                  <span className="flex-shrink-0 w-6 h-6 bg-[hsl(17,75%,56%)] text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </span>
                  <p className="text-[hsl(25,22%,16%)] dark:text-white text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'do':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-rose-100 dark:bg-rose-900/30 rounded-lg">
                <Lightbulb className="h-5 w-5 text-rose-600" />
              </div>
              <p className="font-semibold text-[hsl(25,22%,16%)] dark:text-white">
                Das hilft jetzt
              </p>
            </div>
            <div className="space-y-3">
              {selectedWeekData.actions?.map((action, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-rose-50 dark:bg-rose-900/20 rounded-xl">
                  <span className="flex-shrink-0 w-8 h-8 bg-[hsl(17,75%,56%)] text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {i + 1}
                  </span>
                  <p className="text-[hsl(25,22%,16%)] dark:text-white pt-1 leading-relaxed">{action}</p>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Aktuelle Woche Info */}
      <Card className={`border-2 ${
        currentStatus === 'intense' ? 'border-red-400/50 bg-red-500/5' :
        currentStatus === 'transition' ? 'border-amber-400/50 bg-amber-500/5' :
        'border-green-400/50 bg-green-500/5'
      }`}>
        <CardContent className="py-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
              currentStatus === 'intense' ? 'bg-red-500 text-white' :
              currentStatus === 'transition' ? 'bg-amber-500 text-white' :
              'bg-green-500 text-white'
            }`}>
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
              
              return (
                <motion.button
                  key={week}
                  id={`week-${week}`}
                  onClick={() => {
                    setSelectedWeek(week);
                    setActiveTab('state');
                  }}
                  whileTap={{ scale: 0.9 }}
                  className={`
                    w-6 h-9 rounded flex flex-col items-center justify-center text-[8px] font-medium transition-all
                    ${color === 'intense' ? 'bg-red-400' : color === 'transition' ? 'bg-amber-300' : 'bg-green-400'}
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



      {/* Phase Info - nur Zustand, keine redundanten Tabs */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedWeek}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Header */}
            <div className={`p-4 border-b border-gray-200 dark:border-gray-700 ${
              selectedWeekData.state === 'sunny' ? 'bg-amber-50 dark:bg-amber-900/20' :
              selectedWeekData.state === 'storm' ? 'bg-red-50 dark:bg-red-900/20' :
              'bg-green-50 dark:bg-green-900/20'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      selectedWeekData.state === 'sunny' ? 'bg-amber-200 text-amber-800' :
                      selectedWeekData.state === 'storm' ? 'bg-red-200 text-red-800' :
                      'bg-green-200 text-green-800'
                    }`}>
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

            {/* Phase Info Content - nur Zustand */}
            <CardContent className="py-4">
              <div className="space-y-4">
                <div className={`p-4 rounded-xl ${
                  selectedWeekData.state === 'sunny' ? 'bg-amber-50 dark:bg-amber-900/20' :
                  selectedWeekData.state === 'storm' ? 'bg-red-50 dark:bg-red-900/20' :
                  'bg-green-50 dark:bg-green-900/20'
                }`}>
                  <div className="flex items-center gap-2 mb-3">
                    {selectedWeekData.state === 'sunny' ? (
                      <Sun className="h-5 w-5 text-amber-600" />
                    ) : selectedWeekData.state === 'storm' ? (
                      <CloudRain className="h-5 w-5 text-red-600" />
                    ) : (
                      <Sparkles className="h-5 w-5 text-green-600" />
                    )}
                    <span className={`font-semibold ${
                      selectedWeekData.state === 'sunny' ? 'text-amber-700 dark:text-amber-300' :
                      selectedWeekData.state === 'storm' ? 'text-red-700 dark:text-red-300' :
                      'text-green-700 dark:text-green-300'
                    }`}>
                      {selectedWeekData.stateLabel}
                    </span>
                  </div>
                  <p className="text-[hsl(25,22%,16%)] dark:text-white leading-relaxed">
                    {selectedWeekData.stateDescription}
                  </p>
                </div>

                {selectedWeekData.type === 'leap' && selectedWeekData.symptoms?.length > 0 && (
                  <div>
                    <p className="text-sm font-semibold text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)] mb-2">
                      Mögliche Anzeichen:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedWeekData.symptoms.map((s, i) => (
                        <span key={i} className="px-3 py-1.5 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-sm">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedWeekData.abilities?.length > 0 && (
                  <div>
                    <p className="text-sm font-semibold text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)] mb-2">
                      Neue Fähigkeiten:
                    </p>
                    <div className="space-y-2">
                      {selectedWeekData.abilities.map((a, i) => (
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
