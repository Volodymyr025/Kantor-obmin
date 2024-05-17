"use client";
import { Dispatch, SetStateAction, createContext, useState } from "react";

interface ProgressProps {
  openDialog: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const Progress = createContext<ProgressProps>({
  openDialog: false,
  setOpen: () => {},
});

const ProgressWrapper = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <Progress.Provider
      value={{
        openDialog: open,
        setOpen: setOpen,
      }}
    >
      {children}
    </Progress.Provider>
  );
};

export default ProgressWrapper;
