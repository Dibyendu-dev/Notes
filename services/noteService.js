import databaseServices from "./databaseService";
import { ID } from "react-native-appwrite";

const dbId = process.env.EXPO_PUBLIC_APPWRITE_DATABSE_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_NOTES_ID;

const noteService = {
  async getNotes() {
    const response = await databaseServices.getDocuments(dbId, colId);
    if (response.error) {
      return { error: response.error };
    }

    return { data: response };
  },

  async createNote(note) {
    try {
      const response = await databaseServices.createDocument(
        dbId,
        colId,
        ID.unique(),
        note
      );
      return { data: response };
    } catch (error) {
      console.error("Error creating note:", error);
      return { error: error.message };
    }
  },
};

export default noteService;
