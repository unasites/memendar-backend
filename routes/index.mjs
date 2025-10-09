import { Router } from "express";
import userRoutes from "./users.mjs";
import memeRouter from "./memes.mjs";
import roomRouter from "./rooms.mjs";
import calendarRouter from "./calendar.mjs";
const routes = Router();

routes.use("/users", userRoutes);
routes.use("/memes", memeRouter);
routes.use("/rooms", roomRouter);
routes.use("/calendars", calendarRouter);

export default routes;
