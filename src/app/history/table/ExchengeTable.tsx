import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { TableProps, transformData } from "./Main";

export default function ExchengeTable({ data }: TableProps) {
  return (
    data.length > 0 && (
      <TableContainer component={Paper}>
        <Typography sx={{ fontSize: 26, textAlign: "center" }}>
          Історія операцій
        </Typography>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Дата</TableCell>
              <TableCell align="center">Операція</TableCell>
              <TableCell align="center">Валюта</TableCell>
              <TableCell align="center">Сума</TableCell>
              <TableCell align="center">Курс</TableCell>
              <TableCell align="center">Сума грн</TableCell>
              <TableCell align="center">Касир</TableCell>
            </TableRow>
          </TableHead>

          {data.map((row: any) => (
            <TableBody key={row._id}>
              <TableRow
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell align="center">
                  {transformData(row.createdAt)}
                </TableCell>
                <TableCell align="center">{row.operation}</TableCell>
                <TableCell align="center">{row.currency}</TableCell>
                <TableCell align="center">{row.value}</TableCell>
                <TableCell align="center">{row.rate}</TableCell>
                <TableCell align="center">{row.totalValue}</TableCell>
                <TableCell align="center">{row.user}</TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      </TableContainer>
    )
  );
}
