import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  // Global state for notes
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    loadNotes();
  }, []);

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
    try {
      const jsonValue = await AsyncStorage.getItem("notes");
      if (jsonValue !== null) {
        setNotes(JSON.parse(jsonValue));
      }
    } catch (error) {
      console.error("Error loading notes:", error);
    }
  };

  const addNote = (content) => {
    setNotes([...notes, { id: Date.now().toString(), content }]);
  };

  return (
    <NotesContext.Provider value={{ notes, addNote }}>
      {children}
    </NotesContext.Provider>
  );
};
