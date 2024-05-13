import { LIGHT_GREY } from "@/ui/palette/Color";
import Grid from "@mui/material/Grid";
import ButtonMenu from "./ButtonMenu";
import { Container } from "@mui/material";
import Table from "../Shared/Table";

export default function Home() {
  return (
    <Grid container sx={{ minHeight: "100vh", width: "100%" }}>
      <Grid item xs={2} sx={{ bgcolor: "red" }}></Grid>
      <Grid item xs={10}>
        <Container sx={{ my: 5 }}>
          <ButtonMenu />
        </Container>
        <Container sx={{ bgcolor: "#fff", width: "100%", minHeight: "100vh" }}>
          <Table />
        </Container>
      </Grid>
    </Grid>
  );
}
