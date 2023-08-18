"use client";

import { useEffect, useState } from "react";
import { useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more";

import {
  tabToLabel,
  scoreTypeToName,
  tabToScoreType,
} from "../lib/name-matching/index.js";

// highchartsMore(Highcharts);
// **note :: this work around is for the SSR run of this client component and checks if function or object
if (typeof Highcharts === "object") {
  highchartsMore(Highcharts);
}

// Match data property from GED-DATA --> lable name

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
      data: sortedProvinceDataByYear.map(
        (provinceYear) => Math.round(provinceYear[prop] * 100) / 100
      ),
    };
  });
  return chartData;
}

// GOAL: Chart component: Receives ProvinceData : Tab selection -> listen for this change
export default function DistrictPageVisualChild({ selectedTab, districtData }) {
  // console.log(
  //   "We are in the visual: chartData is::",
  //   sortData(provinceData, selectedTab)
  // );
  const chartRef = useRef();

  let chart;
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "line",
      // plotBorderWidth: 0,
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
        text: undefined,
      },
      // ** we have categories set : the way min and max work now change.
      // min : from left 20% of single tick
      min: -0.2,
      // categories.length - reverse or remaining of 0.2. 20% -- 80%
      max: 4 - 0.8,

      categories: [2019, 2020, 2021, 2022],
      tickInterval: 1,
      accessibility: {
        rangeDescription: "Range: 2019 to 2022",
      },
    },
    yAxis: {
      title: {
        text: tabToLabel[selectedTab],
      },
      maxPadding: 0.5,
      // min changes depending on if : score [0-100] : STD [-10, 10]
      min:
        selectedTab === "Overview" || selectedTab === "Environmental"
          ? 0
          : null,
      max:
        selectedTab === "Overview" || selectedTab === "Environmental"
          ? 100
          : null,
      // softMax:
      //   selectedTab === "Overview" || selectedTab === "Environmental"
      //     ? null
      //     : 3,
      // softMinx:
      //   selectedTab === "Overview" || selectedTab === "Environmental"
      //     ? null
      //     : -3,
    },
    series: sortData(districtData, selectedTab),
    plotOptions: {
      line: {
        enableMouseTracking: true,
      },
      series: {
        stickyTracking: false,
        pointPlacement: "on",
      },
    },
  });

  // listening for change of Component type to view (selected Tab : "Overview", "Economic" ,etc)
  useEffect(() => {
    setChartOptions({
      ...chartOptions,
      // might need to also repush the tooltip data
      series: sortData(districtData, selectedTab),
      yAxis: {
        ...chartOptions.yAxis,
        title: {
          // text: "<b>Scores</b>",
          text: tabToLabel[selectedTab],
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
        // softMin:
        //   selectedTab === "Overview" || selectedTab === "Environmental"
        //     ? null
        //     : -3,
        // softMax:
        //   selectedTab === "Overview" || selectedTab === "Environmental"
        //     ? null
        //     : 3,
      },
      xAxis: {
        ...chartOptions.xAxis,
        // ** we have categories set : the way min and max work now change.
        // min : from left 20% of single tick
        min: -0.2,
        // categories.length - reverse or remaining of 0.2. 20% -- 80%
        max: 4 - 0.8,
      },
    });
  }, [selectedTab]);

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
