"use client";
import TableList from "@/ui/components/Shared/TableList";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function Report() {
  const [report, setReport] = useState([]);
  let department = "";
  if (typeof localStorage !== "undefined") {
    department = localStorage.getItem("Department") || "";
  }
  const getReportFromDB = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/report", {
        method: "PATCH",
        body: JSON.stringify(department?.toString()),
      });
      const data = await res.json();
      const lastAdded = await data.slice(-1);
      setReport(lastAdded);
    } catch {
      throw Error('"Field to get report from server');
    }
  };
  useEffect(() => {
    void (async () => {
      await getReportFromDB();
    })();
  }, [setReport]);
  return (
    <Box sx={{ p: 5 }}>
      <Typography fontSize={36} textAlign={"center"} sx={{ mt: "70px" }}>
        Відправлені звіти
      </Typography>
      <TableList data={report} />
    </Box>
  );
}
