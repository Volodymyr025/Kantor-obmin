import { Button } from "@mui/material";
import Link from "next/link";

export default function HistoryBtn() {
  return (
    <Link href={"/history"}>
      <Button fullWidth color="success" variant="contained">
        Історія операцій
      </Button>
    </Link>
  );
}
