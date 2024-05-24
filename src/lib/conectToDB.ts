import mongoose from "mongoose";

export const conectToDB = async (nameDB: string) => {
  const url = `mongodb+srv://volgankevych:N2ojKuOJBAKdcDP0@kantor.vphvwe5.mongodb.net/${nameDB}?retryWrites=true&w=majority&appName=Kantor`;
  try {
    await mongoose.connect(url);
    console.log("connected");
  } catch (err) {
    console.log("conected field");
    throw new Error("Field to conected");
  }
};
