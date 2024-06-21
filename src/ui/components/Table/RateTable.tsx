"use client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { getLocal } from "@/ui/utils/getLocalStore";
import { Update } from "@/ui/context-store/updatePayDesk";

export default function RateTable() {
  const [data, setData] = useState([]);

  const updateRate = useContext(Update).updateRate;

  let department = getLocal("Department");

  const getRateFromDB = async () => {
    try {
      const req = await fetch("api/rate", {
        method: "PATCH",
        body: JSON.stringify({ department }),
      });
      const response = await req.json();
      setData(response);
    } catch {
      console.log("error to get rate from db");
    }
  };

  useEffect(() => {
    void (async () => {
      await getRateFromDB();
    })();
  }, [updateRate]);

  return data.length <= 0 ? (
    <Typography textAlign={"center"}>Курси ще не поставлені</Typography>
  ) : (
    <TableContainer component={Paper} sx={{ height: 700, p: 1 }}>
      <Typography sx={{ fontSize: 26, textAlign: "center" }}>Курси</Typography>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Валюта</TableCell>
            <TableCell align="center">Купівля</TableCell>
            <TableCell align="center">Продажа</TableCell>
          </TableRow>
        </TableHead>

        {data.map((row: any) => (
          <TableBody key={row["_id"]}>
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell align="center">USD</TableCell>
              <TableCell align="center">{row.buyUsd.toFixed(2)}</TableCell>
              <TableCell align="center">{row.sellUsd.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">EUR</TableCell>
              <TableCell align="center">{row.buyEur.toFixed(2)}</TableCell>
              <TableCell align="center">{row.sellEur.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">GBP</TableCell>
              <TableCell align="center">{row.buyGbp.toFixed(2)}</TableCell>
              <TableCell align="center">{row.sellGbp.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">PLN</TableCell>
              <TableCell align="center">{row.buyPln.toFixed(2)}</TableCell>
              <TableCell align="center">{row.sellPln.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">CAD</TableCell>
              <TableCell align="center">{row.buyCad.toFixed(2)}</TableCell>
              <TableCell align="center">{row.sellCad.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">CHF</TableCell>
              <TableCell align="center">{row.buyChf.toFixed(2)}</TableCell>
              <TableCell align="center">{row.sellChf.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">SEK</TableCell>
              <TableCell align="center">{row.buySek.toFixed(2)}</TableCell>
              <TableCell align="center">{row.sellSek.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">CZK</TableCell>
              <TableCell align="center">{row.buyCzk.toFixed(2)}</TableCell>
              <TableCell align="center">{row.sellCzk.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">USD</TableCell>
              <TableCell align="center">{row.buyCzk.toFixed(2)}</TableCell>
              <TableCell align="center">{row.sellCzk.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">GOLD</TableCell>
              <TableCell align="center">{row.buyGold.toFixed(2)}</TableCell>
              <TableCell align="center">{row.sellGold.toFixed(2)}</TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </TableContainer>
  );
}
