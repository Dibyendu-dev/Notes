import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { NoteList } from "@/components/NoteList";
import AddNoteModal from "@/components/AddNoteModal";
import noteService from "@/services/noteService";

const Index = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    const response = await noteService.getNotes();
    if (response.error) {
      setError(response.error);
      Alert.alert("Error", response.error);
    } else {
      setNotes(response.data);
      setError(null);
    }
    setLoading(false);
  };

  const addNote = async () => {
    if (newNote.trim() === "") return;

    const response = await noteService.addNote(newNote);
    if (response.error) {
      Alert.alert("Error", response.error);
    } else {
      setNotes([...notes, response.data]);
    }

    setNewNote("");
    setModalVisible(false);
  };

  const deleteNote = async (id) => {
    Alert.alert("Delete Note", "Are you sure you want to delete this note?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const response = await noteService.deleteNote(id);
          if (response.error) {
            Alert.alert("Error", response.error);
          } else {
            setNotes(notes.filter((note) => note.$id !== id));
          }
        },
      },
    ]);
  };

  const editNote = async (id, newText) => {
    if (!newText.trim()) {
      Alert.alert("Error", "Note text cannot be empty");
      return;
    }
    const response = await noteService.updateNote(id, newText);
    if (response.error) {
      Alert.alert("Error", response.error);
    } else {
      setNotes((prevNote) =>
        prevNote.map((note) =>
          note.$id === id ? { ...note, text: response.data.text } : note
        )
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notes</Text>
      <View style={styles.listContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#007bff" />
        ) : (
          <>
            {error && <Text style={styles.errorText}>{error}</Text>}

            {notes.length === 0 ? (
              <Text style={styles.noNotesText}>You have no notes</Text>
            ) : (
              <NoteList notes={notes} onDelete={deleteNote} onEdit={editNote} />
            )}
          </>
        )}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>Add Note</Text>
        </TouchableOpacity>

        <AddNoteModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          newNote={newNote}
          setNewNote={setNewNote}
          addNote={addNote}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2c3e50",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  listContainer: {
    flex: 1,
  },
  loadingText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginTop: 20,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  errorText: {
    color: "#e74c3c",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: "#fde8e8",
    padding: 10,
    borderRadius: 8,
  },
  noNotesText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#7f8c8d",
    marginTop: 15,
    backgroundColor: "#ecf0f1",
    padding: 15,
    borderRadius: 8,
  },
});

export default Index;
