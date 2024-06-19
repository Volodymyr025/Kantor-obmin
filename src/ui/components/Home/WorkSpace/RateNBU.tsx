import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

export default async function RateNBU() {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const formattedDate = `${day}.${month}.${year}`;

  const req = await fetch(
    `https://bank.gov.ua/NBU_Exchange/exchange?date=${formattedDate}&json`
  );
  const res = await req.json();
  const data = [
    {
      StartDate: res[0].StartDate,
      usd: res.find(
        (item: { CurrencyCodeL: string }) => item.CurrencyCodeL === "USD"
      ).Amount,
      eur: res.find(
        (item: { CurrencyCodeL: string }) => item.CurrencyCodeL === "EUR"
      ).Amount,
      gbp: res.find(
        (item: { CurrencyCodeL: string }) => item.CurrencyCodeL === "GBP"
      ).Amount,
      pln: res.find(
        (item: { CurrencyCodeL: string }) => item.CurrencyCodeL === "PLN"
      ).Amount,
      cad: res.find(
        (item: { CurrencyCodeL: string }) => item.CurrencyCodeL === "CAD"
      ).Amount,
      chf: res.find(
        (item: { CurrencyCodeL: string }) => item.CurrencyCodeL === "CHF"
      ).Amount,
      sek: res.find(
        (item: { CurrencyCodeL: string }) => item.CurrencyCodeL === "SEK"
      ).Amount,
      czk: res.find(
        (item: { CurrencyCodeL: string }) => item.CurrencyCodeL === "CZK"
      ).Amount,
      nok: res.find(
        (item: { CurrencyCodeL: string }) => item.CurrencyCodeL === "NOK"
      ).Amount,
    },
  ];

  return (
    <TableContainer component={Paper} sx={{ height: "700px", p: 1 }}>
      <Typography sx={{ fontSize: 26, textAlign: "center" }}>
        Курс НБУ
      </Typography>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Валюта</TableCell>
            <TableCell align="center">Курс</TableCell>
          </TableRow>
        </TableHead>

        {data.map((row: any) => (
          <TableBody key={row.StartDate}>
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell align="center">USD</TableCell>
              <TableCell align="center">{row.usd}</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">EUR</TableCell>
              <TableCell align="center">{row.eur}</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">GBP</TableCell>
              <TableCell align="center">{row.gbp}</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">PLN</TableCell>
              <TableCell align="center">{row.pln}</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">CAD</TableCell>
              <TableCell align="center">{row.cad}</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">CHF</TableCell>
              <TableCell align="center">{row.chf}</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">SEK</TableCell>
              <TableCell align="center">{row.sek}</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">CZK</TableCell>
              <TableCell align="center">{row.czk}</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">NOK</TableCell>
              <TableCell align="center">{row.nok}</TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </TableContainer>
  );
}
