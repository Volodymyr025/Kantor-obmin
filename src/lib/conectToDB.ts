export const conectToDB = async (nameDB: string) => {
  try {
    const request = await fetch("http://localhost:3000/api/conectToDB", {
      method: "POST",
      body: JSON.stringify(nameDB),
    });
    const req = await request.json();
    console.log(req.message);
  } catch (err) {
    console.log("conected field");
    throw new Error("Field to conected");
  }
};
