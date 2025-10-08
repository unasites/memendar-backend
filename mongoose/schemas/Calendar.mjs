import mongoose from "mongoose";

const memeSchema = new mongoose.Schema({
  memeIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Meme" }],
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
});

const Calendar = mongoose.model("Calendar", memeSchema);
export default Calendar;
