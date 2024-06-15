"use client";
import { Dispatch, SetStateAction, createContext, useState } from "react";

interface UserInfo {
  userName: string;
  setUserName: Dispatch<SetStateAction<string>>;
  department: string;
  setDepartment: Dispatch<SetStateAction<string>>;
}

export const UserInfo = createContext<UserInfo>({
  userName: "",
  setUserName: () => {},
  department: "",
  setDepartment: () => {},
});

const UserInfoWrapper = ({ children }: { children: React.ReactNode }) => {
  const [userName, setUserName] = useState("");
  const [department, setDepartment] = useState("");

  return (
    <UserInfo.Provider
      value={{
        userName: userName,
        setUserName: setUserName,
        department: department,
        setDepartment: setDepartment,
      }}
    >
      {children}
    </UserInfo.Provider>
  );
};

export default UserInfoWrapper;
