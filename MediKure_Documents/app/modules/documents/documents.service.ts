import documentsRepo from "./documents.repo";
import { uploadFile } from "../../utility/fileUpload";

const uploadDocument = async (document: any) => {
  try {
    const upload = uploadFile(document);
    const response = await documentsRepo.create(document);
    return response;
  } catch (err) {
    throw err;
  }
};

const getOneDocument = async (document: any) => {
  try {
    const response = await documentsRepo.getOne(document);
    return response;
  } catch (error) {
    throw error;
  }
};

export default {
  uploadDocument,
  getOneDocument,
};
