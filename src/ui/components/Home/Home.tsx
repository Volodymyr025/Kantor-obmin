import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import PayDesk from "./PayDesk";
import ReportBtn from "./ReportBtn";
import SendCashBtn from "./SendCashBtn";
import CashStepper from "./Stepper";
import { verifyAuth } from "../Auth/lucia";
import { redirect } from "next/navigation";
import ExchangeBtn from "./ExchangeBtn";

export default async function Home() {
  const resultAuth = await verifyAuth();

  if (!resultAuth.user) {
    return redirect("/login");
  }
  return (
    <Grid container sx={{ width: "100%" }}>
      <Grid item xs={12} sx={{ mt: "70px" }}>
        <Container sx={{ my: 5, display: "flex", gap: 2 }}>
          <ReportBtn />
          <SendCashBtn />
          <ExchangeBtn />
        </Container>
        <CashStepper />

        <PayDesk />
      </Grid>
    </Grid>
  );
}
