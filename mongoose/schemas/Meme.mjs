import mongoose from "mongoose";

const memeSchema = new mongoose.Schema({
    imageUrl: { type: mongoose.Schema.Types.String, required: true },
    title: { type: mongoose.Schema.Types.String, required: true },
    createdAt: { type: mongoose.Schema.Types.Date, default: Date.now },
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
    voteCount: { type: mongoose.Schema.Types.Number, default: 0 },
    month: { type: mongoose.Schema.Types.Number },
    year: { type: mongoose.Schema.Types.Number },
});

const Meme = mongoose.model("Meme", memeSchema);

export default Meme;
