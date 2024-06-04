"use client";
import { Dispatch, SetStateAction, createContext, useState } from "react";

interface UpdateProps {
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
}

export const Update = createContext<UpdateProps>({
  update: false,
  setUpdate: () => {},
});

const UpdatePaydeskWrapper = ({ children }: { children: React.ReactNode }) => {
  const [update, setUpdate] = useState(false);

  return (
    <Update.Provider
      value={{
        setUpdate: setUpdate,
        update: update,
      }}
    >
      {children}
    </Update.Provider>
  );
};

export default UpdatePaydeskWrapper;
