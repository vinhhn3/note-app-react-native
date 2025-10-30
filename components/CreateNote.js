import { useContext, useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { NotesContext } from "../context/NotesContext";

const CreateNote = () => {
  const [noteText, setNoteText] = useState("");
  const { addNote } = useContext(NotesContext); // Global function from the NotesContext

  const handleAdd = () => {
    if (noteText.trim()) {
      addNote(noteText);
      setNoteText("");
    }
  };
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Enter a note..."
        value={noteText}
        onChangeText={setNoteText}
      />
      <Button title="Save Note" onPress={handleAdd} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "white",
  },
});

export default CreateNote;
