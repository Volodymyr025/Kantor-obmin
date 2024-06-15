import mongoose from "mongoose";

const rateSchema = new mongoose.Schema(
  {
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

const Rate = mongoose.models.Rate || mongoose.model("Rate", rateSchema);

export default Rate;
