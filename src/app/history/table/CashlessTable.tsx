import { TableProps, transformData } from "./Main";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

export default function CashlessTable({ data }: TableProps) {
  return (
    data.length > 0 && (
      <TableContainer component={Paper}>
        <Typography sx={{ fontSize: 26, textAlign: "center" }}>
          Історія інкасацій
        </Typography>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Дата</TableCell>
              <TableCell align="center">Відправник</TableCell>
              <TableCell align="center">Отримувач</TableCell>
              <TableCell align="center">Сума</TableCell>
              <TableCell align="center">Статус</TableCell>
              <TableCell align="center">Касир</TableCell>
            </TableRow>
          </TableHead>

          {data.map((row: any) => (
            <TableBody key={row.createdAt}>
              <TableRow
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell align="center">
                  {transformData(row.createdAt)}
                </TableCell>
                <TableCell align="center">{row.department}</TableCell>
                <TableCell align="center">{row.sendTo}</TableCell>
                <TableCell align="center">
                  {row.uah > 0 && <Typography>{row.uah} UAH</Typography>}
                  {row.usd > 0 && <Typography>{row.usd} USD</Typography>}
                  {row.eur > 0 && <Typography>{row.eur} EUR</Typography>}
                  {row.gbp > 0 && <Typography>{row.gbp} GBP</Typography>}
                  {row.pln > 0 && <Typography>{row.pln} PLN</Typography>}
                  {row.cad > 0 && <Typography>{row.cad} CAD</Typography>}
                  {row.chf > 0 && <Typography>{row.chf} CHF</Typography>}
                  {row.sek > 0 && <Typography>{row.sek} SEK</Typography>}
                  {row.czk > 0 && <Typography>{row.czk} CZK</Typography>}
                  {row.nok > 0 && <Typography>{row.nok} NOK</Typography>}
                  {row.gold > 0 && <Typography>{row.gold} GOLD</Typography>}
                </TableCell>
                <TableCell align="center">{row.process}</TableCell>
                <TableCell align="center">{row.user}</TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      </TableContainer>
    )
  );
}
