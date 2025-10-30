import { createContext, useEffect, useState } from "react";
import {
  deleteNoteById,
  fetchNotes,
  initDatabase,
  insertNote,
} from "../database/DatabaseHelper";

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  // Global state for notes
  const [notes, setNotes] = useState([]);

  // Open/Create the SQLIte Database
  useEffect(() => {
    const setupDatabaseAndLoadNotes = async () => {
      await initDatabase();
      const loadNotes = await fetchNotes();
      setNotes(loadNotes);
    };
    setupDatabaseAndLoadNotes();
  }, []);

  const addNote = async (content) => {
    try {
      const newNote = await insertNote(content);
      if (newNote) {
        setNotes([newNote, ...notes]); // Add newNote to the current notes
      } else {
        alert("Error adding note.");
      }
    } catch (error) {
      console.error("Error adding note:", error);
      alert("Error adding note:", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const success = await deleteNoteById(id);
      if (success) {
        setNotes(notes.filter((note) => note.id !== id));
      } else {
        alert("Error deleting note.");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("Error deleting note:", error);
    }
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, deleteNote }}>
      {children}
    </NotesContext.Provider>
  );
};
