import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Button } from "@mui/material";

const steps = ["Вам відпавили інкасацію", "В дорозі...", "Прийнято"];

export default function CashStepper() {
  return (
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
        <Button variant="contained">Отримати</Button>
      </Box>
    </Box>
  );
}
