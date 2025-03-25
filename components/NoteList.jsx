import { FlatList, View, StyleSheet } from "react-native";
import { NoteItem } from "./NoteItem";

export const NoteList = ({ notes, onDelete,onEdit }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <NoteItem note={item} onDelete={onDelete} onEdit={onEdit} />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 80, // Add padding for the floating add button
  },
});
