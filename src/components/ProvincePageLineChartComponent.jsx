"use client";
import React, { useState, useEffect } from "react";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more";

highchartsMore(Highcharts);

// function dataMappingLineChart(data, value) {
//   return data.map(function (point) {
//     return [

// // x: Math.round(point.YEAR),
// //       y: Math.round(point[value]),
// //       color: colorPanel[point.REGION],
//     ]
//       //   ...point,
//       //   id: point.DISTRICT_ID,

//     ;
//   });
// }
// const colorPanel = {
//   "Mekong River Delta": "#bada55",
//   "Northern Midlands and Mountain Areas": "#e74c3c",
//   "North Central and Central Coastal Areas": "#ff7f50",
//   "South East": "#3498db",
//   "Central Highlands": "#00bfff",
//   "Red River Delta": "#9932cc",
// };

function sortData(data, type) {
  const rawData = data.map((district) => {
    const value = Math.round(district[type]);

    return { YEAR: district.YEAR, value: value };
    // return arrayToReturn;
  });

  // the need for this function is to make sure the array returned is in the year order for highcharts, 2019,2020,2021,2022
  function sortByYear(array) {
    array.sort((a, b) => a.YEAR - b.YEAR);
    return array.map((obj) => obj.value);
  }
  const sortedData = sortByYear(rawData);

  // console.log("sortedData data:", sortedData);
  return sortedData;
}

const DistrictVisualLineChart = ({ districtData, url }) => {
  // console.log("the district data dude", districtData);
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
      text: `${districtData[0].DISTRICT} - Score over time`,
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
    series: [
      {
        name: "Economic",
        data: sortData(districtData, "ECON_SCORE"),
        color: "#6554C0",
      },
      {
        name: "Environmental",
        data: sortData(districtData, "ENVR_SCORE"),
        color: "#36B37E",
      },
      {
        name: "Deforestation",
        data: sortData(districtData, "FOREST_SCORE"),
        color: "#FFAB00",
      },
      {
        name: "Temperature",
        data: sortData(districtData, "TEMP_SCORE"),
        color: "#FF303A",
      },
      {
        name: "Air Quality",
        data: sortData(districtData, "AIR_SCORE"),
        color: "#00B8D9",
      },
    ],
    plotOptions: {
      line: {
        // dataLabels: {
        //   enabled: true,
        // },
        enableMouseTracking: true,
      },
      series: {
        stickyTracking: false,
        // pointStart: 2019,
      },
      //   series: {
      //     states: {
      //       hover: {
      //         enabled: false,
      //       },
      //     },
      //   },
    },
  });

  useEffect(() => {
    setChartOptions({
      ...chartOptions,
      title: {
        text: `${districtData[0].DISTRICT} - Score over time`,
      },

      series: [
        {
          name: "Economic",
          data: sortData(districtData, "ECON_SCORE"),
        },
        {
          name: "Environmental",
          data: sortData(districtData, "ENVR_SCORE"),
        },
        {
          name: "Deforestation",
          data: sortData(districtData, "FOREST_SCORE"),
        },
        {
          name: "Temperature",
          data: sortData(districtData, "TEMP_SCORE"),
        },
        {
          name: "Air Quality",
          data: sortData(districtData, "AIR_SCORE"),
        },
      ],
    });
  }, [url]);

  return (
    <div className="h-full w-full flex">
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        containerProps={{ style: { height: "100%", width: "100%" } }}
      />
    </div>
  );
};

export default DistrictVisualLineChart;

// <HighchartsReact
//   highcharts={Highcharts}
//   options={chartOptions}
//   containerProps={{ style: { height: "100%", width: "100%" } }}
// />;
