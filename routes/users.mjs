import { Router } from "express";
import { checkSchema, validationResult, matchedData } from "express-validator";
import User from "../mongoose/schemas/User.mjs";
import { createUserValidationSchema } from "../utils/validationSchema.mjs";
import { hashPassword } from "../utils/helpers.mjs";

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

export default userRouter;
