"use client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { RateType } from "../Dialog/Rate";

interface DataProps extends RateType {
  _id: string;
}
interface RateProps {
  data: DataProps;
}

export default function RateTable({ data }: RateProps) {
  return !data ? (
    <Typography textAlign={"center"}>Курсів не знайдено</Typography>
  ) : (
    <TableContainer component={Paper} sx={{ p: 1, height: "100%" }}>
      <Typography sx={{ fontSize: 18, textAlign: "center", fontWeight: 600 }}>
        Курси
      </Typography>
      <Table
        aria-label="simple table"
        sx={{ td: { p: 0.5 }, th: { p: 0.5, fontWeight: 550 } }}
      >
        <TableHead>
          <TableRow>
            <TableCell align="center">Валюта</TableCell>
            <TableCell align="center">Купівля</TableCell>
            <TableCell align="center">Продажа</TableCell>
          </TableRow>
        </TableHead>

        <TableBody key={data["_id"]}>
          <TableRow
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
            }}
          >
            <TableCell align="center">USD</TableCell>
            <TableCell align="center">{data.buyUsd.toFixed(2)}</TableCell>
            <TableCell align="center">{data.sellUsd.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell align="center">EUR</TableCell>
            <TableCell align="center">{data.buyEur.toFixed(2)}</TableCell>
            <TableCell align="center">{data.sellEur.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell align="center">GBP</TableCell>
            <TableCell align="center">{data.buyGbp.toFixed(2)}</TableCell>
            <TableCell align="center">{data.sellGbp.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell align="center">PLN</TableCell>
            <TableCell align="center">{data.buyPln.toFixed(2)}</TableCell>
            <TableCell align="center">{data.sellPln.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell align="center">CAD</TableCell>
            <TableCell align="center">{data.buyCad.toFixed(2)}</TableCell>
            <TableCell align="center">{data.sellCad.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell align="center">CHF</TableCell>
            <TableCell align="center">{data.buyChf.toFixed(2)}</TableCell>
            <TableCell align="center">{data.sellChf.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell align="center">SEK</TableCell>
            <TableCell align="center">{data.buySek.toFixed(2)}</TableCell>
            <TableCell align="center">{data.sellSek.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell align="center">CZK</TableCell>
            <TableCell align="center">{data.buyCzk.toFixed(2)}</TableCell>
            <TableCell align="center">{data.sellCzk.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell align="center">USD</TableCell>
            <TableCell align="center">{data.buyCzk.toFixed(2)}</TableCell>
            <TableCell align="center">{data.sellCzk.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell align="center">GOLD</TableCell>
            <TableCell align="center">{data.buyGold.toFixed(2)}</TableCell>
            <TableCell align="center">{data.sellGold.toFixed(2)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
