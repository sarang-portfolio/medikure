import { IExcludedPaths } from "../../utility/authorize";
import { Routes, Route } from "./routes.types";

export const routes: Routes = [
  new Route("/auth", "http://localhost:3001"),
  new Route("/user", "http://localhost:3002"),
  new Route("/role", "http://localhost:3003"),
  new Route("/personalData", "http://localhost:3004"),
  new Route("/familyData", "http://localhost:3005"),
  new Route("/documents", "http://localhost:3006"),
];

export const excludedPaths: IExcludedPaths[] = [
  { path: "/auth/login", method: "POST" },
  { path: "/auth/reset-password/", method: "PUT" },
  { path: "/auth/signup", method: "POST" },
  { path: "/auth/forgot-password", method: "POST" },
];
