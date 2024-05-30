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
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";

interface DialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

interface CashInput {
  sum: string;
  currency: string;
  department: string;
}

export default function SendCash({
  open,
  setOpen,
  setAlert,
  setMessage,
}: DialogProps) {
  const [loading, setLoading] = React.useState(false);
  const department = localStorage.getItem("Department");
  const user = localStorage.getItem("User");
  const [cashStore, setCashStore] = React.useState<CashInput>({
    sum: "",
    currency: "",
    department: "",
  });
  const [cashList, setCashList] = React.useState<CashInput[]>([]);

  const postFormDataToMongoDB = async (report: {}) => {
    try {
      const response = await fetch("/api/report", {
        method: "POST",
        body: JSON.stringify(report),
        headers: {
          "Content-Type": "aplication/json",
        },
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
      cashStore.department.length <= 0
    ) {
      return;
    }
    setCashList((prev) => [...prev, cashStore]);
    setCashStore({
      sum: "",
      currency: "",
      department: cashStore.department,
    });
  };

  const handlerClose = () => {
    setCashStore({ sum: "", currency: "", department: "" });
    setCashList([]);
    setOpen(false);
  };

  const handlerRemove = (e: any) => {
    const remove = cashList.filter((item, index) => index !== e);
    setCashList(remove);
  };
  const submit = async (value: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    const formData = new FormData(value.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const report = {
      usd: +formJson.usd,
      eur: +formJson.eur,
      gbp: +formJson.gbp,
      pln: +formJson.pln,
      cad: +formJson.cad,
      chf: +formJson.chf,
      sek: +formJson.sek,
      czk: +formJson.czk,
      nok: +formJson.nok,
      gold: +formJson.gold,
      eqvUsd: +formJson["eqv-usd"],
      eqvEur: +formJson["eqv-eur"],
      eqvGbp: +formJson["eqv-gbp"],
      eqvPln: +formJson["eqv-pln"],
      eqvCad: +formJson["eqv-cad"],
      eqvChf: +formJson["eqv-chf"],
      eqvSek: +formJson["eqv-sek"],
      eqvCzk: +formJson["eqv-czk"],
      eqvNok: +formJson["eqv-nok"],
      eqvGold: +formJson["eqv-gold"],
      user: user,
      department: department,
    };
    await postFormDataToMongoDB(report);
    setLoading(false);
    setOpen(false);
    setAlert(true);
  };

  return (
    <Dialog
      open={open}
      sx={{ form: { width: "100%" } }}
      onClose={() => setOpen(false)}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          submit(event);
        },
      }}
    >
      <DialogTitle>Інкасація</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Оберіть суму, валюту та відділення на яке хочете відправити
        </DialogContentText>
        <TextField
          variant="outlined"
          autoFocus
          margin="dense"
          id="sum"
          required
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
            required
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
          <InputLabel id="select-department">Оберіть відділення</InputLabel>
          <Select
            required
            onChange={(e) =>
              setCashStore((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            name="department"
            labelId="select-department"
            id="select-department"
            label="Оберіть відділення"
            defaultValue={""}
            disabled={cashList.length > 0}
            value={
              cashList.length > 0
                ? cashList[0].department
                : cashStore.department
            }
            fullWidth
          >
            <MenuItem value={"Чортків"}>Чортків</MenuItem>
            <MenuItem value={"Чортків10"}>Чортків №10</MenuItem>
            <MenuItem value={"Чортків11"}>Чортків №11</MenuItem>
            <MenuItem value={"Тернопіль8"}>Тернопіль №8</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box display={"flex"} gap={"15px"}>
          <Button
            variant="contained"
            color="error"
            disabled={loading}
            onClick={handlerClose}
          >
            Відміна
          </Button>
          <Button variant="contained" disabled={loading} onClick={addCashList}>
            Додати
          </Button>
        </Box>
        <Button
          variant="contained"
          disabled={loading}
          color="success"
          type="submit"
        >
          {loading ? (
            <CircularProgress size={25} title="Відправити" />
          ) : (
            "Відправити"
          )}
        </Button>
      </DialogActions>
      <Box sx={{ display: "flex", m: 1, gap: 1, flexWrap: "wrap" }}>
        {cashList.map((item, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={{ p: 1 }}
            onClick={() => handlerRemove(index)}
          >
            <Typography fontWeight={700}>Кому:{item.department}</Typography>
            <Typography>Сума:{item.sum}</Typography>
            <Typography>Валюта:{item.currency}</Typography>
          </Paper>
        ))}
      </Box>
    </Dialog>
  );
}
