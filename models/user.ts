import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    userName: String,
    password: String,
    role: String,
    department: [],
  } as const,
  { _id: false }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
