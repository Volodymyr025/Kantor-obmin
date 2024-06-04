"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Button, Snackbar } from "@mui/material";
import GetCashlessWindow from "../Dialog/GetCashless";
import { CurrencyType } from "./SendCashBtn";
import { Update } from "@/ui/context-store/updatePayDesk";

const steps = ["Вам відпавили інкасацію", "В дорозі...", "Прийнято"];

export default function CashStepper() {
  const [openDialog, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [process, setProcess] = React.useState([]);
  const updatePayDesk = React.useContext(Update).update;

  const getProcessingCash = async () => {
    let storedDepartment = "";
    if (typeof window !== "undefined") {
      storedDepartment = localStorage.getItem("Department") || "";
    }
    try {
      const response = await fetch(
        "https://kantor-obmin-volodymyrs-projects-b4340f70.vercel.app/api/cashless"
      );
      const data = await response.json();
      const result = await data.filter((item: { sendTo: string }) => {
        if (item.sendTo === storedDepartment) {
          return item;
        }
      });
      setProcess(result);
    } catch {
      throw new Error("filed to get cashless");
    }
  };

  const checkProcessing = () => {};
  setInterval(getProcessingCash, 600000);

  React.useEffect(
    () =>
      void (async () => {
        await getProcessingCash();
        checkProcessing();
      })(),
    [updatePayDesk]
  );

  return (
    <>
      <GetCashlessWindow
        open={openDialog}
        setOpen={setOpen}
        setAlert={setOpenAlert}
        setMessage={setMessage}
        data={process}
      />
      <Snackbar
        open={openAlert}
        autoHideDuration={5000}
        message={message}
        onClose={() => setOpenAlert(false)}
      />
      {process.length > 0 && (
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
