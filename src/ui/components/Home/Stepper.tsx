"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Button, Snackbar } from "@mui/material";
import GetCashlessWindow from "../Dialog/GetCashless";

const steps = ["Вам відпавили інкасацію", "В дорозі...", "Прийнято"];

export default function CashStepper() {
  const [openDialog, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [message, setMessage] = React.useState("");
  return (
    <>
      <GetCashlessWindow
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
      <Box sx={{ width: "100%", p: 3, margin: "0 auto" }}>
        <Stepper activeStep={1} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box
          sx={{
            display: "flex",
            pt: 2,
            justifyContent: "center",
          }}
        >
          <Button variant="contained" onClick={() => setOpen(true)}>
            Отримати
          </Button>
        </Box>
      </Box>
    </>
  );
}
