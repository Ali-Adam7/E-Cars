"use client";

import { salesReport, usuageReport } from "@/fetchHelper/analytics";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

export default function Calculator() {
  const user = useSelector((state: RootState) => state.user);
  const [usuage, setUsuage] = useState([]);
  const [vid, setVid] = useState(1);
  const get = async () => {
    const data = await salesReport(user, vid);
    if (data.length < 2) {
      toast.error("vid does not exist");
      return;
    }
    setUsuage(data);
  };

  const options = {
    title: "Car Events",
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
      <Toaster position="top-center" reverseOrder={false} />

      <div className=" grid bg-white px-6 py-24 justify-items-center ">
        {usuage.length ? (
          <Chart chartType="BarChart" width="100%" height="400px" data={usuage} options={options} />
        ) : (
          <></>
        )}
        <input
          className="h-min"
          onChange={(val: any) => {
            setVid(val.target.value);
          }}
          type="text"
        ></input>

        <div className="m-10">
          <label>Enter the Car ID</label>
          <button
            onClick={get}
            className="flex my-10 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
}
