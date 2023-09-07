import { Router } from "express";
import { upload } from "../../utility/fileUpload";
import { ResponseHandler } from "../../utility/response-handler";
import documentsService from "./documents.service";

export const DocumentRouter = Router();

DocumentRouter.post("/upload", upload, async (req, res, next) => {
  try {
    const images = (req.files as any).map((file: any) => file.path);
    console.log(images);
    const result = await documentsService.uploadDocument(images);
    res.send(new ResponseHandler(result));
  } catch (error) {
    next(error);
  }
});
