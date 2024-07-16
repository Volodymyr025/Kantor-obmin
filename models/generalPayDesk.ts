import mongoose from "mongoose";

export const generalDesk = new mongoose.Schema(
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
    department: String,
  },
  { timestamps: true }
);

const GeneralDesk =
  mongoose.models.GeneralDesk || mongoose.model("GeneralDesk", generalDesk);

export default GeneralDesk;
