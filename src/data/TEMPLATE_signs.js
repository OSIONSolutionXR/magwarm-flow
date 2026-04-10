// TEMPLATE: signs.js (oder weeklySigns.js)
// Description: Wöchentliche Beschreibungen der möglichen Anzeichen/Symptome
// Usage: Nutze getSignsForWeek(week) um die Beschreibung für eine bestimmte Woche zu erhalten

export const WEEKLY_SIGNS = {
  1: "string - Beschreibung für Woche 1",
  2: "string - Beschreibung für Woche 2",
  // ... Wochen 1-156
};

/**
 * @param {number} week - Wochennummer (1-156)
 * @returns {string|null} Beschreibung oder null
 */
export function getSignsForWeek(week) {
  return WEEKLY_SIGNS[week] || null;
}

export default WEEKLY_SIGNS;
