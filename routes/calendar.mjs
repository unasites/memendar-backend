import { Router } from "express";
import Calendar from "../mongoose/schemas/Calendar.mjs";
import { checkSchema, validationResult } from "express-validator";
import { createCalendarValidationSchema } from "../utils/validationSchema.mjs";

const calendarRouter = new Router();

calendarRouter.get("/", async (req, res) => {
    try {
        const calendars = await Calendar.find();

        res.json(calendars);
    } catch (error) {
        console.error("Error fetching calendars:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

calendarRouter.post("/", checkSchema(createCalendarValidationSchema), async (req, res) => {
    const results = validationResult(req);

    if (!results.isEmpty()) {
        return res.status(400).json({ errors: results.array() });
    }
    try {
        const { month, year, roomId } = req.body;
        const newCalendar = new Calendar({ month, year, roomId });

        await newCalendar.save();
        res.status(201).json(newCalendar);
    } catch (error) {
        console.error("Error creating calendar:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default calendarRouter;
