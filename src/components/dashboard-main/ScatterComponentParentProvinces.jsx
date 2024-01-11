"use client";

import React, { useState, useEffect, useRef } from "react";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { urlToLableMatching, urlToScoreMatching } from "@/lib/name-matching";
import { drawQuadrants } from "@/lib/linechart";

// **note :: this work around is for the SSR run of this client component and checks if function or object
if (typeof Highcharts === "object") {
  highchartsMore(Highcharts);
}

// FIX : CACHED EVENT CLICK ON HIGHCHARTS OPTIONS -> OVERWRITE PROTO
const { merge, objectEach, isFunction, addEvent, removeEvent } = Highcharts;

Highcharts.Point.prototype.importEvents = function () {
  const point = this,
    options = merge(point.series.options.point, point.options),
    events = options.events;

  point.events = events;
  objectEach(events, function (event, eventType) {
    // remove the previous event if it exists
    if (point.addedEvents) {
      const outdatedEvent = point.addedEvents.find(
        (e) => e.eventType == eventType
      );
      removeEvent(point, outdatedEvent.eventType, outdatedEvent.event);
    }

    // add the new event function
    if (isFunction(event)) {
      addEvent(point, eventType, event);
      if (!point.addedEvents) {
        point.addedEvents = [];
      }
      point.addedEvents.push({
        eventType,
        event,
      });
    }
  });
};

// Handle logic for data mapping and styling of features : v2.0
function dataMappingProvinceType(
  districtData,
  provinceData,
  year,
  score_one,
  score_two,
  provinceSelected,
  districtSelected
) {
  // match url scores to actual GED property names
  const xAxisScore = urlToScoreMatching[score_one];
  const yAxisScore = urlToScoreMatching[score_two];
  //
  // if a province has been selected -> style it's districts
  if (provinceSelected) {
    const provinceDistricts = districtData.filter(
      (district) =>
        decodeURIComponent(district.PROVINCE) ===
        decodeURIComponent(provinceSelected)
    );

    return provinceDistricts
      .filter((obj) => Number(obj.YEAR) === Number(year))
      .map(function (point) {
        return {
          ...point,
          color:
            decodeURIComponent(point.DISTRICT) ===
            decodeURIComponent(districtSelected)
              ? "#F00"
              : "#000",
          marker: {
            radius:
              decodeURIComponent(point.DISTRICT) ===
              decodeURIComponent(districtSelected)
                ? 5
                : 3,
          },
          id: point.DISTRICT_ID,
          x: Math.round(Number(point[xAxisScore])),
          y: Math.round(Number(point[yAxisScore])),
        };
      });
  }
  //
  if (!provinceSelected) {
    return provinceData
      .filter((obj) => Number(obj.YEAR) === Number(year))
      .map(function (point) {
        return {
          ...point,
          id: point.DISTRICT_ID ? point.DISTRICT_ID : point.PROVINCE_ID,
          x: Math.round(Number(point[xAxisScore])),
          y: Math.round(Number(point[yAxisScore])),
          marker: { radius: 5 },
          color: "#000",
        };
      });
  }
}

export default function ScatterComponentParentProvinces({
  gedDataProvince,
  gedDataDistrict,
  country,
}) {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  let year = searchParams.get("year");
  let score_one = searchParams.get("score_one");
  let score_two = searchParams.get("score_two");
  let provinceSelected = params.province;
  let districtSelected = params.district;

  const chartRef = useRef();

  let chart;
  const [chartOptions, setChartOptions] = useState({
    accessibility: {
      enabled: false,
    },
    chart: {
      backgroundColor: "#fff",
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
      borderRadius: 5,
      backgroundColor: "#475569",
      style: {
        color: "#fff",
      },
      borderWidth: 1,
      shadow: true,
      useHTML: true,
      headerFormat: "<table>",
      pointFormat:
        `<tr><td colspan="2">${
          provinceSelected
            ? `<b><u>${
                country === "serbia" ? "Municipality" : "District"
              }</u></b>: {point.DISTRICT}`
            : `<b><u>${
                country === "serbia" ? "District" : "Province"
              }</u></b>: {point.PROVINCE}`
        }</td></tr>` +
        `<tr><td><b>${urlToLableMatching[score_one]}</b>: {point.x}</td></tr>` +
        `<tr><td><b>${urlToLableMatching[score_two]}</b>: {point.y}</td></tr>` +
        `<tr><td style='color:lightblue'>Click to view</td></tr>`,
      followPointer: true,
      hideDelay: 0,
    },
    title: {
      text: null,
    },
    xAxis: {
      title: {
        useHTML: true,
        enabled: true,
        text: `<p>${urlToLableMatching[score_one]}</p>`,
        style: { color: "#000", fontWeight: 400 },
      },

      gridLineWidth: 0,
      min: 0,
      max: 100,
      tickAmount: 6,
    },
    yAxis: {
      title: {
        useHTML: true,
        enabled: true,
        text: `<p style='color:blue'>${urlToLableMatching[score_two]}</p>`,
        style: { color: "#000", fontWeight: 400 },
      },
      min: 0,
      max: 100,
      tickAmount: 6,
      gridLineWidth: 0,
      startOnTick: false,
    },
    plotOptions: {
      series: {
        animation: {
          duration: 1000,
        },
        stickyTracking: false,

        point: {
          events: {
            click: (dot) => {
              if (!dot.point.DISTRICT_ID) {
                router.push(
                  `/dashboard/${country}/${dot.point.PROVINCE}?year=${dot.point.YEAR}&score_one=${score_one}&score_two=${score_two}`
                );
                return;
              }
              if (dot.point.DISTRICT_ID) {
                router.push(
                  `/dashboard/${country}/${dot.point.PROVINCE}/${dot.point.DISTRICT}?year=${dot.point.YEAR}&score_one=${score_one}&score_two=${score_two}`
                );
                return;
              }
            },
          },
        },
      },
    },

    series: [
      {
        data: dataMappingProvinceType(
          gedDataDistrict,
          gedDataProvince,
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

  useEffect(() => {
    // RESET DATA AND ALLOW IT TO MAKE THE DECISION ON STLYING
    setChartOptions({
      ...chartOptions,
      series: [
        {
          data: dataMappingProvinceType(
            gedDataDistrict,
            gedDataProvince,
            year,
            score_one,
            score_two,
            provinceSelected,
            districtSelected
          ),
          cursor: "pointer",
        },
      ],
      tooltip: {
        ...chartOptions.tooltip,
        useHTML: true,
        headerFormat: "<table>",
        pointFormat:
          `<tr><td colspan="2">${
            provinceSelected
              ? `<b><u>${
                  country === "serbia" ? "Municipality" : "District"
                }</u></b>: {point.DISTRICT}`
              : `<b><u>${
                  country === "serbia" ? "District" : "Province"
                }</u></b>: {point.PROVINCE}`
          }</td></tr>` +
          `<tr><td><b>${urlToLableMatching[score_one]}</b>: {point.x}</td></tr>` +
          `<tr><td><b>${urlToLableMatching[score_two]}</b>: {point.y}</td></tr>` +
          `<tr><td style='color:lightblue'>Click to view</td></tr>`,
      },
    });
  }, [provinceSelected, districtSelected]);

  useEffect(() => {
    // RESET DATA AND ALLOW IT TO MAKE THE DECISION ON STLYING
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
        data: dataMappingProvinceType(
          gedDataDistrict,
          gedDataProvince,
          year,
          score_one,
          score_two,
          provinceSelected,
          districtSelected
        ),
      },
      tooltip: {
        ...chartOptions.tooltip,
        pointFormat:
          `<tr><td colspan="2">${
            provinceSelected
              ? `<b><u>${
                  country === "serbia" ? "Municipality" : "District"
                }</u></b>: {point.DISTRICT}`
              : `<b><u>${
                  country === "serbia" ? "District" : "Province"
                }</u></b>: {point.PROVINCE}`
          }</td></tr>` +
          `<tr><td><b>${urlToLableMatching[score_one]}</b>: {point.x}</td></tr>` +
          `<tr><td><b>${urlToLableMatching[score_two]}</b>: {point.y}</td></tr>` +
          `<tr><td style='color:lightblue'>Click to view</td></tr>`,
      },
      plotOptions: {
        ...chartOptions.plotOptions,
        series: {
          ...chartOptions.plotOptions.series,
          stickyTracking: false,
          point: {
            events: {
              click: (dot) => {
                if (!dot.point.DISTRICT_ID) {
                  router.push(
                    `/dashboard/${country}/${dot.point.PROVINCE}?year=${dot.point.YEAR}&score_one=${score_one}&score_two=${score_two}`
                  );
                  return;
                }
                if (dot.point.DISTRICT_ID) {
                  router.push(
                    `/dashboard/${country}/${dot.point.PROVINCE}/${dot.point.DISTRICT}?year=${dot.point.YEAR}&score_one=${score_one}&score_two=${score_two}`
                  );
                  return;
                }
              },
            },
          },
        },
      },
    });
  }, [year, score_one, score_two]);

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
