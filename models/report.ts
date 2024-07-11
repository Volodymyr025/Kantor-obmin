import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    buyUah: Number,
    buyUsd: Number,
    buyEur: Number,
    buyGbp: Number,
    buyPln: Number,
    buyCad: Number,
    buyChf: Number,
    buySek: Number,
    buyCzk: Number,
    buyNok: Number,
    buyGold: Number,
    sellUah: Number,
    sellUsd: Number,
    sellEur: Number,
    sellGbp: Number,
    sellPln: Number,
    sellCad: Number,
    sellChf: Number,
    sellSek: Number,
    sellCzk: Number,
    sellNok: Number,
    sellGold: Number,
    user: String,
    department: String,
  },
  { timestamps: true }
);

const Report = mongoose.models.Report || mongoose.model("Report", reportSchema);

export default Report;
