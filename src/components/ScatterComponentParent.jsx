"use client";

import { getProvinceId } from "@/lib/utils";
import { cache, useState } from "react";
import { useQuery } from "react-query";

// this component receieves the GED data for provinces... it uses that by default... when a province is clicked,, this component will by rendered again by its parent.. it must then fetch data about that province and display that new information on the chart

export default function ScatterComponentParent({
  gedDataProvince,
  provinceSelected,
  data,
  countrySelected,
}) {
  console.log("[ScatterComponentParent] : rendered : data is : ", data);

  const [currentGEDdata, setCurrentGEDdata] = useState(gedDataProvince);
  // const { data, isLoading } = useDistricts();
  // ** working
  // const { data, isLoading } = useQuery({
  //   queryKey: ["districts", provinceSelected],
  //   queryFn: cache(async ({ queryKey }) => {
  //     const [_key, provinceSelected] = queryKey;
  //     const provinceId = getProvinceId(gedDataProvince, provinceSelected);

  //     const res = await fetch(`/api/districts`);
  //     const data = await res.json();
  //     return data;
  //   }),
  // });
  // ** exp
  // const { data, isLoading } = useQuery({
  //   queryKey: ["districts", provinceSelected],
  //   queryFn: cache(async ({ queryKey }) => {
  //     const [_key, provinceSelected] = queryKey;
  //     const provinceId = getProvinceId(gedDataProvince, provinceSelected);

  //     const res = await fetch(`/api/provinces?province=${provinceId}`);
  //     const data = await res.json();
  //     return data;
  //   }),
  // });

  // if (isLoading) {
  //   return (
  //     <div className="w-full h-full bg-yellow-200">
  //       loading dude....pls work!
  //     </div>
  //   );
  // }
  // console.log("data bro.....", data);

  // if (provinceSelected) {
  //   // fetch GED data about the districts in that province.. replace the currentGEDdata
  // }
  return (
    <section className="w-full h-full bg-yellow-200 flex flex-col">
      <span>
        I have fetched the data... currently inside this component I have access
        to the below data...
      </span>
      <span>The Country: {countrySelected}</span>
      {provinceSelected && <span>The Province: {provinceSelected}</span>}
      {provinceSelected && (
        <span>and the districts in this province ... are...</span>
      )}

      {provinceSelected &&
        data.map((district) => {
          return <span key={district.DISTRICT_ID}>{district.DISTRICT}</span>;
        })}
    </section>
  );
}
