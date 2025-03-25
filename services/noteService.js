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

  async addNote(text) {
    if(!text){
      return { error: 'Note text connot be empty'}
    }
    const data ={
      text:text
    }
    try {
      const response = await databaseServices.createDocument(
        dbId,
        colId,
        data,
        ID.unique(),
        
      );
      if(response?.error){
        return {error:response.error}
      }
      return { data: response };
    } catch (error) {
      console.error("Error creating note:", error);
      return { error: error.message };
    }
  },

  async deleteNote(id){
    const response = await databaseServices.deleteDocument(dbId,colId,id);
    if (response.error) {
      return { error: response.error };
    }
    return {success: true}
  },

  async updateNote(id,text){
    const response = await databaseServices.updateDocument(dbId,colId,id,{text});
    if (response.error) {
      return { error: response.error };
    }
    return { data: response };
  }

};

export default noteService;
