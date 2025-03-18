import { View,Text,StyleSheet } from "react-native"


export const NoteItem = ({note}) => {
  return (
    <View style={styles.noteItem}>
    <Text style={styles.noteText}>
      {note.title}
    </Text>
  </View>
  )
}

const style = StyleSheet.create({
    noteItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f5f5f5',
        padding: 15,
        borderRadius: 5,
        marginVertical: 5,
      },
      noteText: {
        fontSize: 18,
      },
})
