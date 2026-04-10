// TEMPLATE: SIGNS für jede einzelne Woche
// Fülle die Texte für jede Woche aus (1-156 Wochen)
// Diese Texte beschreiben die Anzeichen/Zeichen für jede Entwicklungswoche

export const WEEKLY_SIGNS = {
  // Woche 1-52: Baby-Phase (Säuglingsphase)
  1: 'TEXT FÜR WOCHE 1: Beschreibe die ersten Anzeichen der Woche - z.B. Schlafverhalten, Reflexe, erste Wahrnehmungen',
  2: 'TEXT FÜR WOCHE 2',
  3: 'TEXT FÜR WOCHE 3',
  4: 'TEXT FÜR WOCHE 4',
  5: 'TEXT FÜR WOCHE 5',
  6: 'TEXT FÜR WOCHE 6',
  7: 'TEXT FÜR WOCHE 7',
  8: 'TEXT FÜR WOCHE 8',
  9: 'TEXT FÜR WOCHE 9',
  10: 'TEXT FÜR WOCHE 10',
  // ... Weitere Wochen 11-52 (Baby-Phase)

  // Woche 53-104: Kleinkind-Phase 1
  53: 'TEXT FÜR WOCHE 53: Beschreibe die Anzeichen - z.B. Verhaltensänderungen, Entwicklungssprünge, emotionale Phasen',
  54: 'TEXT FÜR WOCHE 54',
  55: 'TEXT FÜR WOCHE 55',
  56: 'TEXT FÜR WOCHE 56',
  57: 'TEXT FÜR WOCHE 57',
  58: 'TEXT FÜR WOCHE 58',
  59: 'TEXT FÜR WOCHE 59',
  60: 'TEXT FÜR WOCHE 60',
  61: 'TEXT FÜR WOCHE 61',
  62: 'TEXT FÜR WOCHE 62',
  // ... Weitere Wochen 63-104 (Kleinkind-Phase 1)

  // Woche 105-156: Kleinkind-Phase 2
  105: 'TEXT FÜR WOCHE 105: Beschreibe die Anzeichen - z.B. Sprachentwicklung, Autonomie, soziales Verhalten',
  106: 'TEXT FÜR WOCHE 106',
  107: 'TEXT FÜR WOCHE 107',
  108: 'TEXT FÜR WOCHE 108',
  109: 'TEXT FÜR WOCHE 109',
  110: 'TEXT FÜR WOCHE 110',
  111: 'TEXT FÜR WOCHE 111',
  112: 'TEXT FÜR WOCHE 112',
  113: 'TEXT FÜR WOCHE 113',
  114: 'TEXT FÜR WOCHE 114',
  // ... Weitere Wochen 115-156 (Kleinkind-Phase 2)
};

/**
 * Gibt die Anzeichen (Signs) für eine bestimmte Woche zurück
 * @param {number} week - Die Wochennummer (1-156)
 * @returns {string|null} Der Text für die Woche oder null wenn nicht vorhanden
 */
export function getSignsForWeek(week) {
  return WEEKLY_SIGNS[week] || null;
}

// TEMPLATE HINWEISE:
// - Jede Woche braucht einen eigenen Text-Eintrag
// - Die Texte sollten die typischen Anzeichen/Zeichen beschreiben
// - Formulierungen sollten emotional und verständnisvoll sein
// - Muster: "Du bemerkst...", "Dein Kind zeigt...", "In dieser Woche..."
// - Themen je nach Phase: Schlaf, Nähebedürfnis, Motorik, Sprache, Autonomie
