import cors from "cors";
import express, { NextFunction, Request, Response, json } from "express";
import Session from "express-session";
import helmet from "helmet";
import { connectToPostgres } from "./connections/postgre.connection";
import { AuthRouter } from "./modules/auth/auth.routes";
import { authorize, excludedPaths } from "./utility/authorize";
import { googleAuthMiddleware } from "./utility/googleAuth";
import { passportMiddleware } from "./utility/passport";
import { ResponseHandler } from "./utility/response-handler";
export const startServer = async () => {
  try {
    const app = express();
    app.use(helmet());
    app.use(cors());
    app.use(json());
    await connectToPostgres();

    app.use(
      Session({
        resave: false,
        saveUninitialized: true,
        secret: "SECRET",
      })
    );
    app.use(passportMiddleware);
    app.use(googleAuthMiddleware);

    app.use(authorize(excludedPaths));
    app.use("/", AuthRouter);
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      res.status(err.statusCode || 500).send(new ResponseHandler(null, err));
    });
    const { PORT } = process.env;
    app.listen(PORT, () => console.log(`SERVER STARTED ON PORT: ${PORT}`));
  } catch (e) {
    console.error(e);
    console.error("COULD NOT START SERVER");
    process.exit(1);
  }
};
