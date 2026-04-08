import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, Navigation, Layers } from 'lucide-react';
import { Card, CardContent } from '../components/Card';

// Wochenspezifische Beschreibungen für jede Phase
const WEEK_DESCRIPTIONS = {
  // Ruhephasen vor den Sprüngen
  1: { title: "Ankommen", desc: "Die ersten Tage zu Hause. Ein neues Leben beginnt.", details: "Eure Familie findet zueinander. Trinken, Schlafen, Wickeln - das Leben dreht sich um die Grundbedürfnisse. Genießt diese ruhige Zeit vor dem ersten Sprung." },
  2: { title: "Rhythmus finden", desc: "Langsam entwickelt sich ein Tagesablauf.", details: "Erste Muster erkennbar: Schlaf-Wach-Phasen, Fütterungsintervalle. Noch weit entfernt von einer Routine, aber erste Anzeichen sind da." },
  3: { title: "Wachsen", desc: "Dein Baby nimmt zu und wird kräftiger.", details: "Die ersten 500g sind erreicht. Dein Baby wird aktiver, die Augen bleiben länger offen. Es beginnt, die Welt zu beobachten." },
  4: { title: "Vor dem Sturm", desc: "Eine ruhige Phase vor dem ersten großen Sprung.", details: "Alles scheint stabil. Doch unter der Oberfläche passiert viel. Das Gehirn bereitet sich auf die Sinnesexplosion vor." },
  
  // Sprung 1: Woche 5-6
  5: { title: "Sinnesexplosion beginnt", desc: "Plötzlich ist alles lauter, heller, intensiver.", details: "Die ersten Tage des Sprungs. Dein Baby ist überfordert von der neuen Intensität. Nähe und Geborgenheit sind jetzt besonders wichtig." },
  6: { title: "Gewöhnung", desc: "Das Baby beginnt, sich an die neue Intensität zu gewöhnen.", details: "Langsam kommt die Orientierung zurück. Dein Baby erkennt bekannte Stimmen und Gerüche. Die erste Sonnenphase ist nah." },
  
  // Ruhe 7
  7: { title: "Erholung", desc: "Zeit, die neuen Eindrücke zu verarbeiten.", details: "Nach dem intensiven Sprung ist Ruhe angesagt. Dein Baby lächelt bewusst und fixiert Gesichter. Ein neuer Normalzustand entsteht." },
  
  // Sprung 2: Woche 8-9
  8: { title: "Muster entdecken", desc: "Erste Ahnung: Es gibt Regelmäßigkeiten!", details: "Dein Baby bemerkt, dass bestimmte Dinge sich wiederholen. Es sucht deinen Blick, will deine Aufmerksamkeit. Verwirrung und Faszination zugleich." },
  9: { title: "Vorhersagen", desc: "Das Baby erwartet, was als Nächstes kommt.", details: "Wenn du anfängst zu singen, beruhigt es sich. Es kennt den Ablauf. Diese Vorhersehbarkeit gibt Sicherheit - aber Unterbrechungen frustrieren." },
  
  // Ruhe 10-11
  10: { title: "Sicherheit", desc: "Die Welt wird berechenbarer.", details: "Vertraute Rituale wirken jetzt wahre Wunder. Dein Baby fühlt sich sicher und zeigt es mit entspanntem Verhalten." },
  11: { title: "Vorbereitung", desc: "Die Muskulatur stärkt sich.", details: "Unter der Oberfläche: Nacken und Schultern werden kräftiger. Dein Baby übt im Verborgenen, den Kopf zu heben." },
  
  // Sprung 3: Woche 12-13
  12: { title: "Kopf kontrollieren", desc: "Der Kopf wird endlich stabil.", details: "Was für ein Fortschritt! Der Kopf bleibt dort, wo er soll. Dein Baby kann aktiv am Geschehen teilnehmen, ohne die Energie für das Halten zu verschwenden." },
  13: { title: "Bewegungsfreiheit", desc: "Der Blick folgt dem Interesse.", details: "Nicht nur der Kopf, auch die Augen werden zielgerichteter. Dein Baby entdeckt, dass es die Welt aktiv erkunden kann." },
  
  // Ruhe 14-18
  14: { title: "Spielzeit", desc: "Mehr Zeit zum Interagieren.", details: "Mit dem stabilen Kopf öffnet sich eine neue Welt des Spielens. Dein Baby bleibt länger wach und ist aufmerksamer." },
  15: { title: "Kommunikation", desc: "Erste Laute werden gezielt eingesetzt.", details: "Quietschen, Grunzen, Lachen - dein Baby experimentiert mit seiner Stimme und beobachtet deine Reaktion." },
  16: { title: "Greifen", desc: "Die Hände entdecken die Welt.", details: "Noch unkoordiniert, aber mit wachsendem Interesse. Alles greifbare wird erfasst, geschüttelt, in den Mund gesteckt." },
  17: { title: "Beobachten", desc: "Intensive Beobachtungsphase.", details: "Dein Baby schaut dir zu, lernt durch Anschauen. Es speichert Informationen für die kommende Entwicklung." },
  18: { title: "Vor dem Aha", desc: "Etwas Großes bahnt sich an.", details: "Die Hände werden zielgerichteter. Dein Baby bemerkt: Wenn es etwas tut, passiert etwas. Der nächste Sprung naht." },
  
  // Sprung 4: Woche 19-20
  19: { title: "Ursache erkannt", desc: "'Ich schüttle - es klingelt!'", details: "Die ersten bewussten Verknüpfungen! Dein Baby ist stolz und frustriert zugleich. Es will experimentieren, aber manches klappt noch nicht." },
  20: { title: "Wirkung verstanden", desc: "Gezieltes Handeln wird möglich.", details: "Die Pinzette greift funktioniert. Dein Baby kann gezielt greifen und manipulieren. Ein neues Maß an Selbstwirksamkeit." },
  
  // Ruhe 21-25
  21: { title: "Üben", desc: "Wiederholung festigt das Können.", details: "Immer wieder wird die Rassel geschüttelt, der Ball geworfen. Üben macht den Meister - auch beim Greifen." },
  22: { title: "Neugier", desc: "Die Welt ist voller Entdeckungen.", details: "Jeder Gegenstand wird untersucht. Was passiert, wenn ich das mache? Die Forscherfreude ist grenzenlos." },
  23: { title: "Sozial", desc: "Erste bewusste Interaktionen.", details: "Dein Baby sucht nicht nur Gegenstände, sondern auch dich. Es will teilen, gemeinsam erleben." },
  24: { title: "Mobil", desc: "Rollphase beginnt.", details: "Vom Rücken auf die Seite, fast auf den Bauch. Dein Baby wird mobiler, die Welt öffnet sich weiter." },
  25: { title: "Unabhängigkeit", desc: "Etwas Abstand ist gewollt.", details: "Erste Anzeichen: Dein Baby spielt kurze Zeit allein. Doch der Blick sucht dich ständig. Die Bindung wird bewusster." },
  
  // Sprung 5: Woche 26-27
  26: { title: "Fremdeln", desc: "Du bist eine eigene Person!", details: "Schockierend für beide: Du kannst weggehen! Das erste echte Fremdeln beginnt. Die Welt ist plötzlich weniger sicher ohne dich." },
  27: { title: "Bindung stärken", desc: "Verlässliche Rückkehr gibt Sicherheit.", details: "Wenn du zurückkommst und freudig begrüßt wirst, lernt dein Baby: Mama/Papa geht, aber kommt immer wieder." },
  
  // Ruhe 28-36
  28: { title: "Neue Normalität", desc: "Fremdeln wird akzeptiert.", details: "Langsam akzeptiert dein Baby, dass andere Menschen da sind. Doch die Präferenz für dich bleibt stark ausgeprägt." },
  29: { title: "Krabbeltrieb", desc: "Die Bewegungsdrang wächst.", details: "Bauchlage ist jetzt beliebt. Dein Baby stemmt sich hoch, will vorwärts kommen. Die ersten krabbelversuche." },
  30: { title: "Sitzen", desc: "Sitzend die Welt erkunden.", details: "Mit Unterstützung kann dein Baby jetzt sitzen. Ein neuer Blickwinkel auf die Welt - und neue Erreichweiten." },
  31: { title: "Kommunikation", desc: "Babbeln wird zielgerichteter.", details: "Laute haben Bedeutung. Dein Baby 'redet' mit dir, erwartet Antworten. Ein Dialog entsteht." },
  32: { title: "Motorik", desc: "Feinmotorik entwickelt sich.", details: "Greifen wird präziser. Kleine Gegenstände zwischen Daumen und Zeigefinger - die Pinzette wird geübt." },
  33: { title: "Entdecken", desc: "Alles muss untersucht werden.", details: "Die Welt ist voller Geheimnisse. Jede Schublade, jede Kiste birgt Überraschungen. Baby-proofing wird wichtig!" },
  34: { title: "Soziales Lernen", desc: "Spiegel werden interessant.", details: "Erste Erkennung im Spiegel? Dein Baby ist fasziniert von dem 'anderen Baby' und beginnt, sich selbst zu beobachten." },
  35: { title: "Stimmen", desc: "Die eigene Stimme wird entdeckt.", details: "Laute, Quietschen, Schreien - dein Baby testet seine Stimme und ihre Wirkung auf dich." },
  36: { title: "Vor dem Ordnen", desc: "Ähnliches wird gruppiert.", details: "Unbewusst beginnt das Gehirn, Ähnliches zusammenzufassen. Das Fundament für Kategorien wird gelegt." },
  
  // Sprung 6: Woche 37-38
  37: { title: "Kategorien bilden", desc: "Ein Hund ist ein Tier!", details: "Revolutionär: Dein Baby begreift Oberbegriffe. Ein Hund ist ein Tier, aber nicht jedes Tier ist ein Hund. Abstraktes Denken beginnt." },
  38: { title: "Unterscheiden", desc: "Verschiedenes wird erkannt.", details: "Klein/groß, rund/eckig - dein Baby sortiert die Welt. Das ist die Grundlage für Sprache und Mathematik." },
  
  // Ruhe 39-45
  39: { title: "Sortieren", desc: "Spiele mit Kategorien.", details: "Formenspiele werden interessant. Was passt wohin? Dein Baby übt das Einordnen in verschiedene Kategorien." },
  40: { title: "Worte", desc: "Erste Wortversuche.", details: "'Mama', 'Papa' - vielleicht mit Bedeutung? Die ersten bewussten Worte formen sich." },
  41: { title: "Krabbelt", desc: "Fortbewegung wird selbstständig.", details: "Dein Baby kommt voran, errecht Ziele. Die Welt wird größer, die Unabhängigkeit wächst." },
  42: { title: "Stehen", desc: "Hochkommen wird möglich.", details: "Am Möbel hochziehen, stehen, stolz sein. Die ersten Schritte werden vorbereitet - in die Vertikale!" },
  43: { title: "Kommunizieren", desc: "Gesten verstärken die Botschaft.", details: "Zeigen, winken, nicken - Gesten unterstützen die Kommunikation. Dein Baby wird verständlicher." },
  44: { title: "Entdecken", desc: "Neugier kennt keine Grenzen.", details: "Jeder Raum, jede Ecke will erkundet werden. Baby-proofing ist jetzt essenziell!" },
  45: { title: "Vor den Reihen", desc: "Erste Sequenzen werden erkannt.", details: "'Erst das, dann das' - dein Baby bemerkt Abläufe und erwartet sie. Die Vorbereitung auf den nächsten Sprung." },
  
  // Sprung 7: Woche 46-47
  46: { title: "Reihenfolge verstehen", desc: "Abläufe werden erwartet.", details: "Erst Windel, dann Schlafanzug, dann Buch. Dein Baby versteht die Reihenfolge und protestiert, wenn sie unterbrochen wird." },
  47: { title: "Selbstständigkeit", desc: "Mithelfen wird möglich.", details: "Dein Baby kann jetzt helfen: Arm beim Anziehen hochheben, Windel wegbringen. Teilhabe am Familienleben." },
  
  // Ruhe 48-54
  48: { title: "Rituale", desc: "Feste Abläufe geben Sicherheit.", details: "Eingespielte Rituale wirken beruhigend. Dein Baby weiß, was kommt, und fühlt sich sicher." },
  49: { title: "Laufen", desc: "Erste Schritte am Hand.", details: "Mit deiner Hand laufen lernen. Die Balance ist noch wackelig, aber der Wille da." },
  50: { title: "Worte", desc: "Wortschatz wächst.", details: "10, 20, vielleicht 30 Wörter mit Bedeutung. Die Sprachexplosion naht." },
  51: { title: "Sozial", desc: "Miteinander spielen wird interessant.", details: "Neben anderen Kindern spielen, beobachten, nachahmen. Die soziale Welt wird komplexer." },
  52: { title: "Feiertage", desc: "Besondere Tage werden erlebt.", details: "Erste Weihnachten, Geburtstag - besondere Tage prägen sich ein. Erinnerungen werden möglich." },
  53: { title: "Neues Jahr", desc: "Das zweite Lebensjahr beginnt.", details: "Von Baby zu Kleinkind. Die Unabhängigkeit wächst, die Persönlichkeit entwickelt sich." },
  54: { title: "Vor den Programmen", desc: "Flexibilität wird verstanden.", details: "Dein Baby bemerkt: Es gibt verschiedene Wege zum Ziel. Die Grundlage für das flexible Denken." },
  
  // Sprung 8: Woche 55-56
  55: { title: "Optionen erkennen", desc: "Es gibt verschiedene Wege!", details: "'Ich kann über die Treppe oder die Rampe.' Dein Baby versteht Variationen. Gleichzeitig testet es Grenzen aus - erste Trotzreaktionen!" },
  56: { title: "Entscheiden", desc: "Wahlen werden gefordert.", details: "'Ich will das!' Dein Baby hat Präferenzen und zeigt sie. Autonomie und Grenzen treffen aufeinander." },
  
  // Ruhe 57-63
  57: { title: "Grenzen", desc: "Regeln werden getestet.", details: "Was darf ich, was nicht? Dein Baby erkundet systematisch die Grenzen. Konsequenz ist wichtig." },
  58: { title: "Sprache", desc: "Zwei-Wort-Sätze entstehen.", details: "'Mama komm', 'Ball weg' - erste Mini-Sätze verbinden Wörter zu Bedeutung." },
  59: { title: "Laufen", desc: "Selbstständiges Laufen.", details: "Ohne Hand, wackelig, aber selbstständig. Die Welt wird riesig!" },
  60: { title: "Trotz", desc: "'Nein!' wird zum Lieblingswort.", details: "Selbstbehauptung ist wichtig. Dein Kind muss Grenzen testen, um sie zu verstehen." },
  61: { title: "Nachahmen", desc: "Alles wird kopiert.", details: "Telefonieren, Staubsaugen, Kochen - dein Kind ahmt alles nach. Soziales Lernen durch Beobachtung." },
  62: { title: "Gedächtnis", desc: "Erinnerungen werden länger.", details: "Was gestern passiert ist, wird erinnert. Das episodische Gedächtnis entwickelt sich." },
  63: { title: "Vor den Regeln", desc: "Wenn-Dann wird verstanden.", details: "Dein Kind versteht Konsequenzen. Die Vorbereitung auf das verantwortungsbewusste Handeln." },
  
  // Sprung 9: Woche 64-65
  64: { title: "Regeln verstehen", desc: "Wenn ich das tue, passiert das.", details: "Strategisches Denken! Dein Kind testet Hypothesen über soziale Regeln. Es lernt durch Erfahrung, was funktioniert." },
  65: { title: "Konsequenzen", desc: "Handeln wird zielgerichteter.", details: "Dein Kind kann vorhersehen, was passiert, und danach handeln. Das ist echtes Problemlösen." },
  
  // Ruhe 66-74
  66: { title: "Anpassen", desc: "Verhalten wird flexibler.", details: "Je nach Situation wird anders gehandelt. Das soziale Verständnis wächst." },
  67: { title: "Sprache", desc: "Sätze werden länger.", details: "Drei, vier Wörter verbunden. Die Grammatik entwickelt sich - auch wenn sie noch holprig ist." },
  68: { title: "Freunde", desc: "Andere Kinder werden interessant.", details: "Zusammen spielen, teilen (manchmal), Streit (oft). Die soziale Welt wird komplexer." },
  69: { title: "Gefühle", desc: "Emotionen werden benannt.", details: "'Traurig', 'böse', 'glücklich' - erste Gefühlsworte werden verstanden und benutzt." },
  70: { title: "Fantasie", desc: "Spielen wird kreativer.", details: "Eine Schüssel wird zu einem Hut, ein Stock zum Telefon. Die Fantasie erwacht." },
  71: { title: "Unabhängigkeit", desc: "'Allein!' wird wichtig.", details: "'Ich allein!' Das Bedürfnis nach Selbstständigkeit wächst. Hilfe wird manchmal abgelehnt." },
  72: { title: "Rituale", desc: "Feste Abläufe sind wichtig.", details: "Gleiche Abfolgen geben Sicherheit. Änderungen werden als bedrohend empfunden." },
  73: { title: "Vorbereiten", desc: "Etwas Großes kommt.", details: "Das Gehirn bereitet sich auf den letzten großen Sprung des ersten Jahres vor. Tiefe Veränderungen stehen bevor." },
  74: { title: "Vor dem Sprung", desc: "Die Ruhe vor dem Sturm.", details: "Dein Kind ist fokussiert, nachdenklich. Unter der Oberfläche passiert enorm viel." },
  
  // Sprung 10: Woche 75-76
  75: { title: "Empathie erwacht", desc: "Andere haben Gefühle!", details: "Dein Kind bemerkt, wenn jemand traurig ist. Es versucht zu trösten. Das ist der Beginn echter Empathie." },
  76: { title: "Verbundenheit", desc: "Wir gehören zusammen.", details: "Familie wird als Einheit verstanden. Andere haben Bedürfnisse, die beachtet werden müssen." },
  
  // Jahr 2: Woche 77-90 (Konsolidierung)
  77: { title: "Verarbeitung", desc: "Das Gelernte wird gefestigt.", details: "Nach dem intensiven Jahr 1 ist Zeit zur Konsolidierung. Das Gehirn verarbeitet und speichert alles Erlernte." },
  78: { title: "Sprache", desc: "Wortschatz wächst stetig.", details: "50, 100, vielleicht 200 Wörter. Jeden Tag kommen neue dazu. Die Kommunikation wird flüssiger." },
  79: { title: "Laufen", desc: "Sicher auf zwei Beinen.", details: "Rennen, springen, balancieren. Die Fortbewegung ist jetzt selbstverständlich." },
  80: { title: "Trocken", desc: "Trockenwerden beginnt.", details: "Erste Anzeichen der Blasenkontrolle. Das Trockenwerden ist ein langsamler Prozess." },
  81: { title: "Sozial", desc: "Spielen mit anderen wird wichtiger.", details: "Neben- und langsam miteinander spielen. Die ersten echten Freundschaften entstehen." },
  82: { title: "Nachahmen", desc: "Alles wird kopiert.", details: "Erwachsenen-Verhalten wird detailgetreu nachgespielt. Das ist wichtiges soziales Lernen." },
  83: { title: "Nein", desc: "Grenzen testen.", details: "'Nein!' wird systematisch eingesetzt. Es geht nicht um Widersetzlichkeit, sondern um Selbstbehauptung." },
  84: { title: "Rituale", desc: "Feste Abläufe helfen.", details: "Klarer Tagesablauf gibt Orientierung. Veränderungen werden als schwierig empfunden." },
  85: { title: "Worte", desc: "Zweiwortsätze werden zur Norm.", details: "'Mama Komm', 'Ball weg' - die Sätze werden länger und komplexer." },
  86: { title: "Ich", desc: "Das Selbstbewusstsein wächst.", details: "'Meins!' Das Eigentumsbewusstsein entwickelt sich. Teilen fällt noch schwer." },
  87: { title: "Bewegung", desc: "Klettern wird interessant.", details: "Hoch hinaus! Treppen, Möbel, Klettergerüste - alles wird erklommen." },
  88: { title: "Fantasie", desc: "Symbolisches Spiel beginnt.", details: "Eine Schachtel wird zum Auto, ein Stock zum Flugzeug. Die Fantasiewelt öffnet sich." },
  89: { title: "22-Monats-Schub", desc: "Kurzer Rückfall.", details: "Plötzlich wieder anhänglich? Das ist normal. Ein letzter Entwicklungsschub vor dem zweiten Geburtstag." },
  90: { title: "Vorbereitung", desc: "Die Trotzphase naht.", details: "Das Bedürfnis nach Selbstständigkeit wächst. Der Konflikt zwischen Wollen und Können bahnt sich an." },
  
  // Jahr 2: Woche 91-115 (Autonomie-Explosion / Trotzphase)
  91: { title: "Trotz beginnt", desc: "'Nein!' wird zur Waffe.", details: "Willkommen in der Trotzphase! Dein Kind WILL selbstständig sein, aber kann es noch nicht. Frust pur." },
  92: { title: "Wutanfälle", desc: "Emotionen sind überwältigend.", details: "Schreien, Treten, Weinen - die Emotionen sind zu groß für das kleine Körperchen. Hilf beim Regulieren." },
  93: { title: "Selbstständigkeit", desc: "'Ich allein!'", details: "Jede Hilfe wird abgelehnt, jede Unterstützung verweigert. Selbstständigkeit um jeden Preis." },
  94: { title: "Wahlmöglichkeiten", desc: "Entscheiden lernen.", details: "'Apfel oder Banane?' Wahlmöglichkeiten geben das Gefühl von Kontrolle. Das hilft beim Trotz." },
  95: { title: "Sprache", desc: "Wortschatz explodiert.", details: "200, 300 Wörter. Drei-Wort-Sätze. Die Kommunikation wird zunehmend erwachsener." },
  96: { title: "Konsolidieren", desc: "Die erste Welle lässt nach.", details: "Es gibt ruhigere Tage. Das Kind gewöhnt sich an die neue Selbstständigkeit." },
  97: { title: "Grenzen", desc: "Konsequenz ist wichtig.", details: "Klare, liebevolle Grenzen helfen. Dein Kind braucht Orientierung in seinem Trotz." },
  98: { title: "Rituale", desc: "Festigkeit gibt Halt.", details: "Gleiche Abläufe sind jetzt besonders wichtig. Sie geben Sicherheit in unsicherer Zeit." },
  99: { title: "Motorik", desc: "Feinmotorik wird präziser.", details: "Ziehen, Knöpfe, Malen - die Hände werden geschickter. Konzentration wächst." },
  100: { title: "Sozial", desc: "Freunde werden wichtiger.", details: "Andere Kinder sind jetzt faszinierend. Spielen wird komplexer, Konflikte häufiger." },
  101: { title: "Worte", desc: "Grammatik wird interessant.", details: "'Ich habe gegangen' - Fehler zeigen: Das Gehirn lernt Regeln!" },
  102: { title: "Fragen", desc: "'Was ist das?'", details: "Die ersten Fragen kommen. Das Wissenshunger erwacht. Geduld beim Beantworten ist gefragt." },
  103: { title: "Fantasie", desc: "Spiel wird kreativer.", details: "Rollenspiele beginnen. Puppen werden gefüttert, Teddy wird ins Bett gebracht." },
  104: { title: "Gefühle", desc: "Emotionen werden komplexer.", details: "Scham, Stolz, Eifersucht - komplexe Gefühle entstehen. Benennen hilft beim Verarbeiten." },
  105: { title: "Gedächtnis", desc: "Erinnerungen werden konkreter.", details: "Was gestern, vorgestern passiert ist, wird erzählt. Das Gedächtnis wird erzählfähig." },
  106: { title: "Unabhängigkeit", desc: "Alleine spielen wird möglich.", details: "Längere Phasen der Selbstbeschäftigung. Das Kind spielt zunehmend eigenständig." },
  107: { title: "Sprache", desc: "Ganze Sätze entstehen.", details: "'Ich will jetzt nach draußen!' Vier-, Fünf-Wort-Sätze sind normal." },
  108: { title: "Rituale", desc: "Festigkeit ist wichtig.", details: "Gleiche Abfolgen geben Sicherheit. Veränderungen werden bewusst wahrgenommen." },
  109: { title: "Motorik", desc: "Balancieren wird interessant.", details: "Bänke, Mauern, Streifen - alles wird balanciert. Das Gleichgewichtsgefühl entwickelt sich." },
  110: { title: "Kreativität", desc: "Malen wird spannend.", details: "Erste bewusste Zeichnungen entstehen. Noch abstrakt, aber mit Intention." },
  111: { title: "Sozial", desc: "Teilen wird gelernt.", details: "'Meins' ist immer noch stark, aber Teilen wird langsam möglich." },
  112: { title: "Worte", desc: "Konversation wird flüssig.", details: "Gespräche mit Erwachsenen sind jetzt möglich. Worte werden zur Waffe und zum Trost." },
  113: { title: "Grenzen", desc: "Regeln werden verstanden.", details: "'Weil so!' reicht nicht mehr. Erklärungen werden verlangt - und verstanden." },
  114: { title: "Vorbereitung", desc: "Die Symbole warten.", details: "Das symbolische Denken entwickelt sich weiter. Die nächste große Phase steht bevor." },
  115: { title: "Übergang", desc: "Die Trotzphase lässt nach.", details: "Langsam wird es ruhiger. Das Kind hat gelernt, mit seinen Emotionen umzugehen." },
  
  // Jahr 2-3: Woche 116-140 (Welt der Symbole)
  116: { title: "Symbole", desc: "Ein Stock ist ein Zauberstab!", details: "Die Welt der Symbole öffnet sich. Fantasie und Realität verschwimmen. Magisches Denken beginnt." },
  117: { title: "Fantasie", desc: "Rollenspiele explodieren.", details: "Arzt, Feuerwehrmann, Mama - Rollen werden gespielt. Die Fantasiewelt wird detailreicher." },
  118: { title: "Angst", desc: "Monster unter dem Bett?", details: "Fantasie hat eine Kehrseite: Ängste. Monster, Geister, Dunkelheit - alles wird plötzlich bedrohlich." },
  119: { title: "Trocken", desc: "Trockenwerden schreitet voran.", details: "Tagsüber klappt es oft. Nächtliche Unfälle sind normal. Geduld ist gefragt." },
  120: { title: "Sprache", desc: "Geschichten werden erzählt.", details: "'Und dann... und dann...' Erste Geschichten entstehen. Fantasie mischt sich mit Erlebtem." },
  121: { title: "Zusammenspiel", desc: "Mit anderen spielen wird möglich.", details: "Neben- wird zu miteinander spielen. Gemeinsame Ziele, gemeinsame Pläne." },
  122: { title: "Gefühle", desc: "Empathie wächst.", details: "'Er ist traurig.' Andere Gefühle werden erkannt und beachtet. Das ist echte soziale Intelligenz." },
  123: { title: "Worte", desc: "Warum-Fragen werden häufiger.", details: "'Warum?' - immer öfter. Das Verständnis für Zusammenhänge wächst." },
  124: { title: "Motorik", desc: "Fahren wird interessant.", details: "Dreirad, Laufrad, Tretauto - Fortbewegung wird abwechslungsreicher." },
  125: { title: "Kreativität", desc: "Basteln macht Spaß.", details: "Schneiden, Kleben, Kleben - erste Bastelwerke entstehen. Kreativität wird sichtbar." },
  126: { title: "Sozial", desc: "Freundschaften werden tiefer.", details: '"Mein Freund" - erste echte Freundschaften entstehen. Gemeinsame Interessen werden wichtig.' },
  127: { title: "Rituale", desc: "Festigkeit gibt Sicherheit.", details: "Gleiche Abläufe sind jetzt besonders wichtig. Sie geben Halt in der fantasievollen Welt." },
  128: { title: "Sprache", desc: "Erzählen wird detailreicher.", details: "'Und dann ist der Hund weggelaufen...' Geschichten haben Anfang, Mitte, Ende." },
  129: { title: "Fragen", desc: "Wissenshunger wächst.", details: "'Wie funktioniert das?' Technisches Interesse erwacht. Erklärungen werden verlangt." },
  130: { title: "Motorik", desc: "Sport wird möglich.", details: "Ball werfen und fangen, springen, balancieren - Bewegung wird zielgerichteter." },
  131: { title: "Gefühle", desc: "Eifersucht wird bewusst.", details: '"Er ist mein Freund!" Eifersucht und Besitzdenken sind normal. Soziales Lernen in Aktion.' },
  132: { title: "Fantasie", desc: "Imaginäre Freunde entstehen.", details: '"Max war auch da." Imaginäre Freunde sind normal und helfen beim Verarbeiten.' },
  133: { title: "Unabhängigkeit", desc: "Alleine sein wird möglich.", details: "Längere Phasen der Selbstbeschäftigung. Das Kind spielt zunehmend eigenständig." },
  134: { title: "Sprache", desc: "Ganze Absätze werden gesprochen.", details: "Flüssige Erzählungen mit Details. Die Kommunikation ist jetzt fast erwachsen." },
  135: { title: "Gedächtnis", desc: "Erinnerungen werden konkret.", details: "Was vor Wochen passiert ist, wird genau beschrieben. Das Langzeitgedächtnis funktioniert." },
  136: { title: "Sozial", desc: "Gruppen werden interessant.", details: "Mehrere Kinder zusammen spielen. Soziale Dynamiken werden komplexer." },
  137: { title: "Worte", desc: "Witze werden verstanden.", details: "'Haha, das war lustig!' Humor wird bewusst. Wortspiele und einfache Witze funktionieren." },
  138: { title: "Vorbereitung", desc: "Die Warum-Phase naht.", details: "Fragen werden häufiger, das Interesse an Zusammenhängen wächst. Ein großer Sprung steht bevor." },
  139: { title: "Konsolidieren", desc: "Die Symbole werden vertraut.", details: "Fantasie und Realität sind jetzt vertraute Partner. Das Kind beherrscht den Umgang mit beiden." },
  140: { title: "Übergang", desc: "Ein neues Kapitel beginnt.", details: "Die nächste Phase steht vor der Tür. Das 'Warum' wird zum zentralen Thema." },
  
  // Jahr 3: Woche 141-156 (Warum-Phase & Magisches Denken)
  141: { title: "Warum beginnt", desc: "'Warum?' wird zur Waffe.", details: "Die 'Warum-Phase' erreicht ihren Höhepunkt. Jedes Wort wird mit 'Warum?' beantwortet. Wissenssucht oder Machtprobe? Beides!" },
  142: { title: "Erklären", desc: "Antworten werden verlangt.", details: "'Weil so!' reicht nicht mehr. Logische Erklärungen werden erwartet - und verstanden." },
  143: { title: "Magisches Denken", desc: "Gedanken beeinflussen die Welt?", details: "'Wenn ich stark dran denke...' Magisches Denken: Gedanken haben Macht über die Realität." },
  144: { title: "Realität", desc: "Grenzen werden getestet.", details: "Was ist Fantasie, was ist Realität? Die Unterscheidung wird geübt - ist aber noch schwierig." },
  145: { title: "Worte", desc: "Wortschatz explodiert.", details: "800, 900, fast 1000 Wörter. Erwachsene Gespräche sind jetzt möglich." },
  146: { title: "Geschichten", desc: "Erzählen wird detailreich.", details: "'Letzte Woche im Urlaub...' Vergangenes wird erzählt, Zukünftiges geplant." },
  147: { title: "Fragen", desc: "Wissen wird systematisch aufgebaut.", details: "Nicht mehr nur 'Warum?', sondern 'Wie?' und 'Weshalb?' Das Verständnis wird differenzierter." },
  148: { title: "Gedächtnis", desc: "Erinnerungen werden erzählfähig.", details: "Was vor Monaten passiert ist, wird genau beschrieben. Das episodische Gedächtnis ist voll funktionsfähig." },
  149: { title: "Sozial", desc: "Freundschaften werden wichtiger.", details: '"Mein bester Freund" - erste echte, stabile Freundschaften entstehen. Soziale Kompetenz wächst.' },
  150: { title: "Empathie", desc: "Andere werden verstanden.", details: "'Er ist traurig, weil...' Empathie wird differenzierter. Soziale Zusammenhänge werden verstanden." },
  151: { title: "Motorik", desc: "Sport wird möglich.", details: "Fahrrad, Schaukeln, Klettern - Bewegung wird zunehmend erwachsen." },
  152: { title: "Kreativität", desc: "Malen wird intentioniert.", details: "'Das ist ein Haus!' Erste bewusste Zeichnungen entstehen. Kreativität wird zielgerichtet eingesetzt." },
  153: { title: "Unabhängigkeit", desc: "Selbstständigkeit wächst.", details: "Anziehen, essen, spielen - viele Dinge werden allein gemacht." },
  154: { title: "Vorbereitung", desc: "Kindergarten steht bevor.", details: "Die Vorbereitung auf den Kindergarten beginnt. Neue Herausforderungen warten." },
  155: { title: "Abschied", desc: "Babyzeit endet.", details: "Die ersten drei Jahre neigen sich dem Ende zu. Ein neues Kapitel beginnt: Kindergartenkind!" },
  156: { title: "Kindergarten-Ready", desc: "Bereit für den nächsten Schritt!", details: "Mit fast 1000 Wörtern, sozialer Kompetenz und Selbstständigkeit ist dein Kind bereit für neue Abenteuer." },
};

const LEAPS = [
  // Jahr 1: Die 10 klassischen Sprünge
  { 
    week: 5, weekEnd: 6, intensity: 'high', title: "Die ersten Sinneswellen", phase: "Jahr 1",
    description: "Die Sinne schalten auf Hochleistung. Alles wird plötzlich lauter, heller, intensiver.",
    details: "Die neuronalen Verbindungen im Gehirn explodieren. Dein Baby nimmt die Welt mit einer nie dagewesenen Intensität wahr."
  },
  { 
    week: 8, weekEnd: 9, intensity: 'high', title: "Muster im Chaos", phase: "Jahr 1",
    description: "Dein Baby entdeckt Wiederholungen und Regelmäßigkeiten. Es sucht deinen Blick und will deine Aufmerksamkeit.",
    details: "Das Gehirn beginnt zu erkennen, dass bestimmte Dinge zusammengehören. Ein Lächeln bedeutet Zuwendung, ein bestimmter Geruch bedeutet Fütterung."
  },
  { 
    week: 12, weekEnd: 13, intensity: 'high', title: "Wenn Bewegung Sinn ergibt", phase: "Jahr 1",
    description: "Die Kontrolle über den eigenen Körper wächst. Der Kopf wird stabiler, Bewegungen flüssiger.",
    details: "Die Muskulatur im Hals- und Schulterbereich hat an Kraft gewonnen. Dein Baby kann den Kopf zielgerichtet drehen und aktiv am Geschehen teilnehmen."
  },
  { 
    week: 19, weekEnd: 20, intensity: 'high', title: "Aha! Das hat Folgen", phase: "Jahr 1",
    description: "Das revolutionäre Erwachen: Handeln führt zu Ergebnissen. Dein Baby wird zum kleinen Forscher.",
    details: "Die ersten bewussten Verknüpfungen zwischen Handeln und Ergebnis entstehen. 'Wenn ich die Rassel schüttle, macht sie Geräusche.'"
  },
  { 
    week: 26, weekEnd: 27, intensity: 'high', title: "Die ersten Trennungen", phase: "Jahr 1",
    description: "Dein Baby erkennt: Du bist eine eigene Person. Distanz ist spürbar - und beängstigend.",
    details: "Das erste echte Fremdeln beginnt. Dein Baby versteht, dass du existierst, auch wenn es dich nicht sieht."
  },
  { 
    week: 37, weekEnd: 38, intensity: 'high', title: "Kategorien und Ordnung", phase: "Jahr 1",
    description: "Die Welt wird sortiert und eingeordnet. Ein Hund ist ein Tier, aber nicht jedes Tier ist ein Hund.",
    details: "Abstrakte Konzepte formen sich. Dein Baby versteht Ober- und Unterbegriffe. Das ist die Grundlage für Sprache und logisches Denken."
  },
  { 
    week: 46, weekEnd: 47, intensity: 'high', title: "Reihenfolgen verstehen", phase: "Jahr 1",
    description: "Abläufe werden verstanden und erwartet. Erst das, dann das - dein Baby wird zum Experten für Sequenzen.",
    details: "Mentale Programme entstehen. Dein Baby versteht nicht nur einzelne Schritte, sondern deren Zusammenhang."
  },
  { 
    week: 55, weekEnd: 56, intensity: 'high', title: "Flexible Programme", phase: "Jahr 1",
    description: "Es gibt verschiedene Wege zum Ziel. Erste Trotzreaktionen zeigen wachsende Autonomie.",
    details: "Dein Baby versteht: Es kann variieren und hat trotzdem ein gemeinsames Ziel. Gleichzeitig testet es Grenzen."
  },
  { 
    week: 64, weekEnd: 65, intensity: 'high', title: "Regeln und Konsequenzen", phase: "Jahr 1",
    description: "Strategisches Handeln beginnt. Dein Baby testet Hypothesen über soziale Regeln.",
    details: "Das Gehirn formt Regelwerke. Konsequenzen werden erwartet - und es wird frustriert, wenn die Welt nicht vorhersagbar ist."
  },
  { 
    week: 75, weekEnd: 76, intensity: 'high', title: "Verbundenheit spüren", phase: "Jahr 1",
    description: "Echte Empathie entsteht. Dein Baby versteht: Andere haben Gefühle, genau wie ich.",
    details: "Soziales Bewusstsein entwickelt sich. Dein Baby kann sich in andere hineinversetzen und reagiert auf deren Emotionen."
  },
  // Jahr 2-3: Die 4 neuen Phasen
  { 
    week: 76, weekEnd: 90, intensity: 'medium', title: "Die Konsolidierung", phase: "Jahr 2", age: "18-21 Monate",
    description: "Die bisherigen Fortschritte werden gefestigt. Ein ruhigeres Stadium vor dem nächsten großen Sprung.",
    details: "Das Gehirn verarbeitet und festigt alles Erlernte. Der 22-Monats-Schub kann kurzzeitig anhängliches Verhalten bringen."
  },
  { 
    week: 91, weekEnd: 115, intensity: 'high', title: "Die Autonomie-Explosion", phase: "Jahr 2", age: "2 Jahre", subtitle: "Trotzphase",
    description: "Willkommen in der Trotzphase! Der Konflikt zwischen Wunsch und Fähigkeit führt zu Wutanfällen.",
    details: "Das präfrontale Cortex entwickelt sich, aber die Impulskontrolle fehlt noch. Dein Kind WILL selbstständig sein."
  },
  { 
    week: 116, weekEnd: 140, intensity: 'medium', title: "Die Welt der Symbole", phase: "Jahr 2-3", age: "ca. 2,5 Jahre",
    description: "Fantasie erwacht. Ein Stock wird zum Zauberstab, eine Kiste zum Auto - die Vorstellungskraft explodiert.",
    details: "Symbolisches Denken ermöglicht neues Spielen ohne Grenzen. Fantasie und Realität verschwimmen noch."
  },
  { 
    week: 141, weekEnd: 156, intensity: 'high', title: "Warum? & Magisches Denken", phase: "Jahr 3", age: "3 Jahre", subtitle: "Kindergarten-Ready",
    description: "Die 'Warum-Phase' erreicht ihren Höhepunkt. Dein Kind wird zum kleinen Wissenschaftler.",
    details: "Mit fast 1000 Wörtern erkundet dein Kind systematisch die Welt. Magisches Denken beherrscht noch alles."
  },
];

// REALISTISCHE PHASEN für Jahr 2-3 (mit Ruhephasen dazwischen)
// Diese werden dynamisch zu LEAPS hinzugefügt
const YEAR2_3_PHASES = [
  // Ruhe nach dem letzten Sprung (Jahr 1)
  { week: 77, weekEnd: 83, intensity: 'low', title: "Ruhe nach dem Sturm", phase: "Jahr 2", age: "17-19 Monate",
    description: "Nach dem intensiven 1. Jahr ist Zeit zum Durchatmen.",
    details: "Dein Baby gewöhnt sich an die neu erworbenen Fähigkeiten. Es wird selbstständiger beim Spielen und Entdecken." },
  
  // Mittlere Phase: Konsolidierung
  { week: 84, weekEnd: 88, intensity: 'medium', title: "Konsolidierung", phase: "Jahr 2", age: "20-21 Monate",
    description: "Die Fähigkeiten werden festigt und verfeinert.",
    details: "Laufen wird sicherer, Worte werden häufiger. Dein Kind nutzt seine neuen Skills im Alltag." },
  
  // Erste intensive Phase: Trotz beginnt
  { week: 89, weekEnd: 93, intensity: 'high', title: "Autonomie-Schub", phase: "Jahr 2", age: "21-22 Monate", subtitle: "Erste Trotzphase",
    description: "'Nein!' wird zur Lieblingsantwort. Das Kind WILL, aber kann noch nicht alles.",
    details: "Frust pur! Das Kind erkennt seine Selbstständigkeit, ist aber noch zu klein für vieles." },
  
  // Ruhe
  { week: 94, weekEnd: 98, intensity: 'low', title: "Anpassung", phase: "Jahr 2", age: "22-23 Monate",
    description: "Das Kind gewöhnt sich an seine Grenzen und Möglichkeiten.",
    details: "Nach dem intensiven Trotz wird es wieder ruhiger. Das Kind akzeptiert Hilfe und Strukturen." },
  
  // Sprachexplosion
  { week: 99, weekEnd: 103, intensity: 'medium', title: "Worte-Explosion", phase: "Jahr 2", age: "23-24 Monate",
    description: "Plötzlich hat es Hunderte Wörter! Die Kommunikation explodiert.",
    details: "Zwei-Wort-Sätze werden normal. Das Kind benennt alles, was es sieht." },
  
  // Ruhe vor dem großen Trotz
  { week: 104, weekEnd: 109, intensity: 'low', title: "Vorbereitung", phase: "Jahr 2", age: "24-26 Monate",
    description: "Ruhige Zeit vor dem nächsten großen Entwicklungsschub.",
    details: "Das Kind festigt seine Sprache und Motorik. Es wird selbstständiger im Alltag." },
  
  // Große Trotzphase
  { week: 110, weekEnd: 118, intensity: 'high', title: "Die große Trotzphase", phase: "Jahr 2", age: "26-28 Monate", subtitle: "Autonomie-Explosion",
    description: "Das bekannte 'Nein!' wird jetzt professionell eingesetzt.",
    details: "Alles dauert länger, alles ist ein Kampf. Doch dahinter steckt der Wille, selbstständig zu sein." },
  
  // Ruhe nach dem Trotz
  { week: 119, weekEnd: 125, intensity: 'low', title: "Gewöhnung", phase: "Jahr 2-3", age: "28-30 Monate",
    description: "Das Kind gewöhnt sich an die neue Selbstständigkeit.",
    details: "Die Trotzanfälle werden weniger heftig. Das Kind akzeptiert Grenzen besser." },
  
  // Symbolisches Denken
  { week: 126, weekEnd: 132, intensity: 'medium', title: "Symbole entdecken", phase: "Jahr 2-3", age: "30-32 Monate",
    description: "Ein Stock wird zum Zauberstab! Fantasie erwacht.",
    details: "Symbolisches Spielen beginnt. Das Kind gibt Figuren eine Rolle, erfindet Geschichten." },
  
  // Ruhe
  { week: 133, weekEnd: 140, intensity: 'low', title: "Verarbeitung", phase: "Jahr 2-3", age: "32-34 Monate",
    description: "Die neue Fantasie-Welt wird verarbeitet.",
    details: "Rollenspiele werden ausgefeilter. Das Kind spielt länger allein und konzentrierter." },
  
  // Fantasie und Ängste
  { week: 141, weekEnd: 147, intensity: 'medium', title: "Fantasie-Welt", phase: "Jahr 2-3", age: "34-36 Monate", subtitle: "Magisches Denken",
    description: "Fantasie und Realität verschwimmen. Auch Ängste können entstehen.",
    details: "Monster unter dem Bett? Die Fantasie hat eine Kehrseite. Doch auch die Freude am Spielen wächst." },
  
  // Ruhe vor Kindergarten
  { week: 148, weekEnd: 154, intensity: 'low', title: "Reifung", phase: "Jahr 3", age: "36-37 Monate",
    description: "Die letzte Ruhephase vor dem Kindergarten.",
    details: "Das Kind wird immer selbstständiger. Vorbereitung auf die nächste große Veränderung." },
  
  // Abschluss
  { week: 155, weekEnd: 156, intensity: 'medium', title: "Kindergarten-Ready", phase: "Jahr 3", age: "37-38 Monate",
    description: "Bereit für den nächsten Schritt!",
    details: "Mit fast 3 Jahren hat sich einiges getan. Die Welt der Symbole und das Magische Denken sind Teil des Alltags." },
];

// Kombinierte LEAPS (Jahr 1 + Jahr 2-3)
const ALL_LEAPS = [...LEAPS, ...YEAR2_3_PHASES].sort((a, b) => a.week - b.week);

function getCurrentWeek(dueDate) {
  const now = new Date();
  const due = new Date(dueDate);
  const diffTime = now.getTime() - due.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
}

function getWeekColor(week) {
  const inPhase = ALL_LEAPS.some(l => week >= l.week && week <= l.weekEnd);
  if (inPhase) {
    const phase = ALL_LEAPS.find(l => week >= l.week && week <= l.weekEnd);
    if (phase?.intensity === 'high') return 'intense';
    if (phase?.intensity === 'medium') return 'transition';
    if (phase?.intensity === 'low') return 'calm';
    return 'intense';
  }
  return 'calm';
}

// Wochenspezifische Beschreibung holen
function getWeekDescription(week) {
  return WEEK_DESCRIPTIONS[week] || { 
    title: `Woche ${week}`, 
    desc: "Eine ruhige Phase der Entwicklung.", 
    details: "Dein Kind verarbeitet die bisherigen Erfahrungen und bereitet sich auf die nächsten Schritte vor." 
  };
}

export default function LeapsOverviewPage() {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [babyName, setBabyName] = useState('');
  const [selectedWeek, setSelectedWeek] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('flow-babies') || '[]');
    if (stored.length > 0) {
      const baby = stored[0];
      const week = getCurrentWeek(baby.dueDate);
      setCurrentWeek(week);
      setSelectedWeek(week);
      setBabyName(baby.name);
    }
  }, []);

  const currentLeap = useMemo(() => {
    return ALL_LEAPS.find(l => currentWeek >= l.week && currentWeek <= l.weekEnd);
  }, [currentWeek]);

  const currentStatus = getWeekColor(currentWeek);
  const currentWeekDesc = getWeekDescription(currentWeek);
  
  const statusText = {
    calm: { text: 'Ruhige Phase', desc: 'Zeit zum Durchatmen und Festigen.' },
    transition: { text: 'Sanfte Veränderung', desc: 'Eine neue Phase zeichnet sich ab.' },
    intense: { text: 'Intensive Phase', desc: 'Viele neue Eindrücke werden verarbeitet.' }
  };

  const maxWeek = 156;
  const weeks = Array.from({ length: maxWeek }, (_, i) => i + 1);

  return (
    <div className="min-h-screen pb-8">
      <header className="sticky top-0 z-50 w-full border-b border-white/45 dark:border-white/5 bg-white/72 dark:bg-[hsl(210,25%,7%)]/72 backdrop-blur-xl">
        <div className="container max-w-3xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-[hsl(17,75%,56%)] hover:opacity-80 transition-opacity">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Zurück</span>
            </Link>
            <h1 className="font-semibold text-[hsl(25,22%,16%)] dark:text-white">Entwicklungs-Timeline</h1>
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
          {/* PROMINENTER BUTTON: Alle Phasen */}
          <button 
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
            className="w-full flex items-center justify-between p-5 bg-gradient-to-r from-[hsl(17,75%,56%)] to-[hsl(17,75%,46%)] rounded-2xl text-white shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <Layers className="h-6 w-6" />
              </div>
              <div className="text-left">
                <p className="font-bold text-lg">Alle 14 Phasen</p>
                <p className="text-white/80 text-sm">Vom Baby bis zum Kindergartenkind</p>
              </div>
            </div>
            <span className="text-2xl">↓</span>
          </button>

          {/* Aktueller Status - MIT WOCHENSPEZIFISCHER BESCHREIBUNG */}
          <Card className={`border-2 ${
            currentStatus === 'intense' ? 'border-red-400/50 bg-red-500/5' :
            currentStatus === 'transition' ? 'border-amber-400/50 bg-amber-500/5' :
            'border-green-400/50 bg-green-500/5'
          }`}>
            <CardContent className="py-6">
              <div className="flex items-start gap-4">
                <div className={`w-16 h-16 rounded-2xl flex-shrink-0 flex items-center justify-center ${
                  currentStatus === 'intense' ? 'bg-red-500 text-white shadow-[0_8px_24px_-8px_rgba(239,68,68,0.5)]' :
                  currentStatus === 'transition' ? 'bg-amber-500 text-white shadow-[0_8px_24px_-8px_rgba(245,158,11,0.5)]' :
                  'bg-green-500 text-white shadow-[0_8px_24px_-8px_rgba(34,197,94,0.5)]'
                }`}>
                  <span className="text-2xl font-bold">{currentWeek}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)]">Aktuelle Woche</p>
                  <h2 className="text-xl font-bold text-[hsl(25,22%,16%)] dark:text-white">
                    {currentWeekDesc.title}
                  </h2>
                  <p className="text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)] mt-1 leading-relaxed">
                    {currentWeekDesc.desc}
                  </p>
                  <p className="text-sm text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)] mt-2">
                    {currentLeap ? `${currentLeap.title} (${currentLeap.phase})` : statusText[currentStatus].text}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Wochen-Timeline */}
          <div>
            <h3 className="text-lg font-bold text-[hsl(25,22%,16%)] dark:text-white mb-4">Wochenübersicht</h3>
            
            <div className="relative">
              <div className="overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
                <div className="flex gap-1 min-w-max">
                  {weeks.map((week) => {
                    const color = getWeekColor(week);
                    const isCurrent = week === currentWeek;
                    const isPast = week < currentWeek;
                    const isSelected = week === selectedWeek;
                    
                    return (
                      <motion.button
                        key={week}
                        onClick={() => setSelectedWeek(week)}
                        whileTap={{ scale: 0.95 }}
                        className={`
                          w-8 h-12 rounded-lg flex flex-col items-center justify-center text-[10px] font-medium transition-all
                          ${color === 'intense' ? 'bg-red-400 hover:bg-red-500' : 
                            color === 'transition' ? 'bg-amber-300 hover:bg-amber-400' : 
                            'bg-green-400 hover:bg-green-500'}
                          ${isPast ? 'opacity-60' : 'opacity-100'}
                          ${isCurrent ? 'ring-2 ring-white dark:ring-gray-800 ring-offset-2 ring-offset-[hsl(17,75%,56%)] scale-110 z-10' : ''}
                          ${isSelected && !isCurrent ? 'ring-2 ring-[hsl(17,75%,56%)]' : ''}
                        `}
                      >
                        <span className="text-white/70 text-[8px]">W</span>
                        <span className="text-white">{week}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
              
              {currentWeek > 0 && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[hsl(17,75%,56%)] to-transparent opacity-50"></div>
              )}
            </div>

            {/* Legende */}
            <div className="flex items-center justify-center gap-6 mt-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-green-400"></div>
                <span className="text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)]">Ruhig</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-amber-300"></div>
                <span className="text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)]">Übergang</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-red-400"></div>
                <span className="text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)]">Intensiv</span>
              </div>
            </div>
          </div>

          {/* AUSFÜHRLICHE Details zur ausgewählten Woche - WOCHENSPEZIFISCH */}
          {selectedWeek && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={selectedWeek}
            >
              <Card className="border border-[hsl(25,20%,90%)] dark:border-[hsl(210,20%,20%)]">
                <CardContent className="py-5">
                  {(() => {
                    const weekDesc = getWeekDescription(selectedWeek);
                    const leap = ALL_LEAPS.find(l => selectedWeek >= l.week && selectedWeek <= l.weekEnd);
                    const status = getWeekColor(selectedWeek);
                    
                    return (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-bold text-[hsl(25,22%,16%)] dark:text-white text-lg">
                              Woche {selectedWeek}: {weekDesc.title}
                            </h4>
                            {leap && (
                              <p className="text-[hsl(17,75%,56%)] font-medium text-sm">
                                {leap.phase} {leap.age ? `· ${leap.age}` : ''}
                              </p>
                            )}
                          </div>
                          {selectedWeek === currentWeek && (
                            <span className="px-3 py-1.5 bg-[hsl(17,75%,56%)] text-white text-sm font-semibold rounded-full">
                              Aktuell
                            </span>
                          )}
                        </div>
                        
                        <div className={`p-4 rounded-xl ${
                          status === 'intense' ? 'bg-red-50 dark:bg-red-900/20' :
                          status === 'transition' ? 'bg-amber-50 dark:bg-amber-900/20' :
                          'bg-green-50 dark:bg-green-900/20'
                        }`}>
                          <p className="text-[hsl(25,22%,16%)] dark:text-white font-medium text-lg mb-2">
                            {weekDesc.desc}
                          </p>
                        </div>
                        
                        <p className="text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)] leading-relaxed">
                          {weekDesc.details}
                        </p>
                        
                        {leap?.subtitle && (
                          <span className="inline-block px-3 py-1 bg-[hsl(17,75%,56%)]/10 text-[hsl(17,75%,56%)] text-sm font-medium rounded-full">
                            {leap.subtitle}
                          </span>
                        )}
                      </div>
                    );
                  })()}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Navigation zu aktueller Woche */}
          <button
            onClick={() => setSelectedWeek(currentWeek)}
            className="w-full flex items-center justify-center gap-2 py-4 bg-[hsl(17,75%,56%)]/10 hover:bg-[hsl(17,75%,56%)]/15 rounded-xl transition-colors border border-[hsl(17,75%,56%)]/20 text-[hsl(17,75%,56%)] font-semibold"
          >
            <Navigation className="h-4 w-4" />
            Zur aktuellen Woche
          </button>
        </motion.div>
      </main>
    </div>
  );
}
