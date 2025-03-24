import { database } from "./appwrite";

const databaseServices = {
  // todo - CRUD
  async getDocuments(dbId, colId) {
    try {
      const response = await database.listDocuments(dbId, colId);
      return response.documents || [];
    } catch (error) {
      console.error("Error fetching documents:", error.message);
      return { error: error.message };
    }
  },

  async createDocument(dbId, colId, data,id=null,) {
    try {
      const response = await database.createDocument(dbId, colId, id || undefined, data);
      return response;
    } catch (error) {
      console.error("Error creating document:", error.message);
      return { error: error.message };
    }
  },

  async deleteDocument(dbId,colId,id){
    try {
      await database.deleteDocument(dbId,colId,id);
      return{ success:true} 
      
    } catch (error) {
      console.error("Error deleting document:", error.message);
      return { error: error.message };
    }
  }
};

export default databaseServices;
