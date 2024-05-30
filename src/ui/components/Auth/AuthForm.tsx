"use client";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import { useFormState, useFormStatus } from "react-dom";

import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { login } from "./login";
import { verifyAuth } from "./lucia";

interface ButtonType {
  userName: string;
  department: string;
}

const SubmitButton = ({ userName, department }: ButtonType) => {
  const { pending } = useFormStatus();

  useEffect(
    () =>
      void (async () => {
        const auth = await verifyAuth();
        if (auth.session) {
          localStorage.setItem("User", userName);
          localStorage.setItem("Department", department);
        }
      })(),
    [pending]
  );

  return (
    <Button
      type="submit"
      fullWidth
      color="success"
      variant="contained"
      sx={{ my: 1 }}
    >
      {pending ? "Перевіряємо дані ..." : "Вхід "}
    </Button>
  );
};

export default function AuthForm() {
  const [formState, formAction] = useFormState(login, {});
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [department, setDepartment] = useState("");

  const locationHeandler = (select: string) => {
    setDepartment(select);
  };
  useEffect(() => {
    if (formState.err) {
      setOpen(true);
    }
  }, [formState]);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message={formState.err}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setOpen(false)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
      <form action={formAction} style={{ width: "35%" }}>
        <Typography sx={{ fontSize: 21, textAlign: "center" }}>
          Вхід в систему
        </Typography>
        <TextField
          id="login"
          label="Логін"
          name="userName"
          onChange={(e) => setUserName(e.target.value)}
          fullWidth
          type="text"
          variant="outlined"
          margin="normal"
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id="Password"
          name="password"
          label="Пароль"
          fullWidth
          type="password"
          variant="outlined"
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="select-department">Оберіть відділення</InputLabel>
          <Select
            required
            name="department"
            onChange={(e) => locationHeandler(e.target.value)}
            labelId="select-department"
            id="select-department"
            label="Оберіть відділення"
            defaultValue={""}
          >
            <MenuItem value={"Admin"}>Admin</MenuItem>
            <MenuItem value={"Чортків"}>Чортків</MenuItem>
            <MenuItem value={"Чортків10"}>Чортків №10</MenuItem>
            <MenuItem value={"Чортків11"}>Чортків №11</MenuItem>
            <MenuItem value={"Тернопіль8"}>Тернопіль №8</MenuItem>
          </Select>
        </FormControl>
        <SubmitButton userName={userName} department={department} />
      </form>
    </Box>
  );
}
