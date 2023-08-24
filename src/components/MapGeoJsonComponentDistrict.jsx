"use client";

import { MAP_COLORS, urlToScoreMatching } from "@/lib/map";
import { getProvinceId } from "@/lib/utils";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GeoJSON } from "react-leaflet";

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
  return "#000";
}

export default function MapGeoJsonComponentDistrict({
  provinceGeoData,
  districtGeoData,
  gedDataProvince,
  gedDataDistrict,
}) {
  const [currentGeoLayers, setCurrentGeoLayers] = useState(districtGeoData);
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
  // ** note ** : for development this afternoon
  // create a useEffect that respond to provinceSelected
  // this useEffect should listen to what province is selected and add that feature to the features array... this will allow me to target the feature and style it. Our goal here is to highlite the province when only province is selected. The style function will process this on change and dynamically update accordingly
  //
  useEffect(() => {
    // if there is not province selected:: spread default data
    if (!provinceSelected) setCurrentGeoLayers(districtGeoData);
    //
    // if province changes at all - we want to add the supported province in the current layers
    if (provinceSelected) {
      const newData = JSON.parse(JSON.stringify(provinceGeoData));
      const province_id = getProvinceId(gedDataProvince, provinceSelected);
      const indexOfProvince = newData[0].features.findIndex(
        (feature) => feature.properties.GID_1 === province_id
      );
      // below is the province feature
      const provinceFeature = newData[0].features.splice(indexOfProvince, 1);
      //
      const newCopyOfDistricts = JSON.parse(JSON.stringify(districtGeoData));
      // cut out districts of that province for sorting purposes
      const districtsInProvince = districtGeoData[0].features.filter(
        (feature) => {
          if (feature.properties.GID_1 === province_id) {
            return feature;
          }
        }
      );
      const districtsNotInProvince = districtGeoData[0].features.filter(
        (feature) => {
          if (feature.properties.GID_1 !== province_id) {
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
        ...newCopyOfDistricts[0],
        features: [
          ...districtsNotInProvince,
          provinceFeature[0],
          ...districtsInProvince,
        ],
      };
      // 6) set State for GEOJSON component

      setCurrentGeoLayers(updatedNewData);
      return;
    }
  }, [provinceSelected]);
  //
  const style = (feature) => {
    // 1) District selected. Feature matches selection
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
        // need add a color matching function and pass in the score of the feature E8E8E8
        dashArray: "1",
        color: "#F00",
        weight: 3,
        opacity: 1,
        fillOpacity: 1,
        fillColor: getFeatureFillColor(score_one, score_value),
      };
    }
    // ** ** ** ** ** ** **
    // 2) User navigates to Province view - give border to all districts in that province
    // if (
    //   provinceSelected &&
    //   !districtSelected &&
    //   decodeURIComponent(provinceSelected) === feature.properties.NAME_1
    // ) {
    //   return {
    //     // need add a color matching function and pass in the score of the feature E8E8E8
    //     dashArray: "1",
    //     color: "#0000FF",
    //     weight: 4,
    //     opacity: 1,
    //     fillColor: "#DFDFDF",
    //     fillOpacity: 0.7,
    //   };
    // }
    // ** ** ** ** ** ** **
    // ** ** ** ** ** ** **
    // 2) User navigates to Province view - give the province feature the border
    if (
      provinceSelected &&
      !districtSelected &&
      decodeURIComponent(provinceSelected) === feature.properties.NAME_1 &&
      !feature.properties.GID_2
    ) {
      // console.log("condition triggered!");
      return {
        // need add a color matching function and pass in the score of the feature E8E8E8
        dashArray: "1",
        color: "#F00",
        weight: 6,
        opacity: 1,
        fillColor: "#DFDFDF",
        fillOpacity: 0,
      };
    }
    // 2.1) User navigates to district view,, but province is still there! style the province feature sitting under
    if (
      provinceSelected &&
      districtSelected &&
      decodeURIComponent(provinceSelected) === feature.properties.NAME_1 &&
      !feature.properties.GID_2
    ) {
      return {
        // need add a color matching function and pass in the score of the feature E8E8E8
        dashArray: "1",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillColor: "#DFDFDF",
        fillOpacity: 0,
      };
    }
    // 3) User navigates to district but district is not selected, style the other district features
    if (
      provinceSelected &&
      districtSelected &&
      decodeURIComponent(districtSelected) === !feature.properties.NAME_2 &&
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
        // need add a color matching function and pass in the score of the feature E8E8E8
        dashArray: "0",
        color: "#000",
        opacity: 0.5,
        weight: 0.7,
        fillOpacity: "1",
        fillColor: getFeatureFillColor(score_one, score_value),
      };
    }
    // 4) Catch all remaining districts
    if (feature.properties.GID_2) {
      let idOfDistrict = feature.properties.GID_2;
      let districtDataForYear = gedDataDistrict.find(
        (district) =>
          district.DISTRICT_ID.toString() === idOfDistrict.toString() &&
          Number(district.YEAR) === Number(year)
      );
      let score_value = districtDataForYear[urlToScoreMatching[score_one]];
      return {
        // need add a color matching function and pass in the score of the feature E8E8E8
        dashArray: "0",
        color: "#000",
        opacity: 0.5,
        weight: 0.7,
        fillOpacity: "1",
        fillColor: getFeatureFillColor(score_one, score_value),
      };
    }
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
    //
    // 1) User clicks a district
    if (e.target.feature.properties.GID_2) {
      router.push(
        `/dashboard/${country}/${province}/${district}?year=${year}&score_one=${score_one}&score_two=${score_two}`
      );
    }
    // //
    // // GID_2 is not true means this layerClick is a province
    // if (!e.target.feature.properties.GID_2) {
    //   router.push(
    //     `/dashboard/${country}/${province}?year=${year}&score_one=${score_one}&score_two=${score_two}`
    //   );
    // } else {

    // }
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
