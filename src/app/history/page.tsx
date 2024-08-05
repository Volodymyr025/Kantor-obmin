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
  LinearProgress,
  MenuItem,
  Select,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Main from "./table/Main";

const today = new Date();

const transformData = `${today.getFullYear()}-${(today.getMonth() + 1)
  .toString()
  .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;

export default function History() {
  const [value, setValue] = useState<[]>([]);
  const [operation, setOperation] = useState("");
  const [selectDepart, setSelectDepart] = useState("");
  const [date, setDate] = useState(transformData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const department = getLocal("Department");

  const getExchengeFromDB = async (searchData: {}) => {
    try {
      setValue([]);
      setError("");
      setLoading(true);
      const req = await fetch(`/api/history/${operation}`, {
        method: "POST",
        body: JSON.stringify(searchData),
      });
      const res = await req.json();
      if (res.message) {
        setError(res.message);
        return;
      }
      setValue(res);
    } catch {
      console.log("error to get data");
    } finally {
      setLoading(false);
    }
  };

  const submit = async (value: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(value.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const searchData = {
      department: formJson.department,
      date,
    };
    await getExchengeFromDB(searchData);
  };

  const chengeOperation = (element: string) => {
    setOperation(element);
    setValue([]);
  };
  const chengeDepart = (element: string) => {
    setSelectDepart(element);
    setValue([]);
  };

  return (
    <>
      <Header />
      <Box sx={{ px: 2 }}>
        <Box
          component={"form"}
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            submit(event);
          }}
        >
          <Grid container spacing={2} py={2}>
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
                  onChange={(e) => chengeDepart(e.target.value)}
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
                  label="Оберіть операцію"
                  defaultValue={""}
                  value={operation}
                  onChange={(e) => chengeOperation(e.target.value)}
                >
                  <MenuItem value={"exchenge"}>Обмін</MenuItem>
                  <MenuItem value={"uncashmen"}>Інкасація</MenuItem>
                  <MenuItem value={"rate"}>Курси</MenuItem>
                  <MenuItem value={"debit"}>Дебет/Кредит</MenuItem>
                  <MenuItem value={"report"}>Звіти</MenuItem>
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
              <Button
                variant="contained"
                type="submit"
                fullWidth
                disabled={!operation || !selectDepart}
              >
                Пошук
              </Button>
            </Grid>
            <Grid item md={"auto"} xs={6}>
              <Button
                variant="contained"
                color="error"
                fullWidth
                onClick={() => setValue([])}
              >
                Скинути
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Box>
          {loading ? (
            <LinearProgress />
          ) : (
            <Main data={value} error={error} operation={operation} />
          )}
        </Box>
      </Box>
    </>
  );
}
