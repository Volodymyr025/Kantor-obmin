import mongoose from "mongoose";

const postDebitCreditSchema = new mongoose.Schema(
  {
    operation: Boolean,
    value: Number,
    currency: String,
    discription: String,
    user: String,
    department: String,
  },
  { timestamps: true }
);

const DebitCredit =
  mongoose.models.DebitCredit ||
  mongoose.model("DebitCredit", postDebitCreditSchema);

export default DebitCredit;
