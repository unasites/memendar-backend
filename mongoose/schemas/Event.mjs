import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    calendarId: { type: mongoose.Schema.Types.ObjectId, ref: "Calendar", required: true },
    month: { type: mongoose.Schema.Types.String, required: true },
    year: { type: mongoose.Schema.Types.String, required: true },
    memes: [
        {
            meme: { type: mongoose.Schema.Types.ObjectId, ref: "Meme" },
            active: { type: mongoose.Schema.Types.Boolean, default: true },
        },
    ],
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
