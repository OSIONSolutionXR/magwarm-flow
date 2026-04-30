// TEMPLATE: communityStories.js
// Description: Community stories/geschichten von Eltern für bestimmte Entwicklungsphasen
// Usage: Importiere diese Konstante und filtere nach phaseWeek um relevante Geschichten anzuzeigen

export const COMMUNITY_STORIES = [
  {
    "id": "string - eindeutige ID",
    "phaseWeek": "number - Woche (5, 8, 12, 19, 26, 37, 46, 55, 64, 75, 91, 116, 141 usw.)",
    "author": "string - Name und Beziehung (z.B. 'Lisa, Mutter von Emma (7 Monate)')",
    "title": "string - Titel der Geschichte",
    "content": "string - Längerer Text mit persönlicher Erfahrung",
    "tags": ["array", "von", "strings", "mit", "Keywords"],
    "likes": "number - Anzahl Likes"
  }
  // ... weitere Einträge
];

export default COMMUNITY_STORIES;
