import { Router } from "express";
import Room from "../mongoose/schemas/Room.mjs";
import { generateUniqueCode } from "../utils/helpers.mjs";
import { checkSchema, validationResult } from "express-validator";
import { createRoomValidationSchema } from "../utils/validationSchema.mjs";

const roomRouter = Router();

roomRouter.get("/", async (req, res) => {
    try {
        const rooms = await Room.find();

        res.json(rooms);
    } catch (error) {
        console.error("Error fetching rooms:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
roomRouter.post("/", checkSchema(createRoomValidationSchema), async (req, res) => {
    const results = validationResult(req);
    const { name, ownerId } = req.body;

    let roomCode = generateUniqueCode();

    if (!results.isEmpty()) {
        return res.status(400).json({ errors: results.array() });
    }
    try {
        const rooms = await Room.find();
        let codeExists = rooms.some(room => room.roomCode === roomCode);

        while (codeExists) {
            roomCode = generateUniqueCode();
            codeExists = rooms.some(room => room.roomCode === roomCode);
        }
        const newRoom = new Room({ name, ownerId, roomCode });

        const savedRoom = await newRoom.save();

        return res.status(201).json(savedRoom);
    } catch (error) {
        console.error("Error creating room:", error);
        res.status(400).json({ error: "Bad Request" });
    }
});

export default roomRouter;
