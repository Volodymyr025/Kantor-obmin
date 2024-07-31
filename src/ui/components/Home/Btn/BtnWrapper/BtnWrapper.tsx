"use client";
import { Button, Snackbar } from "@mui/material";
import { useState } from "react";

interface WrapperProps {
  Window: any;
  title: string;
}

export default function BtnWrapper({ Window, title }: WrapperProps) {
  const [openDialog, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <>
      <Window
        open={openDialog}
        setOpen={setOpen}
        setAlert={setOpenAlert}
        setMessage={setMessage}
      />
      <Snackbar
        open={openAlert}
        autoHideDuration={5000}
        message={message}
        onClose={() => setOpenAlert(false)}
      />
      <>
        <Button
          fullWidth
          color="success"
          variant="contained"
          onClick={() => setOpen(true)}
        >
          {title}
        </Button>
      </>
    </>
  );
}
