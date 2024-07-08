"use client";
import { Button, Snackbar } from "@mui/material";
import React, { useContext, useState } from "react";
import SendDebitCredit from "../../Dialog/SendDebitCredit";

export default function DebitCreditBtn() {
  const [openDialog, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <>
      <SendDebitCredit
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
        Дебет/Кредит
      </Button>
    </>
  );
}
