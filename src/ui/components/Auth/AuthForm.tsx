"use client";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

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
        try {
          const auth = await verifyAuth();
          if (auth && auth.session && auth.session.userId) {
            localStorage.setItem("User", userName);
            localStorage.setItem("Department", department);
          }
        } catch (error) {
          console.error("Auth error:", error);
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
  const [showPassword, setShowPassword] = useState(true);
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [department, setDepartment] = useState("");

  const locationHeandler = (select: string) => {
    setDepartment(select);
  };
  useEffect(() => {
    if (formState && formState.err) {
      setOpen(true);
    }
  }, [formState]);
  return (
    <Grid
      container
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
        message={formState && formState.err}
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
      <Grid item md={6} sm={10} p={2}>
        <form action={formAction}>
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
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "password" : "text"}
            variant="outlined"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: password.length > 0 && (
                <InputAdornment
                  position="start"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
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
              <MenuItem value={"Administration"}>Administration</MenuItem>
              <MenuItem value={"Чортків-РВС"}>Чортків-RwS</MenuItem>
              <MenuItem value={"Чортків-10"}>Чортків №10</MenuItem>
              <MenuItem value={"Чортків-11"}>Чортків №11</MenuItem>
              <MenuItem value={"Тернопіль-8"}>Тернопіль №8</MenuItem>
            </Select>
          </FormControl>
          <SubmitButton userName={userName} department={department} />
        </form>
      </Grid>
    </Grid>
  );
}
