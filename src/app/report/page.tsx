"use client";
import Header from "@/ui/components/Header/Header";
import TableList from "@/ui/components/Table/PayDeskTable";
import { UserInfo } from "@/ui/context-store/userInfo";
import { getLocal } from "@/ui/utils/getLocalStore";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function Report() {
  const [report, setReport] = useState([]);
  const department = getLocal("Department");
  const getReportFromDB = async () => {
    try {
      const res = await fetch(`/api/report`, {
        method: "PATCH",
        body: JSON.stringify(department.toString()),
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
    <>
      <Header />
      <Box sx={{ p: 5 }}>
        {/* <TableList data={report} title={"Відправлені звіти"} /> */}
      </Box>
    </>
  );
}
