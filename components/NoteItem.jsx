import { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

export const NoteItem = ({ note, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(note.text);
  const inputRef = useRef(null);

  const handleSave = () => {
    if (editedText.trim() === "") return;
    onEdit(note.$id, editedText);
    setIsEditing(false);
  };

  return (
    <View style={styles.noteItem}>
      {isEditing ? (
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={editedText}
          onChangeText={setEditedText}
          autoFocus
          onSubmitEditing={handleSave}
          returnKeyType="done"
        />
      ) : (
        <Text style={styles.noteText}>{note.text}</Text>
      )}
      <View style={styles.actions}>
        {isEditing ? (
          <TouchableOpacity
            onPress={() => {
              handleSave();
              inputRef.current?.blur();
            }}
          >
            <Text style={styles.edit}>💾</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => setIsEditing(true)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            activeOpacity={0.7}
          >
            <Text style={styles.edit}>✎</Text>
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity
        onPress={() => onDelete(note.$id)}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        activeOpacity={0.7}
      >
        <Text style={styles.delete}>❌</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  noteItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 12,
    marginVertical: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    borderLeftWidth: 4,
    borderLeftColor: "#3498db",
  },
  noteText: {
    fontSize: 16,
    color: "#2c3e50",
    flex: 1,
    marginRight: 10,
    lineHeight: 22,
  },
  delete: {
    fontSize: 18,
    color: "#e74c3c",
    padding: 8,
    backgroundColor: "#fde8e8",
    borderRadius: 8,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  edit: {
    fontSize: 18,
    marginRight: 10,
    color: "#3498db",
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#ebf5fb",
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 10,
    borderColor: "#bdc3c7",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    color: "#2c3e50",
    marginRight: 10,
  },
});
