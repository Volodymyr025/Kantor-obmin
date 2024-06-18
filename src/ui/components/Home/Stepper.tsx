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
import { UserInfo } from "@/ui/context-store/userInfo";
import { getLocal } from "@/ui/utils/getLocalStore";

const steps = ["Вам відпавили інкасацію", "В дорозі...", "Прийнято"];

export default function CashStepper() {
  const [openDialog, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [processing, setProcessing] = React.useState([]);
  const updatePayDesk = React.useContext(Update).update;

  const getProcessingCash = async () => {
    const storedDepartment = getLocal("Department");
    try {
      const response = await fetch(`/api/cashless`, {
        next: { revalidate: 600 },
      });
      const data = await response.json();
      const result = await data.filter((item: { sendTo: string }) => {
        if (item.sendTo === storedDepartment) {
          return item;
        }
      });
      setProcessing(result);
    } catch {
      throw new Error("filed to get cashless");
    }
  };

  React.useEffect(
    () =>
      void (async () => {
        await getProcessingCash();
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
        data={processing}
      />
      <Snackbar
        open={openAlert}
        autoHideDuration={5000}
        message={message}
        onClose={() => setOpenAlert(false)}
      />
      {processing.length > 0 && (
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
