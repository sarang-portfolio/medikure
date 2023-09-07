import { Application, json, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import { ResponseHandler } from "../../utility/response-handler";
import { excludedPaths, routes } from "./routes.data";
import { authorize } from "../../utility/authorize";
import proxy from "express-http-proxy";

export const registerRoutes = (app: Application) => {
  app.use(helmet());
  app.use(cors());
  app.use(json());

  app.use(authorize(excludedPaths));

  for (let route of routes) {
    app.use(route.path, proxy(route.url));
  }

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 500).send(new ResponseHandler(null, err));
  });
};
