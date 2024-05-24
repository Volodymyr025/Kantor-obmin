"use client";

import { useContext, useEffect, useState } from "react";
import TableList from "../Shared/TableList";
import { Box, Typography } from "@mui/material";
import { Progress } from "@/ui/context-store/openReport";

export default function PayDesk() {
  const { openDialog } = useContext(Progress);
  const [payDesk, setPayDesk] = useState([]);
  let department = "";
  if (typeof localStorage !== "undefined") {
    department = localStorage.getItem("Department") || "";
  }
  const getPayDeskFromDB = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/paydesk/desk", {
        method: "POST",
        body: JSON.stringify({ department }),
      });
      const data = await res.json();
      setPayDesk(data);
    } catch {
      throw Error('"Field to get paydesk from server');
    }
  };

  useEffect(() => {
    void (async () => {
      await getPayDeskFromDB();
    })();
  }, [openDialog]);

  return (
    <Box>
      <Typography sx={{ fontSize: 36, textAlign: "center" }}>КАСА</Typography>
      <TableList data={payDesk} />
    </Box>
  );
}
