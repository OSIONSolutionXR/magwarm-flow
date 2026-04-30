// ABILITY TEXTS für jede einzelne Woche (1-156) - Neue Fähigkeiten (Lernt)
// Template für weeklyAbilities.js

export const WEEKLY_ABILITIES = {
  // Wochen 1-52: Erstes Jahr
  1: '[ENTWICKLUNGSTEXT für Woche 1 - Erste instinktive Reflexe, Suchen nach Brust, Überlebensreflexe]',
  2: '[ENTWICKLUNGSTEXT für Woche 2 - Augenkoordination, Lichtquellen fixieren, Bewegungen koordinierter]',
  3: '[ENTWICKLUNGSTEXT für Woche 3 - Erste Laute, Bauchlage, Kopf anheben]',
  // ... Weitere Wochen 4-52

  // Wochen 53-104: Zweites Jahr
  53: '[ENTWICKLUNGSTEXT für Woche 53 - Verständnis für verschiedene Wege zum Ziel, gezielter Einsatz von Gegenständen]',
  54: '[ENTWICKLUNGSTEXT für Woche 54 - Starke Nachahmung, symbolisches Spiel mit Alltagsgegenständen]',
  // ... Weitere Wochen 55-104

  // Wochen 105-156: Drittes Jahr
  105: '[ENTWICKLUNGSTEXT für Woche 105 - Hohe Türme bauen, stabile Konstruktionen, konzentriertes Spiel]',
  106: '[ENTWICKLUNGSTEXT für Woche 106 - Drei-Wort-Sätze, zeitliche Abfolgen schildern]',
  // ... Weitere Wochen 107-156
};

/**
 * Gibt den Entwicklungstext für eine bestimmte Woche zurück
 * @param {number} week - Wochennummer (1-156)
 * @returns {string|null} Entwicklungstext oder null wenn nicht vorhanden
 */
export function getAbilityForWeek(week) {
  return WEEKLY_ABILITIES[week] || null;
}

// TEMPLATE INFO:
// - Struktur: Objekt mit Wochennummern (1-156) als Keys
// - Values: Beschreibende Texte über neue Fähigkeiten/Entwicklungsschritte
// - Sprache: Deutsch, emotional-anmutend, elternorientiert
// - Stil: Beschreibend, ermutigend, herzerwärmend
// - Inhalt pro Woche: Motorik, Kognition, Soziales, Sprache
