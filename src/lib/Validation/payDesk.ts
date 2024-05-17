import mongoose from "mongoose";

const payDeskSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

const PayDesk =
  mongoose.models.PayDesk || mongoose.model("PayDesk", payDeskSchema);

export default PayDesk;
