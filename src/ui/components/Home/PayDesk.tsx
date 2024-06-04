"use client";

import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import TableList from "../Shared/TableList";
import { Box, Grid, Typography } from "@mui/material";
import { Update } from "@/ui/context-store/updatePayDesk";

export default function PayDesk() {
  const [payDesk, setPayDesk] = useState([]);
  const [chortkiv10, setChortkiv10] = useState([]);
  const [chortkiv11, setChortkiv11] = useState([]);
  const [ternopil8, setTernopil8] = useState([]);

  const updatePayDesk = useContext(Update).update;

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
      throw Error("Field to get paydesk from server");
    }
  };

  const getDeskNameFromDB = async (
    dep: string,
    setDB: Dispatch<SetStateAction<never[]>>
  ) => {
    try {
      const res = await fetch("http://localhost:3000/api/paydesk/allDesk", {
        method: "POST",
        body: JSON.stringify({ department: dep }),
      });

      const data = await res.json();
      setDB(data);
    } catch {
      throw Error("Field to get paydesk from server");
    }
  };

  useEffect(() => {
    void (async () => {
      await getPayDeskFromDB();
      if (department === "Administration") {
        await getDeskNameFromDB("Чортків10", setChortkiv10);
        await getDeskNameFromDB("Чортків11", setChortkiv11);
        await getDeskNameFromDB("Тернопіль8", setTernopil8);
      }
    })();
  }, [updatePayDesk]);

  return (
    <Grid container sx={{ gap: 2, justifyContent: "center" }}>
      {department === "Administration" ? (
        <>
          <Grid item md={5.5} sm={11} xs={11}>
            <TableList data={payDesk} title="КАСА" />
          </Grid>
          <Grid item md={5.5} sm={11} xs={11}>
            <TableList data={chortkiv10} title="Чортків 10" />
          </Grid>
          <Grid item md={5.5} sm={11} xs={11}>
            <TableList data={chortkiv11} title="Чортків 11" />
          </Grid>
          <Grid item md={5.5} sm={11} xs={11}>
            <TableList data={ternopil8} title="Тернопіль 8" />
          </Grid>
        </>
      ) : (
        <Grid item md={11} sm={11} xs={11}>
          <TableList data={payDesk} title="КАСА" />
        </Grid>
      )}
    </Grid>
  );
}
