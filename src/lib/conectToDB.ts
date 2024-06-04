export const conectToDB = async (nameDB: string) => {
  try {
    const request = await fetch(
      "https://kantor-obmin.vercel.app/api/conectToDB",
      {
        method: "POST",
        body: JSON.stringify(nameDB),
      }
    );
    const req = await request.json();
    return req;
  } catch (err) {
    console.log("conected field");
    throw new Error("Field to conected");
  }
};
