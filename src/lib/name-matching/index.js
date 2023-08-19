export const urlToLableMatching = {
  econ: "Economic",
  envr: "Environmental",
  air: "Air Quality",
  forest: "Green Space",
  temp: "Extreme Weather",
};

export const tabToLabel = {
  Overview: "Scores",
  Environmental: "Scores",
  Economic: "Std deviations from yearly average",
  AirQuality: "Std deviations from yearly average",
  ExtremeWeather: "Std deviations from yearly average",
  GreenSpace: "Std deviations from yearly average",
};

// Match data property from GED-DATA --> lable name
export const scoreTypeToName = {
  ECON_SCORE: "Economic",
  ENVR_SCORE: "Environmental",
  AIR_SCORE: "Air Quality",
  FOREST_SCORE: "Deforestation",
  TEMP_SCORE: "Extreme Temp",
  ECON_LPC_STD: "LPC",
  ECON_LPC_PCT_CHANGE_STD: "LPC pct change",
  ECON_BUILT_PCT_STD: "Built LPC pct",
  ECON_BUILT_COVER_GROWTH_STD: "Build cover growth",
  AIR_PM25_SUBINDEX_STD: "PM25",
  AIR_NO2_SUBINDEX_STD: "NO2",
  AIR_CO_SUBINDEX_STD: "CO",
  AIR_SO2_SUBINDEX_STD: "SO2",
  AIR_O3_SUBINDEX_STD: "O3",
  TEMP_EXTREMELY_HOT_STD: "Extreme hot",
  TEMP_EXTREMELY_COLD_STD: "Extreme cold",
  TEMP_MAX_TEMP_STD: "Max temp",
  TEMP_PRECIPITATION_MAX_STD: "Precipitation max",
  TEMP_EXTREMELY_WET_STD: "Extreme wet",
  TEMP_EXTREMELY_DRY_STD: "Extreme dry",
  FOREST_GREEN_PCT_STD: "PCT",
  FOREST_GREEN_COVER_GROWTH_STD: "Cover growth",
};

// For each Tab selected -> what are the required data fields to show
export const tabToScoreType = {
  Overview: ["ECON_SCORE", "ENVR_SCORE"],
  Environmental: ["AIR_SCORE", "FOREST_SCORE", "TEMP_SCORE"],
  Economic: [
    "ECON_LPC_STD",
    "ECON_LPC_PCT_CHANGE_STD",
    "ECON_BUILT_PCT_STD",
    "ECON_BUILT_COVER_GROWTH_STD",
  ],
  AirQuality: [
    "AIR_PM25_SUBINDEX_STD",
    "AIR_NO2_SUBINDEX_STD",
    "AIR_CO_SUBINDEX_STD",
    "AIR_SO2_SUBINDEX_STD",
    "AIR_O3_SUBINDEX_STD",
  ],
  ExtremeWeather: [
    "TEMP_EXTREMELY_HOT_STD",
    "TEMP_EXTREMELY_COLD_STD",
    "TEMP_MAX_TEMP_STD",
    "TEMP_PRECIPITATION_MAX_STD",
    "TEMP_EXTREMELY_WET_STD",
    "TEMP_EXTREMELY_DRY_STD",
  ],
  GreenSpace: ["FOREST_GREEN_PCT_STD", "FOREST_GREEN_COVER_GROWTH_STD"],
};
