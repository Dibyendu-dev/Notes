import { FlatList,View,Text } from "react-native"
import { NoteItem } from "./NoteItem"

export const NoteList = ({notes}) => {
  return (
    <View>
        <FlatList
        data={notes}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <NoteItem note={item}  />
        )}
      />
    </View>
  )
}
