import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { Card, CardContent } from './Card';

// Hilfsfunktionen (können auch importiert werden)
const LEAPS_TIMELINE = [
  { week: 5, weekEnd: 6, title: "Die ersten Sinneswellen" },
  { week: 8, weekEnd: 9, title: "Muster im Chaos" },
  { week: 12, weekEnd: 13, title: "Wenn Bewegung Sinn ergibt" },
  { week: 19, weekEnd: 20, title: "Aha! Das hat Folgen" },
  { week: 26, weekEnd: 27, title: "Die ersten Trennungen" },
  { week: 37, weekEnd: 38, title: "Kategorien und Ordnung" },
  { week: 46, weekEnd: 47, title: "Reihenfolgen verstehen" },
  { week: 55, weekEnd: 56, title: "Flexible Programme" },
  { week: 64, weekEnd: 65, title: "Regeln und Konsequenzen" },
  { week: 75, weekEnd: 76, title: "Verbundenheit spüren" },
  { week: 91, weekEnd: 115, title: "Die Autonomie-Explosion" },
  { week: 116, weekEnd: 140, title: "Die Welt der Symbole" },
  { week: 141, weekEnd: 156, title: "Warum? & Magisches Denken" },
];

function getWeekColor(week) {
  for (const leap of LEAPS_TIMELINE) {
    if (week >= leap.week && week <= leap.weekEnd) {
      return 'intense';
    }
  }
  // Übergangswochen (vor einem Sprung)
  const preLeapWeeks = [4, 7, 11, 18, 25, 36, 45, 54, 63, 74, 90, 115];
  if (preLeapWeeks.includes(week)) return 'transition';
  return 'calm';
}

export default function TimelineSection({ currentWeek }) {
  const [selectedWeek, setSelectedWeek] = useState(currentWeek);
  const maxWeek = 156;
  
  const weeks = useMemo(() => {
    return Array.from({ length: maxWeek }, (_, i) => i + 1);
  }, []);

  const selectedLeap = useMemo(() => {
    return LEAPS_TIMELINE.find(l => selectedWeek >= l.week && selectedWeek <= l.weekEnd);
  }, [selectedWeek]);

  const selectedStatus = getWeekColor(selectedWeek);
  const currentStatus = getWeekColor(currentWeek);

  return (
    <div className="space-y-6">
      {/* Aktuelle Woche Info */}
      <Card className={`border-2 ${
        currentStatus === 'intense' ? 'border-red-400/50 bg-red-500/5' :
        currentStatus === 'transition' ? 'border-amber-400/50 bg-amber-500/5' :
        'border-green-400/50 bg-green-500/5'
      }`}>
        <CardContent className="py-5">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${
              currentStatus === 'intense' ? 'bg-red-500 text-white' :
              currentStatus === 'transition' ? 'bg-amber-500 text-white' :
              'bg-green-500 text-white'
            }`}>
              <span className="text-xl font-bold">{currentWeek}</span>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Aktuelle Woche</p>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {selectedLeap?.title || 'Ruhige Phase'}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {selectedLeap ? `Woche ${selectedLeap.week}-${selectedLeap.weekEnd}` : 'Zeit zum Durchatmen'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Wochen-Timeline */}
      <div>
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3">Wochenübersicht (Woche 1-156)</h3>
        
        <div className="overflow-x-auto pb-3 -mx-6 px-6 scrollbar-hide">
          <div className="flex gap-1 min-w-max">
            {weeks.map((week) => {
              const color = getWeekColor(week);
              const isCurrent = week === currentWeek;
              const isSelected = week === selectedWeek;
              
              return (
                <motion.button
                  key={week}
                  onClick={() => setSelectedWeek(week)}
                  whileTap={{ scale: 0.9 }}
                  className={`
                    w-7 h-10 rounded-md flex flex-col items-center justify-center text-[9px] font-medium transition-all
                    ${color === 'intense' ? 'bg-red-400 hover:bg-red-500' : 
                      color === 'transition' ? 'bg-amber-300 hover:bg-amber-400' : 
                      'bg-green-400 hover:bg-green-500'}
                    ${isCurrent ? 'ring-2 ring-white dark:ring-gray-800 ring-offset-2 ring-offset-orange-500 scale-110 z-10' : ''}
                    ${isSelected && !isCurrent ? 'ring-2 ring-orange-500' : ''}
                  `}
                >
                  <span className="text-white/70 text-[7px]">W</span>
                  <span className="text-white">{week}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Legende */}
        <div className="flex items-center justify-center gap-4 mt-3 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-green-400"></div>
            <span className="text-gray-500 dark:text-gray-400">Ruhig</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-amber-300"></div>
            <span className="text-gray-500 dark:text-gray-400">Übergang</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-red-400"></div>
            <span className="text-gray-500 dark:text-gray-400">Intensiv</span>
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
          <Card className="border border-gray-200 dark:border-gray-700">
            <CardContent className="py-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Woche {selectedWeek}</p>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                    {selectedLeap?.title || 'Ruhige Entwicklungsphase'}
                  </h4>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  selectedStatus === 'intense' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' :
                  selectedStatus === 'transition' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' :
                  'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                }`}>
                  {selectedStatus === 'intense' ? 'Intensive Phase' :
                   selectedStatus === 'transition' ? 'Übergang' : 'Ruhige Phase'}
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {selectedLeap 
                  ? `Diese Woche ist Teil der Phase "${selectedLeap.title}" (Woche ${selectedLeap.week}-${selectedLeap.weekEnd}). ${
                      selectedStatus === 'intense' 
                        ? 'Eine intensive Zeit mit vielen Veränderungen für dein Baby.' 
                        : 'Eine wichtige Übergangsphase vor dem nächsten Entwicklungssprung.'
                    }`
                  : 'Eine ruhige Phase, in der dein Baby das Gelernte verarbeitet und festigt. Zeit zum Durchatmen für euch beide.'
                }
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Link zur vollständigen Übersicht */}
      <a 
        href="#/leaps" 
        className="block text-center py-3 px-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl text-orange-600 dark:text-orange-400 font-medium hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
      >
        📊 Detaillierte Phasen-Übersicht mit Beschreibungen →
      </a>
    </div>
  );
}
