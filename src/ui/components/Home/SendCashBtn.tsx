"use client";
import { Button, Snackbar } from "@mui/material";
import React, { useContext, useState } from "react";
import Uncashmen from "../Dialog/SendUnChashmen/Uncashmen";

export interface CurrencyType {
  _id: string;
  usd: number;
  eur: number;
  gbp: number;
  pln: number;
  cad: number;
  chf: number;
  sek: number;
  czk: number;
  nok: number;
  gold: number;
  user: string;
  sendTo: string;
  department: string;
}

export default function SendCashBtn() {
  const [openDialog, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <>
      <Uncashmen
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
