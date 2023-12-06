"use client";
import React from "react";
import { jsonToCSV, useCSVDownloader } from "react-papaparse";

// -> receive province data in JSON format
export default function DownloadButton({ provinceData, province }) {
  //
  const { CSVDownloader, Type } = useCSVDownloader();
  const provinceName = decodeURIComponent(province);
  // 1. Parse JSON -> CSV
  const CSVData = jsonToCSV(provinceData, {
    header: true,
    delimiter: ",",
  });
  return (
    <div>
      <CSVDownloader
        type={Type.Button}
        bom={true}
        filename={`province_data_${provinceName}`}
        delimiter={";"}
        data={CSVData}
        className="underline"
      >
        Download Data
      </CSVDownloader>
    </div>
  );
}
