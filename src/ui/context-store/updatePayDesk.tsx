"use client";
import { Dispatch, SetStateAction, createContext, useState } from "react";

interface UpdateProps {
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  updateRate: boolean;
  setUpdateRate: Dispatch<SetStateAction<boolean>>;
}

export const Update = createContext<UpdateProps>({
  update: false,
  setUpdate: () => {},
  updateRate: false,
  setUpdateRate: () => {},
});

const UpdatePaydeskWrapper = ({ children }: { children: React.ReactNode }) => {
  const [update, setUpdate] = useState(false);
  const [updateRate, setUpdateRate] = useState(false);

  return (
    <Update.Provider
      value={{
        updateRate: updateRate,
        setUpdateRate: setUpdateRate,
        setUpdate: setUpdate,
        update: update,
      }}
    >
      {children}
    </Update.Provider>
  );
};

export default UpdatePaydeskWrapper;
