import mongoose from "mongoose";

const clearRecordSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  mood: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mood",
    required: true,
  },
  comment: {
    type: String,
    default: "",
  },
  created: {
    type: Date,
    required: true,
  },
  dateCreated: {
    type: Date,
    required: true,
  },
  timezone: {
    type: String,
    default: "UTC",
  },
});

clearRecordSchema.methods.getLocalTime = function () {
  return this.created.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: this.timezone,
  });
};

const ClearRecords =
  mongoose.models.ClearRecords ||
  mongoose.model("ClearRecords", clearRecordSchema);
export default ClearRecords;
