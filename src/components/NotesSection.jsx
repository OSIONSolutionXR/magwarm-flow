import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  X, 
  Calendar,
  Tag,
  ChevronDown,
  ChevronUp,
  Download,
  Filter
} from 'lucide-react';
import { Card, CardContent } from './Card';
import { PopButton } from './PopEffect';
import {
  getNotesByBabyId,
  getNotesByBabyAndWeek,
  createNote,
  updateNote,
  deleteNote,
  exportNotes,
  formatDate,
  formatDateOnly,
  AVAILABLE_TAGS,
} from '../utils/notesStorage';

export default function NotesSection({ baby, currentWeek }) {
  const [notes, setNotes] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [newContent, setNewContent] = useState('');
  const [editContent, setEditContent] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [editTags, setEditTags] = useState([]);
  const [showAllNotes, setShowAllNotes] = useState(false);
  const [filterCurrentWeek, setFilterCurrentWeek] = useState(false);

  // Notizen laden
  useEffect(() => {
    if (baby?.id) {
      const babyNotes = getNotesByBabyId(baby.id);
      setNotes(babyNotes);
    }
  }, [baby?.id]);

  // Notizen neu laden
  const refreshNotes = () => {
    const babyNotes = getNotesByBabyId(baby.id);
    setNotes(babyNotes);
  };

  // Neue Notiz speichern
  const handleSaveNew = () => {
    if (!newContent.trim()) return;
    
    createNote(baby.id, baby.dueDate, newContent, selectedTags);
    setNewContent('');
    setSelectedTags([]);
    setIsAdding(false);
    refreshNotes();
  };

  // Notiz bearbeiten
  const handleStartEdit = (note) => {
    setEditingNoteId(note.id);
    setEditContent(note.content);
    setEditTags(note.tags || []);
  };

  const handleSaveEdit = () => {
    if (!editContent.trim()) return;
    
    updateNote(editingNoteId, { 
      content: editContent,
      tags: editTags,
    });
    setEditingNoteId(null);
    setEditContent('');
    setEditTags([]);
    refreshNotes();
  };

  const handleCancelEdit = () => {
    setEditingNoteId(null);
    setEditContent('');
    setEditTags([]);
  };

  // Notiz löschen
  const handleDelete = (noteId) => {
    if (window.confirm('Möchtest du diese Notiz wirklich löschen?')) {
      deleteNote(noteId);
      refreshNotes();
    }
  };

  // Tag umschalten
  const toggleTag = (tagId, isEdit = false) => {
    if (isEdit) {
      setEditTags(prev => 
        prev.includes(tagId) 
          ? prev.filter(t => t !== tagId)
          : [...prev, tagId]
      );
    } else {
      setSelectedTags(prev => 
        prev.includes(tagId) 
          ? prev.filter(t => t !== tagId)
          : [...prev, tagId]
      );
    }
  };

  // Notizen filtern
  const filteredNotes = filterCurrentWeek 
    ? notes.filter(n => n.week === currentWeek)
    : notes;

  // Notizen sortieren (neueste zuerst)
  const sortedNotes = [...filteredNotes].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );

  // Wochen-Notizen für die aktuelle Woche
  const currentWeekNotes = notes.filter(n => n.week === currentWeek);

  // Tag-Label suchen
  const getTagLabel = (tagId) => {
    const tag = AVAILABLE_TAGS.find(t => t.id === tagId);
    return tag?.label || tagId;
  };

  // Tag-Farbe suchen
  const getTagColor = (tagId) => {
    const tag = AVAILABLE_TAGS.find(t => t.id === tagId);
    return tag?.color || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-4">
      {/* Header mit Titel und Aktionen */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-100 to-violet-200 text-violet-600">
            <Calendar className="h-4 w-4" />
          </div>
          <h3 className="text-lg font-bold text-[hsl(25,22%,16%)] dark:text-white">
            Notizen
          </h3>
          <span className="text-sm text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)]">
            ({currentWeekNotes.length} diese Woche)
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <PopButton
            onClick={() => exportNotes(baby.id, baby.name)}
            className="p-2 text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)] hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
            title="Notizen exportieren"
          >
            <Download className="h-4 w-4" />
          </PopButton>
          <PopButton
            onClick={() => setIsAdding(!isAdding)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              isAdding 
                ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300'
                : 'bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300 hover:bg-violet-200 dark:hover:bg-violet-800/50'
            }`}
          >
            {isAdding ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {isAdding ? 'Abbrechen' : 'Neue Notiz'}
          </PopButton>
        </div>
      </div>

      {/* Neue Notiz Formular */}
      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="border-violet-200 dark:border-violet-800/50">
              <CardContent className="p-4 space-y-3">
                <textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Schreibe deine Beobachtung hier..."
                  className="w-full p-3 bg-gray-50 dark:bg-[hsl(210,20%,12%)] border border-gray-200 dark:border-gray-700 rounded-xl text-[hsl(25,22%,16%)] dark:text-white placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                  rows={3}
                  autoFocus
                />
                
                {/* Tag-Auswahl */}
                <div className="flex flex-wrap gap-1.5">
                  <Tag className="h-4 w-4 text-gray-400 mr-1" />
                  {AVAILABLE_TAGS.map((tag) => (
                    <button
                      key={tag.id}
                      onClick={() => toggleTag(tag.id)}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                        selectedTags.includes(tag.id)
                          ? tag.color
                          : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {tag.label}
                    </button>
                  ))}
                </div>

                <div className="flex justify-end gap-2">
                  <PopButton
                    onClick={() => {
                      setIsAdding(false);
                      setNewContent('');
                      setSelectedTags([]);
                    }}
                    className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                  >
                    Abbrechen
                  </PopButton>
                  <PopButton
                    onClick={handleSaveNew}
                    disabled={!newContent.trim()}
                    className="flex items-center gap-1.5 px-4 py-1.5 bg-violet-500 text-white rounded-lg text-sm font-medium hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Save className="h-4 w-4" />
                    Speichern
                  </PopButton>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Aktuelle Woche Notizen */}
      {!showAllNotes && currentWeekNotes.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-[hsl(25,10%,45%)] dark:text-[hsl(30,10%,60%)]">
            Notizen für Woche {currentWeek}
          </p>
          {currentWeekNotes
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              isEditing={editingNoteId === note.id}
              editContent={editContent}
              editTags={editTags}
              onEditChange={setEditContent}
              onTagToggle={(tagId) => toggleTag(tagId, true)}
              onSave={handleSaveEdit}
              onCancel={handleCancelEdit}
              onStartEdit={() => handleStartEdit(note)}
              onDelete={() => handleDelete(note.id)}
              getTagLabel={getTagLabel}
              getTagColor={getTagColor}
              formatDate={formatDate}
            />
          ))}
        </div>
      )}

      {/* Alle Notizen Bereich */}
      {notes.length > 0 && (
        <div className="pt-2">
          <button
            onClick={() => setShowAllNotes(!showAllNotes)}
            className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-[hsl(210,20%,10%)]/50 rounded-xl hover:bg-gray-100 dark:hover:bg-[hsl(210,20%,12%)] transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-[hsl(25,22%,16%)] dark:text-white">
                Alle Notizen
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                ({notes.length})
              </span>
            </div>
            <div className="flex items-center gap-2">
              {showAllNotes && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setFilterCurrentWeek(!filterCurrentWeek);
                  }}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs transition-colors ${
                    filterCurrentWeek
                      ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300'
                      : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  <Filter className="h-3 w-3" />
                  {filterCurrentWeek ? 'Nur diese Woche' : 'Alle'}
                </button>
              )}
              <motion.div
                animate={{ rotate: showAllNotes ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </motion.div>
            </div>
          </button>

          <AnimatePresence>
            {showAllNotes && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-3 space-y-3"
              >
                {sortedNotes.length > 0 ? (
                  sortedNotes.map((note) => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      isEditing={editingNoteId === note.id}
                      editContent={editContent}
                      editTags={editTags}
                      onEditChange={setEditContent}
                      onTagToggle={(tagId) => toggleTag(tagId, true)}
                      onSave={handleSaveEdit}
                      onCancel={handleCancelEdit}
                      onStartEdit={() => handleStartEdit(note)}
                      onDelete={() => handleDelete(note.id)}
                      getTagLabel={getTagLabel}
                      getTagColor={getTagColor}
                      formatDate={formatDate}
                      showWeek={true}
                    />
                  ))
                ) : (
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 py-4">
                    Keine Notizen vorhanden
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Leerer Zustand */}
      {!isAdding && notes.length === 0 && (
        <div className="text-center py-8 bg-gray-50/50 dark:bg-[hsl(210,20%,10%)]/30 rounded-xl">
          <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
            <Calendar className="h-6 w-6 text-violet-400" />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Noch keine Notizen vorhanden
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            Füge deine erste Beobachtung hinzu
          </p>
        </div>
      )}
    </div>
  );
}

// Einzelne Notiz-Karte Komponente
function NoteCard({
  note,
  isEditing,
  editContent,
  editTags,
  onEditChange,
  onTagToggle,
  onSave,
  onCancel,
  onStartEdit,
  onDelete,
  getTagLabel,
  getTagColor,
  formatDate,
  showWeek = false,
}) {
  if (isEditing) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
      >
        <Card className="border-violet-200 dark:border-violet-800/50 shadow-lg">
          <CardContent className="p-4 space-y-3">
            <textarea
              value={editContent}
              onChange={(e) => onEditChange(e.target.value)}
              className="w-full p-3 bg-gray-50 dark:bg-[hsl(210,20%,12%)] border border-gray-200 dark:border-gray-700 rounded-xl text-[hsl(25,22%,16%)] dark:text-white placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-violet-500/50"
              rows={3}
              autoFocus
            />
            
            {/* Tag-Auswahl beim Bearbeiten */}
            <div className="flex flex-wrap gap-1.5">
              <Tag className="h-4 w-4 text-gray-400 mr-1" />
              {AVAILABLE_TAGS.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => onTagToggle(tag.id)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                    editTags.includes(tag.id)
                      ? tag.color
                      : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {tag.label}
                </button>
              ))}
            </div>

            <div className="flex justify-end gap-2">
              <PopButton
                onClick={onCancel}
                className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                Abbrechen
              </PopButton>
              <PopButton
                onClick={onSave}
                disabled={!editContent.trim()}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-violet-500 text-white rounded-lg text-sm font-medium hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Save className="h-4 w-4" />
                Speichern
              </PopButton>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex justify-between items-start gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-[hsl(25,22%,16%)] dark:text-white whitespace-pre-wrap leading-relaxed">
                {note.content}
              </p>
              
              {/* Tags anzeigen */}
              {note.tags && note.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {note.tags.map((tagId) => (
                    <span
                      key={tagId}
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTagColor(tagId)}`}
                    >
                      {getTagLabel(tagId)}
                    </span>
                  ))}
                </div>
              )}
              
              {/* Zeitstempel und Woche */}
              <div className="flex items-center gap-2 mt-3 text-xs text-gray-400 dark:text-gray-500">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(note.date)}</span>
                {showWeek && (
                  <>
                    <span className="text-gray-300">•</span>
                    <span className="text-violet-500 dark:text-violet-400 font-medium">
                      Woche {note.week}
                    </span>
                  </>
                )}
              </div>
            </div>
            
            {/* Aktionen */}
            <div className="flex flex-col gap-1">
              <PopButton
                onClick={onStartEdit}
                className="p-1.5 text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                title="Bearbeiten"
              >
                <Edit2 className="h-4 w-4" />
              </PopButton>
              <PopButton
                onClick={onDelete}
                className="p-1.5 text-gray-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
                title="Löschen"
              >
                <Trash2 className="h-4 w-4" />
              </PopButton>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}