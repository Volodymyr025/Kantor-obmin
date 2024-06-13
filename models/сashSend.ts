import mongoose from "mongoose";

const cashSchema = new mongoose.Schema(
  {
    usd: Number,
    eur: Number,
    gbp: Number,
    pln: Number,
    cad: Number,
    chf: Number,
    sek: Number,
    czk: Number,
    nok: Number,
    gold: Number,
    sendTo: String,
    user: String,
    department: String,
    process: String,
  },
  { timestamps: true }
);

const UnCashMen =
  mongoose.models.UnCashMen || mongoose.model("UnCashMen", cashSchema);

export default UnCashMen;
