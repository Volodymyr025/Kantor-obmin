import Grid from "@mui/material/Grid";
import ButtonMenu from "./ButtonMenu";
import { Container } from "@mui/material";
import PayDesk from "./PayDesk";
import ProgressWrapper from "@/ui/context-store/openReport";
import Header from "../Header/Header";

export default function Home() {
  return (
    <Grid container sx={{ width: "100%" }}>
      <Header />
      <Grid item xs={12}>
        <ProgressWrapper>
          <Container sx={{ my: 5 }}>
            <ButtonMenu />
          </Container>
          <Container
            sx={{ bgcolor: "#fff", width: "100%", minHeight: "100vh" }}
          >
            <PayDesk />
          </Container>
        </ProgressWrapper>
      </Grid>
    </Grid>
  );
}
