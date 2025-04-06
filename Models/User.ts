import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    avatar: { type: String },
    isAdmin: { type: Boolean, default: false },
    address: {
      flat: { type: String },
      street: { type: String },
      landmark: { type: String },
      city: { type: String },
      mobile: { type: String },
      state: { type: String },
      pin: { type: String },
      country: { type: String },
    },
  },
  { timestamps: true }
);

export const UserTable = mongoose.model("user", userSchema);
