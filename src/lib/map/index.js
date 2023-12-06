// COLOR SCHEMA
// Its important to note that range is decending order - this is for the function to determine range
export const MAP_COLORS = {
  forest: [
    { range: 80, color: "#015B6B" },
    { range: 70, color: "#008DA6" },
    { range: 60, color: "#00A3BF" },
    { range: 50, color: "#00B8D9" },
    { range: 40, color: "#00C7E6" },
    { range: 30, color: "#5BD4E7" },
    { range: 20, color: "#A5EFFA" },
    { range: 0, color: "#E6FCFF" },
  ],
  temp: [
    { range: 80, color: "#995300" },
    { range: 70, color: "#FF8B00" },
    { range: 60, color: "#FF991F" },
    { range: 50, color: "#FFAB00" },
    { range: 40, color: "#FFC400" },
    { range: 30, color: "#FFE380" },
    { range: 20, color: "#FFF0B3" },
    { range: 0, color: "#FFFAE6" },
  ],
  air: [
    { range: 80, color: "#06347A" },
    { range: 70, color: "#0747A6" },
    { range: 60, color: "#0052CC" },
    { range: 50, color: "#0065FF" },
    { range: 40, color: "#2684FF" },
    { range: 30, color: "#4C9AFF" },
    { range: 20, color: "#B3D4FF" },
    { range: 0, color: "#DEEBFF" },
  ],
  econ: [
    { color: "#4C223E", range: 80 },
    { color: "#72335D", range: 70 },
    { color: "#914176", range: 60 },
    { color: "#BF569C", range: 50 },
    { color: "#CE7EB3", range: 40 },
    { color: "#E2B4D3", range: 30 },
    { color: "#F2DDEB", range: 20 },
    { color: "#F9F1F7", range: 0 },
  ],
  envr: [
    { color: "#003300", range: 80 },
    { color: "#006644", range: 70 },
    { color: "#00875A", range: 60 },
    { color: "#36B37E", range: 50 },
    { color: "#57D9A3", range: 40 },
    { color: "#79F2C0", range: 30 },
    { color: "#ABF5D1", range: 20 },
    { color: "#E3FCEF", range: 0 },
  ],
};

//
export const urlToScoreMatching = {
  econ: "ECON_SCORE",
  envr: "ENVR_SCORE",
  air: "AIR_SCORE",
  forest: "FOREST_SCORE",
  temp: "TEMP_SCORE",
};

export function createPopupContent(properties) {
  // order is important here the way the conditionals work at the moment
  if (properties.NAME_2) {
    return `<font size="3"><b>District</b></font></br>${properties.NAME_2}<br>`;
  }
  if (properties.NAME_1) {
    return `<font size="3"><b>Province</b></font></br>${properties.NAME_1}<br>`;
  }
}
//
//
// Utility function written to handle map-fill-color logic
//
export function getFeatureFillColor(scoreType, scoreValue) {
  const mapColors = MAP_COLORS[scoreType];

  if (!mapColors) {
    console.error("Invalid scoreType provided:", scoreType);
    return "#FFFFFF"; // default color for invalid scoreType
  }

  for (let item of mapColors) {
    if (scoreValue >= item.range) {
      return item.color;
    }
  }

  // This should never be reached if scoreValue is between 0 and 100,
  // but we include it for safety.
  return "#000";
}
