import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import PayDesk from "./PayDesk";
import ReportBtn from "./ReportBtn";
import SendCashBtn from "./SendCashBtn";

export default function Home() {
  return (
    <Grid container sx={{ width: "100%" }}>
      <Grid item xs={12} sx={{ mt: "70px" }}>
        <Container sx={{ my: 5, display: "flex", gap: 2 }}>
          <ReportBtn />
          <SendCashBtn />
        </Container>
        <Container sx={{ bgcolor: "#fff", width: "100%", minHeight: "100vh" }}>
          <PayDesk />
        </Container>
      </Grid>
    </Grid>
  );
}
