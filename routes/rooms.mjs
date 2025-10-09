import { Router } from "express";
import Room from "../mongoose/schemas/Room.mjs";
import { generateUniqueCode } from "../utils/helpers.mjs";

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
roomRouter.post("/", async (req, res) => {
    const { name, ownerId } = req.body;

    let roomCode = generateUniqueCode();

    if (!name || !ownerId || !roomCode) {
        return res.status(400).json({ error: "name, ownerId, and roomCode are required" });
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
