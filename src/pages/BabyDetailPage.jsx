import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowLeft, Brain, Sprout, Lightbulb, Calendar } from 'lucide-react';
import { Card, CardContent } from '../components/Card';

const TEMPLATES = [
  {
    "week": 5, "weekEnd": 6, "title": "Welt der Sinne",
    "stormPhase": { "description": "Dein Baby nimmt alles intensiver wahr.", "symptoms": ["Quengelig", "Anhänglich", "Schläft unruhiger"] },
    "sunnyPhase": { "description": "Das intensive Wahrnehmen ermöglicht neue Erkenntnisse.", "abilities": ["Soziales Lächeln", "Intensiver Blick", "Tränen bei Bedürfnissen"] },
    "why": "Im Gehirn entstehen neue neuronale Verbindungen. Die Sinnesorgane reifen.",
    "actions": ["Biete viel Körperkontakt", "Reduziere äußere Reize", "Sprich ruhig und beruhigend"]
  },
  {
    "week": 8, "weekEnd": 9, "title": "Welt der Muster",
    "stormPhase": { "description": "Das Baby erkennt plötzlich Muster in seiner Umgebung.", "symptoms": ["Sucht Augenkontakt", "Sensibel", "Will getragen"] },
    "sunnyPhase": { "description": "Mustererkennung hilft dem Baby, seine Umgebung besser vorherzusagen.", "abilities": ["Erkennt wiederkehrende Formen", "Folgt Mustern", "Reagiert auf Rhythmen"] },
    "why": "Das Gehirn beginnt, Muster zu erkennen und Erwartungen zu bilden.",
    "actions": ["Etabliere klare Rituale", "Zeige dem Baby Muster", "Verwende singenden Tonfall"]
  },
  {
    "week": 12, "weekEnd": 13, "title": "Fließende Übergänge",
    "stormPhase": { "description": "Das Baby erlebt Bewegungen jetzt anders.", "symptoms": ["Unruhig", "Bewegungsdrang", "Experimentiert"] },
    "sunnyPhase": { "description": "Fließende Bewegungen ermöglichen neue Interaktionen.", "abilities": ["Kopf kontrolliert halten", "Stimmtraining", "Fließende Arme"] },
    "why": "Die Muskulatur und deren Koordination verbessern sich.",
    "actions": ["Mehr Bauchlage ermöglichen", "Auf Laute reagieren", "Köpfchen beim Tragen stützen"]
  },
  {
    "week": 19, "weekEnd": 20, "title": "Welt der Ereignisse",
    "stormPhase": { "description": "Das Baby entdeckt die Beziehung zwischen Ursache und Wirkung.", "symptoms": ["Steckt alles in Mund", "Greift nach allem", "Wird frustriert"] },
    "sunnyPhase": { "description": "Ursache-Wirkung öffnet dem Baby neue Welten.", "abilities": ["Gezieltes Greifen", "Drehversuche", "Mund als Werkzeug"] },
    "why": "Das Gehirn verknüpft Handlungen mit Ergebnissen.",
    "actions": ["Greifbares Spielzeug anbieten", "Mund-Exploration erlauben", "Erfolge feiern"]
  },
  {
    "week": 26, "weekEnd": 27, "title": "Welt der Beziehungen",
    "stormPhase": { "description": "Das Baby erkennt nun die Distanz zu seinen Bezugspersonen.", "symptoms": ["Fremdelt", "Weint bei Trennung", "Braucht Nähe"] },
    "sunnyPhase": { "description": "Bindungen ermöglichen soziales Lernen.", "abilities": ["Unterscheidet Bezugspersonen", "Erkennt räumliche Distanz", "Zeigt Präferenzen"] },
    "why": "Das Gehirn kategorisiert Menschen und ihre Beziehung zum Baby.",
    "actions": ["Rituell verabschieden", "Freudig begrüßen", "Fremdeln respektieren"]
  },
  {
    "week": 37, "weekEnd": 38, "title": "Welt der Kategorien",
    "stormPhase": { "description": "Das Baby teilt die Welt in Kategorien ein.", "symptoms": ["Sortiert Dinge", "Empfindlich", "Achte auf Details"] },
    "sunnyPhase": { "description": "Kategorien ordnen die Komplexität.", "abilities": ["Einteilen", "Erste Wortversuche", "Robben/Krabbeln"] },
    "why": "Das Gehirn bildet Konzepte. Ein Hund ist ein Tier, aber nicht jedes Tier ist ein Hund.",
    "actions": ["Sortierspiele anbieten", "Kategorien benennen", "Platz zum Bewegen schaffen"]
  },
  {
    "week": 46, "weekEnd": 47, "title": "Welt der Reihenfolgen",
    "stormPhase": { "description": "Das Baby versteht Abfolgen und will selbstständig handeln.", "symptoms": ["Will selbst", "Wird frustriert", "Experimentiert"] },
    "sunnyPhase": { "description": "Reihenfolgen ermöglichen echte Teilhabe.", "abilities": ["Kann Türmchen bauen", "Hilft bei Abläufen", "Versteht Sequenzen"] },
    "why": "Das Gehirn speichert Sequenzen. 'Erst Löffel nehmen, dann zum Mund führen, dann kauen'.",
    "actions": ["Helfen lassen", "Rituale etablieren", "Bauklötze anbieten"]
  },
  {
    "week": 55, "weekEnd": 56, "title": "Welt der Programme",
    "stormPhase": { "description": "Das Baby will selbstständig handeln und testet Grenzen.", "symptoms": ["Trotz", "Selbst entscheiden", "Testet Grenzen"] },
    "sunnyPhase": { "description": "Flexible Programme ermöglichen echte Interaktion.", "abilities": ["Erste Schritte", "Hilft bei Aufgaben", "Nachahmen"] },
    "why": "Das Gehirn versteht: Abläufe können variieren, haben aber ein gemeinsames Ziel.",
    "actions": ["Helfen lassen", "Wahlmöglichkeiten geben", "Gemeinsam aufräumen"]
  },
  {
    "week": 64, "weekEnd": 65, "title": "Welt der Prinzipien",
    "stormPhase": { "description": "Das Baby testet Regeln und wiederholt Verhaltensweisen.", "symptoms": ["Wiederholt", "Variatives Verhalten", "Reagiert auf Konsequenzen"] },
    "sunnyPhase": { "description": "Prinzipien ermöglichen strategisches Handeln.", "abilities": ["Regeln verstehen", "Zwei-Wort-Sätze", "Konsequenzen erkennen"] },
    "why": "Das Gehirn formt Regelwerke. 'Wenn ich weine, kommt Mama'.",
    "actions": ["Konsequent sein", "Einfach erklären", "Positives verstärken"]
  },
  {
    "week": 75, "weekEnd": 76, "title": "Welt der Systeme",
    "stormPhase": { "description": "Das Baby begreift sich als Teil von Systemen.", "symptoms": ["Sensibel", "Zeigt Gewissenhaftigkeit", "Reagiert auf Emotionen"] },
    "sunnyPhase": { "description": "Systeme ermöglichen echte Empathie.", "abilities": ["Zeigt Empathie", "Ich-Bewusstsein", "Versteht Familiengefüge"] },
    "why": "Das Gehirn sieht Zusammenhänge. 'Wenn Mama traurig ist, bin ich auch betroffen'.",
    "actions": ["Gefühle benennen", "Familie erklären", "Rollenspiele ermöglichen"]
  }
];

const TABS = [
  { id: 1, label: 'Zustand', icon: '🌤️' },
  { id: 2, label: 'Warum', icon: '🧠' },
  { id: 3, label: 'Lernt', icon: '🌱' },
  { id: 4, label: 'Tun', icon: '💡' },
  { id: 5, label: 'Zeit', icon: '📅' },
];

function getCurrentWeek(dueDate) {
  const now = new Date();
  const due = new Date(dueDate);
  const diffTime = now.getTime() - due.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
}

function getLeapForWeek(week) {
  for (const leap of TEMPLATES) {
    if (week >= leap.week && week <= leap.weekEnd) {
      return { ...leap, isInLeap: true };
    }
    if (week > leap.weekEnd && week < (TEMPLATES.find(l => l.week > leap.week)?.week || 100)) {
      return { ...leap, isInLeap: false };
    }
  }
  return TEMPLATES[TEMPLATES.length - 1];
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

      <main className="container max-w-3xl mx-auto px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="space-y-6"
        >
          <div className="text-center py-4">
            <p className="text-sm text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)]">Woche {week}</p>
            <h2 className="text-[1.8rem] sm:text-[2.2rem] font-extrabold text-[hsl(25,22%,16%)] dark:text-white mt-1 leading-[1.1]">
              {leap.title}
            </h2>
            <div className={`inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-full text-sm font-medium ${
              isStorm 
                ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300' 
                : 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300'
            }`}
            >
              <span className="text-lg">{isStorm ? '🌩️' : '☀️'}</span>
              {isStorm ? 'Stürmische Phase' : 'Sonnige Phase'}
            </div>
          </div>

          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.id 
                    ? 'bg-[hsl(17,75%,56%)] text-white shadow-[0_16px_30px_-18px_rgba(233,110,75,0.8)]' 
                    : 'bg-white/60 dark:bg-[hsl(210,20%,10%)]/60 text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)]'
                }`}
              >
                <span className="mr-1.5">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
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
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 text-blue-500">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <h3 className="text-[1.35rem] font-bold text-[hsl(25,22%,16%)] dark:text-white">Zeitlinie</h3>
                  </div>
                  <div className="space-y-3 pl-[3.75rem]">
                    {leap.week > 5 && (
                      <div className="p-4 bg-gray-50 dark:bg-[hsl(210,20%,10%)]/50 rounded-xl">
                        <p className="text-sm text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)] mb-1">Vergangene Sprünge</p>
                        <p className="font-medium text-[hsl(25,22%,16%)] dark:text-white">Vorherige Sprünge abgeschlossen ✓</p>
                      </div>
                    )}
                    
                    <div className="p-5 bg-rose-50 dark:bg-rose-900/20 rounded-xl border-2 border-[hsl(17,75%,56%)]/20">
                      <p className="text-sm text-[hsl(17,75%,56%)] font-medium mb-1">Aktueller Sprung</p>
                      <p className="font-bold text-[1.25rem] text-[hsl(25,22%,16%)] dark:text-white">{leap.title}</p>
                      <p className="text-sm text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)]">Woche {leap.week}–{leap.weekEnd}</p>
                    </div>
                    
                    {leap.week < 75 && (
                      <div className="p-4 bg-gray-50 dark:bg-[hsl(210,20%,10%)]/50 rounded-xl">
                        <p className="text-sm text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)] mb-1">Nächste Sprünge</p>
                        <p className="font-medium text-[hsl(25,22%,16%)] dark:text-white">
                          Nächster Sprung in {leap.weekEnd - week + 1} Wochen
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
    </div>
  );
}
