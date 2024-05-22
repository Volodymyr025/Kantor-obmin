"use client";
import {
  Alert,
  Box,
  Button,
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
import { useFormState } from "react-dom";
import { login } from "./lucia";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

export default function AuthForm() {
  const [formState, formAction] = useFormState(login, {});
  const [open, setOpen] = useState(false);

  const checkError = () => {
    if (formState) {
      setOpen(true);
    }
  };

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
          <InputLabel id="select-departament">Оберіть відділення</InputLabel>
          <Select
            required
            name="departament"
            labelId="select-departament"
            id="select-departament"
            label="Оберіть відділення"
            defaultValue={""}
          >
            <MenuItem value={"Чортків"}>Чортків</MenuItem>
            <MenuItem value={"Чортків10"}>Чортків №10</MenuItem>
            <MenuItem value={"Чортків11"}>Чортків №11</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          fullWidth
          onClick={checkError}
          color="success"
          variant="contained"
          sx={{ my: 1 }}
        >
          Вхід
        </Button>
      </form>
    </Box>
  );
}
