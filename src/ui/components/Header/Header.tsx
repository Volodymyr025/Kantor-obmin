"use client";
import { MAIN_GREEN } from "@/ui/palette/Color";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { logOut } from "../Auth/login";
import { UserState } from "@/ui/context-store/user";
import { useContext } from "react";

export default function Header() {
  const userName = localStorage.getItem("User");
  const departament = localStorage.getItem("Departament");

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
          <Typography>Касир:{userName}</Typography>
          <Typography>Відділення:{departament}</Typography>
        </Box>
        <form action={logOut}>
          <Button
            type="submit"
            sx={{ fontSize: 18, mx: 2 }}
            onClick={() => localStorage.clear()}
          >
            Вихід
          </Button>
        </form>
      </Box>
    </Box>
  );
}
