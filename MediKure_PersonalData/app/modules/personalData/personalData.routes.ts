import { Router } from "express";
import { ResponseHandler } from "../../utility/response-handler";
import personalDataService from "./personalData.service";
import { IPersonalData } from "./personalData.types";

export const PersonalDataRouter = Router();

PersonalDataRouter.post("/create/:id", async (req, res, next) => {
  try {
    const personalData = req.body as IPersonalData;
    const userId = Number(req.params.id);
    const result = await personalDataService.createPersonalData(
      personalData,
      userId
    );
    res.send(new ResponseHandler(result));
  } catch (err) {
    next(err);
  }
});
