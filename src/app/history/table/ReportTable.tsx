import React from "react";
import { TableProps, transformData } from "./Main";
import RateTable from "@/ui/components/Table/RateTable";
import { Grid, Typography } from "@mui/material";
import { RateType } from "@/ui/components/Window/Rate";

interface DataProps extends RateType {
  createdAt: string;
  _id: string;
}

export default function ReportTable({ data }: TableProps) {
  return (
    <Grid container spacing={1}>
      {data.map((rate: DataProps) => {
        return (
          <Grid item md={3} key={rate._id}>
            <Typography textAlign={"center"}>
              Дата:{transformData(rate.createdAt)}
            </Typography>
            <RateTable data={rate} />
          </Grid>
        );
      })}
    </Grid>
  );
}
