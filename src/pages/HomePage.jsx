import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Baby, Plus } from 'lucide-react';
import { Card, CardContent } from '../components/Card';
import { PopButton, PopCard } from '../components/PopEffect';

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
  // Spezialfall: Neugeborenes (Woche 0-4)
  if (week < 5) {
    return {
      id: 0,
      week: 0,
      weekEnd: 4,
      title: "Neugeborenen-Phase",
      isInLeap: false,
      phase: "Neugeborenes",
      age: "0-4 Wochen",
    };
  }

  for (const leap of LEAPS) {
    if (week >= leap.week && week <= leap.weekEnd) {
      return { ...leap, isInLeap: true };
    }
    const nextLeap = LEAPS[LEAPS.indexOf(leap) + 1];
    if (week > leap.weekEnd && (!nextLeap || week < nextLeap.week)) {
      return { ...leap, isInLeap: false };
    }
  }
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div className="min-h-screen pb-24">
      <main className="container max-w-3xl mx-auto px-6 py-10 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <motion.div 
            className="flex flex-col items-center text-center gap-4 pt-2 pb-1"
            variants={itemVariants}
          >
            <motion.div 
              className="flex h-[4.8rem] w-[4.8rem] items-center justify-center rounded-[1.8rem] bg-gradient-to-br from-[hsl(17,75%,56%)] to-[hsl(18,85%,62%)] text-white shadow-[0_16px_30px_-18px_rgba(233,110,75,0.8)]"
              animate={{ 
                y: [0, -8, 0],
                rotate: [0, 2, -2, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              whileHover={{ 
                scale: 1.1,
                rotate: 5,
                transition: { type: "spring", stiffness: 300 }
              }}
            >
              <Baby className="h-9 w-9" strokeWidth={2.1} />
            </motion.div>
            
            <div className="space-y-3 max-w-2xl">
              <motion.h1 
                className="text-[hsl(25,22%,16%)] dark:text-white text-[1.8rem] sm:text-[2.2rem] font-extrabold leading-[1.1] tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                MagWarm Flow
              </motion.h1>
              <motion.p 
                className="text-[1.2rem] sm:text-[1.4rem] text-[hsl(17,75%,56%)] dark:text-[hsl(18,85%,65%)] font-semibold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Verstehe, was dein Baby gerade braucht
              </motion.p>
            </div>
          </motion.div>

          <motion.div 
            className="space-y-4 pt-4"
            variants={containerVariants}
          >
            {babies.length === 0 ? (
              <motion.div variants={itemVariants}>
                <Card className="p-8 text-center">
                  <p className="text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)] mb-4">
                    Noch keine Babys angelegt
                  </p>
                  <PopButton
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[hsl(17,75%,56%)] to-[hsl(18,85%,62%)] text-white font-semibold rounded-full shadow-[0_16px_30px_-18px_rgba(233,110,75,0.8)] hover:brightness-[1.02] transition-all"
                  >
                    <Link to="/add">
                      <Plus className="h-5 w-5" />
                      Erstes Baby anlegen
                    </Link>
                  </PopButton>
                </Card>
              </motion.div>
            ) : (
              babies.map((baby, index) => {
                const week = getCurrentWeek(baby.dueDate);
                const leap = getLeapForWeek(week);
                const isStorm = leap.isInLeap;
                const isToddler = week >= 76;
                
                return (
                  <motion.div
                    key={baby.id}
                    variants={itemVariants}
                  >
                    <PopCard className="block">
                      <Link to={`/baby/${baby.id}`} className="block">
                        <Card className="group overflow-hidden relative hover:shadow-[0_20px_50px_rgba(233,110,75,0.15)] transition-shadow duration-500">
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-[hsl(17,75%,56%)]/0 via-[hsl(17,75%,56%)]/10 to-[hsl(17,75%,56%)]/0"
                            initial={{ x: "-200%", opacity: 0 }}
                            whileHover={{ x: "200%", opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                          />
                          <CardContent className="flex items-center gap-5 py-1 relative">
                            <motion.div 
                              className={`flex-shrink-0 flex h-[4.4rem] w-[4.4rem] items-center justify-center rounded-[1.2rem] shadow-[0_12px_24px_-18px_rgba(233,110,75,0.45)] transition-all duration-300 ${
                                isStorm 
                                  ? 'bg-gradient-to-br from-amber-100 to-amber-200 text-amber-600' 
                                  : 'bg-gradient-to-br from-green-100 to-green-200 text-green-600'
                              }`}
                            >
                              <motion.span 
                                className="text-2xl"
                                animate={isStorm ? {
                                  scale: [1, 1.2, 1],
                                  rotate: [0, -10, 10, 0]
                                } : {}}
                                transition={{ duration: 2, repeat: isStorm ? Infinity : 0 }}
                              >
                                {isStorm ? '🌩️' : '☀️'}
                              </motion.span>
                            </motion.div>
                            <div className="flex-1 min-w-0 text-left">
                              <h2 className="text-[1.45rem] sm:text-[1.6rem] font-bold text-[hsl(25,22%,16%)] dark:text-white mb-1 tracking-tight">
                                {baby.name}
                              </h2>
                              <p className="text-[0.98rem] sm:text-base text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)]">
                                {isToddler 
                                  ? `${leap.phase} · ${leap.age || `Woche ${week}`}` 
                                  : `Woche ${week} · ${leap.title}`}
                              </p>
                            </div>
                            <span className="text-2xl text-[hsl(17,75%,56%)]">
                              →
                            </span>
                          </CardContent>
                        </Card>
                      </Link>
                    </PopCard>
                  </motion.div>
                );
              })
            )}
            
            {babies.length > 0 && (
              <motion.div variants={itemVariants}>
                <PopCard className="block">
                  <Link to="/add" className="block">
                    <Card className="border-2 border-dashed border-[hsl(17,75%,56%)]/30 text-[hsl(17,75%,56%)] hover:bg-[hsl(17,75%,56%)]/5 transition-colors">
                      <CardContent className="flex items-center justify-center py-6">
                        <div className="flex items-center gap-3">
                          <motion.div
                            animate={{ rotate: 0 }}
                            whileHover={{ rotate: 90 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Plus className="h-6 w-6" />
                          </motion.div>
                          <span className="font-semibold">Weiteres Baby hinzufügen</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </PopCard>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
