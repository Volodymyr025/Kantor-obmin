"use client";
import { useState } from "react";
import Header from "@/ui/components/Header/Header";

import { getLocal } from "@/ui/utils/getLocalStore";
import { Box, Button, Grid } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import HistoryTable from "@/ui/components/Table/HistoryTable";

const today = new Date();

const transformData = `${today.getFullYear()}-${(today.getMonth() + 1)
  .toString()
  .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;

export default function History() {
  const [value, setValue] = useState<[]>([]);
  const [date, setDate] = useState(transformData);

  const user = getLocal("User");
  const department = getLocal("Department");

  const getExchengeFromDB = async (operation: boolean) => {
    try {
      const req = await fetch("/api/history", {
        method: "POST",
        body: JSON.stringify({ user, department, date, operation: operation }),
      });
      const res = await req.json();
      setValue(res);
    } catch {
      console.log("error to get exchenge");
    }
  };

  return (
    <>
      <Header />
      <Box sx={{ pt: 10 }}>
        <Grid container p={2} gap={2} alignItems={"center"}>
          <Grid item xs={12} md={3}>
            <Button
              fullWidth
              onClick={() => getExchengeFromDB(true)}
              variant="contained"
            >
              Обмінка відділення
            </Button>
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              fullWidth
              onClick={() => getExchengeFromDB(false)}
              variant="contained"
            >
              Обмінка касира
            </Button>
          </Grid>
          <Grid item xs={12} md={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{
                  width: "100%",
                  input: { fontSize: 16, p: 1 },
                }}
                format="DD/MM/YYYY"
                onChange={(e) => e && setDate(`${e.format("YYYY/MM/DD")}`)}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Box sx={{ p: 5 }}>
          <HistoryTable data={value} />
        </Box>
      </Box>
    </>
  );
}
