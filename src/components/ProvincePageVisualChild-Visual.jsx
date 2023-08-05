"use client";

import { useState } from "react";
import { useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more";

// highchartsMore(Highcharts);
// **note :: this work around is for the SSR run of this client component and checks if function or object
if (typeof Highcharts === "object") {
  highchartsMore(Highcharts);
}
// testing the matching
const tabToScoreType = {
  Overview: ["ECON_SCORE", "ENVR_SCORE"],
  Environmental: ["AIR_SCORE", "FOREST_SCORE", "TEMP_SCORE"],
};

const scoreTypeToName = {
  ECON_SCORE: "Economic ",
  ENVR_SCORE: "Environmental ",
  AIR_SCORE: "Air Quality",
  FOREST_SCORE: "Deforestation",
  TEMP_SCORE: "Extreme Temp",
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
  console.log(
    "We are in the visual: chartData is::",
    sortData(provinceData, selectedTab)
  );
  const chartRef = useRef();

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
    credits: {
      enabled: false,
    },
    title: {
      text: `${provinceData[0].PROVINCE} - Score over time`,
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
      align: "right",
      verticalAlign: "middle",
      layout: "vertical",
    },
    xAxis: {
      title: {
        text: "<b>Years</b>",
      },
      categories: [2019, 2020, 2021, 2022],
      tickInterval: 1,
      accessibility: {
        rangeDescription: "Range: 2019 to 2022",
      },
    },
    yAxis: {
      title: {
        text: "<b>Scores</b>",
      },
      min: 0,
      max: 100,
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
    <div className="h-full w-full flex">
      <HighchartsReact
        ref={chartRef}
        highcharts={Highcharts}
        options={chartOptions}
        containerProps={{ style: { height: "100%", width: "100%" } }}
      />
    </div>
  );
}
