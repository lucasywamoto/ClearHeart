import mongoose from "mongoose";

const StatsSchema = new mongoose.Schema({
  day: { type: Date, required: true },
  mood: { type: mongoose.Schema.Types.ObjectId, ref: "Mood", required: true },
  count: { type: Number, default: 1 },
});

StatsSchema.index({ day: 1, mood: 1 }, { unique: true });

export const Stats =
  mongoose.models.Stats || mongoose.model("Stats", StatsSchema);
export default Stats;
