"use client";

import React, { useState, useEffect, useRef } from "react";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { drawQuadrants } from "@/lib/linechart";
import { urlToLableMatching, urlToScoreMatching } from "@/lib/name-matching";

// highchartsMore(Highcharts);
// **note :: this work around is for the SSR run of this client component and checks if function or object
if (typeof Highcharts === "object") {
  highchartsMore(Highcharts);
}

// the data type will be the collection of GED-districts
function setColor(point, provinceSelected, districtSelected) {
  if (
    districtSelected &&
    provinceSelected &&
    decodeURIComponent(point.DISTRICT) === decodeURIComponent(districtSelected)
  ) {
    // if point is the current selected district -> RED
    return "#F00";
  } else if (
    districtSelected &&
    provinceSelected &&
    decodeURIComponent(point.DISTRICT) !==
      decodeURIComponent(districtSelected) &&
    decodeURIComponent(point.PROVINCE) === decodeURIComponent(provinceSelected)
  ) {
    // if province and district are selected.. but the point is not the district selected but is part of the province -> BLACK
    return "#000";
  } else if (
    districtSelected &&
    provinceSelected &&
    decodeURIComponent(point.DISTRICT) !==
      decodeURIComponent(districtSelected) &&
    decodeURIComponent(point.PROVINCE) !== decodeURIComponent(provinceSelected)
  ) {
    // province and district selected.. this point is not the district and not part of province -> GRAY
    return "#D3D3D3";
  } else if (
    !districtSelected &&
    provinceSelected &&
    decodeURIComponent(point.PROVINCE) === decodeURIComponent(provinceSelected)
  ) {
    // if point is part of current province selection -> BLACK
    return "#000";
  } else if (
    !districtSelected &&
    provinceSelected &&
    decodeURIComponent(point.PROVINCE) !== decodeURIComponent(provinceSelected)
  ) {
    // if point is not part of current province selection but province is selected -> GRAY
    return "#D3D3D3";
  } else if (!districtSelected && !provinceSelected) {
    // if there is no province selected or district then all dots should be black
    return "#000";
  }
}

function dataMapping(
  dataType,
  year,
  score_one,
  score_two,
  provinceSelected,
  districtSelected
) {
  // console.log("the data Mapping has started .....");
  // match url scores to actual data values
  const xAxisScore = urlToScoreMatching[score_one];
  const yAxisScore = urlToScoreMatching[score_two];

  // ** optimise :: potentially return less here? if you are going to do this map everytime,, maybe make the array that is returned slower
  return dataType
    .filter((obj) => Number(obj.YEAR) === Number(year))
    .map(function (point) {
      return {
        ...point,
        color: setColor(point, provinceSelected, districtSelected),
        id: point.DISTRICT_ID,
        x: Math.round(Number(point[xAxisScore])),
        y: Math.round(Number(point[yAxisScore])),
        marker: {
          radius:
            decodeURIComponent(point.DISTRICT) ===
            decodeURIComponent(districtSelected)
              ? 5
              : 3,
        },
      };
    });
}

export default function ScatterComponentParentDistricts({
  gedDataProvince,
  gedDataDistrict,
  country,
}) {
  // this comp will be triggered again by province selection being passed in

  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  // let countrySelected = params.country;
  let year = searchParams.get("year");
  let score_one = searchParams.get("score_one");
  let score_two = searchParams.get("score_two");
  let provinceSelected = params.province;
  let districtSelected = params.district;

  const chartRef = useRef();

  // console.log("scatter has been rendered,, the focused year is : ", year);

  let chart;
  const [chartOptions, setChartOptions] = useState({
    accessibility: {
      enabled: false,
    },
    chart: {
      // customYearValue: year,
      backgroundColor: "#fff",
      // plotBackgroundColor: "#F7F7F7",
      type: "scatter",
      zoomType: "xy",
      animation: true,
      events: {
        load: function () {
          chart = this;
          drawQuadrants(this, "attr");
        },
        redraw: function () {
          drawQuadrants(this, "animate");
        },
      },
    },
    colors: "#000000",
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      // enabled: false,
      borderRadius: 5,
      backgroundColor: "#475569",
      style: {
        color: "#fff",
        // cursor: "default",
        // fontSize: "0.8em",
      },
      borderWidth: 1,
      shadow: true,
      useHTML: true,
      headerFormat: "<table>",
      pointFormat:
        `<tr><td colspan="2"><b>District</b>: {point.DISTRICT}</td></tr>` +
        `<tr><td><b>${urlToLableMatching[score_one]}</b>: {point.x}</td></tr>` +
        `<tr><td><b>${urlToLableMatching[score_two]}</b>: {point.y}</td></tr>`,
      followPointer: true,
      hideDelay: 0,
    },
    title: {
      text: null,
      // text: _.startCase(`Experimal build: Highchart: ${type} chart`),
      // text: `Experimental build - HighCharts - Scatter chart`,
    },
    xAxis: {
      title: {
        text: `<b>${urlToLableMatching[score_one]}</b>`,
      },
      gridLineWidth: 0,
      min: 0,
      max: 100,
      tickAmount: 6,
    },
    yAxis: {
      title: {
        text: `<b>${urlToLableMatching[score_two]}</b>`,
      },
      min: 0,
      max: 100,
      tickAmount: 6,
      gridLineWidth: 0,
      startOnTick: false,
    },
    plotOptions: {
      // general options for all series
      series: {
        animation: {
          // controls animation of paint of points
          duration: 1500,
        },
        // removes lingering tooltip
        stickyTracking: false,
        // Assign a unique color to each point in the series
        // colorByPoint: true,

        point: {
          events: {
            click: (dot) => {
              if (dot.point.DISTRICT_ID) {
                console.log("You clicked a dot ::", dot.point);
                // 1st: just navigate to the path
                router.push(
                  `/dashboard/${country}/${dot.point.PROVINCE}/${dot.point.DISTRICT}?year=${dot.point.YEAR}&score_one=${score_one}&score_two=${score_two}`
                );
              }
            },
          },
        },
      },
    },

    series: [
      {
        data: dataMapping(
          gedDataDistrict,
          year,
          score_one,
          score_two,
          provinceSelected,
          districtSelected
        ),
        cursor: "pointer",
      },
    ],
  });

  // rewrite anything that references these 3 parameters to pass in latest values
  useEffect(() => {
    setChartOptions({
      ...chartOptions,
      xAxis: {
        ...chartOptions.xAxis,
        title: {
          text: `<b>${urlToLableMatching[score_one]}</b>`,
        },
      },
      yAxis: {
        ...chartOptions.yAxis,
        title: {
          text: `<b>${urlToLableMatching[score_two]}</b>`,
        },
      },
      tooltip: {
        ...chartOptions.tooltip,
        pointFormat:
          `<tr><th colspan="2"><h3><u>{point.DISTRICT}</u></h3></th></tr>` +
          `<tr><th>${urlToLableMatching[score_one]}: </th><td>{point.x}</td></tr>` +
          `<tr><th>${urlToLableMatching[score_two]}: </th><td>{point.y}</td></tr>`,
      },
      series: {
        ...chartOptions.series,
        data: dataMapping(
          gedDataDistrict,
          year,
          score_one,
          score_two,
          provinceSelected,
          districtSelected
        ),
      },
      plotOptions: {
        ...chartOptions.plotOptions,
        series: {
          ...chartOptions.plotOptions.series,
          point: {
            events: {
              click: (dot) => {
                if (dot.point.DISTRICT_ID) {
                  console.log("hey you clicked a dot ::", dot.point);
                  // 1st: just navigate to the path
                  router.push(
                    `/dashboard/${country}/${dot.point.PROVINCE}/${dot.point.DISTRICT}?year=${dot.point.YEAR}&score_one=${score_one}&score_two=${score_two}`
                  );
                }
              },
            },
          },
        },
      },
    });
  }, [year, score_one, score_two]);

  // listening to province or district change
  useEffect(() => {
    // RESET DATA AND ALLOW IT TO MAKE THE DECISION ON STLYING
    setChartOptions({
      ...chartOptions,
      series: [
        {
          data: dataMapping(
            gedDataDistrict,
            year,
            score_one,
            score_two,
            provinceSelected,
            districtSelected
          ),
          cursor: "pointer",
        },
      ],
    });
  }, [provinceSelected, districtSelected]);

  return (
    <div className="h-full w-full flex flex-col ">
      <HighchartsReact
        ref={chartRef}
        highcharts={Highcharts}
        options={chartOptions}
        containerProps={{ style: { height: "100%", width: "100%" } }}
      />
    </div>
  );
}
