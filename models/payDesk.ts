import mongoose from "mongoose";

export const payDeskSchema = new mongoose.Schema(
  {
    uah: Number,
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
    user: String,
    department: String,
  },
  { timestamps: true }
);

const PayDesk =
  mongoose.models.PayDesk || mongoose.model("PayDesk", payDeskSchema);

export default PayDesk;
