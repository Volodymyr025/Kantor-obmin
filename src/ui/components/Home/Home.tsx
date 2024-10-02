import Grid from "@mui/material/Grid";
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

const buttons = [
  { component: <ExchangeBtn />, key: "exchange" },
  { component: <SendCashBtn />, key: "sendCash" },
  { component: <RateBtn />, key: "rate" },
  { component: <DebitCreditBtn />, key: "debitCredit" },
  { component: <HistoryBtn />, key: "history" },
  { component: <ReportBtn />, key: "report" },
];

export default async function Home() {
  const resultAuth = await verifyAuth();

  if (!resultAuth.user) {
    return redirect("/login");
  }
  const admin = resultAuth.user.department.includes("Administration");

  return (
    <Grid container sx={{ width: "100%", p: 2, gap: 2 }}>
      {buttons.map(({ component, key }) => (
        <Grid item xs={12} sm="auto" key={key}>
          {component}
        </Grid>
      ))}
      <CashStepper />
      <WorkSpace role={admin} />
    </Grid>
  );
}
