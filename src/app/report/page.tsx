"use client";
import Header from "@/ui/components/Header/Header";
import TableList from "@/ui/components/Table/PayDeskTable";

import { getLocal } from "@/ui/utils/getLocalStore";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function Report() {
  return (
    <>
      <Header />
      <Box sx={{ p: 5 }}>
        {/* <TableList data={report} title={"Відправлені звіти"} /> */}
      </Box>
    </>
  );
}
