"use client";
import { scatterViewType } from "@/lib/atoms";
import { getProvinceId } from "@/lib/utils";
import { useAtom } from "jotai";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GeoJSON } from "react-leaflet";

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
        // ++ this is where layer score fill will come in with searchParams
        fillOpacity: 0.7,
        fillColor: "#DFDFDF",
      };
    }
    if (provinceSelected && !districtSelected && feature.properties.GID_2) {
      return {
        dashArray: "0",
        color: "#000",
        weight: 1,
        opacity: 0.3,
        // ++ this is where layer score fill will come in with searchParams
        fillOpacity: 0.7,
        fillColor: "#DFDFDF",
      };
    } else {
      return {
        dashArray: "0",
        color: "#666",
        weight: 1,
        opacity: 0.3,
        // ++ this is where layer score fill will come in with searchParams
        fillOpacity: 0.7,
        fillColor: "#DFDFDF",
      };
    }
  };
  const handleLayerClick = (e) => {
    // GID_1 is province ID
    // GID_2 is district ID
    console.log("***handleLayerClick*** : event :", e);
    const country = e.target.feature.properties.COUNTRY.toLowerCase();
    const province = e.target.feature.properties.NAME_1;
    const district = e.target.feature.properties.NAME_2;
    // //
    const year = searchParams.get("year");
    const score_one = searchParams.get("score_one");
    const score_two = searchParams.get("score_two");

    // // GID_2 is not true means this layerClick is a province
    if (!e.target.feature.properties.GID_2) {
      router.push(
        `/dashboard/${country}/${province}?year=${year}&score_one=${score_one}&score_two=${score_two}`
      );
    }
    // } else {
    //   router.push(
    //     `/dashboard/${country}/${province}/${district}?year=${year}&score_one=${score_one}&score_two=${score_two}`
    //   );
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
