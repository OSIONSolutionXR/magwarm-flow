// Notes Storage Utility for MagWarm Flow App
// Speichert Notizen in localStorage unter dem Key 'magwarm_notes'

const STORAGE_KEY = 'magwarm_notes';

// Verfügbare Tags/Kategorien
export const AVAILABLE_TAGS = [
  { id: 'sleep', label: 'Schlaf', color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' },
  { id: 'food', label: 'Essen', color: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300' },
  { id: 'development', label: 'Entwicklung', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300' },
  { id: 'health', label: 'Gesundheit', color: 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300' },
  { id: 'mood', label: 'Stimmung', color: 'bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300' },
  { id: 'other', label: 'Sonstiges', color: 'bg-gray-100 text-gray-700 dark:bg-gray-800/50 dark:text-gray-300' },
];

/**
 * Generiert eine eindeutige ID
 */
export function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Berechnet die aktuelle Woche basierend auf dem dueDate
 */
export function getCurrentWeek(dueDate) {
  const now = new Date();
  const due = new Date(dueDate);
  const diffTime = now.getTime() - due.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
}

/**
 * Formatiert ein Datum für die Anzeige
 */
export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Formatiert nur das Datum (ohne Uhrzeit)
 */
export function formatDateOnly(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

/**
 * Holt alle Notizen aus dem localStorage
 */
export function getAllNotes() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Fehler beim Laden der Notizen:', error);
    return [];
  }
}

/**
 * Holt alle Notizen für ein bestimmtes Baby
 */
export function getNotesByBabyId(babyId) {
  const allNotes = getAllNotes();
  return allNotes.filter(note => note.babyId === babyId);
}

/**
 * Holt Notizen für ein Baby in einer bestimmten Woche
 */
export function getNotesByBabyAndWeek(babyId, week) {
  const babyNotes = getNotesByBabyId(babyId);
  return babyNotes.filter(note => note.week === week);
}

/**
 * Holt eine einzelne Notiz anhand ihrer ID
 */
export function getNoteById(noteId) {
  const allNotes = getAllNotes();
  return allNotes.find(note => note.id === noteId);
}

/**
 * Erstellt eine neue Notiz
 */
export function createNote(babyId, dueDate, content, tags = []) {
  const allNotes = getAllNotes();
  const newNote = {
    id: generateId(),
    babyId,
    date: new Date().toISOString(),
    week: getCurrentWeek(dueDate),
    content: content.trim(),
    tags: tags || [],
  };
  
  const updatedNotes = [newNote, ...allNotes];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));
  return newNote;
}

/**
 * Aktualisiert eine bestehende Notiz
 */
export function updateNote(noteId, updates) {
  const allNotes = getAllNotes();
  const noteIndex = allNotes.findIndex(note => note.id === noteId);
  
  if (noteIndex === -1) return null;
  
  const updatedNote = {
    ...allNotes[noteIndex],
    ...updates,
    date: new Date().toISOString(), // Aktualisiere Zeitstempel bei Bearbeitung
  };
  
  allNotes[noteIndex] = updatedNote;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allNotes));
  return updatedNote;
}

/**
 * Löscht eine Notiz anhand ihrer ID
 */
export function deleteNote(noteId) {
  const allNotes = getAllNotes();
  const filteredNotes = allNotes.filter(note => note.id !== noteId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredNotes));
  return filteredNotes.length < allNotes.length;
}

/**
 * Exportiert alle Notizen eines Babys als JSON-Datei
 */
export function exportNotes(babyId, babyName) {
  const notes = getNotesByBabyId(babyId);
  const dataStr = JSON.stringify(notes, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `magwarm-notizen-${babyName.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Löscht alle Notizen eines Babys (z.B. beim Löschen des Babys)
 */
export function deleteAllNotesForBaby(babyId) {
  const allNotes = getAllNotes();
  const filteredNotes = allNotes.filter(note => note.babyId !== babyId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredNotes));
}