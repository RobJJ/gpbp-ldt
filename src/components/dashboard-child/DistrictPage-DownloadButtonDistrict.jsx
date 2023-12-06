"use client";
import React from "react";
import { jsonToCSV, useCSVDownloader } from "react-papaparse";

// -> receive province data in JSON format
export default function DownloadButtonDistrict({ districtData, district }) {
  //
  const { CSVDownloader, Type } = useCSVDownloader();
  const districtName = decodeURIComponent(district);
  // 1. Parse JSON -> CSV
  const CSVData = jsonToCSV(districtData, {
    header: true,
    delimiter: ",",
  });
  return (
    <div>
      <CSVDownloader
        type={Type.Button}
        bom={true}
        filename={`district_data_${districtName}`}
        delimiter={";"}
        data={CSVData}
        className="underline"
      >
        Download Data
      </CSVDownloader>
    </div>
  );
}
