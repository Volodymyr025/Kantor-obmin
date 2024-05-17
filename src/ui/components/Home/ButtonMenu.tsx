"use client";
import { Box, Button, Snackbar } from "@mui/material";
import React, { useContext, useState } from "react";
import FormDialog from "../Dialog/Dialog";
import { Progress } from "@/ui/context-store/openReport";

export default function ButtonMenu() {
  const { openDialog, setOpen } = useContext(Progress);
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <FormDialog
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
        Звіт
      </Button>
      <Button color="success" variant="contained">
        Відправка інкасації
      </Button>
      <Button color="success" variant="contained">
        Отримання інкасації
      </Button>
    </Box>
  );
}
