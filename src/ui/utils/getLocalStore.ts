export const getLocalDepartment = () => {
  let department = "";
  if (typeof localStorage !== "undefined") {
    department = localStorage.getItem("Department") || "";
  }
  return department;
};

export const getLocalUser = () => {
  let user = "";
  if (typeof localStorage !== "undefined") {
    user = localStorage.getItem("User") || "";
  }
  return user;
};
