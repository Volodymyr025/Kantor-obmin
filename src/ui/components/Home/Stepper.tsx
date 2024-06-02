"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Button, Snackbar } from "@mui/material";
import GetCashlessWindow from "../Dialog/GetCashless";
import { CurrencyType } from "./SendCashBtn";

const steps = ["Вам відпавили інкасацію", "В дорозі...", "Прийнято"];

const getProcessingCash = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/cashless");
    const data = await response.json();
    return data;
  } catch {
    throw new Error("filed to get cashless");
  }
};
export default function CashStepper() {
  const [openDialog, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [data, setData] = React.useState([]);

  const checkProcessing = async () => {
    const data = await getProcessingCash();
    const localDepart = localStorage.getItem("Department");

    const getProcessingData = data.filter(
      (item: { process: string; sendTo: string }) => {
        if (item.process === "processing" && item.sendTo === localDepart) {
          return item;
        }
      }
    );
    setData(getProcessingData);
  };

  setInterval(checkProcessing, 600000);

  React.useEffect(
    () =>
      void (async () => {
        await checkProcessing();
      })(),
    []
  );
  return (
    <>
      <GetCashlessWindow
        open={openDialog}
        setOpen={setOpen}
        setAlert={setOpenAlert}
        setMessage={setMessage}
        data={data}
      />
      <Snackbar
        open={openAlert}
        autoHideDuration={5000}
        message={message}
        onClose={() => setOpenAlert(false)}
      />
      {data.length && (
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
      )}
    </>
  );
}
