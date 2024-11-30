import mongoose from "mongoose";

// Function to generate random avatar URL
const generateRandomAvatar = () => {
  const randomId = Math.floor(Math.random() * 100) + 1;
  return `https://avatar.iran.liara.run/public/${randomId}`;
};

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
    avatar: {
      type: String,
      required: false,
      set: function (v) {
        if (!v && !this.oauthProvider) {
          return generateRandomAvatar();
        }
        return v;
      },
      get: function (v) {
        return v || generateRandomAvatar();
      },
    },
    oauthProvider: {
      type: String,
      default: null,
    },
    providerId: {
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
  {
    timestamps: true,
    strict: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

UserSchema.pre("save", function (next) {
  if (!this.oauthProvider && !this.password) {
    return next(new Error("Password is required for non-OAuth users"));
  }
  if (!this.avatar && !this.oauthProvider) {
    this.avatar = generateRandomAvatar();
  }
  next();
});

mongoose.models = {};

export const User = mongoose.model("User", UserSchema);
export default User;
