import { Router } from "express";
import { checkSchema, validationResult, matchedData } from "express-validator";
import Meme from "../mongoose/schemas/Meme.mjs";
import { createMemesValidationSchema } from "../utils/validationSchema.mjs";

const memeRouter = Router();

memeRouter.get("/", async (req, res) => {
    try {
        const memes = await Meme.find();

        res.json(memes);
    } catch (error) {
        console.error("Error fetching memes:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

memeRouter.post("/", checkSchema(createMemesValidationSchema), async (req, res) => {
    const results = validationResult(req);

    if (!results.isEmpty()) {
        return res.status(400).json({ errors: results.array() });
    }

    const data = matchedData(req);
    const newMeme = new Meme(data);

    try {
        const savedMeme = await newMeme.save();

        return res.status(201).json(savedMeme);
    } catch (error) {
        console.error("Error creating meme:", error);
        res.status(400).json({ error: "Bad Request" });
    }
});

export default memeRouter;
