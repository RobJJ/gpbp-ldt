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

export default function MapGeoJsonComponentProvince({
  provinceGeoData,
  districtGeoData,
  gedDataProvince,
  gedDataDistrict,
  country,
}) {
  //

  const [currentGeoLayers, setCurrentGeoLayers] = useState(provinceGeoData[0]);
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
    console.log("use effect");

    if (!provinceSelected) setCurrentGeoLayers(provinceGeoData[0]);
    //
    const newData = JSON.parse(JSON.stringify(provinceGeoData));
    //
    const province_id = getProvinceId(gedDataProvince, provinceSelected);
    //
    const indexOfProvince = newData[0].features.findIndex(
      (feature) => feature.properties.GID_1 === province_id
    );
    //
    const provinceFeature = newData[0].features.slice(
      indexOfProvince,
      indexOfProvince + 1
    );
    //
    if (provinceSelected && !districtSelected) {
      const geoDistrictsInSelectedProvince = districtGeoData[0].features.filter(
        (feature) => {
          if (feature.properties.GID_1 === province_id) {
            return feature;
          }
        }
      );
      // ** NB **
      // Ordering for map layering
      const updatedNewData = {
        ...newData[0],
        features: [
          ...newData[0].features,
          provinceFeature[0],
          ...geoDistrictsInSelectedProvince,
        ],
      };
      //
      setCurrentGeoLayers(updatedNewData);
      return;
    }
    // else
    if (provinceSelected && districtSelected) {
      //
      const district_id = getDistrictId(gedDataDistrict, districtSelected);
      //
      const geoDistrictsInSelectedProvince = districtGeoData[0].features.filter(
        (feature) => {
          if (feature.properties.GID_1 === province_id) {
            return feature;
          }
        }
      );
      //
      const indexOfDistrict = geoDistrictsInSelectedProvince.findIndex(
        (feature) => feature.properties.GID_2 === district_id
      );
      //
      const districtFeature = geoDistrictsInSelectedProvince.splice(
        indexOfDistrict,
        1
      );
      // ** NB **
      // Ordering for map laying
      const updatedNewData = {
        ...newData[0],
        features: [
          ...newData[0].features,
          provinceFeature[0],
          ...geoDistrictsInSelectedProvince,
          districtFeature[0],
        ],
      };
      //
      setCurrentGeoLayers(updatedNewData);
      return;
    }
  }, [provinceSelected, districtSelected]);
  //
  const style = (feature) => {
    // 1) User clicks province. No district is selected. (there are district features, so exclude them) and style the selected province feature only
    if (
      provinceSelected &&
      !districtSelected &&
      decodeURIComponent(provinceSelected) === feature.properties.NAME_1 &&
      !feature.properties.GID_2
    ) {
      return {
        dashArray: "0",
        color: "#F00",
        weight: 6,
        opacity: 1,
        fillOpacity: 0,
        fillColor: "#DFDFDF",
      };
    }
    // 2) User clicks province. No district is selected. But you want to style the included districts in the province
    if (provinceSelected && !districtSelected && feature.properties.GID_2) {
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
        weight: 1,
        opacity: 1,
        fillOpacity: 1,
        fillColor: getFeatureFillColor(score_one, score_value),
      };
    }
    // 3) User clicks district. Province is true, district is true. Style this chosen district layer
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
        weight: 3,
        opacity: 1,
        fillOpacity: 1,
        fillColor: getFeatureFillColor(score_one, score_value),
      };
    }
    // 3.1) User clicks district. Province is true, district is true. **Style the other districts in province**
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
        dashArray: "0",
        color: "#FFF",
        weight: 1,
        opacity: 1,
        fillOpacity: 1,
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
      color: "#FFF",
      weight: 1,
      opacity: 0.5,
      // ++ this is where layer score fill will come in with searchParams
      fillOpacity: 1,
      fillColor: getFeatureFillColor(score_one, score_value),
    };
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
  //
  //
  const handleHoverOver = (e) => {
    // identify layer
    const layer = e.target;
    // POPUP
    // customise the popup
    let options = {
      offset: L.point(10, 0),
      sticky: true,
    };

    let content = createPopupContent(layer.feature.properties, country);
    layer.bindTooltip(content, options).openTooltip();
  };

  // const handleMouseMove = (e) => {
  //   const layer = e.target;
  //   layer.getPopup().setLatLng(e.latlng).openOn(layer._map);
  // };

  // const handleMouseOut = (e) => {
  //   const layer = e.target;
  //   // layer.closePopup(); // closes the popup when mouse is out of the feature
  //   // layer.setStyle({
  //   //   dashArray: "0",
  //   //   color: "#666",
  //   //   weight: 1,
  //   //   opacity: 0.3,
  //   // });
  // };

  function onEachFeature(feature, layer) {
    layer.on({
      mouseover: handleHoverOver,
      // mousemove: handleMouseMove,
      // mouseout: handleMouseOut,
      click: handleLayerClick,
    });
  }
  return (
    <>
      <GeoJSON
        // hash to instantiate geojson and not map instance
        key={hashkey}
        style={style}
        data={currentGeoLayers}
        onEachFeature={onEachFeature}
      />
      <MapColorLegend />
    </>
  );
}
