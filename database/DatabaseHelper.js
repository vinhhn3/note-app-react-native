import * as SQLite from "expo-sqlite";

let db = null;

export const initDatabase = async () => {
  try {
    const database = await SQLite.openDatabaseAsync("notes.db");
    await database.execAsync(
      `
        CREATE TABLE IF NOT EXISTS notes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          content TEXT NOT NULL
        );
      `
    );
    db = database;
    console.log("Database initialized successfully.");
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
};

export const fetchNotes = async () => {
  if (!db) {
    console.log("Database not initialized.");
    return [];
  }

  try {
    const result = await db.getAllAsync("SELECT * FROM notes ORDER BY id DESC");
    return result;
  } catch (error) {
    console.error("Error fetching notes:", error);
    alert("Error fetching notes:", error);
    return [];
  }
};

export const insertNote = async (content) => {
  if (!db) {
    console.log("Database not initialized.");
    return null;
  }

  try {
    const result = await db.runAsync(
      "INSERT INTO notes (content) VALUES (?);",
      [content]
    );

    return {
      id: (result.lastInsertRowId || result.insertId).toString(),
      content: content,
    };
  } catch (error) {
    console.error("Error inserting note:", error);
    alert("Error inserting note:", error);
    return null;
  }
};

export const deleteNoteById = async (id) => {
  if (!db) {
    console.log("Database not initialized.");
    return false;
  }

  try {
    await db.runAsync("DELETE FROM notes WHERE id = ?;", [id]);
    return true;
  } catch (error) {
    console.error("Error deleting note:", error);
    alert("Error deleting note:", error);
    return false;
  }
};
