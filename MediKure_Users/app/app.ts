import cors from "cors";
import express, { NextFunction, Request, Response, json } from "express";
import helmet from "helmet";
import { connectToPostgres } from "./connections/postgre.connection";
import { UserRouter } from "./users/users.routes";
import { authorize, excludedPaths } from "./utility/authorize";
import { ResponseHandler } from "./utility/response-handler";
export const startServer = async () => {
  try {
    const app = express();
    app.use(helmet());
    app.use(cors());
    app.use(json());
    await connectToPostgres();
    app.use(authorize(excludedPaths));
    app.use("/", UserRouter);

    const { PORT } = process.env;
    app.listen(PORT, () => console.log(`SERVER STARTED ON PORT: ${PORT}`));
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      res.status(err.statusCode || 500).send(new ResponseHandler(null, err));
    });
  } catch (e) {
    console.error(e);
    console.error("COULD NOT START SERVER");
    process.exit(1);
  }
};
