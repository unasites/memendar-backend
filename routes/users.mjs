import { Router } from "express";
import { checkSchema, validationResult, matchedData } from "express-validator";
import User from "../mongoose/schemas/User.mjs";
import { createUserValidationSchema } from "../utils/validationSchema.mjs";
import { hashPassword } from "../utils/helpers.mjs";
import Room from "../mongoose/schemas/Room.mjs";

const userRouter = Router();

userRouter.get("/", async (req, res) => {
    try {
        const users = await User.find();

        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
userRouter.post("/", checkSchema(createUserValidationSchema), async (req, res) => {
    const results = validationResult(req);

    if (!results.isEmpty()) {
        return res.status(400).json({ errors: results.array() });
    }
    const data = matchedData(req);

    data.password = hashPassword(data.password);
    const newUser = new User(data);

    try {
        const savedUser = await newUser.save();

        return res.status(201).json(savedUser);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(400).json({ error: "Bad Request" });
    }
});

userRouter.post("/join-room", async (req, res) => {
    const { username, roomCode } = req.body;

    if (!username || !roomCode) {
        return res.status(400).json({ error: "Username and roomCode are required" });
    }

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (user.roomIds.includes(roomCode)) {
            return res.status(400).json({ error: "User already in the room" });
        }

        const room = await Room.findOne({ roomCode });

        if (!room) {
            return res.status(404).json({ error: "Room not found" });
        }

        user.roomIds.push(roomCode);
        await user.save();

        room.users.push(user._id);
        await room.save();

        return res.status(200).json({ message: "User joined the room successfully" });
    } catch (error) {
        console.error("Error joining room:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default userRouter;
