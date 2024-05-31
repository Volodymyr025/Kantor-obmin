import { Alert, AlertTitle, Box, Typography } from "@mui/material";
import { CashInput } from "./Uncashmen";

interface ListProps {
  cashList: CashInput[];
  setCashList: React.Dispatch<React.SetStateAction<CashInput[]>>;
}

export default function ListCurrency({ cashList, setCashList }: ListProps) {
  const handlerRemove = (e: any) => {
    const remove = cashList.filter((item, index) => index !== e);
    setCashList(remove);
  };
  return (
    <Box
      sx={{
        display: "flex",
        m: 1,
        gap: 1,
        flexWrap: "wrap",
        maxHeight: "400px",
        overflowY: "scroll",
      }}
    >
      {cashList.map((item, index) => (
        <Alert
          severity="info"
          onClose={() => handlerRemove(index)}
          key={index}
          sx={{ width: "100%" }}
        >
          <AlertTitle>{item.sendTo}</AlertTitle>

          <Typography>
            Сума:{item.sum}
            {" " + item.currency.toUpperCase()}
          </Typography>
        </Alert>
      ))}
    </Box>
  );
}
