import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import PayDesk from "./WorkSpace/PayDesk";
import ReportBtn from "./ReportBtn";
import SendCashBtn from "./SendCashBtn";
import CashStepper from "./Stepper";
import { verifyAuth } from "../Auth/lucia";
import { redirect } from "next/navigation";
import ExchangeBtn from "./ExchangeBtn";
import RateBtn from "./RateBtn";
import RateTable from "../Table/RateTable";
import WorkSpace from "./WorkSpace/WorkSpace";

export default async function Home() {
  const resultAuth = await verifyAuth();

  if (!resultAuth.user) {
    return redirect("/login");
  }
  return (
    <Grid container sx={{ width: "100%" }}>
      <Grid item xs={12} sx={{ mt: "70px" }}>
        <Container sx={{ my: 5, display: "flex", gap: 2 }}>
          <ExchangeBtn />
          <SendCashBtn />
          <RateBtn />
          <ReportBtn />
        </Container>
        <CashStepper />
        {/* <RateTable />
        <PayDesk /> */}
        <WorkSpace />
      </Grid>
    </Grid>
  );
}
