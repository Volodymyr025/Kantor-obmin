import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

interface TableProps {
  data: [];
  title: string;
  height?: number;
}

export default function PayDeskTable({ data, title }: TableProps) {
  return (
    <>
      {data.length > 0 && (
        <TableContainer component={Paper} sx={{ p: 1 }}>
          <Typography
            sx={{ fontSize: 18, textAlign: "center", fontWeight: 600 }}
          >
            {title}
          </Typography>
          <Table
            aria-label="simple table"
            sx={{ td: { p: 0.5 }, th: { p: 0.5, fontWeight: 550 } }}
          >
            <TableHead>
              <TableRow>
                <TableCell align="center">Сума</TableCell>
                <TableCell align="center">Валюта</TableCell>
              </TableRow>
            </TableHead>

            {data.map((row: any) => (
              <TableBody key={row["_id"]}>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell align="center">{row.uah.toFixed(2)}</TableCell>
                  <TableCell align="center">UAH</TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell align="center">{row.usd.toFixed(2)}</TableCell>
                  <TableCell align="center">USD</TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{row.eur.toFixed(2)}</TableCell>
                  <TableCell align="center">EUR</TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{row.gbp.toFixed(2)}</TableCell>
                  <TableCell align="center">GBP</TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{row.pln.toFixed(2)}</TableCell>
                  <TableCell align="center">PLN</TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{row.cad.toFixed(2)}</TableCell>
                  <TableCell align="center">CAD</TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{row.chf.toFixed(2)}</TableCell>
                  <TableCell align="center">CHF</TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{row.sek.toFixed(2)}</TableCell>
                  <TableCell align="center">SEK</TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{row.czk.toFixed(2)}</TableCell>
                  <TableCell align="center">CZK</TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{row.nok.toFixed(2)}</TableCell>
                  <TableCell align="center">NOK</TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{row.gold.toFixed(2)}</TableCell>
                  <TableCell align="center">Gold</TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </TableContainer>
      )}
    </>
  );
}
