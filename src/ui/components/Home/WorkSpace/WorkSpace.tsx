import { Grid } from "@mui/material";
import React from "react";
import RateTable from "../../Table/RateTable";
import PayDesk from "./PayDesk";
import RateNBU from "../../Table/RateNBUTable";
import OkoDesk from "./OkoDesk";
import AllDesk from "./AllDesk";

export default function WorkSpace() {
  return (
    <Grid container pt={2} gap={2} justifyContent={"flex-start"}>
      <Grid item md={3.9} xs={12}>
        <RateTable />
      </Grid>
      <Grid item md={4} xs={12}>
        <AllDesk />
      </Grid>
      <Grid item md={3.6} xs={12}>
        {/* <RateNBU /> */}
        <PayDesk />
      </Grid>
      <Grid item md={3.6} xs={12}>
        <OkoDesk />
      </Grid>
    </Grid>
  );
}
