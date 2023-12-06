import React from "react";
import DownloadButton from "./ProvincePage-DownloadButton";
import { getSelectedProvinceData } from "@/lib/provinceData";

export default async function DownloadButtonParent({ country, province }) {
  const provinceData = await getSelectedProvinceData(
    country,
    decodeURIComponent(province)
  );

  return (
    <>
      <DownloadButton provinceData={provinceData} province={province} />
    </>
  );
}
