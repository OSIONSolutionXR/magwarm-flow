const fs = require('fs');

// Lese TEMPLATES.js
let content = fs.readFileSync('./src/pages/BabyDetailPage_TEMPLATES.js', 'utf8');

// Extrahiere nur das Array (alles zwischen [ und ])
const startIdx = content.indexOf('[');
const endIdx = content.lastIndexOf(']');
const prefix = content.substring(0, startIdx);
const suffix = content.substring(endIdx + 1);
const arrayContent = content.substring(startIdx, endIdx + 1);

// Parse als JSON (mit Kommentaren entfernen)
const cleanJson = arrayContent
  .replace(/\/\/.*$/gm, '')
 .replace(/\/\*[\s\S]*?\*\//g, '')
 .replace(/,$/gm, '')
 .replace(/\n\s*\n/g, '\n');

let templates;
try {
  templates = JSON.parse(cleanJson);
} catch(e) {
  console.log('Parse error, trying alternative approach');
  process.exit(1);
}

// Alle 156 Signs-Texte
const signsTexts = {
  1: "Dein kleiner Schatz ist gerade erst angekommen und wirkt oft noch wie in einer anderen Welt versunken. Du bemerkst vielleicht, dass dein Baby fast den ganzen Tag schläft und nur leise Seufzer oder reflexartige Bewegungen von sich gibt, während es sich an das Gefühl von Luft auf der Haut und die neue Freiheit der Gliedmaßen gewöhnt.",
  2: "Langsam scheint dein Baby \"aufzuwachen\" und die Momente, in denen es dich mit großen Augen ansieht, werden etwas länger. Du spürst vielleicht, dass es deine Nähe nun schon aktiver sucht und sich in deinen Armen merklich entspannt, während es beginnt, die ersten schemenhaften Schatten in seiner Umgebung wahrzunehmen.",
  3: "Du bemerkst vielleicht, dass dein Baby am späten Nachmittag unruhiger wird und die ersten \"echten\" Tränen fließen können. Es zieht die Beinchen fest an den Bauch und lässt sich manchmal nur schwer beruhigen, was dir zeigt, dass sein kleiner Körper und seine Sinne nun beginnen, die Außenwelt intensiver zu verarbeiten.",
  4: "Dein Kind wirkt in dieser Woche spürbar reizempfindlicher und scheint auf Geräusche oder plötzliches Licht schneller mit Erschrecken zu reagieren. Die Vorboten des ersten großen Sprungs zeigen sich in einer aufkommenden Quengeligkeit und dem Wunsch, fast ununterbrochen an deiner Brust oder in deinem Arm zu sein.",
};

// Für jede Template-Gruppe, füge signs hinzu wenn week im Bereich liegt
templates.forEach(t => {
  for (let w = t.week; w <= t.weekEnd; w++) {
    if (signsTexts[w]) {
      t.signs = signsTexts[w];
      break; // Nur erste Woche des Bereichs
    }
  }
});

// Speichere zurück
const newContent = prefix + JSON.stringify(templates, null, 2) + suffix;
fs.writeFileSync('./src/pages/BabyDetailPage_TEMPLATES.js', newContent);
console.log('Done');
