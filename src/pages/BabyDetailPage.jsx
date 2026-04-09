import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowLeft, Brain, Sprout, Lightbulb, Calendar, Cloud } from 'lucide-react';
import { Card, CardContent } from '../components/Card';
import { PopCard, PopButton } from '../components/PopEffect';

const TEMPLATES = [
  // Jahr 1: Die 10 klassischen Sprünge
  {
    "week": 5, "weekEnd": 6, "title": "Die ersten Sinneswellen",
    "stormPhase": { 
      "description": "Dein Baby taucht in eine neue Realität ein. Plötzlich ist alles lauter, heller, intensiver. Die kleinen Sinne, die bisher sanft gearbeitet haben, schalten auf Hochleistung um. Dein Baby ist überfordert, quengelig und sucht unbedingt den Schutz deiner Nähe.", 
      "symptoms": ["Alles ist plötzlich 'zu viel'", "Will nur an deiner Brust oder im Arm", "Schläft unruhig oder nur beim Tragen", "Reagiert schreckhaft auf Geräusche", "Weint mehr als gewöhnlich ohne erkennbaren Grund"] 
    },
    "sunnyPhase": { 
      "description": "Nach dem Sturm kommt die Ruhe. Dein Baby hat gelernt, mit dieser neuen Intensität umzugehen und beginnt, bewusst zu lächeln, tief in deine Augen zu schauen und die Welt mit wachen Sinnen zu erkunden.", 
      "abilities": ["Erstes bewusstes Sozial-Lächeln (nicht mehr Reflex)", "Fixiert dein Gesicht mit intensivem Blick", "Reagiert mit Tränen auf echte Bedürfnisse (nicht mehr reflexartig)", "Erkennt deine Stimme sofort und beruhigt sich", "Unterscheidet zwischen Tag und Nacht besser"] 
    },
    "why": "Im kleinen Köpfchen entstehen gerade Millionen neue neuronale Verbindungen. Die Sinnesorgane reifen sprunghaft - was vorher unscharf und gedämpft war, wird jetzt plötzlich scharf und intensiv erfahrbar. Das ist überwältigend für ein so kleines Wesen.",
    "actions": ["Halte dein Baby ganz nah - Körperkontakt ist jetzt das Wichtigste", "Reduziere äußere Reize: weniger Besuche, leise Umgebung, gedämpftes Licht", "Sprich beruhigend, sing leise Lieder, halte die Stimme sanft", "Trage dein Baby viel, am besten in einem Tragetuch oder Tuch", "Verzichte auf neue Erfahrungen - vertraute Routinen geben Halt"]
  },
  {
    "week": 8, "weekEnd": 9, "title": "Muster im Chaos",
    "stormPhase": { 
      "description": "Dein Baby hat plötzlich ein Radar für Wiederholungen entdeckt. Es ist fasziniert, aber auch verwirrt. Warum passiert das immer wieder? Es sucht deinen Blick, will deine Aufmerksamkeit, ist gleichzeitig neugierig und überfordert.", 
      "symptoms": ["Sucht intensiv Augenkontakt und reagiert empfindlich, wenn du wegschaust", "Wird bei Unterbrechungen der Routine unruhig", "Will ständig getragen werden, besonders in Bewegung", "Reagiert auf Rhythmen mit Weinen oder Faszination", "Irritiert, wenn bekannte Muster unterbrochen werden"] 
    },
    "sunnyPhase": { 
      "description": "Dein Baby hat verstanden: Die Welt folgt Mustern! Es kann nun vorhersagen, was als Nächstes passiert, und fühlt sich dadurch sicherer. Das Gesicht leuchtet auf, wenn bekannte Abläufe beginnen.", 
      "abilities": ["Erkennt bekannte Formen und wiederkehrende Elemente", "Folgt Mustern mit den Augen (Linien, Gesichter)", "Reagiert freudig auf bekannte Rhythmen (Schaukeln, Lieder)", "Zeigt Erwartungshaltung vor bekannten Abläufen", "Beruhigt sich bei vertrauten Geräuschen (Staubsauger, Auto)", "Lacht, wenn ein bekanntes Muster wiederkehrt"] 
    },
    "why": "Das Gehirn beginnt zu erkennen, dass bestimmte Dinge zusammengehören und sich wiederholen. Ein Lächeln von dir bedeutet Zuwendung. Ein bestimmter Ton bedeutet Fütterung. Diese Mustererkennung ist der Grundstein für das Verständnis von Ursache und Wirkung.",
    "actions": ["Etabliere tägliche Rituale: Gleiche Abfolge beim Schlafenlegen, Baden, Füttern", "Zeige deinem Baby bewusst einfache Muster: Kreise zeichnen, Klopf-Rhythmen", "Singe oft dieselben Lieder mit demselben Tonfall", "Wiederhole bekannte Spiele (Kuckuck, Pat-a-cake) immer und immer wieder", "Gib deinem Baby Zeit, Muster selbst zu entdecken - unterbreche nicht zu schnell"]
  },
  {
    "week": 12, "weekEnd": 13, "title": "Wenn Bewegung Sinn ergibt",
    "stormPhase": { 
      "description": "Plötzlich will dein Baby die Kontrolle über seinen Körper. Die Arme und Beine bewegen sich bewusster, aber noch nicht gezielt genug. Es ist frustriert, weil der Kopf noch wackelt, und gleichzeitig voller Bewegungsdrang.", 
      "symptoms": ["Unruhig, weil der Körper 'mit ihm spricht'", "Starker Bewegungsdrang, will gedreht, geschaukelt, bewegt werden", "Experimentiert mit Armen und Beinen", "Frustriert, weil Kopf noch nicht stabil genug", "Mehr Bewegung im Schlaf, unruhiges Schlafen"] 
    },
    "sunnyPhase": { 
      "description": "Dein Baby hat die Kontrolle über seinen Kopf gewonnen! Die Bewegungen werden flüssiger, gezielter. Es kann nun aktiv an Gesprächen teilnehmen, indem es den Kopf dreht, und genießt die neue körperliche Freiheit.", 
      "abilities": ["Kopf kontrolliert halten und zielgerichtet drehen", "Entdeckt die eigene Stimme intensiv (Stimmtraining, Quietschen)", "Arme bewegen sich flüssiger und gezielter", "Greift bewusst nach Gesichtern und Haaren", "Richtet sich in Bauchlage auf den Unterarmen auf", "Dreht sich von Rücken auf die Seite"] 
    },
    "why": "Die Muskulatur im Hals- und Schulterbereich hat an Kraft gewonnen. Die Koordination zwischen Kopf, Augen und Körper verbessert sich enorm. Dein Baby kann nun aktiv sein Umfeld erkunden, statt passiv zu liegen.",
    "actions": ["Mehr Bauchlage ermöglichen - das stärkt Nacken und Rücken", "Reagiere auf die neuen Laute mit Nachahmen und Gesprächen", "Unterstütze den Kopf beim Tragen weiterhin, aber weniger als vorher", "Biete Greifmöglichkeiten: Haare, Ketten, weiche Spielzeuge", "Lass dein Baby viel auf dem Bauch spielen (Tummy Time)"]
  },
  {
    "week": 19, "weekEnd": 20, "title": "Aha! Das hat Folgen",
    "stormPhase": { 
      "description": "Ein revolutionäres Erwachen: Dein Baby entdeckt, dass es etwas tun kann, und dann passiert etwas! Das ist gleichzeitig faszinierend und erschreckend. Es steckt alles in den Mund, greift nach allem, wird frustriert, wenn etwas nicht klappt.", 
      "symptoms": ["Alles wird in den Mund gesteckt - Ausprobieren durch Lutschen", "Greift wild nach allem, was greifbar ist", "Wird frustriert, wenn etwas nicht sofort funktioniert", "Wirft Dinge absichtlich runter, um zu sehen, was passiert", "Experimentiert mit Geräuschen beim Schreien (laut/leiser)"] 
    },
    "sunnyPhase": { 
      "description": "Dein Baby ist nun ein kleiner Forscher mit Methode. Es weiß: Wenn ich das mache, passiert das. Diese Erkenntnis öffnet eine neue Welt voller Möglichkeiten und Selbstwirksamkeit.", 
      "abilities": ["Gezieltes Greifen mit Daumen und Zeigefinger (Pinzette)", "Versucht sich zu drehen und zu bewegen", "Mund wird zum Werkzeug: lutscht, kaut, schmatzt bewusst", "Schüttelt bewusst Spielzeug, um Geräusche zu machen", "Erkennt, dass bestimmte Handlungen bestimmte Reaktionen auslösen", "Interagiert aktiv mit Spielzeug (drückt, schiebt, zieht)"] 
    },
    "why": "Das Gehirn knüpft die ersten bewussten Verknüpfungen zwischen Handeln und Ergebnis. 'Ich schüttle die Rassel - es macht Geräusche.' Das ist der Beginn von Ursache-Wirkung-Denken und der Grundlage für späteres Problemlösen.",
    "actions": ["Biete viel Greifbares an: weiche Bälle, Beißringe, Tücher", "Erlaube die Mund-Exploration - das ist normale Forschung", "Feiere kleine Erfolge: 'Schau, du hast die Rassel geschüttelt!'", "Lass dein Baby experimentieren - auch wenn es Dinge wirft", "Reagiere auf die Ursache-Wirkung-Spiele deines Babys"]
  },
  {
    "week": 26, "weekEnd": 27, "title": "Die ersten Trennungen",
    "stormPhase": { 
      "description": "Ein dramatisches Erwachen: Dein Baby merkt plötzlich, dass du eine eigene Person bist und nicht nur eine Verlängerung von ihm. Es kann nun Distanz zwischen euch wahrnehmen - und das ist beängstigend. Das erste echte Fremdeln beginnt.", 
      "symptoms": ["Weint heftig, wenn du den Raum verlässt", "Fremdelt plötzlich vor anderen Personen", "Klammern sich an dich wie ein Äffchen", "Wird nachts unruhiger - sucht Bestätigung, dass du da bist", "Reagiert sensibel auf deine Stimmung", "Will nur von dir getröstet werden"] 
    },
    "sunnyPhase": { 
      "description": "Dein Baby hat die Distanz überwunden und lernt, dass du zurückkommst. Es weiß nun: Auch wenn Mama kurz weg ist, existiert sie weiter. Das ist der Beginn von Objektpermanenz und sicherer Bindung.", 
      "abilities": ["Unterscheidet klar zwischen Bezugspersonen und Fremden", "Erkennt räumliche Distanz und reagiert darauf", "Zeigt deutliche Präferenzen (will nur bei Mama/Papa sein)", "Beruhigt sich schneller, wenn du zurückkommst", "Entwickelt erste Strategien, Nähe zu halten", "Zeigt Freude bei Wiedersehen"] 
    },
    "why": "Das Gehirn kategorisiert nun bewusst: 'Das ist meine Bezugsperson' vs. 'Das ist ein Fremder'. Gleichzeitig versteht es, dass du existierst, auch wenn es dich nicht sieht. Das ist ein kognitiver Quantensprung.",
    "actions": ["Verabschiede dich rituell, auch wenn es Weinen gibt - das gibt Sicherheit", "Komm zurück mit Freude, nicht mit Schuldgefühlen", "Respektiere das Fremdeln - zwinge dein Baby nicht zu Fremden", "Spiele Kuckuck: Versteck dich kurz und zeig dich wieder", "Bleibe in neuen Situationen nah - deine Nähe gibt Halt"]
  },
  {
    "week": 37, "weekEnd": 38, "title": "Kategorien und Ordnung",
    "stormPhase": { 
      "description": "Dein Baby will die Welt sortieren, verstehen, einordnen. Es ist frustriert, wenn etwas nicht in seine Kategorien passt. Alles wird untersucht, verglichen, auseinandergenommen. Eine Phase intensiver Neugier und manchmal auch Verwirrung.", 
      "symptoms": ["Sortiert alles, was greifbar ist", "Empfindlich, wenn Erwartungen nicht erfüllt werden", "Achte auf Details, die du übersehen würdest", "Frustriert, wenn etwas anders ist als erwartet", "Experimentiert mit Kategorien ('Hund' auf alle Tiere beziehen)", "Will Dinge vergleichen und anordnen"] 
    },
    "sunnyPhase": { 
      "description": "Dein Baby hat ein mentales Ordnungssystem entwickelt! Es weiß: Ein Hund ist ein Tier, aber nicht jedes Tier ist ein Hund. Das erste Verständnis für Ober- und Unterbegriffe entsteht - die Welt wird strukturierter.", 
      "abilities": ["Kann Dinge nach Kategorien einteilen (Tiere, Fahrzeuge)", "Erste echte Wortversuche mit Bedeutung", "Robbt oder krabbelt gezielt", "Versteht erste einfache Anweisungen", "Zeigt Interesse an Büchern mit Kategorien", "Kann ähnliche Dinge zusammenlegen"] 
    },
    "why": "Das Gehirn bildet abstrakte Konzepte. Es versteht, dass Dinge Eigenschaften haben, die sie zu einer Gruppe machen - auch wenn sie unterschiedlich aussehen. Ein Taxi und ein Feuerwehrauto sind beides Autos.",
    "actions": ["Biete Sortierspiele an: Formen, Farben, Größen", "Benenne Kategorien bewusst: 'Schau, das ist auch ein Hund!'", "Schaffe Platz zum krabbeln und robben", "Lies Bilderbücher mit klaren Kategorien", "Spiele 'Was passt nicht?' - einfache Kategorisierungen"]
  },
  {
    "week": 46, "weekEnd": 47, "title": "Reihenfolgen verstehen",
    "stormPhase": { 
      "description": "Dein Baby versteht nun, dass Dinge in einer bestimmten Reihenfolge passieren müssen. Es will selbst machen, probiert aus, wird wütend, wenn es nicht klappt. Eine Phase des sturen Übens und Lernens durch Wiederholung.", 
      "symptoms": ["Will unbedingt selbst machen - auch wenn es nicht klappt", "Wird frustriert, wenn die Reihenfolge unterbrochen wird", "Experimentiert mit Abfolgen", "Stur bei Ritualen - 'Erst das, dann das'", "Wiederhält Handlungen bis sie sitzen", "Testet Grenzen durch Beharrlichkeit"] 
    },
    "sunnyPhase": { 
      "description": "Dein Baby ist nun ein kleiner Experte für Abläufe! Es weiß: Zuerst kommt der Löffel in die Hand, dann zum Mund, dann kauen. Diese Sequenzen ermöglichen echte Selbstständigkeit und Teilhabe.", 
      "abilities": ["Kann einfache Türmchen bauen (3-4 Steine)", "Hilft bewusst bei Abläufen (zum Beispiel beim Anziehen)", "Versteht und nutzt einfache Sequenzen", "Kann Handlungen in Gedanken durchspielen", "Zeigt Erwartungshaltung bei bekannten Abläufen", "Erzählt durch Gesten kleine Geschichten"] 
    },
    "why": "Das Gehirn speichert Sequenzen als mentale Programme. Es versteht nicht nur einzelne Schritte, sondern deren Zusammenhang. Das ist die Grundlage für planvolles Handeln.",
    "actions": ["Lass dein Baby helfen - auch wenn es länger dauert", "Etabliere klare Ritualabfolgen", "Biete Bauklötze und Stapelspiele an", "Spiele 'Was kommt als Nächstes?'-Rätsel", "Feier, wenn Sequenzen gelingen"] 
  },
  {
    "week": 55, "weekEnd": 56, "title": "Flexible Programme",
    "stormPhase": { 
      "description": "Dein Baby testet Grenzen, will selbst entscheiden, zeigt ersten Trotz. Es versteht, dass es Optionen hat - und nutzt sie. Eine herausfordernde Phase der Selbstbehauptung und Grenzerprobung.", 
      "symptoms": ["Sagt 'Nein' oder zeigt Ablehnung", "Will selbst entscheiden - bei allem", "Testet systematisch Grenzen aus", "Reagiert stark auf Regeln (positiv oder negativ)", "Will Wahlmöglichkeiten", "Wird wütend bei Zwang"] 
    },
    "sunnyPhase": { 
      "description": "Dein Baby versteht nun echte Flexibilität! Es weiß: Es gibt verschiedene Wege zum Ziel. Es kann wählen, entscheiden, anpassen. Das ist der Beginn von echter Autonomie und Selbstwirksamkeit.", 
      "abilities": ["Macht die ersten selbstständigen Schritte", "Hilft aktiv bei Aufgaben mit Verständnis", "Kann nachahmen und variieren", "Versteht einfache Regeln und ihre Ausnahmen", "Zeigt erste Planungshandlungen", "Kann sich zwischen Optionen entscheiden"] 
    },
    "why": "Das Gehirn versteht: Programme können variieren und haben trotzdem ein gemeinsames Ziel. 'Ich kann die Schuhe vor oder nach dem Mantel anziehen - beides führt zum Ziel.' Das ist abstraktes Denken.",
    "actions": ["Biete echte Wahlmöglichkeiten an: 'Apfel oder Banane?'", "Lass dein Baby helfen - Autonomie stärken", "Gemeinsam aufräumen: Ein Ritual mit Flexibilität", "Respektiere Entscheidungen, wo möglich", "Erkläre Regeln einfach und konsequent"] 
  },
  {
    "week": 64, "weekEnd": 65, "title": "Regeln und Konsequenzen",
    "stormPhase": { 
      "description": "Dein Baby testet Regeln, wiederholt Verhaltensweisen, lernt durch Konsequenzen. Es ist ein kleiner Wissenschaftler, der Hypothesen über soziale Regeln aufstellt und testet. Eine Phase intensiver Beobachtung und Anpassung.", 
      "symptoms": ["Wiederhält Verhaltensweisen systematisch", "Variatives Verhalten: Probiert verschiedene Varianten", "Reagiert stark auf Konsequenzen", "Testet, was passiert, wenn...", "Merkt sich Regeln und erwartet deren Einhaltung", "Frustriert bei unerwarteten Ausnahmen"] 
    },
    "sunnyPhase": { 
      "description": "Dein Baby versteht nun strategisches Handeln! Es weiß: Wenn ich A tue, passiert B. Es kann Regeln anwenden, Konsequenzen vorhersagen und sein Verhalten danach ausrichten.", 
      "abilities": ["Versteht und folgt einfachen Regeln", "Bildet erste Zwei-Wort-Sätze", "Erkennt Konsequenzen von Handlungen", "Kann Verhaltensalternativen abwägen", "Zeigt erstes schuldiges Bewusstsein", "Kann einfache Kompromisse eingehen"] 
    },
    "why": "Das Gehirn formt Regelwerke und testet sie. 'Wenn ich weine, kommt Mama' - aber auch: 'Wenn ich weine und Mama sagt Nein, kommt sie trotzdem nicht.' Das ist soziales Lernen durch Erfahrung.",
    "actions": ["Sei konsequent - Regeln brauchen Beständigkeit", "Erkläre einfach: 'Wenn... dann...'", "Verstärke positives Verhalten bewusst", "Erlaube Fehler - daraus lernt man", "Zeige emotionale Konsequenzen: 'Schau, das hat sie traurig gemacht'"] 
  },
  {
    "week": 75, "weekEnd": 76, "title": "Verbundenheit spüren",
    "stormPhase": { 
      "description": "Dein Baby begreift sich als Teil eines größeren Ganzen. Es spürt die Stimmungen anderer, ist empfindsam für Beziehungsdynamiken, übernimmt Verantwortung. Eine Phase tiefer emotionaler Verwundbarkeit und wachsender Sozialkompetenz.", 
      "symptoms": ["Reagiert stark auf die Emotionen anderer", "Zeigt Gewissenhaftigkeit und Perfektionismus", "Ist sensibel für Stimmungen in der Familie", "Nimmt Konflikte intensiv wahr", "Will alles 'richtig' machen", "Zeigt echte Sorge um andere"] 
    },
    "sunnyPhase": { 
      "description": "Dein Baby entwickelt echte Empathie! Es versteht: Andere haben Gefühle, Bedürfnisse, Perspektiven. Es kann sich in andere hineinversetzen und ist ein fürsorgliches, soziales Wesen geworden.", 
      "abilities": ["Zeigt echte Empathie und Mitgefühl", "Entwickelt ein klares Ich-Bewusstsein", "Versteht Familiengefüge und Beziehungen", "Kann sich in andere hineinversetzen", "Nimmt soziale Verantwortung wahr", "Kann kooperativ spielen und teilen"] 
    },
    "why": "Das Gehirn sieht Zusammenhänge zwischen Menschen. 'Wenn Mama traurig ist, bin ich auch betroffen.' Das ist der Beginn von sozialem Bewusstsein und echter zwischenmenschlicher Verbundenheit.",
    "actions": ["Benenne Gefühle bewusst: 'Du siehst traurig aus'", "Erkläre Familienbeziehungen einfach", "Ermögliche Rollenspiele (Puppen, Figuren)", "Zeige eigene Gefühle authentisch", "Respektiere die wachsende Sensibilität"] 
  },
  // Jahr 2-3: Die 4 neuen Phasen
  {
    "week": 76, "weekEnd": 90, "title": "Die Konsolidierung",
    "phase": "Jahr 2", "age": "18-21 Monate",
    "stormPhase": { 
      "description": "Die Frequenz der akuten Sprünge verlangsamt sich, aber ein neuer, heftiger Rückfall kann eintreten: Das Kind wird plötzlich wieder anhänglich, obwohl es gerade erst angefangen hat, selbstständig zu werden. Die Ich-Entdeckung im Spiegel markiert einen weiteren kognitiven Meilenstein.", 
      "symptoms": ["Der '22-Monats-Schub': Erneutes anhängliches Verhalten", "Erkennt sich sicher im Spiegel (Ich-Entdeckung)", "Wortschatz wächst, aber noch holprig", "Erste Versuche, Emotionen zu benennen ('traurig', 'müde')", "Sichereres Rennen, aber noch stolperanfällig", "Hüpfen mit beiden Füßen wird versucht"] 
    },
    "sunnyPhase": { 
      "description": "Dein Kind konsolidiert die bisherigen Fortschritte. Es wird selbstsicherer, spricht mehr, versteht sich selbst besser. Die Welt wird langsam berechenbarer - für euch beide.", 
      "abilities": ["Wortschatz von ca. 50 Wörtern", "Erste Benennung von Emotionen", "Sichereres Rennen und Treppensteigen an der Hand", "Hüpfen mit beiden Füßen", "Sicheres Selbsterkennen im Spiegel", "Versteht einfache Bitten und Anweisungen"] 
    },
    "why": "Das Gehirn verarbeitet und festigt die bisherigen Sprünge. Die myelinisierten Nervenbahnen ermöglichen jetzt schnellere Informationsverarbeitung. Das Kind begreift: 'Ich bin ich' - ein revolutionäres Selbstverständnis.",
    "actions": ["Geduld bei Rückschritten: Das ist normal und zeigt Verarbeitung", "Spiele Spiegel-Spiele: 'Wer ist das da?'", "Fördere Sprache durch Vorlesen und Nachsprechen", "Biete Bewegungsangebote: Hüpfen, balancieren, tanzen", "Respektiere das plötzliche Anhänglichkeit - es braucht Sicherheit"] 
  },
  {
    "week": 91, "weekEnd": 115, "title": "Die Autonomie-Explosion",
    "phase": "Jahr 2", "age": "2 Jahre", "subtitle": "Die Trotzphase",
    "stormPhase": { 
      "description": "Willkommen in der klassischen Trotzphase! Dein Kind will selbstständig sein, hat aber noch nicht die Fähigkeiten dazu. Dieser Konflikt zwischen Wunsch und Wirklichkeit führt zu heftigen Wutanfällen. Es ist frustrierend, herausfordernd, aber auch unglaublich wichtig für die Entwicklung.", 
      "symptoms": ["Heftige Wutanfälle durch Konflikt Wunsch vs. Fähigkeit", "'Nein!' wird zum Lieblingswort", "Will alles alleine machen, auch wenn es nicht klappt", "Frustriert bei Scheitern", "Testet Grenzen konsequent", "Sturheit in Ritualen"] 
    },
    "sunnyPhase": { 
      "description": "Die Sprachexplosion! Dein Kind lernt Wörter im Schnellverfahren, bildet erste Sätze und versteht die Welt plötzlich viel besser. Es kann sich mitteilen, Wünsche äußern, Geschichten erzählen.", 
      "abilities": ["Sprachexplosion: Wortschatz steigt auf 200-300 Wörter", "Bildung von 3-Wort-Sätzen", "Sortieren nach Farben und Formen", "Bauen von Türmen aus 6-7 Klötzen", "Erstes echtes Rollenspiel", "Zeigt Präferenzen und Ablehnungen deutlich"] 
    },
    "why": "Das Gehirn erlebt eine massive Synapsenbildung in den Sprachzentren. Gleichzeitig entwickelt sich das präfrontale Cortex - die Steuerzentrale für Impulskontrolle und Planung. Das Kind WILL, aber kann noch nicht umsetzen.",
    "actions": ["Biete Wahlmöglichkeiten an: 'Erst Zähne putzen, dann Pyjama?'", "Bleibe ruhig bei Wutanfällen - das Kind kann sich noch nicht regulieren", "Hilf bei Aufgaben, aber lass es selbst entscheiden", "Sprache födern: Vorlesen, singen, reden, reden, reden", "Feier kleine Autonomie-Erfolge: 'Du hast es alleine gemacht!'"] 
  },
  {
    "week": 116, "weekEnd": 140, "title": "Die Welt der Symbole",
    "phase": "Jahr 2-3", "age": "ca. 2,5 Jahre",
    "stormPhase": { 
      "description": "Fantasie und Realität verschwimmen. Ein Stock wird zum Zauberstab, eine Kiste zum Auto. Das Kind lebt in einer magischen Welt voller Möglichkeiten - aber auch voller Ängste. Die Trennung zwischen Realität und Vorstellung ist noch fließend.", 
      "symptoms": ["Beginn des Symbolspiels - alles wird zu etwas anderem", "Ängste vor Monstern, dunklen Ecken, imaginären Wesen", "Unterscheidet noch nicht klar zwischen Fantasie und Realität", "Erste Versuche beim Trockenwerden", "Will einfache Kleidungsstücke alleine ausziehen", "Parallelspiel wandelt sich zu erstem Zusammenspiel"] 
    },
    "sunnyPhase": { 
      "description": "Dein Kind entdeckt die Magie der Vorstellungskraft! Es kann jetzt spielen, ohne Gegenstände - nur mit der Kraft der Fantasie. Diese symbolische Denkfähigkeit ist der Grundstein für Kreativität, Sprache und abstraktes Denken.", 
      "abilities": ["Kann Gegenstände symbolisch nutzen (Stock = Zauberstab)", "Erstes echtes Zusammenspiel mit anderen Kindern", "Trockenwerden funktioniert zunehmend", "Kann einfache Kleidungsstücke alleine an- und ausziehen", "Erzählt kleine Geschichten aus der Fantasie", "Versteht einfache Regeln in Spielen"] 
    },
    "why": "Das Gehirn entwickelt die Fähigkeit zur Repräsentation - Dinge können für andere Dinge stehen. Das ist die Voraussetzung für Sprache (Wörter stehen für Dinge), Mathematik und kreatives Denken.",
    "actions": ["Nimm symbolisches Spiel ernst: 'Oh, das ist ein Zauberstab!'", "Beruhige bei Ängsten: 'Ich sehe auch keine Monster, ich beschütze dich'", "Fördere Trockenwerden ohne Druck", "Lass es beim Anziehen helfen - auch wenn es länger dauert", "Spiele mit: Baue Höhlen, reise zum Mond, sei ein Drache"] 
  },
  {
    "week": 141, "weekEnd": 156, "title": "Warum? & Magisches Denken",
    "phase": "Jahr 3", "age": "3 Jahre", "subtitle": "Der große 3-Jahres-Umbruch",
    "stormPhase": { 
      "description": "Der Übergang zum Kindergartenkind. Die 'Warum-Phase' erreicht ihren Höhepunkt - jedes Wort wird mit 'Warum?' beantwortet. Magisches Denken herrscht vor: Die Grenze zwischen Fantasie und Realität ist verschwommen. Das Kind glaubt an beseelte Gegenstände und hat intensive Ängste.", 
      "symptoms": ["Ständiges Fragen 'Warum?' zur Erkundung von Zusammenhängen", "Magisches Denken: Glaube an beseelte Gegenstände", "Ängste vor Dunkelheit, Monstern, imaginären Bedrohungen", "Perfektionismus: Will alles 'richtig' machen", "Stimmungsschwankungen", "Kann zwischen Fantasie und Realität noch nicht trennen"] 
    },
    "sunnyPhase": { 
      "description": "Dein Kind wird zum kleinen Wissenschaftler und Geschichtenerzähler! Mit einem Wortschatz von fast 1000 Wörtern kann es komplexe Zusammenhänge erklären, Fragen stellen und Antworten verstehen. Es ist bereit für den Kindergarten.", 
      "abilities": ["Wortschatz von ca. 900-1000 Wörtern", "Kann Fahren von Dreirad oder Laufrad", "Sicheres Balancieren und Bewegen", "Versteht komplexe Anweisungen", "Kann kurze Geschichten nachspielen", "Erstes Verständnis von Zeit (gestern, morgen)"] 
    },
    "why": "Das Gehirn erreicht eine neue Reife. Die Sprachzentren sind stark vernetzt, die motorische Kontrolle erlaubt komplexe Bewegungsabläufe. Das Kind versteht nun kausale Zusammenhänge und will die Welt erklärt haben.",
    "actions": ["Beantworte 'Warum?'-Fragen geduldig - das ist Lernen", "Respektiere magisches Denken: 'Der Teddy schläft auch gleich'", "Beruhige bei Ängsten, aber nimm sie ernst", "Fördere Motorik: Dreirad, Klettern, Balancieren", "Bereite auf Kindergarten vor: Besuche, Rituale besprechen"] 
  }
];

const TABS = [
  { id: 1, label: 'Zustand', icon: Cloud, color: 'text-sky-500' },
  { id: 2, label: 'Warum', icon: Brain, color: 'text-violet-500' },
  { id: 3, label: 'Lernt', icon: Sprout, color: 'text-green-500' },
  { id: 4, label: 'Tun', icon: Lightbulb, color: 'text-amber-500' },
  { id: 5, label: 'Zeit', icon: Calendar, color: 'text-rose-500' },
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
      week: 0,
      weekEnd: 4,
      title: "Neugeborenen-Phase",
      isInLeap: false,
      phase: "Neugeborenes",
      age: "0-4 Wochen",
      description: "Die ersten Wochen des Lebens. Dein Baby passt sich an die Welt außerhalb des Mutterleibs an.",
      details: "Schlafen, Füttern, Bindung aufbauen - das sind die Prioritäten in den ersten Wochen."
    };
  }
  
  for (const leap of TEMPLATES) {
    if (week >= leap.week && week <= leap.weekEnd) {
      return { ...leap, isInLeap: true };
    }
    // Wenn nach diesem Sprung aber vor dem nächsten
    const nextLeap = TEMPLATES[TEMPLATES.indexOf(leap) + 1];
    if (week > leap.weekEnd && (!nextLeap || week < nextLeap.week)) {
      return { ...leap, isInLeap: false };
    }
  }
  // Nach dem letzten Sprung
  return { ...TEMPLATES[TEMPLATES.length - 1], isInLeap: week <= TEMPLATES[TEMPLATES.length - 1].weekEnd };
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
  const isToddler = week >= 76;

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

      <main className="container max-w-3xl mx-auto px-6 py-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="space-y-6"
        >
          <div className="text-center py-4">
            <p className="text-sm text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)]">
              {isToddler ? `${leap.phase} · ${leap.age}` : `Woche ${week}`}
            </p>
            <h2 className="text-[1.8rem] sm:text-[2.2rem] font-extrabold text-[hsl(25,22%,16%)] dark:text-white mt-1 leading-[1.1]">
              {leap.title}
            </h2>
            {leap.subtitle && (
              <p className="text-[hsl(17,75%,56%)] font-medium mt-1">{leap.subtitle}</p>
            )}
            <div className={`inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-full text-sm font-medium ${
              isStorm 
                ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300' 
                : 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300'
            }`}>
              <span className="text-lg">{isStorm ? '🌩️' : '☀️'}</span>
              {isStorm ? 'Stürmische Phase' : 'Sonnige Phase'}
            </div>
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
                  
                  {/* Sicherheitshinweis bei Storm-Phasen */}
                  {isStorm && (
                    <div className="mt-6 p-5 bg-gradient-to-br from-rose-50 to-orange-50 dark:from-rose-900/20 dark:to-orange-900/20 rounded-2xl border border-rose-200 dark:border-rose-800/50">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-rose-100 dark:bg-rose-800/50 rounded-full flex items-center justify-center text-2xl">
                          💝
                        </div>
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-bold text-rose-700 dark:text-rose-300 text-[1.05rem]">
                              Du fühlst dich überfordert?
                            </h4>
                            <p className="text-sm text-rose-600/80 dark:text-rose-400/80 mt-1 leading-relaxed">
                              Das ist völlig normal. Jede*r braucht mal eine Pause. Wenn das Weinen zu viel wird, leg das Baby sicher in sein Bettchen und hol dir Unterstützung – von Partner*in, Familie, Freund*innen oder professioneller Hilfe.
                            </p>
                          </div>
                          
                          <div className="pt-3 border-t border-rose-200/50 dark:border-rose-800/30">
                            <div className="flex items-start gap-2">
                              <span className="text-rose-500 text-lg">⚠️</span>
                              <p className="text-sm text-rose-700 dark:text-rose-300 font-medium">
                                Wichtiger Hinweis: Ein Baby niemals schütteln
                              </p>
                            </div>
                            <p className="text-xs text-rose-600/70 dark:text-rose-400/70 mt-1 pl-6">
                              Selbst kurzes Schütteln kann schwerwiegende gesundheitliche Schäden verursachen. Bei extremem Stress: Baby sicher ablegen, Raum verlassen, tief durchatmen und Hilfe holen.
                            </p>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 pt-2">
                            <span className="px-3 py-1.5 bg-white/70 dark:bg-white/10 rounded-full text-xs text-rose-600 dark:text-rose-400">
                              📞 Telefonseelsorge: 0800 111 0 111
                            </span>
                            <span className="px-3 py-1.5 bg-white/70 dark:bg-white/10 rounded-full text-xs text-rose-600 dark:text-rose-400">
                              👨‍⚕️ Beratungsstellen: familien-helfer.de
                            </span>
                          </div>
                        </div>
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
                  {/* ALLE PHASEN BUTTON - DIREKT ÜBER ZEITLINIE */}
                  <Link to="/leaps">
                    <motion.div 
                      className="relative overflow-hidden p-5 bg-gradient-to-br from-[hsl(17,75%,56%)] to-[hsl(18,85%,58%)] rounded-2xl text-white shadow-[0_8px_30px_-10px_rgba(233,110,75,0.5)] cursor-pointer group"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                      
                      <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                            <span className="text-2xl">📊</span>
                          </div>
                          <div>
                            <p className="font-bold text-lg">Alle Phasen</p>
                            <p className="text-white/80 text-sm">Woche 1-156 im Überblick</p>
                          </div>
                        </div>
                        <motion.span 
                          className="text-2xl"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </div>
                    </motion.div>
                  </Link>

                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 text-blue-500">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <h3 className="text-[1.35rem] font-bold text-[hsl(25,22%,16%)] dark:text-white">Zeitlinie</h3>
                  </div>
                  <div className="space-y-3 pl-[3.75rem]">
                    <div className="p-5 bg-rose-50 dark:bg-rose-900/20 rounded-xl border-2 border-[hsl(17,75%,56%)]/20">
                      <p className="text-sm text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)]">
                        {isToddler ? `${leap.phase} · ${leap.age}` : `Woche ${leap.week}–${leap.weekEnd}`}
                      </p>
                    </div>
                    
                    {leap.week < 156 && (
                      <div className="p-4 bg-gray-50 dark:bg-[hsl(210,20%,10%)]/50 rounded-xl">
                        <p className="text-sm text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)] mb-1">Nächste Phase</p>
                        <p className="font-medium text-[hsl(25,22%,16%)] dark:text-white">
                          {leap.weekEnd >= 156 ? 'Bereit für den Kindergarten!' : `Nächste Phase in ${leap.weekEnd - week + 1} Wochen`}
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

      {/* App-like Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-[hsl(210,25%,8%)]/95 backdrop-blur-xl border-t border-[hsl(25,20%,90%)] dark:border-[hsl(210,20%,20%)] pb-[env(safe-area-inset-bottom,0px)]">
        <div className="flex items-center justify-around max-w-3xl mx-auto px-2">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <PopButton
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center py-2 px-3 min-w-[64px] transition-all duration-200 ${
                  isActive ? 'scale-105' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <div className={`p-2 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-[hsl(17,75%,56%)]/10 shadow-[0_4px_12px_-4px_rgba(233,110,75,0.4)]' 
                    : ''
                }`}>
                  <Icon 
                    className={`h-5 w-5 sm:h-6 sm:w-6 transition-colors duration-200 ${
                      isActive ? 'text-[hsl(17,75%,56%)]' : 'text-[hsl(25,10%,50%)] dark:text-[hsl(30,10%,55%)]'
                    }`} 
                  />
                </div>
                <span className={`text-[10px] sm:text-xs font-semibold mt-1 transition-colors duration-200 ${
                  isActive 
                    ? 'text-[hsl(17,75%,56%)]' 
                    : 'text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,55%)]'
                }`}>
                  {tab.label}
                </span>
              </PopButton>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
