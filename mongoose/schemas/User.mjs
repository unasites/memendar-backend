import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: mongoose.Schema.Types.String, required: true, unique: true },
    password: { type: mongoose.Schema.Types.String, required: true },
    createdAt: { type: mongoose.Schema.Types.Date, default: Date.now },
    avatarUrl: { type: mongoose.Schema.Types.String, default: "" },
    roomIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }],
    role: { type: mongoose.Schema.Types.String, enum: ["user", "owner", "admin"], default: "user" },
});

export const User = mongoose.model("User", userSchema);
