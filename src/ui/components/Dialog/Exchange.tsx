import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Update } from "@/ui/context-store/updatePayDesk";

export interface DialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

export default function ExchangeWindow({
  open,
  setOpen,
  setAlert,
  setMessage,
}: DialogProps) {
  const [loading, setLoading] = React.useState(false);
  const setUpdate = React.useContext(Update).setUpdate;
  const [buySell, setBuySell] = React.useState(false);

  return (
    <Dialog
      sx={{ form: { maxWidth: "850px", p: 2 } }}
      fullWidth
      open={open}
      onClose={() => setOpen(false)}
      PaperProps={{
        component: "form",
        onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
        },
      }}
    >
      <DialogTitle sx={{ fontSize: 22, textAlign: "center", fontWeight: 500 }}>
        Обмін валют
      </DialogTitle>

      <Grid container justifyContent={"space-between"} gap={2}>
        <Grid item xs={12} md={5}>
          <TextField
            autoFocus
            id="sum"
            required
            name="sum"
            label={
              buySell ? "Сума валюти яку продаєм" : "Сума валюти яку купляєм"
            }
            type="number"
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={1.5}>
          <FormControl fullWidth>
            <InputLabel id="select-currency">Валюта</InputLabel>
            <Select
              required
              name="currency"
              //   onChange={""}
              labelId="select-currency"
              id="select-currency"
              label="Валюта"
              defaultValue={""}
            >
              <MenuItem value={"Administration"}>USD</MenuItem>
              <MenuItem value={"Чортків"}>EUR</MenuItem>
              <MenuItem value={"Чортків10"}>GBP</MenuItem>
              <MenuItem value={"Чортків11"}>PLN</MenuItem>
              <MenuItem value={"Тернопіль8"}>CAD</MenuItem>
              <MenuItem value={"Тернопіль8"}>CHF</MenuItem>
              <MenuItem value={"Тернопіль8"}>SEK</MenuItem>
              <MenuItem value={"Тернопіль8"}>CZK</MenuItem>
              <MenuItem value={"Тернопіль8"}>NOK</MenuItem>
              <MenuItem value={"Тернопіль8"}>Gold</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={5}>
          <TextField
            fullWidth
            disabled
            id="all"
            label="Разом"
            defaultValue="Hello World"
          />
        </Grid>
      </Grid>
      <DialogActions
        sx={{ display: "flex", p: 0, justifyContent: "space-between" }}
      >
        <FormControl component="fieldset">
          <FormGroup aria-label="position" row>
            <FormControlLabel
              value="top"
              control={
                <Switch color="primary" onChange={() => setBuySell(!buySell)} />
              }
              label={buySell ? "Ми продаєм" : "Ми купляєм"}
              labelPlacement="top"
            />
          </FormGroup>
        </FormControl>
        <Box display={"flex"} gap={2} width={"40%"} py={2}>
          <Button
            fullWidth
            variant="contained"
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
            {loading ? <CircularProgress size={25} title="Міняємо" /> : "Обмін"}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
