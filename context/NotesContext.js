import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SQLite from "expo-sqlite";
import { createContext, useEffect, useState } from "react";

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  // Global state for notes
  const [notes, setNotes] = useState([]);
  const [db, setDb] = useState(null);

  // Open/Create the SQLIte Database
  useEffect(() => {
    const initDb = async () => {
      try {
        const database = await SQLite.openDatabaseAsync("notes.db");
        setDb(database);
      } catch (error) {
        alert("Error initializing database:", error);
      }
    };
    initDb();
  }, []);

  // Create the table if it doesn't exist
  useEffect(() => {
    if (db) {
      db.execAsync(
        `
        CREATE TABLE IF NOT EXISTS notes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          content TEXT NOT NULL
        );
      `
      ).catch((error) => console.error("Error creating table:", error));
    }
  }, [db]);

  useEffect(() => {
    if (db) loadNotes();
  }, [db]);

  useEffect(() => {
    if (notes.length > 0) {
      saveNotes(notes);
    }
  }, [notes]);

  // Global Function to add a note
  const saveNotes = async (notesToSave) => {
    try {
      await AsyncStorage.setItem("notes", JSON.stringify(notesToSave));
    } catch (error) {
      console.error("Error saving notes:", error);
    }
  };

  const loadNotes = async () => {
    if (!db) return;

    try {
      const result = await db.getAllAsync(
        "SELECT * FROM notes ORDER BY id DESC"
      );
      setNotes(result);
    } catch (error) {
      alert("Error loading notes:", error);
    }
  };

  const addNote = async (content) => {
    if (!db) return;

    try {
      const result = await db.runAsync(
        "INSERT INTO notes (content) VALUES (?)",
        [content]
      );

      // Add the new note to state
      const newNote = {
        id: result.lastInsertRowId,
        content: content,
      };
      setNotes([newNote, ...notes]);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const deleteNote = async (id) => {
    if (!db) return;

    try {
      await db.runAsync("DELETE FROM notes WHERE id = ?", [id]);
      setNotes(notes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, deleteNote }}>
      {children}
    </NotesContext.Provider>
  );
};
