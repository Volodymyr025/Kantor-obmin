import { Box, Typography } from "@mui/material";
import CashlessTable from "./CashlessTable";
import ExchengeTable from "./ExchengeTable";
import Rate from "./Rate";
import DebitTable from "./DebitTable";
import ReportTable from "./ReportTable";

export const transformData = (timestamp: string) => {
  const date = new Date(timestamp);

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");

  const formattedDate = `${day}-${month}-${year}/${hours}:${minutes}:${seconds}`;

  return formattedDate;
};

export interface TableProps {
  data: [];
  error?: string;
  operation?: string;
}

export default function Main({ data, error, operation }: TableProps) {
  return (
    <>
      {data.length <= 0 && (
        <Typography sx={{ fontSize: 22, textAlign: "center" }}>
          {error ? error : "Оберіть відділення, операцію та дату"}
        </Typography>
      )}
      {operation === "exchenge" && <ExchengeTable data={data} />}
      {operation === "uncashmen" && <CashlessTable data={data} />}
      {operation === "rate" && <Rate data={data} />}
      {operation === "debit" && <DebitTable data={data} />}
      {operation === "report" && <ReportTable data={data} />}
    </>
  );
}
