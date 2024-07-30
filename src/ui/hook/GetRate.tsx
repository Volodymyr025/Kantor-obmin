"use client";
import { useContext, useEffect, useState } from "react";
import { getLocal } from "@/ui/utils/getLocalStore";
import { Update } from "@/ui/context-store/updatePayDesk";

export default function useGetRate() {
  const [data, setData] = useState([]);

  const updateRate = useContext(Update).updateRate;

  let department = getLocal("Department");

  const getRateFromDB = async () => {
    try {
      const req = await fetch("api/rate", {
        method: "PATCH",
        body: JSON.stringify({ department }),
      });
      const response = await req.json();
      setData(response);
    } catch {
      console.log("error to get rate from db");
    }
  };

  useEffect(() => {
    void (async () => {
      await getRateFromDB();
    })();
  }, [updateRate]);
  return data;
}
