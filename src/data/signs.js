// Signs-Texte für alle 156 Wochen - Mögliche Anzeichen
export const WEEKLY_SIGNS = {
  1: "Dein kleiner Schatz ist gerade erst angekommen und wirkt oft noch wie in einer anderen Welt versunken. Du bemerkst vielleicht, dass dein Baby fast den ganzen Tag schläft und nur leise Seufzer oder reflexartige Bewegungen von sich gibt, während es sich an das Gefühl von Luft auf der Haut und die neue Freiheit der Gliedmaßen gewöhnt.",
  2: "Langsam scheint dein Baby \"aufzuwachen\" und die Momente, in denen es dich mit großen Augen ansieht, werden etwas länger. Du spürst vielleicht, dass es deine Nähe nun schon aktiver sucht und sich in deinen Armen merklich entspannt, während es beginnt, die ersten schemenhaften Schatten in seiner Umgebung wahrzunehmen.",
  3: "Du bemerkst vielleicht, dass dein Baby am späten Nachmittag unruhiger wird und die ersten \"echten\" Tränen fließen können. Es zieht die Beinchen fest an den Bauch und lässt sich manchmal nur schwer beruhigen, was dir zeigt, dass sein kleiner Körper und seine Sinne nun beginnen, die Außenwelt intensiver zu verarbeiten.",
  4: "Dein Kind wirkt in dieser Woche spürbar reizempfindlicher und scheint auf Geräusche oder plötzliches Licht schneller mit Erschrecken zu reagieren. Die Vorboten des ersten großen Sprungs zeigen sich in einer aufkommenden Quengeligkeit und dem Wunsch, fast ununterbrochen an deiner Brust oder in deinem Arm zu sein.",
  5: "Dein Baby wird von einer Welle neuer Sinneseindrücke überrollt und sucht verzweifelt Schutz bei dir. Es klammert sich fest, weint häufiger und wirkt oft überfordert von der Welt, die plötzlich so viel bunter und lauter scheint – es ist die Zeit, in der dein kleiner Schatz deine bedingungslose Nähe am allermeisten braucht.",
  6: "Die stürmischen Tage lassen langsam nach und machen einer neuen Wachheit Platz. Du bemerkst, dass dein Baby dich nun ganz bewusst anlächelt und sein Blick viel klarer wirkt, während es beginnt, die Gesichter seiner geliebten Menschen mit staunender Neugier zu studieren.",
  7: "Dein Kind wirkt in diesen Tagen sehr zufrieden und ausgeglichen; es scheint seine neue Sehfähigkeit zu genießen und betrachtet fasziniert das Lichtspiel an der Decke oder deine Mimik, während es in den Wachphasen immer aufmerksamer wird.",
  8: "Eine neue Unruhe zieht ein, da dein Baby nun beginnt, Muster und Formen zu erkennen, was seine gewohnte Welt erneut auf den Kopf stellt. Es fremdelt vielleicht zum ersten Mal ein wenig und wirkt nachts oft verloren, während es mit weit aufgerissenen Augen die Dunkelheit des Zimmers fixiert.",
  9: "Dein kleiner Entdecker ist in dieser Woche sehr nähebedürftig und verlangt oft nach dem Schnuller oder der Brust, um die vielen neuen visuellen Eindrücke zu verarbeiten. Du bemerkst, wie es seine Händchen immer wieder zum Mund führt und intensiv daran nuckelt, um sich selbst zu beruhigen.",
  10: "Du spürst eine kleine körperliche Ungeduld bei deinem Kind; es rudert viel mit den Armen und wirkt manchmal frustriert, wenn seine Bewegungen noch nicht so flüssig gelingen, wie es das möchte. Es ist eine Phase des Ausprobierens und der ersten gezielten Kraftanstrengungen.",
  11: "Die Stimmung deines Babys wird wieder harmonischer und du kannst beobachten, wie es seine eigenen Hände wie ein wunderbares Spielzeug betrachtet. Es wirkt in sich ruhend und bereitet sich innerlich auf den nächsten großen kognitiven Durchbruch vor.",
  12: "Dein Baby experimentiert lautstark mit seiner Stimme und überrascht dich mit schrillen Freudenschreien oder glucksenden Lauten. Gleichzeitig wirkt es unruhig und fast ein wenig \"überdreht\", da es nun beginnt, fließende Übergänge in seiner Umwelt wahrzunehmen, was unheimlich spannend, aber auch anstrengend ist.",
  13: "Eine wunderbare Zeit des Sonnenscheins bricht an; dein Baby wirkt sehr kompetent und freut sich sichtlich über jede Interaktion mit dir. Es beginnt, gezielter nach deinen Haaren oder Spielzeugen zu greifen und zeigt dir durch sein Lachen, wie sehr es das Leben genießt.",
  14: "Du bemerkst, dass dein kleiner Schatz beim Trinken immer öfter innehält, um zu schauen, was im Raum passiert. Seine Neugier ist in dieser Woche so groß, dass er kaum stillsitzen kann und jede Bewegung um ihn herum mit größter Aufmerksamkeit verfolgt.",
  15: "Dein Baby ist in dieser Woche motorisch sehr aktiv und versucht vielleicht schon nachts, sich im Bettchen in eine neue Position zu bringen. Es wirkt am Tag manchmal etwas ungeduldig, wenn es merkt, dass sein Körper noch nicht ganz so schnell ist wie sein wacher Geist.",
  16: "Dein Kind zeigt erste Anzeichen von Langeweile, wenn es zu lange allein gelassen wird, und fordert dich lautstark zum Mitspielen auf. Es liebt es nun, Dinge zu schütteln und wartet gespannt auf das Geräusch, was zeigt, wie sehr es die Welt der Ereignisse fasziniert.",
  17: "Eine Phase der Reizbarkeit beginnt und die Tagschläfchen werden plötzlich viel kürzer. Dein Baby wirkt oft quengelig und scheint Schwierigkeiten zu haben, zur Ruhe zu finden, da sein Gehirn den biologischen Umbau des Schlafs vorbereitet.",
  18: "Dein Baby braucht in dieser Woche fast ununterbrochen deine körperliche Rückversicherung und weint oft schon, wenn du nur den Raum verlässt. Es ist eine Zeit der großen emotionalen Unsicherheit, in der es sich an dich klammert, um das \"innere Chaos\" des Wachstums auszuhalten.",
  19: "Dein Kind ist in dieser Woche extrem launisch und scheint seine Gefühle kaum kontrollieren zu können. Es steckt sich alles in den Mund, was es greifen kann, und ist motorisch so aktiv, dass es kaum eine Minute stillliegen möchte – ein echter kleiner Wirbelwind voller Tatendrang.",
  20: "Die Heftigkeit der letzten Tage klingt ab und macht einer großen Freude über Wiederholungen Platz. Dein Baby lacht herzhaft bei \"Kuckuck\"-Spielen und zeigt dir durch sein Strahlen, dass es nun beginnt, kleine Abfolgen im Alltag immer besser zu verstehen.",
  21: "Dein kleiner Entdecker wirkt motorisch sehr ehrgeizig und verbringt viel Zeit damit, sich in der Bauchlage abzustützen. Er zeigt eine gewisse Tagesunruhe, da er nun unbedingt die Welt aus einer neuen Perspektive erkunden möchte.",
  22: "Das Interesse an deinem Essen wächst spürbar; dein Baby beobachtet jeden deiner Bissen mit einer solchen Ernsthaftigkeit, dass man merkt, wie sehr es nun Teil der \"Großen\" sein möchte.",
  23: "Du bemerkst erste kleine Wutausbrüche, wenn ein Spielzeug nicht sofort so funktioniert, wie das Baby es sich vorstellt. Dieser aufkommende Wille zeigt dir, wie sehr dein Kind nun beginnt, seine eigene Wirksamkeit in der Welt auszutesten.",
  24: "Dein Kind ist nachts oft hellwach und scheint im Dunkeln ganze Geschichten zu erzählen, während es am Tag unermüdlich versucht, sich vom Rücken auf den Bauch und wieder zurück zu rollen – ein Zeichen für seine wachsende Unabhängigkeit.",
  25: "Eine neue Form der Unsicherheit macht sich bemerkbar; dein Baby reagiert empfindlicher auf räumliche Distanz und beginnt vielleicht, bei fremden Gesichtern misstrauisch die Unterlippe vorzuschieben.",
  26: "Die Trennungsangst erreicht einen ersten Höhepunkt und dein Baby weint oft schon verzweifelt, wenn du nur aufstehst. Es begreift nun die Welt der Beziehungen und versteht, dass du eine eigene Person bist, die weggehen kann – das macht ihm große Angst und es sucht ständig deine schützende Nähe.",
  27: "Dein Kind fordert deine Aufmerksamkeit in dieser Woche lautstark ein und prüft immer wieder durch Blickkontakt, ob du noch da bist, während es seine ersten kühnen Erkundungsversuche auf dem Boden startet.",
  28: "Die Stimmung wird wieder deutlich sonniger und dein Baby zeigt dir stolz, wie es winken kann oder die Arme nach dir ausstreckt. Es genießt den sozialen Austausch und wirkt sichtlich glücklich über jede Form von gemeinsamer Aufmerksamkeit.",
  29: "Ein starker Drang zur Fortbewegung macht dein Baby in dieser Woche unruhig; es probiert unermüdlich neue Wege aus, um vorwärtszukommen, und wirkt dabei oft sehr angestrengt und konzentriert.",
  30: "Nach seinen aktiven Phasen ist dein Kind in dieser Woche oft sehr schnell erschöpft und reagiert dann mit Weinerlichkeit auf zu viele Reize oder Lärm in seiner Umgebung.",
  31: "Du bemerkst eine faszinierte Ausdauer, wenn dein Baby kleinste Details wie Knöpfe an deiner Bluse oder Krümel auf dem Teppich untersucht. Es wirkt dabei fast wie ein kleiner Wissenschaftler, der jedes Detail genauestens unter die Lupe nehmen muss.",
  32: "Der Appetit deines Babys schwankt in dieser Woche stark und es zeigt dir sehr deutlich durch Wegschieben oder Meckern, wenn es etwas nicht möchte oder einfach nur frustriert über seine motorischen Grenzen ist.",
  33: "Nächtliche Unruhe und ein sehr intensives Träumen zeigen dir, dass dein Kind beginnt, seine Eindrücke in Kategorien zu ordnen – sein kleiner Kopf arbeitet in dieser Woche auf Hochtouren.",
  34: "Dein Baby ist in diesen Tagen sehr auf dich fixiert und reagiert abweisend oder sogar ängstlich gegenüber neuen Situationen, da es seine \"sichere Basis\" bei dir nun ganz bewusst als Anker nutzt.",
  35: "Die Stimmung deines Kindes ist in dieser Woche sehr unberechenbar; eben hat es noch gelacht und im nächsten Moment wirkt es tief betrübt oder wütend, was dir zeigt, wie sehr die inneren Umstrukturierungen an seinen Kräften zehren.",
  36: "Dein Baby wirkt oft geistig abwesend oder starrt Gegenstände für eine lange Zeit ganz konzentriert an, während es sich innerlich auf den nächsten großen kognitiven Sprung vorbereitet.",
  37: "Dein Kind zeigt plötzlich einen sehr starken eigenen Willen und wehrt sich massiv beim Wickeln oder Anziehen, da es seine neu entdeckte Welt der Kategorien viel lieber aktiv erforschen möchte als stillzuliegen. Es ist eine Phase des lauten Protests und der großen Entdeckerlust.",
  38: "Der Forschungsdrang deines Kindes ist in dieser Woche kaum zu bremsen; es räumt mit einer unglaublichen Ausdauer Schränke aus und reagiert verärgert, wenn du es in seinem Tatendrang einschränkst.",
  39: "Dein kleiner Schatz wirkt unmutig, wenn er in den Kinderwagen gesetzt wird, und zeigt nun ganz deutlich mit dem Finger auf Dinge, die er unbedingt haben oder untersuchen möchte.",
  40: "Eine erneute Phase des Fremdelns tritt auf, in der dein Baby in jeder fremden Umgebung am liebsten nur auf deinem Arm bleiben möchte, um sich sicher zu fühlen.",
  41: "Dein Kind ist fasziniert von Reihenfolgen und beobachtet dich ganz genau, wie du die Waschmaschine befüllst oder Schuhe bindest, was es am Abend oft schwer zur Ruhe kommen lässt, da es alles \"nachdenken\" muss.",
  42: "Du bemerkst ersten echten Widerstand gegen gewohnte Regeln und dein kleiner Schatz testet mit einem schelmischen Blick aus, wie du reagierst, wenn er etwas tut, das er eigentlich nicht darf.",
  43: "Dein Kind wirkt motorisch sehr sicher und dadurch oft fast ein wenig übermütig, was in dieser Woche zu schnellen Überreizungen und plötzlichen Weinanfällen vor Erschöpfung führen kann.",
  44: "Eine gewisse Weinerlichkeit beim Zubettgehen und ein spürbar erhöhtes Trostbedürfnis in der Nacht zeigen dir die emotionale Belastung des aktuellen Lernprozesses deines Kindes.",
  45: "Dein kleiner Entdecker ist in dieser Woche begeistert von sozialen Interaktionen und fordert dich ständig durch Laute oder Gesten zum Mitspielen oder Nachahmen auf.",
  46: "Heftige Wutanfälle prägen in dieser Woche den Alltag, wenn eine geplante Handlung nicht sofort gelingt oder du dem Kind etwas wegnimmst – es begreift nun Reihenfolgen und leidet sehr darunter, wenn diese unterbrochen werden.",
  47: "Dein Baby zeigt eine bewundernswerte Ausdauer beim Stapeln von Gegenständen oder beim Versuch, Dinge ineinanderzustecken, und wirkt dabei oft völlig versunken in seine Tätigkeit.",
  48: "Ein unbändiger Drang zum Laufen an der Hand macht dein Kind in dieser Woche sehr unruhig; es möchte ständig in Bewegung sein und protestiert lautstark, wenn es sitzen bleiben soll.",
  49: "Dein kleiner Schatz beobachtet dein Verhalten nun so genau wie nie zuvor und imitiert deine Gestik und sogar deinen Gesichtsausdruck mit einer rührenden Begeisterung.",
  50: "Dein Kind zeigt eine deutliche Abwehr gegen jede Form von Hilfe (\"selber machen!\") und reagiert oft frustriert, wenn seine eigenen Fähigkeiten noch nicht für seine großen Pläne ausreichen.",
  51: "Die Aufregung vor dem ersten Geburtstag und ein spürbar verminderter Schlafbedarf machen dein Kind abends oft sehr aktiv und fast ein wenig \"aufgedreht\".",
  52: "Dein Kind zeigt stolz seine ersten freien Schritte und sucht nach jeder neuen motorischen Leistung sofort deinen Blick und deine Bestätigung, was dir zeigt, wie sehr es an seinem Erfolg gewachsen ist.",
};

// Füge fehlende Wochen 53-156 hinzu (gekürzt für das Beispiel)
for (let i = 53; i <= 156; i++) {
  if (!WEEKLY_SIGNS[i]) {
    WEEKLY_SIGNS[i] = `Entwicklungsbeschreibung für Woche ${i} folgt.`;
  }
}

export function getSignsForWeek(week) {
  return WEEKLY_SIGNS[week] || null;
}
