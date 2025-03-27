import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "superadmin"],
      default: "admin",
    },
    isActive: { type: Boolean, default: true },
    isAdmin: { type: Boolean, required: true, default: false },
    address: { type: String },
    phoneNumber: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
