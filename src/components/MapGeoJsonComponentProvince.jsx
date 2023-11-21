"use client";
import {
  MAP_COLORS,
  urlToScoreMatching,
  createPopupContent,
  getFeatureFillColor,
} from "@/lib/map";
import { getDistrictId, getProvinceId } from "@/lib/utils";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GeoJSON } from "react-leaflet";
import { v4 as uuidv4 } from "uuid";

// function getFeatureFillColor(scoreType, scoreValue) {
//   const mapColors = MAP_COLORS[scoreType];

//   if (!mapColors) {
//     console.error("Invalid scoreType provided:", scoreType);
//     return "#FFFFFF"; // default color for invalid scoreType
//   }

//   for (let item of mapColors) {
//     if (scoreValue >= item.range) {
//       return item.color;
//     }
//   }

//   // This should never be reached if scoreValue is between 0 and 100,
//   // but we include it for safety.
//   return "#000";
// }

export default function MapGeoJsonComponentProvince({
  provinceGeoData,
  districtGeoData,
  gedDataProvince,
  gedDataDistrict,
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
  // listening for when route has/updates province route
  // ** note **
  // this whole useEffect is essentially a tile order formatter. Helps with styling and UI.
  useEffect(() => {
    console.log("use effect");
    // user goes back to country view. set layers to provinces only
    if (!provinceSelected) setCurrentGeoLayers(provinceGeoData[0]);
    //
    // a province or a district has changed. What layers are available... which are active
    //
    // shared values
    // 1) create new copy of province data
    const newData = JSON.parse(JSON.stringify(provinceGeoData));
    // 2) store id of selected province
    const province_id = getProvinceId(gedDataProvince, provinceSelected);
    // 3) find index of selected province in array and remove it from the copy while storing it
    const indexOfProvince = newData[0].features.findIndex(
      (feature) => feature.properties.GID_1 === province_id
    );
    const provinceFeature = newData[0].features.slice(
      indexOfProvince,
      indexOfProvince + 1
    );
    //
    //
    if (provinceSelected && !districtSelected) {
      // note :: this is deep clone approach
      console.log("province is changing");

      //
      // 4) collect all districts that belong in selected province
      const geoDistrictsInSelectedProvince = districtGeoData[0].features.filter(
        (feature) => {
          if (feature.properties.GID_1 === province_id) {
            return feature;
          }
        }
      );
      console.log(
        "geoDistrictsInSelectedProvince ::",
        geoDistrictsInSelectedProvince
      );
      //
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

      setCurrentGeoLayers(updatedNewData);
      return;
    }
    //
    // *******
    //
    if (provinceSelected && districtSelected) {
      // splitting this from other useEffect just for readability
      // 0) create new copy of province data
      // const newData = JSON.parse(JSON.stringify(provinceGeoData));
      // 1. Lets get the district ID that is selected. Put it ontop of stack
      // const province_id = getProvinceId(gedDataProvince, provinceSelected);
      const district_id = getDistrictId(gedDataDistrict, districtSelected);
      console.log("id :: ", district_id);
      // const indexOfDistrict = newData[0].features.findIndex(
      //   (feature) => feature.properties.GID_2 === district_id
      // );
      const geoDistrictsInSelectedProvince = districtGeoData[0].features.filter(
        (feature) => {
          if (feature.properties.GID_1 === province_id) {
            return feature;
          }
        }
      );
      const indexOfDistrict = geoDistrictsInSelectedProvince.findIndex(
        (feature) => feature.properties.GID_2 === district_id
      );
      const districtFeature = geoDistrictsInSelectedProvince.splice(
        indexOfDistrict,
        1
      );
      //
      // 3. Lets create a new object that spreads current state in the order we want
      const updatedNewData = {
        ...newData[0],
        features: [
          // provinces
          ...newData[0].features,
          // active province
          provinceFeature[0],
          // all remaining districts in province
          ...geoDistrictsInSelectedProvince,
          // active district
          districtFeature[0],
        ],
      };
      // 4. Set new component geo state
      setCurrentGeoLayers(updatedNewData);
      return;
    }
  }, [provinceSelected, districtSelected]);
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
        weight: 6,
        opacity: 1,
        // this province feature does not need fill.. fillOpacity: 0
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
        //
        fillOpacity: 1,
        // fill color depends on : 1) current score_one 2) features score_one value
        // fillColor: "#DFDFDF",
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
        // ++ this is where layer score fill will come in with searchParams
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
  //
  //
  const handleHoverOver = (e) => {
    // console.log("Hovered over feature :: ", e.target.feature.properties.NAME_1);

    // identify layer
    const layer = e.target;
    // layer.bringToFront();

    // POPUP
    // customise the popup
    let options = {
      // docs:https://leafletjs.com/reference.html#tooltip
      offset: L.point(10, 0),
      sticky: true,
    };

    let content = createPopupContent(layer.feature.properties);

    // unbind any previous popup (important for multiple features)
    // layer.unbindPopup();
    // layer.unbindTooltip();

    // removed for now
    // // create the popup
    // let popup = L.popup(options).setContent(content);

    // // bind popup : removed for now
    // layer.bindPopup(popup).openPopup();
    // create and bind the popup : new way
    // layer.bindPopup(content, options).openPopup();

    // STYLES FOR onMouseOver - highlighting effect
    // ** note ** this can causes issues between province layer and district layer underneath
    // layer.setStyle({
    //   dashArray: "0",
    //   color: "#FFF",
    //   weight: 3,
    //   opacity: 1,
    // });
    layer.bindTooltip(content, options).openTooltip();
  };

  // const handleMouseMove = (e) => {
  //   const layer = e.target;
  //   layer.getPopup().setLatLng(e.latlng).openOn(layer._map);
  // };

  const handleMouseOut = (e) => {
    const layer = e.target;
    // layer.closePopup(); // closes the popup when mouse is out of the feature
    // layer.setStyle({
    //   dashArray: "0",
    //   color: "#666",
    //   weight: 1,
    //   opacity: 0.3,
    // });
  };

  function onEachFeature(feature, layer) {
    layer.on({
      mouseover: handleHoverOver,
      // mousemove: handleMouseMove,
      // mouseout: handleMouseOut,
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
