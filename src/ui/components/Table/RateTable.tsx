"use client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { useContext } from "react";
import { UserInfo } from "@/ui/context-store/userInfo";

export default function RateTable() {
  const department = useContext(UserInfo).department;

  const getRateFromDB = async () => {
    const req = await fetch("api/rate", {
      method: "PATCH",
      body: JSON.stringify(department),
    });
  };
  const db = getRateFromDB();
  const data: any = [];
  return (
    <TableContainer component={Paper}>
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
              <TableCell align="center">{row.buyUsd}</TableCell>
              <TableCell align="center">{row.sellUsd}</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">EUR</TableCell>
              <TableCell align="center">{row.buyEur}</TableCell>
              <TableCell align="center">{row.sellEur}</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">GBP</TableCell>
              <TableCell align="center">{row.buyGbp}</TableCell>
              <TableCell align="center">{row.sellGbp}</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">PLN</TableCell>
              <TableCell align="center">{row.buyPln}</TableCell>
              <TableCell align="center">{row.sellPln}</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">CAD</TableCell>
              <TableCell align="center">{row.buyCad}</TableCell>
              <TableCell align="center">{row.sellCad}</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">CHF</TableCell>
              <TableCell align="center">{row.buyChf}</TableCell>
              <TableCell align="center">{row.sellChf}</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">SEK</TableCell>
              <TableCell align="center">{row.buySek}</TableCell>
              <TableCell align="center">{row.sellSek}</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">CZK</TableCell>
              <TableCell align="center">{row.buyCzk}</TableCell>
              <TableCell align="center">{row.sellCzk}</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">USD</TableCell>
              <TableCell align="center">{row.buyCzk}</TableCell>
              <TableCell align="center">{row.sellCzk}</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">GOLD</TableCell>
              <TableCell align="center">{row.buyGold}</TableCell>
              <TableCell align="center">{row.sellGold}</TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </TableContainer>
  );
}
