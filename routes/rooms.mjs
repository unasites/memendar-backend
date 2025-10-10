import { Router } from "express";
import Room from "../mongoose/schemas/Room.mjs";
import { generateUniqueCode } from "../utils/helpers.mjs";
import { checkSchema, validationResult } from "express-validator";
import { createRoomValidationSchema } from "../utils/validationSchema.mjs";
import User from "../mongoose/schemas/User.mjs";

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

        const owner = await User.findById(ownerId);

        if (owner && !owner.roomIds.includes(savedRoom._id)) {
            owner.roomIds.push(savedRoom._id);
            await owner.save();
        }

        savedRoom.users.push(ownerId);
        await savedRoom.save();

        return res.status(201).json(savedRoom);
    } catch (error) {
        console.error("Error creating room:", error);
        res.status(400).json({ error: "Bad Request" });
    }
});
roomRouter.get("/:roomId/users", async (req, res) => {
    try {
        const users = await Room.findById(req.params.roomId).populate("users", "-password");

        if (!users) {
            return res.status(404).json({ error: "Room not found" });
        }
        res.json(users.users);
    } catch (error) {
        console.error("Error fetching users in room:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

roomRouter.post("/:roomId/new-owner", async (req, res) => {
    const { userId, ownerId } = req.body;

    try {
        const room = await Room.findById(req.params.roomId);

        if (!room) {
            return res.status(404).json({ error: "Room not found" });
        }

        if (!room.ownerId.includes(ownerId)) {
            return res.status(403).json({ error: "User is not the owner of the room" });
        }

        if (!room.users.includes(userId)) {
            return res.status(400).json({ error: "User is not a member of the room" });
        }

        if (!room.ownerId.includes(userId)) {
            room.ownerId.push(userId);
            await room.save();
        }

        res.status(200).json({ message: "New owner added successfully" });
    } catch (error) {
        console.error("Error adding new owner:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default roomRouter;
