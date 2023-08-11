"use client";
import { scatterViewType } from "@/lib/atoms";
import { getProvinceId } from "@/lib/utils";
import { useAtom } from "jotai";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GeoJSON } from "react-leaflet";

// ** note **
// it is important that the top range comes first: this helps the getFeatureFillColor function work
const MAP_COLORS = {
  air: [
    { range: 80, color: "#015B6B" },
    { range: 70, color: "#008DA6" },
    { range: 60, color: "#00A3BF" },
    { range: 50, color: "#00B8D9" },
    { range: 40, color: "#00C7E6" },
    { range: 30, color: "#33D1EC" },
    { range: 20, color: "#66DBF2" },
    { range: 0, color: "#99E5F8" },
  ],
  temp: [
    { range: 80, color: "#980108" },
    { range: 70, color: "#BF000A" },
    { range: 60, color: "#DE0B16" },
    { range: 50, color: "#FF303A" },
    { range: 40, color: "#FF525B" },
    { range: 30, color: "#FF737A" },
    { range: 20, color: "#FFADB1" },
    { range: 0, color: "#FFE6E7" },
  ],
  forest: [
    { range: 80, color: "#D97600" },
    { range: 70, color: "#FF8B00" },
    { range: 60, color: "#FF991F" },
    { range: 50, color: "#FFAB00" },
    { range: 40, color: "#FFC400" },
    { range: 30, color: "#FFD260" },
    { range: 20, color: "#FFE0A0" },
    { range: 0, color: "#FFF0E0" },
  ],
  econ: [
    { color: "#2C245E", range: 80 },
    { color: "#403294", range: 70 },
    { color: "#5243AA", range: 60 },
    { color: "#6554C0", range: 50 },
    { color: "#8777D9", range: 40 },
    { color: "#998DD9", range: 30 },
    { color: "#C0B6F2", range: 20 },
    { color: "#EAE6FF", range: 0 },
  ],
  envr: [
    { color: "#003300", range: 80 },
    { color: "#006600", range: 70 },
    { color: "#009900", range: 60 },
    { color: "#00CC00", range: 50 },
    { color: "#33FF33", range: 40 },
    { color: "#66FF66", range: 30 },
    { color: "#99FF99", range: 20 },
    { color: "#CCFFCC", range: 0 },
  ],
};

const urlToScoreMatching = {
  econ: "ECON_SCORE",
  envr: "ENVR_SCORE",
  air: "AIR_SCORE",
  forest: "FOREST_SCORE",
  temp: "TEMP_SCORE",
};

function getFeatureFillColor(scoreType, scoreValue) {
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
  return "#FFFFFF";
}

export default function MapGeoJsonComponentProvince({
  provinceGeoData,
  districtGeoData,
  gedDataProvince,
  gedDataDistrict,
}) {
  //
  const [currentGeoLayers, setCurrentGeoLayers] = useState(provinceGeoData);
  //
  let hashkey = Math.random();
  //
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  //
  let provinceSelected = params.province;
  let districtSelected = params.district;
  //
  let year = searchParams.get("year");
  let score_one = searchParams.get("score_one");

  //
  // console.log("params?", params);
  // everytime the params change, this component will rerender and re-paint the layers
  //
  // listening for when route has/updates province route
  useEffect(() => {
    // if there is not province selected:: spread default data
    if (!provinceSelected) setCurrentGeoLayers(provinceGeoData);
    //
    if (provinceSelected) {
      // 1) create new copy of province data
      const newData = JSON.parse(JSON.stringify(provinceGeoData));

      // 2) store id of selected province
      const province_id = getProvinceId(gedDataProvince, provinceSelected);
      // 3) find index of selected province in array and remove it from the copy while storing it
      const indexOfProvince = newData[0].features.findIndex(
        (feature) => feature.properties.GID_1 === province_id
      );
      const provinceFeature = newData[0].features.splice(indexOfProvince, 1);
      //
      // 4) collect all districts that belong in selected province
      const geoDistrictsInSelectedProvince = districtGeoData[0].features.filter(
        (feature) => {
          if (feature.properties.GID_1 === province_id) {
            return feature;
          }
        }
      );

      // 5) create new object that contains all province data + districts in province
      // spread the features in a unique way to help with below mentioned
      // ** NB **
      // the order here is very important. Let province layer be just before the selected districts
      // this helps organise the layers for clicks and style them correctly
      const updatedNewData = {
        ...newData[0],
        features: [
          ...newData[0].features,
          provinceFeature[0],
          ...geoDistrictsInSelectedProvince,
        ],
      };
      // 6) set State for GEOJSON component

      setCurrentGeoLayers(updatedNewData);
      return;
    }
  }, [provinceSelected]);
  //
  const style = (feature) => {
    // 1) User clicks province. No district is selected. (there are district features, so exclude them) and stlye the selected province feature only
    if (
      provinceSelected &&
      !districtSelected &&
      decodeURIComponent(provinceSelected) === feature.properties.NAME_1 &&
      !feature.properties.GID_2
    ) {
      return {
        dashArray: "0",
        color: "#F00",
        weight: 4,
        opacity: 1,
        // this province feature does not need fill.. fillOpacity: 0
        fillOpacity: 0,
        fillColor: "#DFDFDF",
      };
    }
    // 2) User clicks province. No district is selected. But you want to style the included districts in the province
    if (provinceSelected && !districtSelected && feature.properties.GID_2) {
      // ** note :: remove this blue styling of included districts in province

      let idOfDistrict = feature.properties.GID_2;
      let districtDataForYear = gedDataDistrict.find(
        (district) =>
          district.DISTRICT_ID.toString() === idOfDistrict.toString() &&
          Number(district.YEAR) === Number(year)
      );
      let score_value = districtDataForYear[urlToScoreMatching[score_one]];

      return {
        dashArray: "3",
        color: "#000",
        weight: 2,
        opacity: 0.3,
        //
        fillOpacity: 1,
        // fill color depends on : 1) current score_one 2) features score_one value
        // fillColor: "#DFDFDF",
        fillColor: getFeatureFillColor(score_one, score_value),
      };
    }
    // 3) User clicks district. Province is true, district is true. Match district to feature
    if (
      provinceSelected &&
      districtSelected &&
      decodeURIComponent(districtSelected) === feature.properties.NAME_2
    ) {
      let idOfDistrict = feature.properties.GID_2;
      let districtDataForYear = gedDataDistrict.find(
        (district) =>
          district.DISTRICT_ID.toString() === idOfDistrict.toString() &&
          Number(district.YEAR) === Number(year)
      );
      let score_value = districtDataForYear[urlToScoreMatching[score_one]];
      return {
        dashArray: "0",
        color: "#F00",
        weight: 4,
        opacity: 1,
        // ++ this is where layer score fill will come in with searchParams
        fillOpacity: 0.7,
        fillColor: getFeatureFillColor(score_one, score_value),
      };
    }
    // 3.1) User clicks district. Province is true, district is true. Style the other districts in province
    if (
      provinceSelected &&
      districtSelected &&
      decodeURIComponent(provinceSelected) === feature.properties.NAME_1 &&
      feature.properties.GID_2
    ) {
      let idOfDistrict = feature.properties.GID_2;
      let districtDataForYear = gedDataDistrict.find(
        (district) =>
          district.DISTRICT_ID.toString() === idOfDistrict.toString() &&
          Number(district.YEAR) === Number(year)
      );
      let score_value = districtDataForYear[urlToScoreMatching[score_one]];
      return {
        dashArray: "3",
        color: "#000",
        weight: 2,
        opacity: 0.3,
        //
        fillOpacity: 1,
        // fill color depends on : 1) current score_one 2) features score_one value
        // fillColor: "#DFDFDF",
        fillColor: getFeatureFillColor(score_one, score_value),
      };
    }
    // 4) Catch all the other province features and give default styling
    let idOfProvince = feature.properties.GID_1;
    let provinceDataForYear = gedDataProvince.find(
      (province) =>
        province.PROVINCE_ID.toString() === idOfProvince.toString() &&
        Number(province.YEAR) === Number(year)
    );
    let score_value = provinceDataForYear[urlToScoreMatching[score_one]];
    return {
      dashArray: "0",
      color: "#666",
      weight: 1,
      opacity: 0.3,
      // ++ this is where layer score fill will come in with searchParams
      fillOpacity: 0.7,
      fillColor: getFeatureFillColor(score_one, score_value),
    };
  };
  const handleLayerClick = (e) => {
    // GID_1 is province ID
    // GID_2 is district ID
    // console.log("***handleLayerClick*** : event :", e);
    const country = e.target.feature.properties.COUNTRY.toLowerCase();
    const province = e.target.feature.properties.NAME_1;
    const district = e.target.feature.properties.NAME_2;
    // //
    const year = searchParams.get("year");
    const score_one = searchParams.get("score_one");
    const score_two = searchParams.get("score_two");

    // 1) User clicks a province feature
    if (!e.target.feature.properties.GID_2) {
      router.push(
        `/dashboard/${country}/${province}?year=${year}&score_one=${score_one}&score_two=${score_two}`
      );
    }
    // 2) User clicks a district
    if (e.target.feature.properties.GID_2) {
      router.push(
        `/dashboard/${country}/${province}/${district}?year=${year}&score_one=${score_one}&score_two=${score_two}`
      );
    }
  };
  function onEachFeature(feature, layer) {
    layer.on({
      // mouseover: highlightFeature,
      // mouseout: resetHighlight,
      click: handleLayerClick,
    });
  }
  return (
    <GeoJSON
      // adding hashkey here just instanciates another GeoJSON component, ie does not render another map
      key={hashkey}
      style={style}
      data={currentGeoLayers}
      onEachFeature={onEachFeature}
    />
  );
}
