const fs = require('fs');

// Schlaf-Daten für alle 156 Wochen
const sleepData = {
  // Woche 1-12
  1: "Schlaf ist stark fragmentiert in Zyklen von 45 bis 60 Minuten ohne Tag-Nacht-Unterscheidung.",
  2: "Das Neugeborene schläft fast den gesamten Tag und wacht nur für kurze Trinkphasen auf.",
  3: "Die Wachphasen verlängern sich minimal, die Reizwahrnehmung nimmt leicht zu.",
  4: "Das Baby wird wacher und reagiert empfindlicher auf Umgebungsgeräusche beim Einschlafen.",
  5: "Massive Reizüberflutung durch geschärfte Sinne erschwert das Herunterfahren am Abend.",
  6: "Erste längere Wachperioden am Vormittag führen zu einem veränderten Schlafdruck am Nachmittag.",
  7: "Der Körper beginnt langsam, einen minimalen Rhythmus bei der Melatoninausschüttung zu finden.",
  8: "Das Erkennen von Mustern führt dazu, dass das Baby nachts im Halbschlaf seine Umgebung fixiert.",
  9: "Nächtliche Unruhe steigt, da das Gehirn visuelle Eindrücke intensiver verarbeitet.",
  10: "Erste Vorbereitungen auf fließende Bewegungen führen zu körperlicher Unruhe in den Leichtschlafphasen.",
  11: "Das Baby lernt, Übergänge zwischen Zuständen besser zu bewältigen, was das Einschlafen erleichtert.",
  12: "Einschlafrituale beginnen Wirkung zu zeigen, da das Gehirn regelmäßige Abläufe erkennt.",
  // 13-25
  13: "Eine Phase relativer Ruhe, in der viele Babys ihre bisher längsten Schlafphasen am Stück erleben.",
  14: "Das Verständnis für Ereignisse führt zu einer erhöhten Ablenkbarkeit beim abendlichen Stillen.",
  15: "Schlaf wird oft durch den Versuch unterbrochen, motorische Fähigkeiten nachts anzuwenden.",
  16: "Das Baby benötigt verstärkt Hilfe, um nach einem Schlafzyklus wieder in den nächsten zu finden.",
  17: "Die biologische Schlafarchitektur beginnt sich von zwei auf vier Schlafphasen umzustellen.",
  18: "Massive Schlafregression, da das Gehirn lernt, wie ein Erwachsener durch verschiedene Stadien zu zyklen.",
  19: "Der Höhepunkt des Umbruchs sorgt für häufiges Aufwachen alle 90 bis 120 Minuten.",
  20: "Langsame Stabilisierung der neuen Schlafstruktur.",
  21: "Physisches Wachstum kann nachts zu vermehrtem Hunger führen.",
  22: "Die Neugier lässt das Baby tagsüber Schläfchen kürzen, was zu Übermüdung führt.",
  23: "Das Gehirn verarbeitet nachts erste Ursache-Wirkung-Zusammenhänge.",
  24: "Körperliche Aktivität wird oft im Schlaf unbewusst geübt.",
  25: "Die Wahrnehmung von Entfernungen führt zu Verunsicherung beim Alleine-Einschlafen.",
  // 26-52
  26: "Akute Trennungsangst setzt ein, das Baby sucht nachts Rückversicherung durch Körperkontakt.",
  27: "Das Verständnis für Beziehungen lässt das Baby im Halbschlaf prüfen, ob die Bezugsperson da ist.",
  28: "Die Schlafqualität verbessert sich langsam.",
  29: "Erste Versuche des Robbens führen zu höherem Energieverbrauch und tieferem Schlaf.",
  30: "Das Gehirn konsolidiert motorische Fortschritte im Tiefschlaf.",
  31: "Eine ruhigere Phase, das Durchschlafen wird stabiler.",
  32: "Die kognitive Verarbeitung der Objektpermanenz lässt das Baby weniger panisch aufwachen.",
  33: "Vorbereitung auf den Kategorien-Sprung sorgt für erhöhte Traumphasen.",
  34: "Das Baby beginnt, tagsüber Reize in Gruppen zu ordnen.",
  35: "Nächtliche Unruhe steigt wieder an.",
  36: "Das Baby braucht beim Einschlafen mehr Zeit, um Eindrücke zu sortieren.",
  37: "Nächtliches Brabbeln stört die Tiefschlafphasen.",
  38: "Krabbelversuche führen dazu, dass das Baby nachts umherwandert.",
  39: "Der Bewegungsdrang lässt das Einschlafen langwierig werden.",
  40: "Eine erneute Welle der Trennungsangst macht das Schlafen im eigenen Bett unmöglich.",
  41: "Das Gehirn lernt Sequenzen zu verstehen.",
  42: "Das Bedürfnis nach Kontrolle über den Zubettgehen wird spürbar.",
  43: "Motorische Auslastung verbessert die Einschlafgeschwindigkeit.",
  44: "Die kognitive Last führt zu erhöhtem Aufwachrisiko.",
  45: "Das Baby verarbeitet nachts erste komplexe Tagesabläufe.",
  46: "Der Fokus auf Handlungsabfolgen macht das Baby ritualabhängig.",
  47: "Eine Konsolidierungsphase führt zu längeren Nachtschlafstrecken.",
  48: "Erste Stehversuche fordern das Gleichgewichtsorgan nachts heraus.",
  49: "Der Schlafbedarf am Tag sinkt auf zwei feste Nickerchen.",
  50: "Soziale Interaktionen werden nachts intensiver verarbeitet.",
  51: "Vorfreude auf den Geburtstag kann die Einschlafzeit verlängern.",
  52: "Viele Kinder erreichen eine Schlafstabilität von 6-8 Stunden am Stück."
};

// Restliche Wochen (53-156) mit Platzhaltern
for (let i = 53; i <= 156; i++) {
  if (!sleepData[i]) {
    sleepData[i] = `Schlaf-Content für Woche ${i} folgt...`;
  }
}

let content = fs.readFileSync('TimelineSection.jsx', 'utf8');

// Füge Schlaf-Daten am Ende der Datei hinzu (vor dem letzten })
const dataExport = `\n// SCHLAF-DATEN FÜR ALLE 156 WOCHEN\nconst SLEEP_DATA = ${JSON.stringify(sleepData, null, 2)};\n`;

// Finde die letzte schließende Klammer der Komponente
const lastBrace = content.lastIndexOf(');');
if (lastBrace > 0) {
  content = content.slice(0, lastBrace + 2) + dataExport + content.slice(lastBrace + 2);
}

fs.writeFileSync('TimelineSection.jsx', content);
console.log('Sleep data added successfully');
