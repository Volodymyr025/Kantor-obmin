import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, CircularProgress, Paper } from "@mui/material";

export interface DialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

export default function GetCashlessWindow({
  open,
  setOpen,
  setAlert,
  setMessage,
}: DialogProps) {
  const [data, setData] = React.useState([]);

  const postFormDataToMongoDB = async (report: {}) => {
    try {
      const response = await fetch("/api/cashless", {
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

  const [loading, setLoading] = React.useState(false);

  const submit = async () => {
    setLoading(false);
    setOpen(false);
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
          submit();
        },
      }}
    >
      <DialogTitle>Отримати інкасацію</DialogTitle>
      <DialogContent>
        <DialogContentText>
          При підтвердженні отримання інкасації ви підтверджуєте що вами було
          перераховано кошти в 100% розмірі і немає розбіжностей з інкасаційним
          актом
        </DialogContentText>
        <Box display={"flex"} gap={1}></Box>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "space-between" }}>
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
              <CircularProgress size={25} title="Прийняти" />
            ) : (
              "Прийняти"
            )}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
