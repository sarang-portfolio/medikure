import passport from "passport";
import { Request, Response, NextFunction } from "express";

export const passportMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function (obj: any, cb) {
    cb(null, obj);
  });

  passport.initialize()(req, res, () => {
    passport.session()(req, res, () => {
      next();
    });
  });
};

export const googleAuthentication = passport.authenticate("google", {
  scope: ["profile", "email"],
});

export const googleAuthorization = passport.authenticate("google", {
  failureRedirect: "/auth/error",
  successRedirect: "/auth/success",
});
