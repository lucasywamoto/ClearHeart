import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      default: null,
    },
    oauthProvider: {
      type: String,
      default: null,
    },
    clearRecords: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ClearRecord",
      },
    ],
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  if (!this.oauthProvider && !this.password) {
    next(new Error("Password is required for non-OAuth users"));
  }
  next();
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
