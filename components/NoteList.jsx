import { FlatList,View,Text } from "react-native"
import { NoteItem } from "./NoteItem"

export const NoteList = ({notes}) => {
  return (
    <View>
        <FlatList
          data={notes}
          renderItem={({ item }) => <NoteItem note={item} />}
          keyExtractor={(item) => item.id}
        />
    </View>
  )
}
