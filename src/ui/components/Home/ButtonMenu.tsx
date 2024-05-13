"use client";
import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import FormDialog from "../Dialog/Dialog";

export default function ButtonMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <FormDialog open={open} setOpen={setOpen} />
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
