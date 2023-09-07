import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { Strategy } from "passport-google-oauth20";

export let userProfile: any;

export const googleAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
  passport.use(
    new Strategy(
      {
        clientID: GOOGLE_CLIENT_ID as string,
        clientSecret: GOOGLE_CLIENT_SECRET as string,
        callbackURL: "http://localhost:3000/auth/google/callback",
      },
      (accessToken: string, refreshToken: string, profile: any, done: any) => {
        userProfile = profile;
        return done(null, profile);
      }
    )
  );
  next();
};
