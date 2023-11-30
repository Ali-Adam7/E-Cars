"use client";

import { usuageReport } from "@/fetchHelper/analytics";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";

export default function Calculator() {
  const user = useSelector((state: RootState) => state.user);
  const [usuage, setUsuage] = useState([]);
  const get = async () => {
    setUsuage(await usuageReport(user));
  };

  useEffect(() => {
    get();
  }, []);

  const options = {
    title: "Usuage Monthly report",
    chartArea: { width: "50%" },
    hAxis: {
      title: "Events",
      minValue: 0,
    },
    vAxis: {
      title: "Month",
    },
  };
  return (
    <div className="h-screen bg-white ">
      <div className=" grid bg-white px-6 py-24 justify-items-center ">
        {usuage.length ? (
          <Chart chartType="BarChart" width="100%" height="400px" data={usuage} options={options} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
