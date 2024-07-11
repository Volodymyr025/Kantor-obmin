import mongoose from "mongoose";

const reportDeskSchema = new mongoose.Schema(
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

const ReportDesk =
  mongoose.models.ReportDesk || mongoose.model("ReportDesk", reportDeskSchema);

export default ReportDesk;
