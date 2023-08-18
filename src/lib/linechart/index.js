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
