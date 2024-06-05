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

export const UnCashFactory = async (name: string) => {
  let dbName = name;
  if (name.includes("Чортків")) {
    dbName = "Chortkiv";
  }
  if (name.includes("Тернопіль")) {
    dbName = "Ternopil";
  }
  const url = `${process.env.mongoUrl}${dbName}?retryWrites=true&w=majority&appName=Kantor`;
  const conect = await mongoose.createConnection(url).asPromise();
  const model = conect.model("UnCashMen", cashSchema);
  return model;
};

export default UnCashMen;
