"use client";

import React, { useState, useEffect, useRef } from "react";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { getDistrictId, getProvinceId } from "@/lib/utils";

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
// the data type will be the collection of GED-districts
function setColor(point, provinceSelected, districtSelected) {
  if (
    districtSelected &&
    decodeURIComponent(point.DISTRICT) === decodeURIComponent(districtSelected)
  ) {
    // if point is the current selected district -> RED
    return "#F00";
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

function dataMappingTwo(
  dataType,
  year,
  score_one,
  score_two,
  provinceSelected,
  districtSelected
) {
  console.log("the data Mapping has started .....");
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
// let focusedPoint;
// potentially move alot of this state to the child of scatter that actually renders the scatter

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
      borderWidth: 1,
      shadow: true,
      useHTML: true,
      headerFormat: "<table>",
      pointFormat:
        `<tr><th colspan="2"><h3><u>{point.DISTRICT}</u></h3></th></tr>` +
        `<tr><th>${urlToTooltipMatching[score_one]}: </th><td>{point.x}</td></tr>` +
        `<tr><th>${urlToTooltipMatching[score_two]}: </th><td>{point.y}</td></tr>` +
        `<tr><th>year:${year}`,
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
      startOnTick: false,
      endOnTick: true,
      // maxPadding: 0.2,
      // tickLength: 0,
    },
    yAxis: {
      title: {
        text: `<b>${urlToLableMatching[score_two]}</b>`,
      },
      min: 0,
      max: 100,
      startOnTick: false,
      endOnTick: false,
      maxPadding: 0.2,
      gridLineWidth: 0,
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
              // removing this additional check on the dot click if it is already selected.. make user click the province breadcrumb
              // checking if the dot you clicked is a district dot
              // if (dot.point.DISTRICT_ID && dot.point.marker.radius === 3) {
              //   // 1st: just navigate to the path
              //   router.push(
              //     `/dashboard/${country}/${dot.point.PROVINCE}/${dot.point.DISTRICT}?year=${dot.point.YEAR}&score_one=${score_one}&score_two=${score_two}`
              //   );
              // }
              // ** removing this condition - ie clicking on a already selected dot. Rather make the user click the province
              // condition: if the dot clicked is already selected and we are on the district page -> navigate back to the province
              // if (dot.point.DISTRICT_ID && dot.point.marker.radius === 5) {
              //   router.push(
              //     `/dashboard/${country}/${dot.point.PROVINCE}?year=${dot.point.YEAR}&score_one=${score_one}&score_two=${score_two}`
              //   );
              // }
            },
          },
        },
      },
    },

    series: [
      {
        data: dataMappingTwo(
          gedDataDistrict,
          year,
          score_one,
          score_two,
          provinceSelected,
          districtSelected
        ),
        marker: {
          radius: 3,
        },
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
          `<tr><th>${urlToTooltipMatching[score_one]}: </th><td>{point.x}</td></tr>` +
          `<tr><th>${urlToTooltipMatching[score_two]}: </th><td>{point.y}</td></tr>` +
          `<tr><th>year:${year}`,
      },
      series: {
        ...chartOptions.series,
        data: dataMappingTwo(gedDataDistrict, year, score_one, score_two),
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
                // removing both checks below for simplier approach
                // checking if the dot you clicked is a district dot
                // if (dot.point.DISTRICT_ID && dot.point.marker.radius === 3) {

                //   // 1st: just navigate to the path
                //   router.push(
                //     `/dashboard/${country}/${dot.point.PROVINCE}/${dot.point.DISTRICT}?year=${dot.point.YEAR}&score_one=${score_one}&score_two=${score_two}`
                //   );
                // }
                // // condition: if the dot clicked is already selected and we are on the district page -> navigate back to the province
                // if (dot.point.DISTRICT_ID && dot.point.marker.radius === 5) {
                //   router.push(
                //     `/dashboard/${country}/${dot.point.PROVINCE}?year=${dot.point.YEAR}&score_one=${score_one}&score_two=${score_two}`
                //   );
                // }
              },
            },
          },
        },
      },
    });
  }, [year, score_one, score_two]);

  // listening to province or district change
  useEffect(() => {
    // 1) User navigating between provinces - list
    if (provinceSelected && !districtSelected) {
      console.log("Province change fired :: ");
      // const currentSeries = chartRef.current.chart.series[0].data;
      // // 1.1) Fade dots that are not in selected province
      // const districtsNotInSelectedProvince = currentSeries.filter(
      //   (districtDot) =>
      //     decodeURIComponent(districtDot.PROVINCE) !==
      //     decodeURIComponent(provinceSelected)
      // );
      // // 1.2) fade these dots
      // //1st : update districtsNotInProvince
      // districtsNotInSelectedProvince.forEach((district) =>
      //   district.update({ color: "#D3D3D3", marker: { radius: 3 } })
      // );
      // lets see if we can just set chart options ??
      setChartOptions({
        ...chartOptions,
        series: [
          {
            data: dataMappingTwo(
              gedDataDistrict,
              year,
              score_one,
              score_two,
              provinceSelected,
              districtSelected
            ),
            marker: {
              radius: 3,
            },
            cursor: "pointer",
          },
        ],
      });
    }
    // 2) User navigates from province selected to country
    if (!provinceSelected && !districtSelected) {
      // 2.1) if dot has color of :#D3D3D3 then change it back to black
      // const currentSeries = chartRef.current.chart.series[0].data;
      // currentSeries.forEach((districtDot) => {
      //   if (districtDot.color === "#D3D3D3") {
      //     districtDot.update({ color: "#000" });
      //   } else {
      //     return districtDot;
      //   }
      // });
      // ** try just reseting the dots instead of updating?
      setChartOptions({
        ...chartOptions,
        series: [
          {
            data: dataMappingTwo(
              gedDataDistrict,
              year,
              score_one,
              score_two,
              provinceSelected,
              districtSelected
            ),
            marker: {
              radius: 3,
            },
            cursor: "pointer",
          },
        ],
      });
    }
  }, [provinceSelected, districtSelected]);

  // listen for changes to the district.. this will always fire with any navigation
  // useEffect(() => {
  //   // 1st: district view
  //   if (provinceSelected && districtSelected) {
  //     const province_id = getProvinceId(gedDataProvince, provinceSelected);
  //     const district_id = getDistrictId(gedDataDistrict, districtSelected);
  //     const selectedDistrict = chartRef.current.chart.series[0].data.filter(
  //       (district) => district.DISTRICT_ID === district_id
  //     );
  //     // maybe try optimise this? cut the main data chartRef data into two pieces instead of filtering?
  //     //  1 ** might not need to do this ? they are already black
  //     const districtsInSelectedProvince =
  //       chartRef.current.chart.series[0].data.filter(
  //         (district) => district.PROVINCE_ID === province_id
  //       );
  //     const districtsNotInSelectedProvince =
  //       chartRef.current.chart.series[0].data.filter(
  //         (district) => district.PROVINCE_ID !== province_id
  //       );
  //     //1st : update districtsNotInProvince
  //     districtsNotInSelectedProvince.forEach((district) =>
  //       district.update({ color: "#D3D3D3", marker: { radius: 3 } })
  //     );
  //     //2nd: update districtsInProvince
  //     // 1 ** might not need to do this ? they are already black
  //     districtsInSelectedProvince.forEach((district) =>
  //       district.update({
  //         color: "#000000",
  //         marker: { radius: 3 },
  //       })
  //     );
  //     //3nd: update chosen district
  //     selectedDistrict.forEach((district) =>
  //       district.update({
  //         color: "#ff0000",
  //         marker: { radius: 5 },
  //       })
  //     );
  //   }

  //   //2nd: province view
  //   if (provinceSelected && !districtSelected) {
  //     const province_id = getProvinceId(gedDataProvince, provinceSelected);
  //     const districtsInSelectedProvince =
  //       chartRef.current.chart.series[0].data.filter(
  //         (district) => district.PROVINCE_ID === province_id
  //       );
  //     const districtsNotInSelectedProvince =
  //       chartRef.current.chart.series[0].data.filter(
  //         (district) => district.PROVINCE_ID !== province_id
  //       );
  //     //1st: update districtsNotInSelectedProvince
  //     districtsNotInSelectedProvince.forEach((district) =>
  //       district.update({ color: "#D3D3D3", marker: { radius: 3 } })
  //     );
  //     //2nd: update districtsInSelectedProvince
  //     districtsInSelectedProvince.forEach((district) =>
  //       district.update({
  //         color: "#000000",
  //         marker: { radius: 3 },
  //       })
  //     );
  //   }
  // }, [districtSelected]);

  // // listen for when user is at province view, and navigates to country from breadcrumbs.. the districtSelected will not trigger a new event because its not selected
  // useEffect(() => {
  //   if (districtSelected) return;
  //   //1st: set dots back to default
  //   if (!districtSelected && !provinceSelected) {
  //     const allDotsAvailableOnChart = chartRef.current.chart.series[0].data;
  //     //1st: update all dots back to default
  //     allDotsAvailableOnChart.forEach((district) =>
  //       district.update({
  //         color: "#000000",
  //         marker: { radius: 3 },
  //       })
  //     );
  //   }
  //   //2nd: for user navigates to province from breadcrumbs
  //   if (!districtSelected && provinceSelected) {
  //     const province_id = getProvinceId(gedDataProvince, provinceSelected);
  //     const districtsInSelectedProvince =
  //       chartRef.current.chart.series[0].data.filter(
  //         (district) => district.PROVINCE_ID === province_id
  //       );
  //     const districtsNotInSelectedProvince =
  //       chartRef.current.chart.series[0].data.filter(
  //         (district) => district.PROVINCE_ID !== province_id
  //       );
  //     districtsNotInSelectedProvince.forEach((district) =>
  //       district.update({ color: "#D3D3D3", marker: { radius: 3 } })
  //     );
  //     //2nd: update districtsInSelectedProvince
  //     districtsInSelectedProvince.forEach((district) =>
  //       district.update({
  //         color: "#000000",
  //         marker: { radius: 3 },
  //       })
  //     );
  //   }
  //   setChartOptions({ ...chartOptions });
  // }, [provinceSelected]);

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
