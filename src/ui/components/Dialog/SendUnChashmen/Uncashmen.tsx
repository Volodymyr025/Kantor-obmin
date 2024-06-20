import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Alert,
  AlertTitle,
  Box,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import ListCurrency from "./ListCurrency";
import { Update } from "@/ui/context-store/updatePayDesk";
import { getLocal } from "@/ui/utils/getLocalStore";

interface DialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

export interface CashInput {
  sum: string;
  currency: string;
  sendTo: string;
}

type Currency =
  | "uah"
  | "usd"
  | "eur"
  | "gbp"
  | "pln"
  | "cad"
  | "chf"
  | "sek"
  | "czk"
  | "nok"
  | "gold";

export default function Uncashmen({
  open,
  setOpen,
  setAlert,
  setMessage,
}: DialogProps) {
  const [loading, setLoading] = React.useState(false);
  const setUpdate = React.useContext(Update).setUpdate;
  const [cashList, setCashList] = React.useState<CashInput[]>([]);

  const user = getLocal("User");
  const department = getLocal("Department");

  const [cashStore, setCashStore] = React.useState<CashInput>({
    sum: "",
    currency: "",
    sendTo: "",
  });

  const postFormDataToMongoDB = async (sendTo: {}) => {
    setLoading(true);
    try {
      const response = await fetch("/api/sendCash", {
        method: "POST",
        body: JSON.stringify(sendTo),
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

  const addCashList = () => {
    if (
      cashStore.sum.length <= 0 ||
      cashStore.currency.length <= 0 ||
      cashStore.sendTo.length <= 0
    ) {
      return;
    }
    setCashList((prev) => [...prev, cashStore]);
    setCashStore({
      sum: "",
      currency: "",
      sendTo: cashStore.sendTo,
    });
  };

  const handlerClose = () => {
    setCashStore({ sum: "", currency: "", sendTo: "" });
    setCashList([]);
    setOpen(false);
  };

  const submit = async () => {
    setUpdate(true);
    const sendObj = {
      uah: 0,
      usd: 0,
      eur: 0,
      gbp: 0,
      pln: 0,
      cad: 0,
      chf: 0,
      sek: 0,
      czk: 0,
      nok: 0,
      gold: 0,
      department: department,
      user: user,
      sendTo: cashList[0].sendTo,
      process: "processing",
    };
    cashList.forEach((item) => {
      const currency = item.currency.toLowerCase() as Currency;
      const sum = parseFloat(item.sum);

      if (sendObj.hasOwnProperty(currency)) {
        sendObj[currency] += sum;
      }
    });
    await postFormDataToMongoDB(sendObj);
    setUpdate(false);
    setLoading(false);
    setAlert(true);
    handlerClose();
  };

  return (
    <Dialog
      open={open}
      sx={{ form: { width: "100%", p: 2 } }}
      onClose={() => setOpen(false)}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          submit();
        },
      }}
    >
      <DialogTitle>Інкасація</DialogTitle>

      <DialogContentText>
        Оберіть суму, валюту та відділення на яке хочете відправити
      </DialogContentText>
      <TextField
        variant="outlined"
        autoFocus
        margin="dense"
        id="sum"
        onChange={(e) =>
          setCashStore((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }))
        }
        name="sum"
        value={cashStore.sum}
        label="Вкажіть суму відправки"
        type="number"
        fullWidth
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="currency">Оберіть валюту</InputLabel>
        <Select
          onChange={(e) =>
            setCashStore((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
          name="currency"
          labelId="currency"
          id="currency"
          label="Оберіть валюту"
          defaultValue={""}
          value={cashStore.currency}
          fullWidth
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
          <MenuItem value={"gold"}>GOLD</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel id="select-sendTo">Оберіть відділення</InputLabel>
        <Select
          onChange={(e) =>
            setCashStore((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
          name="sendTo"
          labelId="select-sendTo"
          id="select-sendTo"
          label="Оберіть відділення"
          defaultValue={""}
          disabled={cashList.length > 0}
          value={cashList.length > 0 ? cashList[0].sendTo : cashStore.sendTo}
          fullWidth
        >
          <MenuItem value={"Чортків"} disabled={department === "Чортків"}>
            Чортків
          </MenuItem>
          <MenuItem value={"Чортків10"} disabled={department === "Чортків10"}>
            Чортків №10
          </MenuItem>
          <MenuItem value={"Чортків11"} disabled={department === "Чортків11"}>
            Чортків №11
          </MenuItem>
          <MenuItem value={"Тернопіль8"} disabled={department === "Тернопіль8"}>
            Тернопіль №8
          </MenuItem>
          <MenuItem
            value={"Administration"}
            disabled={department === "Administration"}
          >
            Administration
          </MenuItem>
        </Select>
      </FormControl>

      <DialogActions
        sx={{
          p: 0,
        }}
      >
        <Grid container gap={"15px"} justifyContent={"space-between"}>
          <Grid item xs={12} sm={"auto"}>
            <Grid container display={"flex"} gap={"15px"} flexWrap={"nowrap"}>
              <Grid item xs={6} sm={"auto"} md={"auto"}>
                <Button
                  fullWidth
                  variant="contained"
                  color="error"
                  disabled={loading}
                  onClick={handlerClose}
                >
                  Відміна
                </Button>
              </Grid>
              <Grid item xs={6} sm={"auto"} md={"auto"}>
                <Button
                  fullWidth
                  onClick={addCashList}
                  variant="contained"
                  disabled={loading}
                >
                  Додати
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={"auto"} md={"auto"}>
            <Button
              fullWidth
              variant="contained"
              disabled={loading || cashList.length === 0}
              color="success"
              type="submit"
            >
              {loading ? (
                <CircularProgress size={25} title="Відправити" />
              ) : (
                "Відправити"
              )}
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
      <ListCurrency cashList={cashList} setCashList={setCashList} />
    </Dialog>
  );
}
