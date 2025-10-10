import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: mongoose.Schema.Types.String, required: true, unique: true },
    password: { type: mongoose.Schema.Types.String, required: true },
    createdAt: { type: mongoose.Schema.Types.Date, default: Date.now },
    avatarUrl: { type: mongoose.Schema.Types.String, default: "" },
    roomIds: [{ type: mongoose.Schema.Types.String, ref: "Room" }],
    role: { type: mongoose.Schema.Types.String, enum: ["user", "admin"], default: "user" },
});

const User = mongoose.model("User", userSchema);

export default User;
