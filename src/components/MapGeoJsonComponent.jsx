"use client";
import { scatterViewType } from "@/lib/atoms";
import { useAtom } from "jotai";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { GeoJSON } from "react-leaflet";

export default function MapGeoJsonComponent({
  provinceGeoData,
  districtGeoData,
}) {
  const [scatterType] = useAtom(scatterViewType);
  let hashkey = Math.random();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  //
  //
  const style = (feature) => {
    return {
      // need add a color matching function and pass in the score of the feature E8E8E8
      fillColor: "#DFDFDF",
      weight: 1,
      opacity: 1,
      color: "#666",
      dashArray: "3",
      fillOpacity: 0.7,
    };
  };
  const handleLayerClick = (e) => {
    // GID_1 is province ID
    // GID_2 is district ID
    console.log("[clicked layer] : event :", e.target.feature.properties);
    // GID_2 is not true means this layerClick is a province
    if (!e.target.feature.properties.GID_2) {
      const country = e.target.feature.properties.COUNTRY.toLowerCase();
      const province = e.target.feature.properties.NAME_1;
      const year = searchParams.get("year");
      const score_one = searchParams.get("score_one");
      const score_two = searchParams.get("score_two");
      router.push(
        `/dashboard/${country}/${province}?year=${year}&score_one=${score_one}&score_two=${score_two}`
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
      data={scatterType === "provinces" ? provinceGeoData : districtGeoData}
      onEachFeature={onEachFeature}
    />
  );
}
