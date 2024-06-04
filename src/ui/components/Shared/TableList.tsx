import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

interface TableProps {
  data: never[];
  title: string;
}

export default function TableList({ data, title }: TableProps) {
  return (
    <TableContainer component={Paper}>
      <Typography sx={{ fontSize: 36, textAlign: "center" }}>
        {title}
      </Typography>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Сума</TableCell>
            <TableCell align="center">Валюта</TableCell>
            <TableCell align="center">Курс</TableCell>
            <TableCell align="center">Еквівалент</TableCell>
          </TableRow>
        </TableHead>

        {data.map((row: any) => (
          <TableBody key={row["_id"]}>
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell align="center">{row.usd}</TableCell>
              <TableCell align="center">USD</TableCell>
              <TableCell align="center">
                {Math.abs(row.eqvUsd / row.usd).toFixed(2)}
              </TableCell>
              <TableCell align="center">{row.eqvUsd} UAH</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{row.eur}</TableCell>
              <TableCell align="center">EUR</TableCell>
              <TableCell align="center">
                {Math.abs(row.eqvEur / row.eur).toFixed(2)}
              </TableCell>
              <TableCell align="center">{row.eqvEur} UAH</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{row.gbp}</TableCell>
              <TableCell align="center">GBP</TableCell>
              <TableCell align="center">
                {Math.abs(row.eqvGbp / row.gbp).toFixed(2)}
              </TableCell>
              <TableCell align="center">{row.eqvGbp} UAH</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{row.pln}</TableCell>
              <TableCell align="center">PLN</TableCell>
              <TableCell align="center">
                {Math.abs(row.eqvPln / row.pln).toFixed(2)}
              </TableCell>
              <TableCell align="center">{row.eqvPln} UAH</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{row.cad}</TableCell>
              <TableCell align="center">CAD</TableCell>
              <TableCell align="center">
                {Math.abs(row.eqvCad / row.cad).toFixed(2)}
              </TableCell>
              <TableCell align="center">{row.eqvCad} UAH</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{row.chf}</TableCell>
              <TableCell align="center">CHF</TableCell>
              <TableCell align="center">
                {Math.abs(row.eqvChf / row.chf).toFixed(2)}
              </TableCell>
              <TableCell align="center">{row.eqvChf} UAH</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{row.sek}</TableCell>
              <TableCell align="center">SEK</TableCell>
              <TableCell align="center">
                {Math.abs(row.eqvSek / row.sek).toFixed(2)}
              </TableCell>
              <TableCell align="center">{row.eqvSek} UAH</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{row.czk}</TableCell>
              <TableCell align="center">CZK</TableCell>
              <TableCell align="center">
                {Math.abs(row.eqvCzk / row.czk).toFixed(2)}
              </TableCell>
              <TableCell align="center">{row.eqvCzk} UAH</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{row.nok}</TableCell>
              <TableCell align="center">NOK</TableCell>
              <TableCell align="center">
                {Math.abs(row.eqvNok / row.nok).toFixed(2)}
              </TableCell>
              <TableCell align="center">{row.eqvNok} UAH</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{row.gold}</TableCell>
              <TableCell align="center">Gold</TableCell>
              <TableCell align="center">
                {Math.abs(row.eqvGold / row.gold).toFixed(2)}
              </TableCell>
              <TableCell align="center">{row.eqvGold} UAH</TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </TableContainer>
  );
}
