"use client";
import { useEffect, useState } from "react";
import PayDeskTable from "./PayDeskTable";
import { getLocal } from "@/ui/utils/getLocalStore";
import { Grid } from "@mui/material";

export default function OkoTable() {
  const [data, setData] = useState<[]>([]);
  const department = getLocal("Department");

  const getPayDesksFromDB = async () => {
    try {
      const res = await fetch(`/api/report/getReportDesk`, {
        method: "POST",
        body: JSON.stringify({ department }),
      });
      const req = await res.json();
      setData(req);
    } catch {
      throw Error("Field to get paydesk from server");
    }
  };
  useEffect(() => {
    void (async () => {
      await getPayDesksFromDB();
    })();
  }, []);

  return (
    <Grid container sx={{ gap: 2, justifyContent: "center" }}>
      <Grid item md={12} sm={12} xs={12}>
        <PayDeskTable data={data} title={"OKO каса"} />
      </Grid>
    </Grid>
  );
}
