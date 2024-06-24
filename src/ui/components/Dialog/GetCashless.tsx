import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import { Update } from "@/ui/context-store/updatePayDesk";

export interface DialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  data: any;
}

export default function GetCashlessWindow({
  open,
  setOpen,
  setAlert,
  setMessage,
  data,
}: DialogProps) {
  const [loading, setLoading] = React.useState(false);
  const setUpdateStepper = React.useContext(Update).setUpdateStepper;
  const setUpdatePaydesk = React.useContext(Update).setUpdate;

  const getCashless = async () => {
    setUpdateStepper(true);
    setUpdatePaydesk(true);
    setLoading(true);
    try {
      const response = await fetch("/api/cashless", {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Field to update cashless");
      }
      const { message } = await response.json();
      setMessage(message);
    } catch {
      throw Error("Field to conect to server");
    }
  };

  const submit = async () => {
    await getCashless();
    setOpen(false);
    setAlert(true);
    setLoading(false);
    setUpdateStepper(false);
    setUpdatePaydesk(false);
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      sx={{ form: { maxWidth: "700px" } }}
      PaperProps={{
        component: "form",
        onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          await submit();
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

        <Box display={"flex"} gap={1} flexWrap={"wrap"}>
          {data.map((item: any) => {
            return (
              <Paper key={item._id} sx={{ p: 2, my: 1 }}>
                <Typography variant="h5">{item.department}</Typography>
                {item.uah > 0 && <Typography>UAH:{item.uah}</Typography>}
                {item.usd > 0 && <Typography>USD:{item.usd}</Typography>}
                {item.eur > 0 && <Typography>EUR:{item.eur}</Typography>}
                {item.gbp > 0 && <Typography>GBP:{item.gbp}</Typography>}
                {item.pln > 0 && <Typography>PLN:{item.pln}</Typography>}
                {item.cad > 0 && <Typography>CAD:{item.cad}</Typography>}
                {item.chf > 0 && <Typography>CHF:{item.chf}</Typography>}
                {item.sek > 0 && <Typography>SEK:{item.sek}</Typography>}
                {item.czk > 0 && <Typography>CZK:{item.czk}</Typography>}
                {item.nok > 0 && <Typography>NOK:{item.nok}</Typography>}
                {item.gold > 0 && <Typography>GOLD:{item.gold}</Typography>}
                <Typography>Відправник:{item.user}</Typography>
              </Paper>
            );
          })}
        </Box>
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
