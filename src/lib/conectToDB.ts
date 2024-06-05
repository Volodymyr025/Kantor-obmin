import mongoose from "mongoose";

export const conectToDB = async (nameDB: string) => {
  let dbName = nameDB;
  if (nameDB.includes("Чортків")) {
    dbName = "Chortkiv";
  }
  if (nameDB.includes("Тернопіль")) {
    dbName = "Ternopil";
  }
  const url = `${process.env.mongoUrl}${dbName}?retryWrites=true&w=majority&appName=Kantor`;
  try {
    await mongoose.connect(url);
    return console.log({ message: `conected ${dbName}` });
  } catch (err) {
    return console.log({ message: `Filed to conected ${dbName}` + err });
  }
};
