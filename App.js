import { StyleSheet, Text, View } from "react-native";
import CreateNote from "./components/CreateNote";
import NoteList from "./components/NoteList";
import { NotesProvider } from "./context/NotesContext";

export default () => {
  return (
    <NotesProvider>
      <View style={styles.container}>
        <Text style={styles.title}>My Notes</Text>
        <CreateNote />
        <NoteList />
      </View>
    </NotesProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
