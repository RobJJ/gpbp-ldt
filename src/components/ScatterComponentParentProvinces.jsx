"use client";

import React, { useState, useEffect, useRef } from "react";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { getProvinceId } from "@/lib/utils";

// highchartsMore(Highcharts);
// **note :: this work around is for the SSR run of this client component and checks if function or object
if (typeof Highcharts === "object") {
  highchartsMore(Highcharts);
}

// ** note:: be sure of what score from url is sitting on xAxis and which is on yAxis..
// currently score_one will be x, and score_two will be y
const urlToScoreMatching = {
  econ: "ECON_SCORE",
  envr: "ENVR_SCORE",
  air: "AIR_SCORE",
  forest: "FOREST_SCORE",
  temp: "TEMP_SCORE",
};
const urlToLableMatching = {
  econ: "Economic Score",
  envr: "Environmental Score",
  air: "Air Quality Score",
  forest: "Deforestation Score",
  temp: "Extreme Temperature Score",
};
const urlToTooltipMatching = {
  econ: "Econ Score",
  envr: "Env Score",
  air: "Air Score",
  forest: "Deforest Score",
  temp: "Temp Score",
};

// function dataMapping(data, year, x_score, y_score, provinceSelected) {
//   const xAxisScore = urlToScoreMatching[x_score];
//   const yAxisScore = urlToScoreMatching[y_score];
//   //
//   return data
//     .filter((obj) => Number(obj.YEAR) === Number(year))
//     .map(function (point) {
//       return {
//         ...point,
//         id: provinceSelected ? point.DISTRICT_ID : point.PROVINCE_ID,
//         x: Math.round(Number(point[xAxisScore])),
//         y: Math.round(Number(point[yAxisScore])),
//         // marker: {
//         //   radius: 10,
//         // },
//         // radius: 6,
//         // color: colorPanel[point.REGION],
//         // color: "#666666",
//       };
//     });
// }
// this is attempt at new function,, the data passed in is already the correct year..
// reads scores and return the right array for the series.data
function dataMappingTwo(
  dataType,
  year,
  score_one,
  score_two,
  province,
  provinceData
) {
  // match url scores to actual data values
  const xAxisScore = urlToScoreMatching[score_one];
  const yAxisScore = urlToScoreMatching[score_two];
  //
  const provinceID = province ? getProvinceId(provinceData, province) : false;

  //
  const filteredData = provinceID
    ? dataType.filter((district) => district.PROVINCE_ID === provinceID)
    : dataType;

  return filteredData
    .filter((obj) => Number(obj.YEAR) === Number(year))
    .map(function (point) {
      return {
        ...point,
        id: point.DISTRICT_ID ? point.DISTRICT_ID : point.PROVINCE_ID,
        x: Math.round(Number(point[xAxisScore])),
        y: Math.round(Number(point[yAxisScore])),
      };
    });
}

function drawQuadrants(chart, update) {
  const xAxis = chart.xAxis[0],
    yAxis = chart.yAxis[0],
    x0 = Math.round(
      Math.min(
        Math.max(xAxis.toPixels(50), xAxis.left),
        xAxis.left + xAxis.width
      )
    ),
    y0 = Math.round(
      Math.min(
        Math.max(yAxis.toPixels(50), yAxis.top),
        yAxis.top + yAxis.height
      )
    ),
    rightTo0 = Math.max(yAxis.width - x0 + yAxis.left, 0),
    leftTo0 = Math.max(x0 - yAxis.left, 0),
    topTo0 = Math.max(y0 - yAxis.top, 0),
    bottomTo0 = Math.max(yAxis.height - y0 + yAxis.top, 0);

  if (!chart.quadrants) {
    chart.quadrants = {
      I: chart.renderer
        .rect()
        .attr({
          fill: "#D1EAD3",
        })
        .add(),
      II: chart.renderer
        .rect()
        .attr({
          fill: "#FFFFEB",
        })
        .add(),
      III: chart.renderer
        .rect()
        .attr({
          fill: "#FFE4E1",
        })
        .add(),
      IV: chart.renderer
        .rect()
        .attr({
          fill: "#FFFFEB",
        })
        .add(),
    };
  }
  chart.quadrants.I[update]({
    // x: x0 - 2,
    x: x0,
    y: xAxis.top,
    // width: rightTo0 + 2,
    width: rightTo0,
    // height: topTo0 + 2
    height: topTo0,
  });

  chart.quadrants.II[update]({
    x: xAxis.left,
    y: xAxis.top,
    width: leftTo0,
    // height: topTo0 + 2
    height: topTo0,
  });

  chart.quadrants.III[update]({
    x: xAxis.left,
    y: y0,
    // width: leftTo0 + 2,
    width: leftTo0,
    height: bottomTo0,
  });

  chart.quadrants.IV[update]({
    x: x0,
    y: y0,
    width: rightTo0,
    height: bottomTo0,
  });
}
//
let focusedPoint;
// potentially move alot of this state to the child of scatter that actually renders the scatter

export default function ScatterComponentParentProvinces({
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
        `<tr><td colspan="2">${
          provinceSelected
            ? `<b>District</b>: {point.DISTRICT}`
            : `<b>Province</b>: {point.PROVINCE}`
        }</td></tr>` +
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
      // tickWidth: 1,
      // tickLength: 10,
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
              // when a province dot is clicked, we want to load that province in params

              if (!dot.point.DISTRICT_ID) {
                // console.log(
                //   "you clicked a province dot.. lets see what this is::",
                //   dot.point.YEAR
                // );
                router.push(
                  `/dashboard/${country}/${dot.point.PROVINCE}?year=${dot.point.YEAR}&score_one=${score_one}&score_two=${score_two}`
                );
                return;
              }
              if (dot.point.DISTRICT_ID) {
                // if user clicks a district dot,, we want to highlite it
                // console.log(

                //   "you clicked a district dot bruv... lets have a look shall we...",
                //   dot.point
                // );
                if (dot.point === focusedPoint) {
                  // reset its styling because its active.. go back to province view

                  // console.log("clicked dot,, focusedPoint??", focusedPoint);
                  dot.point.update({
                    color: "#000000",
                    marker: { radius: 3 },
                  });

                  // set to null before navigating,, so that breadcumb nav can have true when district useEffect triggers
                  focusedPoint = null;

                  router.push(
                    `/dashboard/${country}/${dot.point.PROVINCE}?year=${dot.point.YEAR}&score_one=${score_one}&score_two=${score_two}`
                  );
                  return;
                } else if (dot.point !== focusedPoint && focusedPoint) {
                  // there is already a active dot, update it, set new active dot
                  focusedPoint.update({
                    color: "#000000",
                    marker: { radius: 3 },
                  });
                  dot.point.update({
                    color: "#ff0000",
                    marker: { radius: 5 },
                  });
                  focusedPoint = dot.point;

                  router.push(
                    `/dashboard/${country}/${dot.point.PROVINCE}/${dot.point.DISTRICT}?year=${dot.point.YEAR}&score_one=${score_one}&score_two=${score_two}`
                  );
                  // console.log("focused point bro...", focusedPoint);
                  return;
                } else {
                  // there is no active dot
                  dot.point.update({
                    color: "#ff0000",
                    marker: { radius: 5 },
                  });
                  focusedPoint = dot.point;

                  router.push(
                    `/dashboard/${country}/${dot.point.PROVINCE}/${dot.point.DISTRICT}?year=${dot.point.YEAR}&score_one=${score_one}&score_two=${score_two}`
                  );

                  return;
                }
              }
            },
          },
        },
      },
    },

    series: [
      {
        data: dataMappingTwo(
          provinceSelected ? gedDataDistrict : gedDataProvince,
          year,
          score_one,
          score_two,
          provinceSelected,
          gedDataProvince
        ),
        marker: {
          radius: provinceSelected ? 3 : 5,
        },
        cursor: "pointer",
      },
    ],
  });

  useEffect(() => {
    // console.log("your useEffect has fired!! the year values is::", year);

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
          `<tr><td colspan="2">${
            provinceSelected
              ? `<b>District</b>: {point.DISTRICT}`
              : `<b>Province</b>: {point.PROVINCE}`
          }</td></tr>` +
          `<tr><td><b>${urlToLableMatching[score_one]}</b>: {point.x}</td></tr>` +
          `<tr><td><b>${urlToLableMatching[score_two]}</b>: {point.y}</td></tr>`,
      },
      series: {
        ...chartOptions.series,
        marker: {
          radius: provinceSelected ? 3 : 5,
        },
        data: dataMappingTwo(
          provinceSelected ? gedDataDistrict : gedDataProvince,
          year,
          score_one,
          score_two,
          provinceSelected,
          gedDataProvince
        ),
      },
    });
  }, [year, provinceSelected, score_one, score_two]);
  // to handle the district being unselected by the breadcrumbs
  useEffect(() => {
    // console.log("did the use effect fire? focused poiint??", focusedPoint);
    // if user navigates from a district -> country breadcrumb nav
    if (!provinceSelected && focusedPoint) {
      focusedPoint.update({
        color: "#000000",
        marker: { radius: 5 },
      });
      focusedPoint = null;
      return;
    }

    // when a user navigates to the district from the district list instead of dot on scatter
    if (!focusedPoint && districtSelected) {
      // console.log(
      //   "Navigated to district from the list :: your chart Ref?",
      //   chartRef.current.chart.series[0].data
      // );

      // find dot in chart array that matches in name in URL
      const pointToHighlite = chartRef.current.chart.series[0].data.find(
        (point) =>
          decodeURIComponent(point.DISTRICT) ===
          decodeURIComponent(districtSelected)
      );
      pointToHighlite.update({
        color: "#ff0000",
        marker: { radius: 5 },
      });
      focusedPoint = pointToHighlite;
    }

    // if there is an active dot, but you have navigated back to province view
    if (focusedPoint && !districtSelected) {
      // console.log("your focused point::", focusedPoint);
      focusedPoint.update({
        color: "#000000",
        marker: { radius: 3 },
      });
      focusedPoint = null;

      return;
    }
    // why is this needed?
    setChartOptions({
      ...chartOptions,
    });
    return;
  }, [districtSelected]);

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
