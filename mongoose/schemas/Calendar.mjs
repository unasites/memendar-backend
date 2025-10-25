import mongoose from "mongoose";

const calendarSchema = new mongoose.Schema({
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
    createdAt: { type: mongoose.Schema.Types.Date, default: Date.now },
    memes: [
        {
            meme: { type: mongoose.Schema.Types.ObjectId, ref: "Meme" },
            month: { type: mongoose.Schema.Types.String, required: true },
            year: { type: mongoose.Schema.Types.String, required: true },
        },
    ],
});

const Calendar = mongoose.model("Calendar", calendarSchema);

export default Calendar;
