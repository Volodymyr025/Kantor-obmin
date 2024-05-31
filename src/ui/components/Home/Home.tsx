import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import PayDesk from "./PayDesk";
import ReportBtn from "./ReportBtn";
import SendCashBtn from "./SendCashBtn";
import CashStepper from "./Stepper";

const getProcessingCash = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/cashless");
    const data = await response.json();
    return data;
  } catch {
    throw new Error("filed to get cashless");
  }
};

export default async function Home() {
  const data = await getProcessingCash();

  const checkProcess = data.some((item: { process: string }) => {
    if (item.process === "processing") {
      return true;
    }
  });

  return (
    <Grid container sx={{ width: "100%" }}>
      <Grid item xs={12} sx={{ mt: "70px" }}>
        <Container sx={{ my: 5, display: "flex", gap: 2 }}>
          <ReportBtn />
          <SendCashBtn />
        </Container>
        {checkProcess && <CashStepper />}
        <Container sx={{ bgcolor: "#fff", width: "100%", minHeight: "100vh" }}>
          <PayDesk />
        </Container>
      </Grid>
    </Grid>
  );
}
