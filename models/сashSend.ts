import { conectToDB } from "@/lib/conectToDB";
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
  },
  { timestamps: true }
);

const UnCashMen =
  mongoose.models.UnCashMen || mongoose.model("UnCashMen", cashSchema);

export const UnCashFun = async (dbName: string) => {
  const url = `mongodb+srv://volgankevych:N2ojKuOJBAKdcDP0@kantor.vphvwe5.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Kantor`;
  const conect = await mongoose.createConnection(url).asPromise();
  const model = conect.model("UnCashMen", cashSchema);
  return model;
};

export default UnCashMen;
