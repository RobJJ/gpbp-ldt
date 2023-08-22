const schemaHeaders = [
  "Indicator",
  "Description",
  "Data Type",
  "Range of Values",
  "Admin Level",
  "Full / Reduced",
];

const schemaRows = [
  [
    "PROVINCE",
    "Official name of given Province or Administrative level 1",
    "str",
    "N/A (depends on  chosen country)",
    "Both",
    "Both",
  ],
  [
    "PROVINCE_ID",
    "Administrative level 1 ID",
    "str",
    "N/A (depends on  chosen country)",
    "Both",
    "Both",
  ],
  [
    "DISTRICT",
    "Official name of given District or Administrative level 2",
    "str",
    "N/A (depends on  chosen country)",
    "2",
    "Both",
  ],
  [
    "DISTRICT_ID",
    "Administrative level 2 ID",
    "str",
    "N/A (depends on  chosen country)",
    "2",
    "Both",
  ],
  ["YEAR", "Year", "int", "2019-2022", "Both", "Both"],
  [
    "GOOD",
    "Percentage of number of days of air quality deemed “Good” in the given year",
    "float",
    "0-1.0",
    "Both",
    "Full",
  ],
  [
    "SATISFACTORY",
    "Percentage of number of days of air quality deemed “Satisfactory” in the given year",
    "float",
    "0-1.0",
    "Both",
    "Full",
  ],
  [
    "MODERATE",
    "Percentage of number of days of air quality deemed “Moderate” in the given year",
    "float",
    "0-1.0",
    "Both",
    "Full",
  ],
  [
    "POOR",
    "Percentage of number of days of air quality deemed “Poor” in the given year",
    "float",
    "0-1.0",
    "Both",
    "Full",
  ],
  [
    "VERY POOR",
    "Percentage of number of days of air quality deemed “Very Poor” in the given year",
    "float",
    "0-1.0",
    "Both",
    "Full",
  ],
  [
    "PM25_PCT_CHANGE",
    "Annual percentage change of the given region’s PM2.5",
    "float",
    "-inf-inf",
    "Both",
    "Full",
  ],
  [
    "NO2_PCT_CHANGE",
    "Annual percentage change of the given region’s NO2",
    "float",
    "-inf-inf",
    "Both",
    "Full",
  ],
  [
    "SO2_PCT_CHANGE",
    "Annual percentage change of the given region’s SO2",
    "float",
    "-inf-inf",
    "Both",
    "Full",
  ],
  [
    "CO_PCT_CHANGE",
    "Annual percentage change of the given region’s CO",
    "float",
    "-inf-inf",
    "Both",
    "Full",
  ],
  [
    "O3_PCT_CHANGE",
    "Annual percentage change of the given region’s O3",
    "float",
    "-inf-inf",
    "Both",
    "Full",
  ],
  [
    "EXTREMELY_HOT",
    "Proportion of extremely hot days in a year",
    "float",
    "0-1.0",
    "Both",
    "Full",
  ],
  [
    "EXTREMELY_HOT_PCT_CHANGE",
    "Annual percentage change of the proportion of extremely hot days in a year",
    "float",
    "-inf-inf",
    "Both",
    "Full",
  ],
  [
    "EXTREMELY_COLD",
    "Proportion of extremely cold days in a year",
    "float",
    "0-100",
    "Both",
    "Full",
  ],
  [
    "EXTREMELY_COLD_PCT_CHANGE",
    "Annual percentage change of the proportion of extremely cold days in a year",
    "float",
    "-inf-inf",
    "Both",
    "Full",
  ],
  [
    "MAX_TEMP_PCT_CHANGE",
    "Annual percentage change of the maximum temperature recorded in a year",
    "float",
    "-inf-inf",
    "Both",
    "Full",
  ],
  [
    "PRECIPITATION_MAX_PCT_CHANGE",
    "Annual percentage change of the maximum amount of precipitation in a year",
    "float",
    "-inf-inf",
    "Both",
    "Full",
  ],
  [
    "EXTREMELY_WET",
    "Proportion of extremely wet days in a year",
    "float",
    "0-1.0",
    "Both",
    "Full",
  ],
  [
    "EXTREMELY_WET_PCT_CHANGE",
    "Annual percentage change of the proportion of extremely wet days in a year",
    "float",
    "-inf-inf",
    "Both",
    "Full",
  ],
  [
    "EXTREMELY_DRY",
    "Proportion of extremely dry days in a year",
    "float",
    "0-1.0",
    "Both",
    "Full",
  ],
  [
    "EXTREMELY_DRY_PCT_CHANGE",
    "Annual percentage change of the proportion of extremely dry days in a year",
    "float",
    "-inf-inf",
    "Both",
    "Full",
  ],
  [
    "GREEN_PCT",
    "Percentage of green space in a given region",
    "float",
    "0-100",
    "Both",
    "Full",
  ],
  [
    "GREEN_COVER_GROWTH",
    "Annual growth in the green space",
    "float",
    "-inf-inf",
    "Both",
    "Full",
  ],
  [
    "BUILT_PCT",
    "Percentage of built space in a given region",
    "float",
    "-100-100",
    "Both",
    "Full",
  ],
  [
    "BUILT_COVER_GROWTH",
    "Annual growth in the built space",
    "float",
    "-inf-inf",
    "Both",
    "Full",
  ],
  [
    "AIR_SCORE",
    "Composite Score of Air Quality indicators",
    "float",
    "0-100",
    "Both",
    "Both",
  ],
  [
    "FOREST_SCORE",
    "Composite score of deforestation indicators",
    "float",
    "0-100",
    "Both",
    "Both",
  ],
  [
    "TEMP_SCORE",
    "Composite score of weather/temperature indicators",
    "float",
    "0-100",
    "Both",
    "Both",
  ],
  [
    "ENVR_SCORE",
    "Composite score of AIR_SCORE, TEMP_SCORE, and FOREST_SCORE",
    "float",
    "0-100",
    "Both",
    "Both",
  ],
  [
    "LUMINOSITY",
    "Sum of nighttime luminosity of the region",
    "float",
    "0-inf",
    "Both",
    "Full",
  ],
  [
    "POPULATION",
    "Sum of the region’s population",
    "int",
    "0-inf",
    "Both",
    "Full",
  ],
  ["LPC", "luminosity per capita", "float", ">0", "Both", "Full"],
  [
    "LPC_PCT_CHANGE",
    "Annual percentage change of the luminosity per capita",
    "float",
    "-inf-inf",
    "Both",
    "Full",
  ],
  ["ECON_SCORE", "Economic Score", "float", "0-100", "Both", "Both"],
  ["ECON_LPC_STD", "z-score of LPC", "float", "-inf-inf", "Both", "Both"],
  [
    "ECON_LPC_PCT_CHANGE_STD",
    "z-score of LPC_CHANGE_STD",
    "float",
    "-inf-inf",
    "Both",
    "Both",
  ],
  [
    "AIR_PM25_SUBINDEX_STD",
    "z-score of PM25_SUBINDEX",
    "float",
    "-inf-inf",
    "Both",
    "Both",
  ],
  [
    "AIR_NO2_SUBINDEX_STD",
    "z-score of NO2_SUBINDEX",
    "float",
    "-inf-inf",
    "Both",
    "Both",
  ],
  [
    "AIR_CO_SUBINDEX_STD",
    "z-score of CO_SUBINDEX",
    "float",
    "-inf-inf",
    "Both",
    "Both",
  ],
  [
    "AIR_SO2_SUBINDEX_STD",
    "z-score of SO2_SUBINDEX",
    "float",
    "-inf-inf",
    "Both",
    "Both",
  ],
  [
    "AIR_O3_SUBINDEX_STD",
    "z-score of O3_SUBINDEX",
    "float",
    "-inf-inf",
    "Both",
    "Both",
  ],
  [
    "TEMP_EXTREMELY_HOT_STD",
    "z-score of EXTREMELY_HOT",
    "float",
    "-inf-inf",
    "Both",
    "Both",
  ],
  [
    "TEMP_EXTREMELY_COLD_STD",
    "z-score of EXTREMELY_COLD",
    "float",
    "-inf-inf",
    "Both",
    "Both",
  ],
  [
    "TEMP_MAX_TEMP_STD",
    "z-score of MAX_TEMP",
    "float",
    "-inf-inf",
    "Both",
    "Both",
  ],
  [
    "TEMP_PRECIPITATION_MAX_STD",
    "z-score of PRECIPITATION_MAX",
    "float",
    "-inf-inf",
    "Both",
    "Both",
  ],
  [
    "TEMP_EXTREMELY_WET_STD",
    "z-score of EXTREMELY_WET",
    "float",
    "-inf-inf",
    "Both",
    "Both",
  ],
  [
    "TEMP_EXTREMELY_DRY_STD",
    "z-score of EXTREMELY_DRY",
    "float",
    "-inf-inf",
    "Both",
    "Both",
  ],
  [
    "FOREST_GREEN_PCT_STD",
    "z-score of GREEN_PCT",
    "float",
    "-inf-inf",
    "Both",
    "Both",
  ],
  [
    "FOREST_GREEN_COVER_GROWTH_STD",
    "z-score of GREEN_COVER_GROWTH",
    "float",
    "-inf-inf",
    "Both",
    "Both",
  ],
  [
    "ECON_BUILT_PCT_STD",
    "z-score of BUILT_PCT_STD",
    "float",
    "-inf-inf",
    "Both",
    "Both",
  ],
  [
    "ECON_BUILT_COVER_GROWTH_STD",
    "z-score of BUILT_COVER_GROWTH",
    "float",
    "-inf-inf",
    "Both",
    "Both",
  ],

  // add more rows here...
];

export default function SchemaTable() {
  return (
    <>
      <div className="flex flex-col overflow-hidden">
        <div className="flex bg-gray-100 items-center border border-[#B9B9B9]">
          {schemaHeaders.map((header, index) => (
            <div
              key={index}
              className="w-1/6 p-2 border-r border-[#B9B9B9] last:border-r-0 text-center font-bold"
            >
              {header}
            </div>
          ))}
        </div>
        <div className="flex flex-col border-x border-b border-[#B9B9B9]">
          {schemaRows.map((row, rowIndex) => (
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
