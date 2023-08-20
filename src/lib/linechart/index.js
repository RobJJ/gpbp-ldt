import { scoreTypeToName, tabToScoreType } from "../name-matching";

// This function is for linechart to pass in their data and get objects for linechart
//
//// this function needs to return an array of objects that are shaped in the following format
// {
//         name: "Deforestation",
//         data: sortData(districtData, "FOREST_SCORE"),
//         color: "#FFAB00",
//       },
//
// data: [{},{},...]

export function sortData(data, tab) {
  // get array of properties for creating individual lines
  const chartLinesArr = tabToScoreType[tab];
  //   console.log("chartlinesArr:", chartLinesArr);

  // organise provinceData passed in by year
  const sortedDataByYear = data.sort((a, b) => a.YEAR - b.YEAR);
  // for each property create an object that contains an array of data and some other props
  const chartData = chartLinesArr.map((prop) => {
    return {
      name: scoreTypeToName[prop],
      data: sortedDataByYear.map(
        (dataForYear) => Math.round(dataForYear[prop] * 100) / 100
      ),
      marker: { radius: 3 },
    };
  });
  return chartData;
}

//
// This is for drawing BG on chart quadrants
export function drawQuadrants(chart, update) {
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
