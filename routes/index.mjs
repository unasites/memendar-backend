import { Router } from "express";
import userRoutes from "./users.mjs";

const routes = Router();

routes.use("/api/users", userRoutes);

export default routes;
