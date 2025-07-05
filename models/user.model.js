import mongoose from "mongoose";

const userScshema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "the name is required"],
      trim: true,
      minLength: 2,
      maxLength: 22,
    },
    email: {
      type: String,
      required: [true, "the email is required"],
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "the password is required"],
      minLength: 6,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userScshema);
export default User;
