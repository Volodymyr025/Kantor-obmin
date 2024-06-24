"use client";
import { Button, Snackbar } from "@mui/material";
import React, { useState } from "react";
import SendReport from "../../Dialog/SendReport";
import RateWindow, { RateType } from "../../Dialog/Rate";
import { getLocal } from "@/ui/utils/getLocalStore";

export default function RateBtn() {
  const [openDialog, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [rate, setRate] = useState<RateType>();

  let department = getLocal("Department");

  const getRateFromDB = async () => {
    try {
      const req = await fetch("api/rate", {
        method: "PATCH",
        body: JSON.stringify({ department }),
      });
      const response = await req.json();
      setRate(response);
    } catch {
      console.log("error to get rate from db");
    }
  };

  return (
    <>
      <RateWindow
        open={openDialog}
        setOpen={setOpen}
        setAlert={setOpenAlert}
        setMessage={setMessage}
        rate={rate}
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
        onClick={() => {
          setOpen(true), getRateFromDB();
        }}
      >
        Курси
      </Button>
    </>
  );
}
