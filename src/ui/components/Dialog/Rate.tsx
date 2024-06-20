import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, CircularProgress, Typography } from "@mui/material";
import { Update } from "@/ui/context-store/updatePayDesk";
import { getLocal } from "@/ui/utils/getLocalStore";

export interface RateType {
  buyUsd: number;
  buyEur: number;
  buyGbp: number;
  buyPln: number;
  buyCad: number;
  buyChf: number;
  buySek: number;
  buyCzk: number;
  buyNok: number;
  buyGold: number;
  sellUsd: number;
  sellEur: number;
  sellGbp: number;
  sellPln: number;
  sellCad: number;
  sellChf: number;
  sellSek: number;
  sellCzk: number;
  sellNok: number;
  sellGold: number;
}

export interface DialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  rate: RateType | undefined;
}

export default function RateWindow({
  rate,
  open,
  setOpen,
  setAlert,
  setMessage,
}: DialogProps) {
  const setUpdate = React.useContext(Update).setUpdateRate;

  const [loading, setLoading] = React.useState(false);
  const department = getLocal("Department");
  const user = getLocal("User");

  const postRateToMongoDB = async (report: {}) => {
    setUpdate(true);
    try {
      const response = await fetch("/api/rate", {
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
    setLoading(true);
    const formData = new FormData(value.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const report = {
      buyUsd: +formJson.usd,
      buyEur: +formJson.eur,
      buyGbp: +formJson.gbp,
      buyPln: +formJson.pln,
      buyCad: +formJson.cad,
      buyChf: +formJson.chf,
      buySek: +formJson.sek,
      buyCzk: +formJson.czk,
      buyNok: +formJson.nok,
      buyGold: +formJson.gold,
      sellUsd: +formJson["sell-usd"],
      sellEur: +formJson["sell-eur"],
      sellGbp: +formJson["sell-gbp"],
      sellPln: +formJson["sell-pln"],
      sellCad: +formJson["sell-cad"],
      sellChf: +formJson["sell-chf"],
      sellSek: +formJson["sell-sek"],
      sellCzk: +formJson["sell-czk"],
      sellNok: +formJson["sell-nok"],
      sellGold: +formJson["sell-gold"],
      user: user,
      department: department,
    };
    await postRateToMongoDB(report);
    setLoading(false);
    setOpen(false);
    setUpdate(false);
    setAlert(true);
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      sx={{ form: { px: 2 } }}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          submit(event);
        },
      }}
    >
      <DialogTitle textAlign={"center"} p={0.5}>
        Курси валют
      </DialogTitle>
      <Box display={"flex"} gap={1}>
        <Box>
          <Typography sx={{ textAlign: "center" }}>Купівля</Typography>
          <TextField
            autoFocus
            value={rate && rate.buyUsd}
            id="usd"
            name="usd"
            label="Американський долар(Купівля)"
            type="number"
            inputProps={{
              step: "0.01",
            }}
            fullWidth
            variant="standard"
          />
          <TextField
            id="eur"
            name="eur"
            label="Євро(Купівля)"
            type="number"
            inputProps={{
              step: "0.01",
            }}
            fullWidth
            variant="standard"
          />
          <TextField
            id="gbp"
            name="gbp"
            label="Англійський фунти(Купівля)"
            type="number"
            inputProps={{
              step: "0.01",
            }}
            fullWidth
            variant="standard"
          />
          <TextField
            id="pln"
            name="pln"
            label="Польський злотий(Купівля)"
            type="number"
            inputProps={{
              step: "0.01",
            }}
            fullWidth
            variant="standard"
          />
          <TextField
            id="cad"
            name="cad"
            label="Канадський долар(Купівля)"
            type="number"
            inputProps={{
              step: "0.01",
            }}
            fullWidth
            variant="standard"
          />
          <TextField
            id="chf"
            name="chf"
            label="Швейцарський франк(Купівля)"
            type="number"
            inputProps={{
              step: "0.01",
            }}
            fullWidth
            variant="standard"
          />
          <TextField
            id="sek"
            name="sek"
            label="Швецька крона(Купівля)"
            type="number"
            inputProps={{
              step: "0.01",
            }}
            fullWidth
            variant="standard"
          />
          <TextField
            id="czk"
            name="czk"
            label="Чешська крона(Купівля)"
            type="number"
            inputProps={{
              step: "0.01",
            }}
            fullWidth
            variant="standard"
          />
          <TextField
            id="nok"
            name="nok"
            label="Норвежська крона(Купівля)"
            type="number"
            inputProps={{
              step: "0.01",
            }}
            fullWidth
            variant="standard"
          />
          <TextField
            id="gold"
            name="gold"
            label="GOLD/USD(Купівля)"
            type="number"
            inputProps={{
              step: "0.01",
            }}
            fullWidth
            variant="standard"
          />
        </Box>
        <Box>
          <Typography sx={{ textAlign: "center" }}>Продаж</Typography>

          <TextField
            id="sell-usd"
            name="sell-usd"
            label="Американський долар(Продаж)"
            type="number"
            inputProps={{
              step: "0.01",
            }}
            fullWidth
            variant="standard"
          />
          <TextField
            id="sell-eur"
            name="sell-eur"
            label="Євро(Продаж)"
            type="number"
            inputProps={{
              step: "0.01",
            }}
            fullWidth
            variant="standard"
          />
          <TextField
            id="sell-gbp"
            name="sell-gbp"
            label="Англійський фунти(Продаж)"
            type="number"
            inputProps={{
              step: "0.01",
            }}
            fullWidth
            variant="standard"
          />
          <TextField
            id="sell-pln"
            name="sell-pln"
            label="Польський злотий(Продаж)"
            type="number"
            inputProps={{
              step: "0.01",
            }}
            fullWidth
            variant="standard"
          />
          <TextField
            id="sell-cad"
            name="sell-cad"
            label="Канадський долар(Продаж)"
            type="number"
            inputProps={{
              step: "0.01",
            }}
            fullWidth
            variant="standard"
          />
          <TextField
            id="sell-chf"
            name="sell-chf"
            label="Швейцарський франк(Продаж)"
            type="number"
            inputProps={{
              step: "0.01",
            }}
            fullWidth
            variant="standard"
          />
          <TextField
            id="sell-sek"
            name="sell-sek"
            label="Швецька крона(Продаж)"
            type="number"
            inputProps={{
              step: "0.01",
            }}
            fullWidth
            variant="standard"
          />
          <TextField
            id="sell-czk"
            name="sell-czk"
            label="Чешська крона(Продаж)"
            type="number"
            inputProps={{
              step: "0.01",
            }}
            fullWidth
            variant="standard"
          />
          <TextField
            id="sell-nok"
            name="sell-nok"
            label="Норвежська крона(Продаж)"
            type="number"
            inputProps={{
              step: "0.01",
            }}
            fullWidth
            variant="standard"
          />
          <TextField
            id="sell-gold"
            name="sell-gold"
            label="GOLD/USD(Продаж)"
            type="number"
            inputProps={{
              step: "0.01",
            }}
            fullWidth
            variant="standard"
          />
        </Box>
      </Box>
      <DialogActions
        sx={{ display: "flex", justifyContent: "flex-end", py: 1, px: 0 }}
      >
        <Button
          variant="contained"
          color="error"
          disabled={loading}
          onClick={() => setOpen(false)}
        >
          Відміна
        </Button>
        <Button
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
      </DialogActions>
    </Dialog>
  );
}
