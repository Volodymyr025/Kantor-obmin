"use client";

import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import TableList from "../Shared/TableList";
import { Grid } from "@mui/material";
import { Update } from "@/ui/context-store/updatePayDesk";

export default function PayDesk() {
  const [payDesk, setPayDesk] = useState([]);

  const updatePayDesk = useContext(Update).update;

  let department = "";
  if (typeof localStorage !== "undefined") {
    department = localStorage.getItem("Department") || "";
  }

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
      {payDesk.map((desk: { department: string }) => (
        <Grid
          item
          md={payDesk.length >= 1 ? 11 : 5.5}
          sm={11}
          xs={11}
          key={desk.department}
        >
          <TableList data={[desk]} title={desk.department} />
        </Grid>
      ))}
    </Grid>
  );
}
