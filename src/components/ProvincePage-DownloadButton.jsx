"use client";
import React from "react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const exampleJSON = [
  { PROVINCE_ID: "UZB.6_1", PROVINCE: "Qashqadaryo" },
  { PROVINCE_ID: "UZB.5_1", PROVINCE: "Qaraqalpaqstan" },
  { PROVINCE_ID: "UZB.4_1", PROVINCE: "Jizzax" },
];

export default function DownloadButton({ params, searchParams }) {
  const [shouldFetch, setShouldFetch] = React.useState(false);
  //
  let country = decodeURIComponent(params.country);
  let province = decodeURIComponent(params.province);
  //
  const { data, isLoading } = useSWR(
    shouldFetch ? null : `/api/ged?country=${country}&province=${province}`,
    fetcher
  );
  function handleClick() {
    setShouldFetch(true);
  }

  console.log("is there data?? ::", data);

  //
  //   const handleClick = () => {
  // 1. Fetch data based off year and province (SWR)

  // const { data, error, isLoading } = useSWR(
  //   `/api/ged?country=${country}&province=${province}`,
  //   fetcher
  // );
  // 2. Parse this json -> csv
  // jsonToCSV(jsonData, config)
  // 3. Return this as download to user
  //   };
  //
  return (
    <span className="underline cursor-pointer " onClick={handleClick}>
      {isLoading ? "Fetching" : "Download Data"}
    </span>
  );
}
