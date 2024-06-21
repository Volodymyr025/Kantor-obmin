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
import { getLocal } from "@/ui/utils/getLocalStore";

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
  const department = getLocal("Department");
  const user = getLocal("User");

  const setUpdate = React.useContext(Update).setUpdate;

  const [rateLoading, setRateLoading] = React.useState(false);
  const [loading, setloading] = React.useState(false);
  const [buySell, setBuySell] = React.useState(false);
  const [rate, setRate] = React.useState("");
  const [sumValue, setSumValue] = React.useState("");
  const [totalValue, setTotalValue] = React.useState(0);
  const [selectCurrency, setSelectCurrensy] = React.useState("");

  const getExchengeRate = async () => {
    setRateLoading(true);
    const selected = buySell ? "sell" + selectCurrency : "buy" + selectCurrency;
    try {
      const req = await fetch("api/rate/exchenge", {
        method: "POST",
        body: JSON.stringify({ department, selected }),
      });
      const response = await req.json();
      setRate(response);
    } catch {
      console.log("error to get rate from db");
    } finally {
      setRateLoading(false);
    }
  };

  const sendExchenge = async () => {
    setUpdate(true);
    setloading(true);
    try {
      const req = await fetch("api/paydesk/exchenge", {
        method: "PATCH",
        body: JSON.stringify({
          department,
          user,
          rate,
          selectCurrency,
          operation: buySell,
          sumValue: buySell ? -sumValue : sumValue,
          totalValue,
        }),
      });
      const res = await req.json();
      setMessage(res.message);
      setAlert(true);
    } catch {
      console.log("error to get rate from db");
    }
  };

  const onCloseWindow = () => {
    setSelectCurrensy("");
    setBuySell(false);
    setRate("");
    setSumValue("");
    setTotalValue(0);
    setOpen(false);
  };

  React.useEffect(() => {
    if (buySell) {
      const sum = +sumValue * +rate;
      return setTotalValue(+sum.toFixed(2));
    }
    const sum = -sumValue * +rate;
    return setTotalValue(+sum.toFixed(2));
  }, [rate, sumValue]);

  React.useEffect(() => {
    void (async () => {
      await getExchengeRate();
    })();
  }, [selectCurrency, buySell]);

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
          if (+sumValue <= 0) {
            setMessage("Введіть суму");
            setAlert(true);
            return;
          }
          if (!rate.length) {
            setMessage("Курса не знайдено");
            setAlert(true);
            return;
          }
          await sendExchenge();
          onCloseWindow();
          setloading(false);
          setUpdate(false);
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
            onChange={(e) => setSumValue(e.target.value)}
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
              onChange={(e) => setSelectCurrensy(e.target.value)}
              labelId="select-currency"
              id="select-currency"
              label="Валюта"
              defaultValue={""}
            >
              <MenuItem value={"Usd"}>USD</MenuItem>
              <MenuItem value={"Eur"}>EUR</MenuItem>
              <MenuItem value={"Gbp"}>GBP</MenuItem>
              <MenuItem value={"Pln"}>PLN</MenuItem>
              <MenuItem value={"Cad"}>CAD</MenuItem>
              <MenuItem value={"Chf"}>CHF</MenuItem>
              <MenuItem value={"Sek"}>SEK</MenuItem>
              <MenuItem value={"Czk"}>CZK</MenuItem>
              <MenuItem value={"Nok"}>NOK</MenuItem>
              <MenuItem value={"Gold"}>Gold</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={5}>
          <TextField
            fullWidth
            disabled
            id="all"
            value={rateLoading ? "Рахуєм..." : totalValue}
            label="Разом"
          />
        </Grid>
      </Grid>
      <DialogActions sx={{ p: 0 }}>
        <Grid container pt={2} alignItems={"center"} textAlign={"center"}>
          <Grid item xs={6} md={2}>
            <Typography>Курс:{rateLoading ? "Пошук..." : rate}</Typography>
          </Grid>
          <Grid item xs={6} md={2}>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  value="top"
                  control={
                    <Switch
                      color="primary"
                      onChange={() => setBuySell(!buySell)}
                    />
                  }
                  label={buySell ? "Ми продаєм" : "Ми купляєм"}
                  labelPlacement="top"
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item flex={1}>
            <Box display={"flex"} gap={2}>
              <Button
                fullWidth
                variant="contained"
                color="error"
                disabled={loading}
                onClick={onCloseWindow}
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
                  <CircularProgress size={25} title="Міняємо" />
                ) : (
                  "Обмін"
                )}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}
