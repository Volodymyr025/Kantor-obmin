import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Textarea from "@mui/joy/Textarea";
import Link from "next/link";
import { Update } from "@/ui/context-store/updatePayDesk";
import { getLocal } from "@/ui/utils/getLocalStore";
import {
  Box,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Switch,
  Typography,
} from "@mui/material";

export interface DialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

export default function SendReport({
  open,
  setOpen,
  setAlert,
  setMessage,
}: DialogProps) {
  const setUpdate = React.useContext(Update).setUpdate;

  const [loading, setLoading] = React.useState(false);
  const [operation, setOperation] = React.useState(true);

  const postFormDataToMongoDB = async (report: {}) => {
    setUpdate(true);
    try {
      const response = await fetch("/api/report", {
        method: "POST",
        body: JSON.stringify(report),
      });
      if (!response.ok) {
        throw new Error("Field to create users input");
      }
      const { message } = await response.json();
      setMessage(message);
    } catch {
      throw Error("Field to conect to server");
    }
  };

  const submit = async (value: React.FormEvent<HTMLFormElement>) => {
    const department = getLocal("Department");
    const user = getLocal("User");
    setLoading(true);
    const formData = new FormData(value.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const report = {
      operation: operation,
      value: operation ? +formJson.value : -formJson.value,
      currency: formJson.currency,
      discription: formJson.discription,
      user: user,
      department: department,
    };
    if (!report.value || !report.currency) {
      setAlert(true);
      setMessage("Заповніть будь-ласка поля");
      setLoading(false);
      return;
    }
    await postFormDataToMongoDB(report);
    setUpdate(false);
    setLoading(false);
    setOpen(false);
    setAlert(true);
    setOperation(true);
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      fullWidth
      sx={{ form: { p: 2 } }}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();

          submit(event);
        },
      }}
    >
      <DialogTitle>Дебет/Кредит</DialogTitle>

      <DialogContentText>
        Отримання або видача готівки від третіх осіб.Будь-ласка введіть суму
        оберіть валюту та обовязково перевірте правельність Дебет/Кредит.
        <br /> Дебет* - прихід каси.
        <br /> Кредит* - розхід каси.
      </DialogContentText>

      <TextField
        autoFocus
        margin="dense"
        id="value"
        name="value"
        label="Введіть суму"
        type="number"
        fullWidth
        required
        variant="outlined"
      />
      <FormControl fullWidth margin="dense">
        <InputLabel id="currency">Валюта</InputLabel>
        <Select
          required
          name="currency"
          labelId="currency"
          id="currency"
          label="Валюта"
          defaultValue={""}
        >
          <MenuItem value={"uah"}>UAH</MenuItem>
          <MenuItem value={"usd"}>USD</MenuItem>
          <MenuItem value={"eur"}>EUR</MenuItem>
          <MenuItem value={"gbp"}>GBP</MenuItem>
          <MenuItem value={"pln"}>PLN</MenuItem>
          <MenuItem value={"cad"}>CAD</MenuItem>
          <MenuItem value={"chf"}>CHF</MenuItem>
          <MenuItem value={"sek"}>SEK</MenuItem>
          <MenuItem value={"czk"}>CZK</MenuItem>
          <MenuItem value={"nok"}>NOK</MenuItem>
          <MenuItem value={"gold"}>Gold</MenuItem>
        </Select>
      </FormControl>
      <Textarea
        required
        color="neutral"
        id="discription"
        name="discription"
        minRows={3}
        sx={{ p: 1, my: 1 }}
        placeholder="Опишіть суть операції (Курс,Призначення,Кому/Від кого)"
        size="md"
      />

      <DialogActions sx={{ p: 0 }}>
        <Grid
          container
          pt={2}
          alignItems={"center"}
          textAlign={"center"}
          justifyContent={"space-between"}
        >
          <Grid item xs={12} sm={3} md={3}>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={
                    <Switch
                      defaultChecked
                      onChange={() => setOperation(!operation)}
                    />
                  }
                  label={operation ? "Дебет" : "Кредит"}
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item flex={1}>
            <Box display={"flex"} gap={2}>
              <Button
                variant="contained"
                fullWidth
                color="error"
                disabled={loading}
                onClick={() => setOpen(false)}
              >
                Відміна
              </Button>
              <Button
                fullWidth
                variant="contained"
                disabled={loading}
                color="success"
                type="submit"
              >
                {loading ? (
                  <CircularProgress size={25} title="Підтвердити" />
                ) : (
                  "Підтвердити"
                )}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}
