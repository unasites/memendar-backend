import { Router } from "express";
import userRoutes from "./users.mjs";

const routes = Router();

routes.use("/users", userRoutes);

export default routes;
