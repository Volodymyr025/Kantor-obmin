import Grid from "@mui/material/Grid";
import PayDesk from "./WorkSpace/PayDesk";
import DebitCreditBtn from "./Btn/DebitKredit";
import SendCashBtn from "./Btn/SendCashBtn";
import CashStepper from "./Stepper";
import { verifyAuth } from "../Auth/lucia";
import { redirect } from "next/navigation";
import ExchangeBtn from "./Btn/ExchangeBtn";
import RateBtn from "./Btn/RateBtn";
import WorkSpace from "./WorkSpace/WorkSpace";
import HistoryBtn from "./Btn/HistoryBtn";
import ReportBtn from "./Btn/ReportBtn";
import DepartBtn from "./DepartBtn/DepartSelect";

export default async function Home() {
  const resultAuth = await verifyAuth();

  if (!resultAuth.user) {
    return redirect("/login");
  }
  const admin = resultAuth.user.department.includes("Administration");

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
      <Grid item xs={12} sm={"auto"}>
        <ReportBtn />
      </Grid>
      <CashStepper />
      <WorkSpace role={admin} />
    </Grid>
  );
}
