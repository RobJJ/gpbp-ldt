"use client";

import { useEffect, useState } from "react";
import { useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more";

import { tabToLabel } from "../lib/name-matching/index.js";
import { sortData } from "@/lib/linechart/index.js";

// highchartsMore(Highcharts);
// **note :: this work around is for the SSR run of this client component and checks if function or object
if (typeof Highcharts === "object") {
  highchartsMore(Highcharts);
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
        style: { color: "#000", fontWeight: 400 },
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
