"use client";
import { useEffect, useState } from "react";
import Header from "@/ui/components/Header/Header";
import TableList from "@/ui/components/Table/PayDeskTable";

import { getLocal } from "@/ui/utils/getLocalStore";
import { Box, Button, Grid, TextField } from "@mui/material";
import { DateField, DatePicker } from "@mui/x-date-pickers";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
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

  const getExchengeFromDB = async () => {
    try {
      const req = await fetch("/api/history", {
        method: "POST",
        body: JSON.stringify({ user, department, date }),
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
      <Box sx={{ pt: 8 }}>
        <Grid container p={2} gap={2} alignItems={"center"}>
          <Grid item md={2}>
            <Button fullWidth onClick={getExchengeFromDB} variant="contained">
              Відділення
            </Button>
          </Grid>
          <Grid item md={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{
                  input: { fontSize: 12 },
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
