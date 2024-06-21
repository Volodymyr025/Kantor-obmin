import { Grid } from "@mui/material";
import React from "react";
import RateTable from "../../Table/RateTable";
import PayDesk from "./PayDesk";
import RateNBU from "../../Table/RateNBUTable";

export default function WorkSpace() {
  return (
    <Grid container p={2} gap={2} justifyContent={"center"}>
      <Grid item md={3.7} xs={11}>
        <RateTable />
      </Grid>
      <Grid item md={3.7} xs={11}>
        <PayDesk />
      </Grid>
      <Grid item md={3.7} xs={11}>
        <RateNBU />
      </Grid>
    </Grid>
  );
}
