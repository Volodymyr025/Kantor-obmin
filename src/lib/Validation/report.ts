import mongoose from "mongoose";

const postReportSchema = new mongoose.Schema(
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
    eqvUsd: Number,
    eqvEur: Number,
    eqvGbp: Number,
    eqvPln: Number,
    eqvCad: Number,
    eqvChf: Number,
    eqvSek: Number,
    eqvCzk: Number,
    eqvNok: Number,
    eqvGold: Number,
    user: String,
    departament: String,
  },
  { timestamps: true }
);

const Report =
  mongoose.models.Report || mongoose.model("Report", postReportSchema);

export default Report;
