"use client";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { useState } from "react";
import { Button, CircularProgress, Grid } from "@mui/material";

interface DepartBtnProps {
  setSelectDesk: React.Dispatch<React.SetStateAction<[]>>;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Тернопіль-РВС",
  "Тернопіль-8",
  "Чортків-10",
  "Чортків-11",
  "Чортків-РВС",
  "Снятин",
];

function getStyles(name: string, departName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      departName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function DepartSelect({ setSelectDesk }: DepartBtnProps) {
  const [departName, setDepartName] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    setLoading(true);
    try {
      const req = await fetch("/api/paydesk/getDesk", {
        method: "POST",
        body: JSON.stringify(departName),
      });
      const data = await req.json();
      setSelectDesk(data);
    } catch {
      console.log("error to get data");
    } finally {
      setLoading(false);
    }
  };
  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent<typeof departName>) => {
    const {
      target: { value },
    } = event;
    setDepartName(typeof value === "string" ? value.split(",") : value);
  };
  return (
    <Grid container sx={{ alignItems: "center" }} spacing={1}>
      <Grid item xs={12} md={5}>
        <FormControl fullWidth>
          <InputLabel id="demo-multiple-chip-label">
            Оберіть відділення
          </InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={departName}
            onChange={handleChange}
            input={
              <OutlinedInput
                id="select-multiple-chip"
                label="Оберіть відділення"
              />
            }
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, departName, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6} md={"auto"}>
        <Button
          disabled={departName.length <= 0 || loading}
          onClick={getData}
          fullWidth
          variant="contained"
          color="info"
        >
          Пошук
          {loading && <CircularProgress size={18} title="dasd" />}
        </Button>
      </Grid>
      <Grid item xs={6} md={"auto"}>
        <Button
          onClick={() => {
            setSelectDesk([]), setDepartName([]);
          }}
          fullWidth
          disabled={loading}
          variant="contained"
          color="error"
        >
          Скинути
        </Button>
      </Grid>
    </Grid>
  );
}
