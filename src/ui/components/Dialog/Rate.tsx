import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, CircularProgress, Typography } from "@mui/material";
import Link from "next/link";
import { Update } from "@/ui/context-store/updatePayDesk";
import { UserInfo } from "@/ui/context-store/userInfo";
import { getLocal } from "@/ui/utils/getLocalStore";

export interface DialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

export default function RateWindow({
  open,
  setOpen,
  setAlert,
  setMessage,
}: DialogProps) {
  const setUpdate = React.useContext(Update).setUpdate;

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
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          submit(event);
        },
      }}
    >
      <DialogTitle>Курси валют</DialogTitle>
      <DialogContent>
        <DialogContentText>Поставте будь-ласка курси валют</DialogContentText>
        <Box display={"flex"} gap={1}>
          <Box>
            <Typography sx={{ textAlign: "center" }}>Купівля</Typography>
            <TextField
              autoFocus
              margin="dense"
              id="usd"
              name="usd"
              label="Американський долар(Купівля)"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="eur"
              name="eur"
              label="Євро(Купівля)"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="gbp"
              name="gbp"
              label="Англійський фунти(Купівля)"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="pln"
              name="pln"
              label="Польський злотий(Купівля)"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="cad"
              name="cad"
              label="Канадський долар(Купівля)"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="chf"
              name="chf"
              label="Швейцарський франк(Купівля)"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="sek"
              name="sek"
              label="Швецька крона(Купівля)"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="czk"
              name="czk"
              label="Чешська крона(Купівля)"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="nok"
              name="nok"
              label="Норвежська крона(Купівля)"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="gold"
              name="gold"
              label="Золото-999(Купівля)"
              type="text"
              fullWidth
              variant="standard"
            />
          </Box>
          <Box>
            <Typography sx={{ textAlign: "center" }}>Продаж</Typography>

            <TextField
              margin="dense"
              id="sell-usd"
              name="sell-usd"
              label="Американський долар(Продаж)"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="sell-eur"
              name="sell-eur"
              label="Євро(Продаж)"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="sell-gbp"
              name="sell-gbp"
              label="Англійський фунти(Продаж)"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="sell-pln"
              name="sell-pln"
              label="Польський злотий(Продаж)"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="sell-cad"
              name="sell-cad"
              label="Канадський долар(Продаж)"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="sell-chf"
              name="sell-chf"
              label="Швейцарський франк(Продаж)"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="sell-sek"
              name="sell-sek"
              label="Швецька крона(Продаж)"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="sell-czk"
              name="sell-czk"
              label="Чешська крона(Продаж)"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="sell-nok"
              name="sell-nok"
              label="Норвежська крона(Продаж)"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="sell-gold"
              name="sell-gold"
              label="Золото-999(Продаж)"
              type="text"
              fullWidth
              variant="standard"
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link href={"/"}>
          <Button variant="contained" color="info" disabled={loading}>
            Поставлені курси
          </Button>
        </Link>
        <Box display={"flex"} gap={"15px"}>
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
        </Box>
      </DialogActions>
    </Dialog>
  );
}
