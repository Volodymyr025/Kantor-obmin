export const getLocal = (name: string) => {
  let localName = "";
  if (typeof localStorage !== "undefined") {
    localName = localStorage.getItem(name) || "";
  }
  return localName;
};
