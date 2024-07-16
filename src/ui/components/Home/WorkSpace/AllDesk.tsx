"use client";
import { useContext, useEffect, useState } from "react";
import PayDeskTable from "../../Table/PayDeskTable";
import { getLocal } from "@/ui/utils/getLocalStore";
import { Grid } from "@mui/material";
import { Update } from "@/ui/context-store/updatePayDesk";

export default function AllDesk() {
  const [data, setData] = useState<[]>([]);
  const updatePayDesk = useContext(Update).update;

  const department = getLocal("Department");

  const getPayDesksFromDB = async () => {
    try {
      const res = await fetch(`/api/paydesk/allDesk`, {
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
  }, [updatePayDesk]);
  return (
    <Grid container sx={{ gap: 2, justifyContent: "center" }}>
      <Grid item md={12} sm={12} xs={12}>
        <PayDeskTable data={data} title={"Загальна каса"} />
      </Grid>
    </Grid>
  );
}
