"use client";

import { useParams, useSearchParams } from "next/navigation";
import MapComponentParent from "./MapComponentParent";
import ScatterComponentParent from "./ScatterComponentParent";
import { useAtom } from "jotai";
import { visualTypeSelected } from "@/lib/atoms";

// this components purpose is to sync the map and scatter components to the url filtering params and pass down data
function getProvinceId(data, province_name) {
  //   console.log(
  //     "this province_name you are passing is :::",
  //     decodeURIComponent(province_name)
  //   );
  const provinceObject = data.find(
    (item) => item.PROVINCE === decodeURIComponent(province_name)
  );
  return provinceObject ? provinceObject.PROVINCE_ID : null;
}

export default function VisualComponentClientParent({
  geojsonDataProvince,
  gedDataProvince,
}) {
  console.log("[VisualComponentClientParent] : rendered");
  const params = useParams();
  const searchParams = useSearchParams();
  const [visualType] = useAtom(visualTypeSelected);
  if (params.province) {
    // this triggers when a province has been selected.. lets grab geodata that is connected to the province
    // call a func,, get getDistrictsGeoDataBasedOnSelectedProvince(country, province_id)
    // getDistrictsGeoDataBasedOnSelectedProvince(params.country, )
    console.log(
      "testing province ID func::",
      getProvinceId(gedDataProvince, params.province)
    );
  }
  return (
    <div className="w-full h-full">
      {visualType === "map" && (
        <MapComponentParent
          geojsonDataProvince={geojsonDataProvince}
          gedDataProvince={gedDataProvince}
          countrySelected={params.country}
          provinceSelected={params.province}
          districtSelected={params.district}
          year={searchParams.get("year")}
          score_one={searchParams.get("score_one")}
          score_two={searchParams.get("score_two")}
        />
      )}
      {visualType === "scatter" && (
        <ScatterComponentParent
          geojsonDataProvince={geojsonDataProvince}
          gedDataProvince={gedDataProvince}
        />
      )}
    </div>
  );
}
