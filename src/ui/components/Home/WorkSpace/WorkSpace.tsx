"use client";
import { Grid } from "@mui/material";
import React, { useState } from "react";
import RateTable from "../../Table/RateTable";
import PayDesk from "./PayDesk";
import RateNBU from "../../Table/RateNBUTable";
import OkoDesk from "./OkoDesk";
import AllDesk from "./AllDesk";
import DepartSelect from "../DepartBtn/DepartSelect";
import PayDeskTable from "../../Table/PayDeskTable";
import useGetRate from "@/ui/hook/GetRate";

interface WorkSpaceProps {
  role: boolean;
}

export default function WorkSpace({ role }: WorkSpaceProps) {
  const [selectDesk, setSelectDesk] = useState<[]>([]);
  const [rateData] = useGetRate();

  return (
    <Grid container pt={2} gap={2} justifyContent={"flex-start"}>
      {role && <DepartSelect setSelectDesk={setSelectDesk} />}
      <Grid item md={3.8} xs={12}>
        {rateData && <RateTable data={rateData} />}
      </Grid>
      <Grid item md={3.8} xs={12}>
        {/* <RateNBU /> */}
        <PayDesk />
      </Grid>
      {role ? (
        <>
          {selectDesk.length > 0 &&
            selectDesk.map((item: { department: string }) => {
              return (
                <Grid item md={3.8} xs={12} key={item.department}>
                  <PayDeskTable data={[item]} title={item.department} />
                </Grid>
              );
            })}
        </>
      ) : (
        <>
          <Grid item md={3.8} xs={12}>
            <AllDesk />
          </Grid>
          <Grid item md={3.8} xs={12}>
            <OkoDesk />
          </Grid>
        </>
      )}
    </Grid>
  );
}
