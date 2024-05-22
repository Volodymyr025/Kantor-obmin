import { MAIN_GREEN } from "@/ui/palette/Color";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { logOut } from "../Auth/lucia";

export default function Header() {
  return (
    <Box
      component={"header"}
      sx={{
        p: 1,
        bgcolor: MAIN_GREEN,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Link href={"/"}>
        <Typography>Кантор обмін</Typography>
      </Link>
      <Box display={"flex"}>
        <Box>
          <Typography>Ганкевич Володимир Михайлович</Typography>
          <Typography>Кантор №1 м.Чортків</Typography>
        </Box>
        <form action={logOut}>
          <Button type="submit" sx={{ fontSize: 18, mx: 2 }}>
            Вихід
          </Button>
        </form>
      </Box>
    </Box>
  );
}
