import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";

interface DialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FormDialog({ open, setOpen }: DialogProps) {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          const report = {
            usd: formJson.usd,
            eur: formJson.eur,
            gbp: formJson.gbp,
            pln: formJson.pln,
            cad: formJson.cad,
            chf: formJson.chf,
            sek: formJson.sek,
            czk: formJson.czk,
            nok: formJson.nok,
            gold: formJson.gold,
            eqvUsd: formJson["eqv-usd"],
            eqvEur: formJson["eqv-eur"],
            eqvGbp: formJson["eqv-gbp"],
            eqvPln: formJson["eqv-pln"],
            eqvCad: formJson["eqv-cad"],
            eqvChf: formJson["eqv-chf"],
            eqvSek: formJson["eqv-sek"],
            eqvCzk: formJson["eqv-czk"],
            eqvNok: formJson["eqv-nok"],
            eqvGold: formJson["eqv-gold"],
          };
          console.log(report);
          setOpen(false);
        },
      }}
    >
      <DialogTitle>Звіт</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Перенесіть будь-ласка всі ваші операції в кінці операційного дня з
          таблички Exel (куп/прод та потрачену грн)
        </DialogContentText>
        <Box display={"flex"} gap={1}>
          <Box>
            <TextField
              autoFocus
              margin="dense"
              id="usd"
              name="usd"
              label="Американський долар"
              type="number"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="eur"
              name="eur"
              label="Євро"
              type="number"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="gbp"
              name="gbp"
              label="Англійський фунти"
              type="number"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="pln"
              name="pln"
              label="Польський злотий"
              type="number"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="cad"
              name="cad"
              label="Канадський долар"
              type="number"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="chf"
              name="chf"
              label="Швейцарський франк"
              type="number"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="sek"
              name="sek"
              label="Швецька крона"
              type="number"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="czk"
              name="czk"
              label="Чешська крона"
              type="number"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="nok"
              name="nok"
              label="Норвежська крона"
              type="number"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="gold"
              name="gold"
              label="Золото-999"
              type="number"
              fullWidth
              variant="standard"
            />
          </Box>
          <Box>
            <TextField
              autoFocus
              margin="dense"
              id="eqv-usd"
              name="eqv-usd"
              label="Еквівалент Американський долар в грн"
              type="number"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="eqv-eur"
              name="eqv-eur"
              label="Еквівалент Євро в грн"
              type="number"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="eqv-gbp"
              name="eqv-gbp"
              label="Еквівалент Англійський фунти в грн"
              type="number"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="eqv-pln"
              name="eqv-pln"
              label="Еквівалент Польський злотий в грн"
              type="number"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="eqv-cad"
              name="eqv-cad"
              label="Еквівалент Канадський долар в грн"
              type="number"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="eqv-chf"
              name="eqv-chf"
              label="Еквівалент Швейцарський франк в грн"
              type="number"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="eqv-sek"
              name="eqv-sek"
              label="Еквівалент Швецька крона в грн"
              type="number"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="eqv-czk"
              name="eqv-czk"
              label="Еквівалент Чешська крона в грн"
              type="number"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="eqv-nok"
              name="eqv-nok"
              label="Еквівалент Норвежська крона в грн"
              type="number"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="eqv-gold"
              name="eqv-gold"
              label="Еквівалент Золото-999 в грн"
              type="number"
              fullWidth
              variant="standard"
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="error"
          onClick={() => setOpen(false)}
        >
          Відміна
        </Button>
        <Button variant="contained" color="success" type="submit">
          Підтвердити
        </Button>
      </DialogActions>
    </Dialog>
  );
}
