"use client";
import { MAIN_GREEN } from "@/ui/palette/Color";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { logOut } from "../Auth/login";
import { useEffect, useState } from "react";
import Logo from "@/ui/assets/SVG/Logo";
import { UserInfo } from "@/ui/context-store/userInfo";
import { getLocal } from "@/ui/utils/getLocalStore";

export default function Header() {
  const [userName, setUserName] = useState("");
  const [department, setDepartment] = useState("");

  useEffect(() => {
    const storedUserName = getLocal("User");
    const storedDepartment = getLocal("Department");

    setUserName(storedUserName);
    setDepartment(storedDepartment);
  }, []);

  return (
    <Box
      sx={{
        p: 1,
        bgcolor: MAIN_GREEN,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: "70px",
        position: "fixed",
        zIndex: 99,
      }}
    >
      <Link href={"/"}>
        <Logo />
      </Link>
      {userName && (
        <Box display={"flex"}>
          <Box>
            <Typography>Касир:{userName}</Typography>
            <Typography>Відділення:{department}</Typography>
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
      )}
    </Box>
  );
}
