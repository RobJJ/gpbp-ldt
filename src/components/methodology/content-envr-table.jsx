const envrHeaders = [
  "Indicator",
  "Component",
  "Description",
  "Eff on Env Score",
  "Data Type",
  "Range of Values",
];
const envrRows = [
  [
    "GOOD",
    "Air Score",
    "Percentage of number of days of air quality deemed “Good” in the given year",
    "Positive",
    "float",
    "0-1.0",
  ],
  [
    "SATISFACTORY",
    "Air Score",
    "Percentage of number of days of air quality deemed “Satisfactory” in the given year",
    "Positive",
    "float",
    "0-1.0",
  ],
  [
    "MODERATE",
    "Air Score",
    "Percentage of number of days of air quality deemed “Moderate” in the given year",
    "Positive",
    "float",
    "0-1.0",
  ],
  [
    "POOR",
    "Air Score",
    "Percentage of number of days of air quality deemed “Poor” in the given year",
    "Negative",
    "float",
    "0-1.0",
  ],
  [
    "VERY POOR",
    "Air Score",
    "Percentage of number of days of air quality deemed “Very Poor” in the given year",
    "Negative",
    "float",
    "0-1.0",
  ],
  [
    "PM25_PCT_CHANGE",
    "Air Score",
    "Annual percentage change of the given region’s PM2.5",
    "Negative (a positive increase reduces the score)",
    "float",
    "-inf-inf",
  ],
  [
    "NO2_PCT_CHANGE",
    "Air Score",
    "Annual percentage change of the given region’s NO2",
    "Negative (a positive increase reduces the score)",
    "float",
    "-inf-inf",
  ],
  [
    "SO2_PCT_CHANGE",
    "Air Score",
    "Annual percentage change of the given region’s SO2",
    "Negative (a positive increase reduces the score)",
    "float",
    "-inf-inf",
  ],
  [
    "CO_PCT_CHANGE",
    "Air Score",
    "Annual percentage change of the given region’s CO",
    "Negative (a positive increase reduces the score)",
    "float",
    "-inf-inf",
  ],
  [
    "O3_PCT_CHANGE",
    "Air Score",
    "Annual percentage change of the given region’s O3",
    "Negative (a positive increase reduces the score)",
    "float",
    "-inf-inf",
  ],
  [
    "EXTREMELY_HOT",
    "Temperature Score",
    "Proportion of extremely hot days in a year",
    "Negative (more extremely hot days reduce the score)",
    "float",
    "0-1.0",
  ],
  [
    "EXTREMELY_HOT_PCT_CHANGE",
    "Temperature Score",
    "Annual percentage change of the proportion of extremely hot days in a year",
    "Negative (a positive increase reduces the score)",
    "float",
    "-inf-inf",
  ],
  [
    "EXTREMELY_COLD",
    "Temperature Score",
    "Proportion of extremely cold days in a year",
    "Negative (more extremely cold days reduce the score)",
    "float",
    "0-100",
  ],
  [
    "EXTREMELY_COLD_PCT_CHANGE",
    "Temperature Score",
    "Annual percentage change of the proportion of extremely cold days in a year",
    "Negative (a positive increase reduces the score)",
    "float",
    "-inf-inf",
  ],
  [
    "MAX_TEMP_PCT_CHANGE",
    "Temperature Score",
    "Annual percentage change of the maximum temperature recorded in a year",
    "Negative (a positive increase reduces the score)",
    "float",
    "-inf-inf",
  ],
  [
    "PRECIPITATION_MAX_PCT_CHANGE",
    "Temperature Score",
    "Annual percentage change of the maximum amount of precipitation in a year",
    "Negative (a positive increase reduces the score)",
    "float",
    "-inf-inf",
  ],
  [
    "EXTREMELY_WET",
    "Temperature Score",
    "Proportion of extremely wet days in a year",
    "Negative (more extremely wet days reduce the score)",
    "float",
    "0-1.0",
  ],
  [
    "EXTREMELY_WET_PCT_CHANGE",
    "Temperature Score",
    "Annual percentage change of the proportion of extremely wet days in a year",
    "Negative (a positive increase reduces the score)",
    "float",
    "-inf-inf",
  ],
  [
    "EXTREMELY_DRY",
    "Temperature Score",
    "Proportion of extremely dry days in a year",
    "Negative (more extremely dry days reduce the score)",
    "float",
    "0-1.0",
  ],
  [
    "EXTREMELY_DRY_PCT_CHANGE",
    "Temperature Score",
    "Annual percentage change of the proportion of extremely dry days in a year",
    "Negative (a positive increase reduces the score)",
    "float",
    "-inf-inf",
  ],
  [
    "GREEN_PCT",
    "Forest Score",
    "Percentage of green space in a given region",
    "Positive (greater percentage of green space contributes to a higher score)",
    "float",
    "0-100",
  ],
  [
    "GREEN_COVER_GROWTH",
    "Forest Score",
    "Annual growth in the green space",
    "Positive (increase in green cover contributes to a higher score)",
    "float",
    "-inf-inf",
  ],
  [
    "BUILT_PCT",
    "Forest Score",
    "Percentage of built space in a given region",
    "Negative if there’s a decrease in GREEN_COVER_GROWTH, otherwise 0",
    "float",
    "-100-100",
  ],
  [
    "BUILT_COVER_GROWTH",
    "Forest Score",
    "Annual growth in the built space",
    "Negative if there’s a decrease in GREEN_COVER_GROWTH, otherwise 0",
    "float",
    "-inf-inf",
  ],
  // ... add more rows as needed
];

export default function EnvrTable() {
  return (
    <>
      <div className="flex flex-col overflow-hidden">
        <div className="flex bg-gray-100 items-center border border-[#B9B9B9]">
          {envrHeaders.map((header, index) => (
            <div
              key={index}
              className="w-1/6 p-2 border-r border-[#B9B9B9] last:border-r-0 text-center font-bold"
            >
              {header}
            </div>
          ))}
        </div>
        <div className="flex flex-col border-x border-b border-[#B9B9B9]">
          {envrRows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex ">
              {row.map((cell, cellIndex) => (
                <div
                  key={cellIndex}
                  className="w-1/6 p-2 border-r border-b last:border-r-0 border-[#B9B9B9] text-sm text-center break-words"
                >
                  {cell}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// {
//   envrHeaders.map((header, index) => <th key={index}>{header}</th>);
// }

// <th key={1} className="border-r border-black w-1/6">
//               Indicator
//             </th>
//             <th key={2} className="w-1/6 border-r border-black">
//               Component
//             </th>
//             <th key={3} className="w-1/6 border-r border-black">
//               Description
//             </th>
//             <th key={4} className="w-1/6 border-r border-black">
//               Effect on Env Score
//             </th>
//             <th key={5} className="w-1/6 border-r border-black">
//               Data Type
//             </th>
//             <th key={6} className="w-1/6">
//               Range of Values
//             </th>
