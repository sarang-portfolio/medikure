import express, { json } from "express";
import { connectToPostgres } from "./connections/postgre.connection";
import { DocumentRouter } from "./modules/documents/documents.routes";
import { Request, Response, NextFunction } from "express";
import { ResponseHandler } from "./utility/response-handler";
import cors from "cors";
import helmet from "helmet";
import { authorize, excludedPaths } from "./utility/authorize";
export const startServer = async () => {
  try {
    const app = express();
    app.use(helmet());
    app.use(cors());
    app.use(json());
    await connectToPostgres();

    app.use(authorize(excludedPaths));
    app.use("/", DocumentRouter);
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
