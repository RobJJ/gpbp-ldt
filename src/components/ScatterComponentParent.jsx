"use client";

import React, { useState, useEffect } from "react";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more";

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

function dataMapping(data, year, x_score, y_score) {
  const xAxisScore = urlToScoreMatching[x_score];
  const yAxisScore = urlToScoreMatching[y_score];
  // console.log("xAxisScore::", xAxisScore);
  // console.log("yAxisScore::", yAxisScore);
  return data
    .filter((obj) => obj.YEAR === Number(year))
    .map(function (point) {
      return {
        ...point,
        id: point.PROVINCE_ID,
        x: Math.round(point[xAxisScore]),
        y: Math.round(point[yAxisScore]),
        // color: colorPanel[point.REGION],
        color: "#666666",
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

export default function ScatterComponentParent({
  data,
  year,
  score_one,
  score_two,
}) {
  console.log("[ScatterComponentParent] : rendered : data :", data);

  let chart;
  const [chartOptions, setChartOptions] = useState({
    chart: {
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
        '<tr><th colspan="2"><h3><u>{point.PROVINCE}</u></h3></th></tr>' +
        `<tr><th>${urlToTooltipMatching[score_one]}: </th><td>{point.x}</td></tr>` +
        `<tr><th>${urlToTooltipMatching[score_two]}: </th><td>{point.y}</td></tr>`,
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
        colorByPoint: true,
        point: {
          events: {
            // click: function () {
            //   // console.log(`Hey fuker, this is the points data... ${this}`);
            //   let districtExists = tabs.some((tab) => tab.id === this.id);
            //   if (!districtExists) {
            //     const newTab = {
            //       id: this.id,
            //       name: this.DISTRICT,
            //       path: `summary/${this.id}`,
            //     };
            //     setTabs([...tabs, newTab]);
            //   }
            //   navigate(`summary/${this.id}`);
            // console.log(
            //   "this log is from scatter click:: current tabs are",
            //   tabs
            // );
          },
        },
      },
    },

    series: [
      {
        // type: "scatter",
        // start with points that dont have parent
        data: dataMapping(data, year, score_one, score_two),
        // states: {
        //   hover: {
        //     enabled: false,
        //   },
        // },
        marker: {
          radius: 3, // set the marker radius to 5 pixels
        },
        // dataLabels: {
        //   enabled: true,
        //   format: "{point.district}",
        // },

        cursor: "pointer",
      },
    ],
  });

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
      series: {
        ...chartOptions.series,
        data: dataMapping(data, year, score_one, score_two),
      },
    });
  }, [year, score_one, score_two]);

  return (
    <div className="h-full w-full flex flex-col ">
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        containerProps={{ style: { height: "100%", width: "100%" } }}
      />
    </div>
  );
}
