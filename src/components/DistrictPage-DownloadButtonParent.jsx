import React from "react";
import { getSelectedDistrictData } from "@/lib/districtdata";
import DownloadButtonDistrict from "./DistrictPage-DownloadButtonDistrict";

export default async function DownloadButtonParentDistrict({
  country,
  district,
}) {
  // 1. Fetch data for that selected province (array of JSON objects)
  const districtData = await getSelectedDistrictData(
    country,
    decodeURIComponent(district)
  );

  return (
    <>
      <DownloadButtonDistrict districtData={districtData} district={district} />
    </>
  );
}
