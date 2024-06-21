import mongoose from "mongoose";

export const exchengeSchema = new mongoose.Schema(
  {
    department: String,
    user: String,
    currency: String,
    operation: String,
    rate: Number,
    value: Number,
    totalValue: Number,
  },
  { timestamps: true }
);

const Exchenge =
  mongoose.models.Exchenge || mongoose.model("Exchenge", exchengeSchema);

export default Exchenge;
