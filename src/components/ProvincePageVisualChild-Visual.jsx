"use client";

import { useEffect, useState } from "react";
import { useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more";

// highchartsMore(Highcharts);
// **note :: this work around is for the SSR run of this client component and checks if function or object
if (typeof Highcharts === "object") {
  highchartsMore(Highcharts);
}

// For each Tab selected -> what are the required data fields to show
const tabToScoreType = {
  Overview: ["ECON_SCORE", "ENVR_SCORE"],
  Environmental: ["AIR_SCORE", "FOREST_SCORE", "TEMP_SCORE"],
  Economic: [
    "ECON_LPC_STD",
    "ECON_LPC_PCT_CHANGE_STD",
    "ECON_BUILT_PCT_STD",
    "ECON_BUILT_COVER_GROWTH_STD",
  ],
  AirQuality: [
    "AIR_PM25_SUBINDEX_STD",
    "AIR_NO2_SUBINDEX_STD",
    "AIR_CO_SUBINDEX_STD",
    "AIR_SO2_SUBINDEX_STD",
    "AIR_O3_SUBINDEX_STD",
  ],
  ExtremeWeather: [
    "TEMP_EXTREMELY_HOT_STD",
    "TEMP_EXTREMELY_COLD_STD",
    "TEMP_MAX_TEMP_STD",
    "TEMP_PRECIPITATION_MAX_STD",
    "TEMP_EXTREMELY_WET_STD",
    "TEMP_EXTREMELY_DRY_STD",
  ],
  GreenSpace: ["FOREST_GREEN_PCT_STD", "FOREST_GREEN_COVER_GROWTH_STD"],
};

// Match data property from GED-DATA --> lable name
const scoreTypeToName = {
  ECON_SCORE: "Economic ",
  ENVR_SCORE: "Environmental ",
  AIR_SCORE: "Air Quality",
  FOREST_SCORE: "Deforestation",
  TEMP_SCORE: "Extreme Temp",
  ECON_LPC_STD: "ECON_LPC_STD",
  ECON_LPC_PCT_CHANGE_STD: "LPC_PCT_CHANGE_STD",
  ECON_BUILT_PCT_STD: "BUILT_PCT_STD",
  ECON_BUILT_COVER_GROWTH_STD: "BUILT_COVER_GROWTH_STD",
  AIR_PM25_SUBINDEX_STD: "PM25_SUBINDEX_STD",
  AIR_NO2_SUBINDEX_STD: "NO2_SUBINDEX_STD",
  AIR_CO_SUBINDEX_STD: "CO_SUBINDEX_STD",
  AIR_SO2_SUBINDEX_STD: "SO2_SUBINDEX_STD",
  AIR_O3_SUBINDEX_STD: "O3_SUBINDEX_STD",
  TEMP_EXTREMELY_HOT_STD: "EXTREMELY_HOT_STD",
  TEMP_EXTREMELY_COLD_STD: "EXTREMELY_COLD_STD",
  TEMP_MAX_TEMP_STD: "MAX_TEMP_STD",
  TEMP_PRECIPITATION_MAX_STD: "PRECIPITATION_MAX_STD",
  TEMP_EXTREMELY_WET_STD: "EXTREMELY_WET_STD",
  TEMP_EXTREMELY_DRY_STD: "EXTREMELY_DRY_STD",
  FOREST_GREEN_PCT_STD: "GREEN_PCT_STD",
  FOREST_GREEN_COVER_GROWTH_STD: "GREEN_COVER_GROWTH_STD",
};

// this function needs to return an array of objects that are shaped in the following format
// {
//         name: "Deforestation",
//         data: sortData(districtData, "FOREST_SCORE"),
//         color: "#FFAB00",
//       },

function sortData(data, tab) {
  // get array of properties for creating individual lines
  const chartLinesArr = tabToScoreType[tab];
  console.log("chartlinesArr:", chartLinesArr);

  // organise provinceData passed in by year
  const sortedProvinceDataByYear = data.sort((a, b) => a.YEAR - b.YEAR);
  // for each property create an object that contains an array of data and some other props
  const chartData = chartLinesArr.map((prop) => {
    return {
      name: scoreTypeToName[prop],
      data: sortedProvinceDataByYear.map((provinceYear) =>
        Math.round(provinceYear[prop])
      ),
    };
  });
  return chartData;
}

// GOAL: Chart component: Receives ProvinceData : Tab selection -> listen for this change
export default function ProvincePageVisualChildVisual({
  selectedTab,
  provinceData,
}) {
  // console.log(
  //   "We are in the visual: chartData is::",
  //   sortData(provinceData, selectedTab)
  // );
  const chartRef = useRef();

  // listening for change of Component type to view (selected Tab : "Overview", "Economic" ,etc)
  useEffect(() => {
    setChartOptions({
      ...chartOptions,
      // might need to also repush the tooltip data
      series: sortData(provinceData, selectedTab),
      yAxis: {
        ...chartOptions.yAxis,
        // min changes depending on if : score [0-100] : STD [-10, 10]
        min:
          selectedTab === "Overview" || selectedTab === "Environmental"
            ? 0
            : null,
        max:
          selectedTab === "Overview" || selectedTab === "Environmental"
            ? 100
            : null,
      },
    });
  }, [selectedTab]);

  let chart;
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "line",
      events: {
        load: function () {
          chart = this;
        },
      },
    },
    accessibility: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    title: {
      // text: `${provinceData[0].PROVINCE} - Score over time`,
      text: undefined,
    },
    tooltip: {
      // enabled: false,
      borderRadius: 5,
      borderWidth: 1,
      shadow: true,

      followPointer: true,
      hideDelay: 0,
    },
    legend: {
      enabled: true,
      align: "center",
      verticalAlign: "bottom",
      layout: "horizontal",
      padding: 0,
    },
    xAxis: {
      title: {
        // text: "<b>Years</b>",
        text: undefined,
      },
      categories: [2019, 2020, 2021, 2022],
      tickInterval: 1,
      accessibility: {
        rangeDescription: "Range: 2019 to 2022",
      },
    },
    yAxis: {
      title: {
        // text: "<b>Scores</b>",
        text: undefined,
      },
      // min changes depending on if : score [0-100] : STD [-10, 10]
      min:
        selectedTab === "Overview" || selectedTab === "Environmental"
          ? 0
          : null,
      max:
        selectedTab === "Overview" || selectedTab === "Environmental"
          ? 100
          : null,
    },
    series: sortData(provinceData, selectedTab),
    plotOptions: {
      line: {
        enableMouseTracking: true,
      },
      series: {
        stickyTracking: false,
      },
    },
  });

  return (
    <div className="h-full w-full flex overflow-auto">
      <HighchartsReact
        ref={chartRef}
        highcharts={Highcharts}
        options={chartOptions}
        containerProps={{ style: { height: "100%", width: "100%" } }}
      />
    </div>
  );
}
