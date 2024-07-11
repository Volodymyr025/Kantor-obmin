"use client";

import { useContext, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Update } from "@/ui/context-store/updatePayDesk";
import PayDeskTable from "../../Table/PayDeskTable";
import { getLocal } from "@/ui/utils/getLocalStore";

export default function PayDesk() {
  const [payDesk, setPayDesk] = useState<[]>([]);

  const updatePayDesk = useContext(Update).update;

  const department = getLocal("Department");

  const getPayDesksFromDB = async () => {
    try {
      const res = await fetch(`/api/paydesk/desk`, {
        method: "POST",
        body: JSON.stringify({ department }),
      });
      const data = await res.json();
      setPayDesk(data);
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
        <PayDeskTable data={payDesk} title="Каса відділення" />
      </Grid>
    </Grid>
  );
}
