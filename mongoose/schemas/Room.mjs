import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    name: { type: mongoose.Schema.Types.String, required: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    ownerId: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }],
    roomCode: { type: mongoose.Schema.Types.String, required: true, unique: true },
    createdAt: { type: mongoose.Schema.Types.Date, default: Date.now },
});

const Room = mongoose.model("Room", roomSchema);

export default Room;
