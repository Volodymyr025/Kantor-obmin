"use client";
import { Button, Snackbar } from "@mui/material";
import React, { useState } from "react";
import SendReport from "../../Dialog/SendDebitCredit";
import ExchangeWindow from "../../Dialog/Exchange";

export default function ExchangeBtn() {
  const [openDialog, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <>
      <ExchangeWindow
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
      <Button
        fullWidth
        color="success"
        variant="contained"
        onClick={() => setOpen(true)}
      >
        Обмін
      </Button>
    </>
  );
}
