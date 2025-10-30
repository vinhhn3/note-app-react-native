import { useContext } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { NotesContext } from "../context/NotesContext";

const NoteList = () => {
  const { notes, deleteNote } = useContext(NotesContext); // Access global notes from NotesContext

  return (
    <FlatList
      data={notes}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.noteContainer}>
          <Text style={styles.note}>{item.content}</Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteNote(item.id)}
          >
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  noteContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "white",
    marginTop: 10,
    borderRadius: 5,
  },
  note: {
    flex: 1,
  },
  deleteButton: {
    backgroundColor: "#ff6b6b",
    padding: 8,
    borderRadius: 5,
  },
  deleteText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default NoteList;
