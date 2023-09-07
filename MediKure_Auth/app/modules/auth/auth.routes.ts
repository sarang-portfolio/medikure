import { Router } from "express";
import { userProfile } from "../../utility/googleAuth";
import {
  googleAuthentication,
  googleAuthorization,
} from "../../utility/passport";
import { ResponseHandler } from "../../utility/response-handler";
import authService from "./auth.service";
import { ILogin, ISignUp } from "./auth.types";

export const AuthRouter = Router();

AuthRouter.post("/signup", async (req, res, next) => {
  try {
    const credentials = req.body as ISignUp;
    const result = await authService.signUp(credentials);
    res.send(new ResponseHandler(result));
  } catch (err) {
    next(err);
  }
});

AuthRouter.post("/login", async (req, res, next) => {
  try {
    const credentials = req.body as ILogin;
    const result = await authService.login(credentials);
    res.send(new ResponseHandler(result));
  } catch (err) {
    next(err);
  }
});

AuthRouter.get("/google", googleAuthentication);

AuthRouter.get("/google/callback", googleAuthorization);

AuthRouter.get("/success", async (req, res, next) => {
  try {
    const google_ID = userProfile.id;
    const email = userProfile.emails[0].value;
    const result = await authService.googleSignIn(email, google_ID);
    res.send(new ResponseHandler(result));
  } catch (err) {
    next(err);
  }
});

AuthRouter.get("/error", async (req, res, next) => {
  try {
    res.send("error");
  } catch (err) {
    next(err);
  }
});

AuthRouter.get("/verify/:token", async (req, res, next) => {
  try {
    const token = req.params.token;
    const result = await authService.verifyUser(token);
    res.send(new ResponseHandler(result));
  } catch (err) {
    next(err);
  }
});

AuthRouter.post("/forgot-password", async (req, res, next) => {
  try {
    const email = req.body.email;
    const result = await authService.forgotPassword(email);
    res.send(new ResponseHandler(result));
  } catch (err) {
    next(err);
  }
});

AuthRouter.put("/reset-password/:token", async (req, res, next) => {
  try {
    const newCredentials = req.body;
    const token = req.params.token;
    const result = await authService.resetPassword(newCredentials, token);
    res.send(new ResponseHandler(result));
  } catch (err) {
    next(err);
  }
});
