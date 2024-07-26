"use client";
import { useState } from "react";
import Header from "@/ui/components/Header/Header";

import { getLocal } from "@/ui/utils/getLocalStore";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
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

  const department = getLocal("Department");

  const getExchengeFromDB = async (searchData: {}) => {
    try {
      const req = await fetch("/api/history", {
        method: "POST",
        body: JSON.stringify(searchData),
      });
      const res = await req.json();
      setValue(res);
    } catch {
      console.log("error to get exchenge");
    }
  };

  const submit = (value: React.FormEvent<HTMLFormElement>) => {
    const user = getLocal("User");
    const formData = new FormData(value.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const searchData = {
      user,
      department: formJson.department,
      date,
      operation: formJson.operation,
    };
    // getExchengeFromDB(searchData);
  };

  return (
    <>
      <Header />
      <Box sx={{ pt: 10 }}>
        <Box
          component={"form"}
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            submit(event);
          }}
          px={2}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <FormControl
                fullWidth
                margin="normal"
                sx={{ p: 0, m: 0 }}
                size="small"
              >
                <InputLabel id="select-department">
                  Оберіть відділення
                </InputLabel>
                <Select
                  required
                  sx={{ div: { p: 1 } }}
                  name="department"
                  labelId="select-department"
                  id="select-department"
                  label="Оберіть відділення"
                  defaultValue={""}
                >
                  {department === "Administration" && (
                    <MenuItem
                      value={"Administration"}
                      disabled={department !== "Administration"}
                    >
                      Administration
                    </MenuItem>
                  )}
                  <MenuItem value={"Чортків-РВС"}>Чортків-RwS</MenuItem>
                  <MenuItem value={"Чортків-10"}>Чортків №10</MenuItem>
                  <MenuItem value={"Чортків-11"}>Чортків №11</MenuItem>
                  <MenuItem value={"Тернопіль-8"}>Тернопіль №8</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl
                fullWidth
                margin="normal"
                sx={{ p: 0, m: 0 }}
                size="small"
              >
                <InputLabel id="select-operation">Оберіть операцію</InputLabel>
                <Select
                  required
                  sx={{ div: { p: 1 } }}
                  name="operation"
                  labelId="select-operation"
                  id="select-operation"
                  label="Оберіть відділення"
                  defaultValue={""}
                >
                  <MenuItem value={"Обмін"}>Обмін</MenuItem>
                  <MenuItem value={"Інкасація"}>Інкасація</MenuItem>
                  <MenuItem value={"Курси"}>Курси</MenuItem>
                  <MenuItem value={"Дебет/Кредит"}>Дебет/Кредит</MenuItem>
                  <MenuItem value={"Звіти"}>Звіти</MenuItem>
                </Select>
              </FormControl>
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
            <Grid item md={"auto"} xs={6}>
              <Button variant="contained" type="submit" fullWidth>
                Пошук
              </Button>
            </Grid>
            <Grid item md={"auto"} xs={6}>
              <Button variant="contained" color="error" fullWidth>
                Скинути
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ p: 5 }}>
          <HistoryTable data={value} />
        </Box>
      </Box>
    </>
  );
}
