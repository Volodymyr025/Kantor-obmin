"use client";
import { Button, Snackbar } from "@mui/material";
import React, { useState } from "react";
import SendReport from "../Dialog/SendReport";
import RateWindow from "../Dialog/Rate";

export default function RateBtn() {
  const [openDialog, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <>
      <RateWindow
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
        Курси
      </Button>
    </>
  );
}
