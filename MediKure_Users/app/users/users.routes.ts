import { Router } from "express";
import { ResponseHandler } from "../utility/response-handler";
import userService from "./users.service";

export const UserRouter = Router();

UserRouter.post("/create", async (req, res, next) => {
  try {
    const userData = req.body;
    const result = await userService.createUser(userData);
    res.send(new ResponseHandler(result));
  } catch (err) {
    next(err);
  }
});

UserRouter.get("/findByEmail/:email", async (req, res, next) => {
  try {
    const userEmail = req.params.email;
    const result = await userService.findUserByEmail(userEmail);
    res.send(new ResponseHandler(result));
  } catch (err) {
    console.log(err);
    next(err);
  }
});

UserRouter.put("/update/:id", async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    const user = req.body;
    const result = await userService.updateUser(user, userId);
    res.send(new ResponseHandler(result));
  } catch (err) {
    next(err);
  }
});
