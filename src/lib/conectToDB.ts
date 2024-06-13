import mongoose from "mongoose";

export const conectToDB = async () => {
  const options = {
    serverSelectionTimeoutMS: 30000, // 30 секунд
    socketTimeoutMS: 45000, // 45 секунд
  };
  const url = `${process.env.mongoUrl}?retryWrites=true&w=majority&appName=Kantor`;
  try {
    await mongoose.connect(url, options);
    return console.error({ message: `conected` });
  } catch (err) {
    return console.error({ message: `Filed to conected` + err });
  }
};
