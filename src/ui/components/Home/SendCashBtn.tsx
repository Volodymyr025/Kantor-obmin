"use client";
import { Button, Snackbar } from "@mui/material";
import React, { useContext, useState } from "react";
import SendCash from "../Dialog/SendCash";

export default function SendCashBtn() {
  const [openDialog, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <>
      <SendCash
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
      <Button color="success" variant="contained" onClick={() => setOpen(true)}>
        Відправка інкасації
      </Button>
    </>
  );
}
