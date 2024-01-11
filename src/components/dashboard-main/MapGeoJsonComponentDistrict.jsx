"use client";

import {
  urlToScoreMatching,
  createPopupContent,
  getFeatureFillColor,
} from "@/lib/map";
import { getDistrictId, getProvinceId } from "@/lib/utils";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GeoJSON } from "react-leaflet";
import { v4 as uuidv4 } from "uuid";
import MapColorLegend from "./MapColorLegend";

export default function MapGeoJsonComponentDistrict({
  provinceGeoData,
  districtGeoData,
  gedDataProvince,
  gedDataDistrict,
  country,
}) {
  const [currentGeoLayers, setCurrentGeoLayers] = useState(districtGeoData);
  //
  let hashkey = uuidv4();
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
  useEffect(() => {
    if (!provinceSelected) setCurrentGeoLayers(districtGeoData);
    //
    if (provinceSelected && !districtSelected) {
      const newData = JSON.parse(JSON.stringify(provinceGeoData));
      const province_id = getProvinceId(gedDataProvince, provinceSelected);
      const indexOfProvince = newData[0].features.findIndex(
        (feature) => feature.properties.GID_1 === province_id
      );
      //
      const provinceFeature = newData[0].features.splice(indexOfProvince, 1);
      //
      const newCopyOfDistricts = JSON.parse(JSON.stringify(districtGeoData));
      //
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
      // Ordering
      const updatedNewData = {
        ...newCopyOfDistricts[0],
        features: [
          ...districtsNotInProvince,
          provinceFeature[0],
          ...districtsInProvince,
        ],
      };

      setCurrentGeoLayers(updatedNewData);
      return;
    }
    //
    if (provinceSelected && districtSelected) {
      //
      const newCopyOfDistricts = JSON.parse(JSON.stringify(districtGeoData));
      const district_id = getDistrictId(gedDataDistrict, districtSelected);
      //
      const indexOfDistrict = newCopyOfDistricts[0].features.findIndex(
        (feature) => feature.properties.GID_2 === district_id
      );
      //
      const districtFeature = newCopyOfDistricts[0].features.splice(
        indexOfDistrict,
        1
      );
      //
      const updatedNewData = {
        ...newCopyOfDistricts[0],
        features: [...newCopyOfDistricts[0].features, districtFeature[0]],
      };
      setCurrentGeoLayers(updatedNewData);
      return;
    }
  }, [provinceSelected, districtSelected]);
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
        dashArray: "1",
        color: "#F00",
        weight: 3,
        opacity: 1,
        fillOpacity: 1,
        fillColor: getFeatureFillColor(score_one, score_value),
      };
    }
    //
    // 2) User navigates to Province view - give the province feature the border
    if (
      provinceSelected &&
      !districtSelected &&
      decodeURIComponent(provinceSelected) === feature.properties.NAME_1 &&
      !feature.properties.GID_2
    ) {
      return {
        dashArray: "1",
        color: "#F00",
        weight: 6,
        opacity: 1,
        fillColor: "#DFDFDF",
        fillOpacity: 0,
      };
    }
    if (
      provinceSelected &&
      districtSelected &&
      decodeURIComponent(provinceSelected) === feature.properties.NAME_1 &&
      !feature.properties.GID_2
    ) {
      return {
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
        dashArray: "0",
        color: "#FFF",
        opacity: 1,
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
        dashArray: "0",
        color: "#FFF",
        opacity: 1,
        weight: 0.7,
        fillOpacity: "1",
        fillColor: getFeatureFillColor(score_one, score_value),
      };
    }
  };
  //
  //
  const handleLayerClick = (e) => {
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
  };
  //
  //
  const handleHoverOver = (e) => {
    const layer = e.target;
    // POPUP
    let options = {
      offset: L.point(10, 0),
      sticky: true,
    };

    let content = createPopupContent(layer.feature.properties, country);

    layer.bindTooltip(content, options).openTooltip();
  };
  //
  //
  function onEachFeature(feature, layer) {
    layer.on({
      mouseover: handleHoverOver,
      // mouseout: resetHighlight,
      click: handleLayerClick,
    });
  }
  return (
    <>
      <GeoJSON
        key={hashkey}
        style={style}
        data={currentGeoLayers}
        onEachFeature={onEachFeature}
      />
      <MapColorLegend />
    </>
  );
}
