"use client";

import { cache, useState } from "react";
import { useQuery } from "react-query";

// this component receieves the GED data for provinces... it uses that by default... when a province is clicked,, this component will by rendered again by its parent.. it must then fetch data about that province and display that new information on the chart

export default function ScatterComponentParent({
  gedDataProvince,
  provinceSelected,
}) {
  console.log("[ScatterComponentParent] : rendered ");

  const [currentGEDdata, setCurrentGEDdata] = useState(gedDataProvince);
  // const { data, isLoading } = useDistricts();
  const { data, isLoading } = useQuery({
    queryKey: "districts",
    queryFn: cache(async () => {
      const res = await fetch("/api/districts");
      const data = await res.json();
      return data;
    }),
  });

  if (isLoading) {
    return (
      <div className="w-full h-full bg-yellow-200">
        loading dude....pls work!
      </div>
    );
  }
  console.log("data bro.....", data);

  // if (provinceSelected) {
  //   // fetch GED data about the districts in that province.. replace the currentGEDdata
  // }
  return (
    <section className="w-full h-full bg-yellow-200 flex flex-col">
      <span>
        I have ged data for provinces.. example :: {gedDataProvince[0].PROVINCE}
      </span>
      <span>GED ::: {data[0].PROVINCE}</span>
    </section>
  );
}
