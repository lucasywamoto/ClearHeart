import mongoose from "mongoose";

const MoodSchema = new mongoose.Schema({
  mood: { type: String, required: true },
  type: { type: String, required: true },
  tooltip: { type: String, required: true },
});

export const Mood = mongoose.models.Mood || mongoose.model("Mood", MoodSchema);
export default Mood;
