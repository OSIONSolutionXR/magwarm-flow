# Template: add-signs-js

## Zweck

Node.js-Utility zum automatischen Einfügen von Signs-Texten in Template-Dateien basierend auf Wochenbereichen.

## Use Case

- Batch-Aktualisierung von Content-Texten in JavaScript-Dateien
- Automatisierte Content-Injection basierend auf definierten Bereichen
- Verarbeitung von Template-Arrays mit JSON-Inhalten

## Datei-Struktur

```
File: add-signs.js
Category: ROOT (Build-Utility)
Dependencies: node:fs
```

## Template

```javascript
const fs = require('fs');

// Lese Template-Datei
let content = fs.readFileSync('./{{TEMPLATE_PATH}}', 'utf8');

// Extrahiere Array aus Dateiinhalt
const startIdx = content.indexOf('[');
const endIdx = content.lastIndexOf(']');
const prefix = content.substring(0, startIdx);
const suffix = content.substring(endIdx + 1);
const arrayContent = content.substring(startIdx, endIdx + 1);

// Bereinige JSON (Kommentare entfernen)
const cleanJson = arrayContent
  .replace(/\/\/.*$/gm, '')          // Zeilenkommentare
  .replace(/\/\*[\s\S]*?\*\//g, '')   // Blockkommentare
  .replace(/,$/gm, '')                // Trailing commas
  .replace(/\n\s*\n/g, '\n');         // Leere Zeilen

// Parse Templates
let templates;
try {
  templates = JSON.parse(cleanJson);
} catch(e) {
  console.log('Parse error:', e.message);
  process.exit(1);
}

// Content-Daten (Key-Value nach Bereich)
const contentData = {
  {{RANGE_START}}: "{{CONTENT_TEXT_1}}",
  {{RANGE_START_2}}: "{{CONTENT_TEXT_2}}",
  // ... weitere Einträge
};

// Füge Content hinzu basierend auf Bereichen
// templates.forEach(t => {
//   for (let w = t.{{RANGE_FIELD}}; w <= t.{{RANGE_END_FIELD}}; w++) {
//     if (contentData[w]) {
//       t.{{TARGET_FIELD}} = contentData[w];
//       break; // Nur erste Übereinstimmung
//     }
//   }
// });

// Speichere aktualisierte Datei
const newContent = prefix + JSON.stringify(templates, null, 2) + suffix;
fs.writeFileSync('./{{OUTPUT_PATH}}', newContent);
console.log('Content injection completed');
```

## Variablen

| Variable | Beschreibung | Beispiel |
|----------|--------------|----------|
| `TEMPLATE_PATH` | Quelldatei mit Template-Array | `./src/pages/TEMPLATES.js` |
| `OUTPUT_PATH` | Zieldatei (meist gleich TEMPLATE_PATH) | `./src/pages/TEMPLATES.js` |
| `RANGE_FIELD` | Feldname für Bereichs-Start | `week` |
| `RANGE_END_FIELD` | Feldname für Bereichs-Ende | `weekEnd` |
| `TARGET_FIELD` | Feld für den injizierten Content | `signs` |

## Origin-Datei

- **Source:** `add-signs.js`
- **Project:** magwarm-flow
- **Category:** ROOT (Utility)

## Related

- Template-Struktur: Arrays mit week/weekEnd-Bereichen
- Ausführung: `node add-signs.js`
- Ziel: BabyDetailPage_TEMPLATES.js
