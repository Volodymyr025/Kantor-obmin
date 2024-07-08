import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import PayDesk from "./WorkSpace/PayDesk";
import DebitCreditBtn from "./Btn/DebitKredit";
import SendCashBtn from "./Btn/SendCashBtn";
import CashStepper from "./Stepper";
import { verifyAuth } from "../Auth/lucia";
import { redirect } from "next/navigation";
import ExchangeBtn from "./Btn/ExchangeBtn";
import RateBtn from "./Btn/RateBtn";
import RateTable from "../Table/RateTable";
import WorkSpace from "./WorkSpace/WorkSpace";
import { hashPassword } from "../Auth/hash";
import HistoryBtn from "./Btn/HistoryBtn";

export default async function Home() {
  const resultAuth = await verifyAuth();

  if (!resultAuth.user) {
    return redirect("/login");
  }

  return (
    <Grid container sx={{ width: "100%", pt: 12, px: 2, gap: 2 }}>
      <Grid item xs={12} sm={"auto"}>
        <ExchangeBtn />
      </Grid>
      <Grid item xs={12} sm={"auto"}>
        <SendCashBtn />
      </Grid>
      <Grid item xs={12} sm={"auto"}>
        <RateBtn />
      </Grid>
      <Grid item xs={12} sm={"auto"}>
        <DebitCreditBtn />
      </Grid>
      <Grid item xs={12} sm={"auto"}>
        <HistoryBtn />
      </Grid>

      <CashStepper />
      <WorkSpace />
    </Grid>
  );
}
