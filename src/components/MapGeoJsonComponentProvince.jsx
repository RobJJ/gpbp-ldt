"use client";
import { scatterViewType } from "@/lib/atoms";
import { useAtom } from "jotai";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { GeoJSON } from "react-leaflet";

export default function MapGeoJsonComponentProvince({
  provinceGeoData,
  districtGeoData,
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
  let provinceSelected = decodeURIComponent(params.province);
  let districtSelected = decodeURIComponent(params.district);
  // everytime the params change, this component will rerender and re-paint the layers
  //
  //
  const style = (feature) => {
    // console.log("feature from style is : ", feature);
    // if provinceSelected matches the feature.properties.NAME_1 then you must apply unique stlying
    if (
      provinceSelected === feature.properties.NAME_1 &&
      !feature.properties.NAME_2
    ) {
      return {
        // need add a color matching function and pass in the score of the feature E8E8E8
        fillColor: "#DFDFDF",
        weight: 4,
        opacity: 1,
        color: "#F00",
        dashArray: "1",
        fillOpacity: 0.7,
      };
    } else {
      return {
        // need add a color matching function and pass in the score of the feature E8E8E8
        fillColor: "#DFDFDF",
        weight: 1,
        opacity: 1,
        color: "#666",
        dashArray: "3",
        fillOpacity: 0.7,
      };
    }
  };
  const handleLayerClick = (e) => {
    // GID_1 is province ID
    // GID_2 is district ID
    console.log("***handleLayerClick*** : event :", e);
    // const country = e.target.feature.properties.COUNTRY.toLowerCase();
    // const province = e.target.feature.properties.NAME_1;
    // const district = e.target.feature.properties.NAME_2;
    // //
    // const year = searchParams.get("year");
    // const score_one = searchParams.get("score_one");
    // const score_two = searchParams.get("score_two");
    // //
    // //
    // // GID_2 is not true means this layerClick is a province
    // if (!e.target.feature.properties.GID_2) {
    //   router.push(
    //     `/dashboard/${country}/${province}?year=${year}&score_one=${score_one}&score_two=${score_two}`
    //   );
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
