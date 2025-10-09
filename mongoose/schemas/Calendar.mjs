import mongoose from "mongoose";

const calendarSchema = new mongoose.Schema({
    month: { type: mongoose.Schema.Types.String, required: true },
    year: { type: mongoose.Schema.Types.String, required: true },
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
    createdAt: { type: mongoose.Schema.Types.Date, default: Date.now },
});

const Calendar = mongoose.model("Calendar", calendarSchema);

export default Calendar;
