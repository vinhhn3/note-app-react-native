import { useContext } from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import { NotesContext } from "../context/NotesContext";

const NoteList = () => {
  const { notes } = useContext(NotesContext); // Access global notes from NotesContext

  return (
    <FlatList
      data={notes}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Text style={styles.note}>{item.content}</Text>}
    />
  );
};

const styles = StyleSheet.create({
  note: {
    padding: 15,
    backgroundColor: "white",
    marginTop: 10,
    borderRadius: 5,
  },
});

export default NoteList;
