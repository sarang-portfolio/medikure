import { Router } from "express";
import { ResponseHandler } from "../../utility/response-handler";
import rolesService from "./roles.service";
import { IRole } from "./roles.types";

export const RoleRouter = Router();

RoleRouter.post("/add", async (req, res, next) => {
  try {
    const role = req.body as IRole;
    const result = await rolesService.addRole(role);
    res.send(new ResponseHandler(result));
  } catch (err) {
    next(err);
  }
});

RoleRouter.get("/findById/:id", async (req, res, next) => {
  try {
    const roleId = req.params.id as string;
    const result = await rolesService.getOneById(+roleId);
    res.send(new ResponseHandler(result));
  } catch (err) {
    next(err);
  }
});
RoleRouter.get("/findByRole/:role", async (req, res, next) => {
  try {
    const role = req.params.role as string;
    const result = await rolesService.getOneRole(role);
    res.send(new ResponseHandler(result));
  } catch (err) {
    next(err);
  }
});
