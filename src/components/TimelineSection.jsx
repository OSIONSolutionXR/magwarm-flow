import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo, useEffect } from 'react';
import { CloudRain, Sun, Brain, Lightbulb, Activity, Heart, Sparkles, Navigation, Zap, AlertTriangle, Moon } from 'lucide-react';
import { Card, CardContent } from './Card';
import { TEMPLATES } from '../pages/BabyDetailPage_TEMPLATES';
import { SLEEP_DATA } from '../data/sleepData';

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
  
  // INDIVIDUELLE BESCHREIBUNGEN für jede grüne Woche (1-156)
  const CALM_DESCRIPTIONS = {
    // ========== WOCHEN 1-9 ==========
    1: 'Willkommen in der Welt! Die ersten Tage nach der Geburt sind anstrengend für das Baby. Es muss sich an Atmen, Fressen und die Außenwelt gewöhnen. Viel Hautkontakt und Ruhe helfen jetzt.',
    2: 'Das Baby gewöhnt sich an die neue Umgebung. Es schläft viel und verarbeitet die Eindrücke. Die ersten Reflexe wie das Greifen werden sichtbar. Noch 2 Wochen bis zum ersten Sprung.',
    3: 'Die ersten Anzeichen von Wachheit zeigen sich. Das Baby verbringt kurze Momente wach und beobachtet die Umgebung. Die Augen können kurz fokussieren. Morgen beginnt der erste intensive Sprung!',
    7: 'Nach dem ersten Durchbruch der Sensationen festigt sich die Wahrnehmung. Das Baby reagiert stärker auf Gesichter und Geräusche. Es entwickelt erste soziale Lächeln.',
    8: 'Die Welt der Muster steht kurz bevor. Das Baby wird neugieriger und untersucht seine Umgebung genauer. Bereite dich vor: Bald beginnt ein neuer intensiver Entwicklungsschub.',
    
    // ========== WOCHEN 10-18 ==========
    10: 'Nach dem Musterverstehen übt das Baby, wiederkehrende Abläufe zu erkennen. Es freut sich über vertraute Rituale und Stimmen.',
    11: 'Das Baby wird aktiver und zeigt mehr Interesse an Spielzeug. Die Hand-Augen-Koordination verbessert sich. Morgen beginnt der Bewegungssprung!',
    14: 'Erste Woche nach dem Bewegungsdurchbruch. Das Baby greift jetzt gezielt nach Objekten und bringt sie zum Mund. Die Motorik entwickelt sich rasant.',
    15: 'Das übt das Greifen und Lösen immer wieder. Es liebt Spielzeug, das klappert oder rasselt. Die Handmuskulatur wird stärker.',
    16: 'Das Baby beginnt, mit beiden Händen zu spielen. Es kann Objekte von einer Hand in die andere geben. Die Koordination verbessert sich täglich.',
    17: 'Die Feinmotorik wird präziser. Das Baby kann kleinere Objekte greifen und untersucht sie ausgiebig. Noch 1 Woche bis zum nächsten Sprung.',
    18: 'Letzte Woche vor dem Sprung. Das Baby ist sehr aktiv und entdeckt ständig neue Bewegungsmuster. Morgen beginnt die Phase von Ursache und Wirkung!',
    
    // ========== WOCHEN 21-36 ==========
    21: 'Nach dem Verstehen von Ursache und Wirkung experimentiert das Baby systematisch. Es schüttelt, wirft und untersucht jedes Objekt. Die Neugierde ist grenzenlos.',
    22: 'Das Baby testet Grenzen aus und wiederholt erfolgreiche Aktionen. Es lernt: Wenn ich etwas fallen lasse, kommt jemand und hebt es auf.',
    23: 'Die Experimentierfreude steigt. Das Baby liebt Versteckspiele und entdeckt, dass Objekte auch weiter existieren, wenn sie nicht sichtbar sind.',
    24: 'Das Baby wird kreativer im Spiel. Es findet neue Wege, Aufmerksamkeit zu bekommen. Noch 2 Wochen bis zur Trennungsangst-Phase.',
    25: 'Letzte Woche vor dem intensiven Sprung. Das Baby spürt die Veränderung und sucht mehr Nähe. Morgen beginnt die Trennungsangst-Phase!',
    28: 'Nach der Trennungsangst-Phase festigt sich die sichere Bindung. Das Baby weiß: Mama kommt immer wieder zurück. Dieses Vertrauen ist wichtig für die Entwicklung.',
    29: 'Das Baby wird selbstständiger im Spielen. Es kann kurze Zeit alleine beschäftigt sein, solange Mama in Sichtweite bleibt.',
    30: 'Die Kommunikation entwickelt sich. Das Baby macht mehr Laute und versucht zu imitieren. Die Interaktion wird lebendiger.',
    31: 'Das Baby zeigt deutliche Vorlieben. Es kann mit Gesten zeigen, was es möchte. Die Persönlichkeit wird sichtbarer.',
    32: 'Neue motorische Fähigkeiten werden geübt. Das Baby krabbelt oder robbert möglicherweise bereits. Die Mobilität nimmt zu.',
    33: 'Das Entdecken der eigenen Stimme macht Spaß. Das Baby brabbelt, lacht und protestiert lautstark. Die Lautstärke steigt!',
    34: 'Das Verstehen von einfachen Anweisungen beginnt. Das Baby reagiert auf seinen Namen und zeigt Interesse an Büchern.',
    35: 'Die soziale Entwicklung schreitet voran. Das Baby erkennt vertraute Personen und Fremde unterscheiden. Noch 2 Wochen bis zum nächsten Sprung.',
    36: 'Letzte Woche vor dem Kategorien-Sprung. Das Baby sortiert schon unbewusst: hier Spielzeug, dort Essen. Morgen beginnt eine intensive Phase!',
    
    // ========== WOCHEN 39-54 ==========
    39: 'Nach dem Kategorien-Durchbruch sortiert das Baby die Welt aktiv. Hier sind die Tassen, da die Schuhe. Ordnung hilft ihm, sich zurechtzufinden.',
    40: 'Das Unterscheiden von ähnlichen Objekten wird geübt. Das Baby erkennt Unterschiede in Form, Farbe und Größe.',
    41: 'Die Sprachentwicklung macht Fortschritte. Das Baby versteht immer mehr Wörter im Kontext und reagiert entsprechend.',
    42: 'Das Spiel wird zielgerichteter. Das Baby sucht spezifische Spielzeuge und kann sie sich selbst holen.',
    43: 'Die Feinmotorik wird präziser. Kleine Objekte können gezielt gegriffen und untersucht werden.',
    44: 'Das Gedächtnis wird besser. Das Baby erinnert sich an Verstecke von Spielzeug und wiederkehrende Abläufe.',
    45: 'Letzte Woche vor dem Sequenzen-Sprung. Das Baby beobachtet genau, wie Dinge gemacht werden. Morgen beginnt ein neuer intensiver Abschnitt!',
    48: 'Nach dem Verstehen von Reihenfolgen genießt das Baby Routinen. Erst waschen, dann anziehen, dann frühstücken – diese Vorhersehbarkeit gibt Sicherheit.',
    49: 'Das Baby antizipiert bereits kommende Abläufe. Es weiß, was als Nächstes passiert und bereitet sich vor.',
    50: 'Die erste Eigeninitiative zeigt sich. Das Baby versucht, selbstständig Dinge zu tun, die es oft beobachtet hat.',
    51: 'Das Nachahmen wird präziser. Das Baby kopiert Gesten und Handlungen bewusst und lernt so neue Fähigkeiten.',
    52: 'Die Sprache explodiert im Verständnis. Das Baby folgt komplexen Anweisungen und versteht viel mehr, als es zeigen kann.',
    53: 'Das soziale Lernen schreitet voran. Das Baby beobachtet andere Kinder und Erwachsene genau und lernt durch Imitation.',
    54: 'Letzte Woche vor dem Programm-Sprung. Das Baby liebt Wiederholungen und vertraute Abläufe. Morgen beginnt eine neue intensive Phase!',
    
    // ========== WOCHEN 57-74 ==========
    57: 'Nach dem Verstehen von Programmen wird flexibel gespielt. Das Baby kann sich an neue Situationen anpassen und findet kreative Lösungen.',
    58: 'Die Problemlösungsfähigkeit wächst. Das Baby versucht verschiedene Strategien, um ein Ziel zu erreichen.',
    59: 'Das Spiel wird variabler. Das Baby erfindet neue Verwendungsweisen für bekannte Objekte und wird erfinderisch.',
    60: 'Die Kommunikation wird ausdrucksstärker. Neben Lauten kommen Gesten und Mimik hinzu, um Wünsche zu zeigen.',
    61: 'Das Verständnis von Verboten wächst. Das Baby testet Grenzen aus und lernt, was erlaubt ist und was nicht.',
    62: 'Die emotionale Entwicklung schreitet voran. Das Baby zeigt deutlicher Freude, Frust, Neugier und Ängste.',
    63: 'Letzte Woche vor dem Regeln-Sprung. Das Baby beobachtet, wie andere interagieren. Morgen beginnt eine intensive Lernphase!',
    66: 'Nach dem Verstehen von Regeln übt das Baby soziale Interaktionen. Es lernt, dass andere eigene Bedürfnisse haben. Empathie entwickelt sich.',
    67: 'Das Teilen und Mitmachen wird geübt. Das Baby beginnt, Spielzeug anzubieten und einfache Spiele zu verstehen.',
    68: 'Die Kommunikation wird komplexer. Erste Wörter oder Wortähnliches können sich ankündigen. Das Baby drückt sich vielfältiger aus.',
    69: 'Die Selbstständigkeit wächst. Das Baby möchte selbst füttern und bei Aktivitäten mitmachen.',
    70: 'Das Verstehen von Emotionen wird präziser. Das Baby erkennt, wenn jemand traurig oder glücklich ist.',
    71: 'Das Spiel wird interaktiver. Das Baby sucht den Austausch mit anderen und freut sich über gemeinsame Aktivitäten.',
    72: 'Die Motorik wird kontrollierter. Das Baby balanciert, klettert und erkundet die Umgebung sicherer.',
    73: 'Die Sprachentwicklung macht Sprünge. Mehr Silben werden geübt und die Kommunikation wird verständlicher.',
    74: 'Letzte Woche vor dem letzten klassischen Sprung. Das Baby sammelt Energie für eine intensive Lernphase. Morgen beginnt der Sprung zu Systemen!',
    
    // Nach Sprung 10
    76: 'Nach dem Verstehen von Systemen ist das Baby nun fast ein Jahr alt. Es kann vieles selbstständig und versteht immer mehr Zusammenhänge. Nutze diese ruhige Zeit.',
    77: 'Das Baby wird immer selbstständiger. Es erkundet die Umgebung sicherer und kommuniziert deutlicher. Morgen beginnt die intensive Phase des Ich-Bewusstseins!',
    
    // ========== WOCHEN 84-156 (bestehend erweitert) ==========
    84: 'Erste Woche nach dem Spiegel-Erkennungs-Durchbruch. Das Kind festigt sein neues Selbstverständnis und ist stolz auf sich selbst.',
    85: 'Das Ich-Bewusstsein wächst. Das Kind zeigt deutlicher, was es will und was nicht. Die Persönlichkeit wird stärker.',
    86: 'Die Kommunikation entwickelt sich zu echten Interaktionen. Das Kind versucht, sich verständlich zu machen und reagiert auf Feedback.',
    87: 'Das Spiel wird komplexer. Das Kind kann länger alleine spielen und konzentriert sich auf Aufgaben.',
    88: 'Die Motorik wird präziser. Laufen, Klettern und Balancieren werden sicherer und flüssiger.',
    89: 'Das Verstehen von Anweisungen wächst. Das Kind kann mehrstufige Aufgaben ausführen und ist stolz auf seine Leistungen.',
    90: 'Letzte Woche vor dem Super-Sprung. Das Kind spürt die bevorstehende Veränderung. Morgen beginnt die Wortschatz-Explosion!',
    91: 'Die Vorbereitung auf den Sprung läuft. Das Gehirn ist aktiv und verarbeitet Sprache. Noch 1 Woche bis zum intensiven Super-Peak!',
    
    101: 'Erste Woche nach dem Zwei-Wort-Sätze-Durchbruch. Der Wortschatz explodiert regelrecht – jeden Tag kommen neue Wörter hinzu!',
    102: 'Das Kind probiert ständig neue Wortkombinationen aus. Die Sprache wird zum wichtigsten Kommunikationsmittel.',
    103: 'Zweiwort-Sätze werden sicherer und häufiger. Das Kind drückt komplexere Wünsche aus und verständigt sich besser.',
    104: 'Die Sprachentwicklung schreitet rasant voran. Das Kind imitiert Wörter und versucht, Sätze zu bilden.',
    105: 'Das Verständnis für abstrakte Begriffe wächst. Das Kind versteht Zeitbegriffe und Gefühlsbeschreibungen besser.',
    106: 'Die Kommunikation wird konversationeller. Das Kind hält kleine "Gespräche" und reagiert auf Antworten.',
    107: 'Das Spiel wird sprachbegleitet. Das Kind erzählt beim Spielen, was es tut und was die Figuren tun.',
    108: 'Die Ausdrucksfähigkeit wächst. Das Kind kann immer mehr von seinen Bedürfnissen und Erlebnissen erzählen.',
    109: 'Das Gedächtnis für Worte wird besser. Das Kind merkt sich neue Begriffe und verwendet sie im richtigen Kontext.',
    110: 'Die Grammatik entwickelt sich unbewusst. Das Kind bildet richtige Satzstrukturen, ohne es zu lernen.',
    111: 'Die Sprache wird emotionaler. Das Kind kann Gefühle benennen und ausdrücken, was ihm guttut oder nicht.',
    112: 'Das Erzählen wird strukturierter. Das Kind kann kleine Geschichten in der richtigen Reihenfolge wiedergeben.',
    113: 'Das Verstehen komplexer Anweisungen wächst. Das Kind kann mehrere Aufgaben nacheinander ausführen.',
    114: 'Die Selbstständigkeit in der Kommunikation steigt. Das Kind fragt nach Worten, die es noch nicht kennt.',
    115: 'Letzte Woche vor der Autonomiephase. Das Kind ist redselig und kommunikativ. Morgen beginnt die Trotzphase!',
    116: 'Die Vorbereitung läuft. Das Kind spürt, dass es neue Fähigkeiten entwickelt. Noch 2 Wochen bis zum ersten strategischen Testen.',
    117: 'Die Ruhe vor dem Sturm. Das Kind ist entspannt und ausgeglichen. Morgen beginnt die intensive Autonomiephase!',
    
    126: 'Erste Woche nach dem Symbolspiel-Durchbruch. Das Kind entwickelt echte Fantasie und beginnt, die Welt kreativer zu erkunden.',
    127: 'Das Rollenspiel wird komplexer. Das Kind spielt Mama, Papa oder andere Figuren und imitiert deren Verhalten detailgetreu.',
    128: 'Die Fantasiewelt expandiert. Das Kind erfindet eigene Geschichten und Szenarien beim Spielen.',
    129: 'Das Parallelspiel wandelt sich in echtes Zusammenspiel. Das Kind interagiert mit anderen Kindern und teilt Spielideen.',
    130: 'Die Kreativität blüht. Das Kind findet ungewöhnliche Lösungen und erfindet neue Spielvarianten.',
    131: 'Erste Interesse am Trockenwerden zeigt sich. Das Kind bemerkt, wenn es nass wird und kann das signalisieren.',
    132: 'Das Trockenwerden wird geübt. Das Kind lernt, sich rechtzeitig zu melden und nutzt die Toilette oder das Töpfchen.',
    133: 'Die Selbstständigkeit beim An- und Ausziehen wächst. Das Kind versucht, einfache Kleidungsstücke selbst zu handhaben.',
    134: 'Die Körperwahrnehmung wird präziser. Das Kind spürt früher, wenn es zur Toilette muss.',
    135: 'Das Trockenwerden festigt sich. Erfolge werden gefeiert und Rückschläge akzeptiert.',
    136: 'Die Selbstpflege wird selbstständiger. Das Kind möchte alleine essen, trinken und sich waschen.',
    137: 'Die Motorik wird geschickter. Feinmotorische Aufgaben wie Knöpfe oder Reißverschlüsse werden geübt.',
    138: 'Das Selbstvertrauen wächst. Das Kind ist stolz auf seine Erfolge und möchte alles alleine machen.',
    139: 'Die Vorbereitung auf die nächste Phase läuft. Das Fantasiedenken entwickelt sich weiter.',
    140: 'Letzte Woche vor der magischen Phase. Das Kind ist kreativ und selbstständig. Morgen beginnen möglicherweise Ängste vor Monstern!',
    141: 'Die Ruhe vor dem letzten großen Sprung. Das Kind ist ausgeglichen und kommunikativ. Noch 1 Woche bis zu irrationalen Ängsten!',
    
    153: 'Erste Woche nach der Warum-Phase. Das logische Denken festigt sich. Das Kind versteht immer mehr Zusammenhänge und kausale Beziehungen.',
    154: 'Die Komplexität der Sprache wächst. Mehrwort-Sätze, Nebensätze und logische Verknüpfungen werden verwendet.',
    155: 'Die Kindergarten-Reife zeigt sich. Das Kind kann sich länger konzentrieren, folgt Anleitungen und spielt kooperativ.',
    156: 'Abschluss der ersten drei Jahre! Das Kind ist ein kleiner Forscher mit eigener Persönlichkeit, starkem Willen und wunderbarer Neugierde.',
  };
  
  // Hilfsfunktion für grüne Wochen
  const getCalmDescription = (week) => {
    return CALM_DESCRIPTIONS[week] || 'Das Gehirn verarbeitet die jüngsten Entwicklungssprünge und festigt neue Fähigkeiten. Zeit zum Entspannen, Spielen und Genießen der Fortschritte.';
  };

  const descriptions_76_156 = {
    super: 'Maximaler Umbruch! Das Gehirn arbeitet auf Hochtouren. Das Kind versteht mehr als es ausdrücken kann - das ist frustrierend, aber unglaublich wichtig für die Entwicklung.',
    intense: 'Intensive Phase. Das Kind zeigt Regression, ist anhänglicher oder wütender als sonst. Das ist normal und zeigt, dass sich etwas Wichtiges im Gehirn verändert.',
    light: 'Unruhe beginnt. Das Kind spürt, dass etwas kommt und wird unruhiger, testet Grenzen. Die Intensität steigt noch an.',
    sunny: 'Durchbruch! Neue Fähigkeiten werden sichtbar. Das Kind ist stolz und entspannter. Genieße diese Erfolgsmomente.',
    calm: 'Konsolidierungsphase.',
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
  let description;
  if (color === 'calm') {
    description = getCalmDescription(week);
  } else if (week >= 76) {
    description = descriptions_76_156[color];
  } else {
    description = color === 'sunny' ? template?.sunnyPhase?.description :
                  color === 'intense' ? template?.stormPhase?.description :
                  color === 'transition' ? 'Die Vorbereitungsphase beginnt. Das Baby spürt, dass sich etwas verändert.' :
                  'Zeit zur Verarbeitung und Festigung.';
  }
  
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
// ============================================
// HAUPTKOMPONENTE
// ============================================
export default function TimelineSection({ currentWeek, onSelectWeek, babyName }) {
  const [selectedWeek, setSelectedWeek] = useState(currentWeek);
  const [showDetails, setShowDetails] = useState(false);
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
      {/* Aktuelle Woche Info - als klickbarer Button */}
      <motion.button
        onClick={() => {
          setSelectedWeek(currentWeek);
          setShowDetails(false);
        }}
        whileTap={{ scale: 0.98 }}
        whileHover={{ scale: 1.01 }}
        className={`w-full border-2 ${selectedWeek !== currentWeek ? 'border-[hsl(17,75%,56%)] ring-2 ring-[hsl(17,75%,56%)]/30' : currentColors.border} rounded-xl bg-white dark:bg-[hsl(210,25%,10%)] overflow-hidden transition-shadow hover:shadow-xl`}
      >
        <div className={`py-4 px-4 ${selectedWeek !== currentWeek ? 'bg-[hsl(17,75%,56%)]/5' : ''}`}>
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${currentColors.marker} text-white shadow-lg`}>
              <span className="text-lg font-bold">{currentWeek}</span>
            </div>
            <div className="flex-1 text-left">
              <p className="text-xs text-[hsl(17,75%,56%)] font-semibold uppercase tracking-wide">
                {selectedWeek !== currentWeek ? 'Aktuelle Woche' : 'Aktuelle Woche'}
              </p>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                {selectedWeek !== currentWeek ? 'Zurück zur aktuellen Woche' : selectedWeekData.title}
              </h3>
            </div>
            {selectedWeek !== currentWeek && (
              <div className="w-8 h-8 rounded-full bg-[hsl(17,75%,56%)] flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            )}
          </div>
        </div>
      </motion.button>

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
                  onClick={() => {
                    setSelectedWeek(week);
                    setShowDetails(false);
                  }}
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

                {/* Symptoms - nur in Storm/Super/Light Phasen */}
                {(selectedWeekData.state === 'storm' || selectedWeekData.state === 'super' || selectedWeekData.state === 'light') && selectedWeekData.symptoms?.length > 0 && (
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
                {/* Button: Details ausklappen - für ALLE Wochen */}
                <div className="pt-2">
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="w-full py-3 px-4 bg-[hsl(17,75%,56%)] hover:bg-[hsl(17,75%,46%)] text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <span>{showDetails ? 'Details schließen' : 'Hier im Detail anschauen'}</span>
                    <svg 
                      className={`w-4 h-4 transition-transform ${showDetails ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                
                {/* AUSKLAPPBARE DETAILANSICHT - für ALLE Wochen */}
                {showDetails && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4"
                  >
                    {/* ZUSTAND - nur Mögliche Anzeichen, da Phase oben schon angezeigt wird */}
                    {selectedWeekData.symptoms?.length > 0 && (
                      <div className={`p-4 rounded-xl ${selectedColors.bg} ${selectedColors.border} border`}>
                        <h4 className={`font-bold ${selectedColors.text} mb-2 flex items-center gap-2`}>
                          <CloudRain className="w-5 h-5" />
                          Mögliche Anzeichen
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedWeekData.symptoms.slice(0, 5).map((s, i) => (
                            <span key={i} className="px-2 py-0.5 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded text-xs">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* WARUM */}
                    <div className="p-4 rounded-xl bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-900/30 border border-violet-200 dark:border-violet-800">
                      <h4 className="font-bold text-violet-700 dark:text-violet-300 mb-2 flex items-center gap-2">
                        <Brain className="w-5 h-5" />
                        Was im Gehirn passiert
                      </h4>
                      <p className="text-[hsl(25,22%,16%)] dark:text-white text-sm leading-relaxed">
                        {selectedWeekData.why}
                      </p>
                    </div>

                    {/* LERNT */}
                    {selectedWeekData.abilities?.length > 0 && (
                      <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/30 border border-green-200 dark:border-green-800">
                        <h4 className="font-bold text-green-700 dark:text-green-300 mb-2 flex items-center gap-2">
                          <Lightbulb className="w-5 h-5" />
                          Neue Fähigkeiten
                        </h4>
                        <div className="space-y-1">
                          {selectedWeekData.abilities.slice(0, 4).map((a, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <span className="text-green-500">✓</span>
                              <span className="text-[hsl(25,22%,16%)] dark:text-white text-sm">{a}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* SCHLAF */}
                    <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-900/30 border border-indigo-200 dark:border-indigo-800">
                      <h4 className="font-bold text-indigo-700 dark:text-indigo-300 mb-2 flex items-center gap-2">
                        <Moon className="w-5 h-5" />
                        Schlaf
                      </h4>
                      <p className="text-[hsl(25,22%,16%)] dark:text-white text-sm leading-relaxed">
                        {SLEEP_DATA[selectedWeekData.week] || `Hier erscheint bald der Schlaf-Content für Woche ${selectedWeekData.week}...`}
                      </p>
                    </div>

                    {/* TUN */}
                    {selectedWeekData.actions?.length > 0 && (
                      <div className="p-4 rounded-xl bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-900/20 dark:to-rose-900/30 border border-rose-200 dark:border-rose-800">
                        <h4 className="font-bold text-rose-700 dark:text-rose-300 mb-2 flex items-center gap-2">
                          <Heart className="w-5 h-5" />
                          Das hilft jetzt
                        </h4>
                        <div className="space-y-2">
                          {selectedWeekData.actions.slice(0, 3).map((a, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <span className="flex-shrink-0 w-5 h-5 bg-[hsl(17,75%,56%)] text-white rounded-full flex items-center justify-center text-xs font-bold">
                                {i + 1}
                              </span>
                              <span className="text-[hsl(25,22%,16%)] dark:text-white text-sm">{a}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* ZURÜCK ZUR AKTUELLEN WOCHE - nur wenn NICHT aktuelle Woche */}
                    {selectedWeek !== currentWeek && (
                      <button
                        onClick={() => {
                          setSelectedWeek(currentWeek);
                          setShowDetails(false);
                        }}
                        className="w-full py-3 px-4 bg-[hsl(17,75%,56%)] hover:bg-[hsl(17,75%,46%)] text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                      >
                        <span>Zurück zur aktuellen Woche</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </button>
                    )}
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
