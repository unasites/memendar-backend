import { Router } from "express";
import Event from "../mongoose/schemas/Event.mjs";
import Meme from "../mongoose/schemas/Meme.mjs";

const eventRouter = Router();

//GET History of events in a calendar
eventRouter.get("/:calendarId/history", async (req, res) => {
    const { calendarId } = req.params;
    const { month, year } = req.query;

    try {
        const query = { calendarId };

        if (month) query.month = month;
        if (year) query.year = year;
        let events;

        events = await Event.find(query).populate("memes.meme");

        res.status(200).json(events);
    } catch (error) {
        console.error("Error fetching event history:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

eventRouter.post("/create", async (req, res) => {
    const { calendarId, month, year, memes } = req.body;

    try {
        let savedMemes = [];

        for (let i = 0; i < memes.length; i++) {
            let meme = new Meme({
                imageUrl: memes[i].imageUrl,
                title: memes[i].title,
                roomId: memes[i].roomId,
                month,
                year,
            });

            await meme.save();

            savedMemes.push({ meme: meme._id, active: true });
        }

        const newEvent = new Event({ calendarId, month, year, memes: savedMemes });

        await newEvent.save();

        res.status(200).json(newEvent);
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
export default eventRouter;
