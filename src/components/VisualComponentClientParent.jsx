"use client";

import { useParams, useSearchParams } from "next/navigation";
import MapComponentParent from "./MapComponentParent";
import ScatterComponentParent from "./ScatterComponentParent";
import { useAtom } from "jotai";
import { visualTypeSelected } from "@/lib/atoms";
import { useQuery } from "react-query";
import { getProvinceId } from "@/lib/utils";
import { cache } from "react";
import { useGedData } from "@/lib/hooks/getGedDataQuery";
import LoadingSpinner from "./LoadingComponent";

// this components purpose is to sync the map and scatter components to the url filtering params and pass down data

export default function VisualComponentClientParent({
  geojsonDataProvince,
  // geojsonDataDistrict,
  gedDataProvince,
}) {
  // console.log("[VisualComponentClientParent] : rendered");
  const params = useParams();
  const searchParams = useSearchParams();
  const [visualType] = useAtom(visualTypeSelected);

  // const province = params.province;

  const { data, isLoading } = useGedData(
    params.country,
    params.province,
    gedDataProvince
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }
  // console.log("we have passed the loading phase.. your data: ", data);
  return (
    <div className="w-full h-full">
      {visualType === "map" && (
        <MapComponentParent
          geojsonDataProvince={geojsonDataProvince}
          // geojsonDataDistrict={geojsonDataDistrict}
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
          // going to leave this out and handle above based on query params
          // gedDataProvince={gedDataProvince}
          data={data}
          countrySelected={params.country}
          provinceSelected={params.province}
          districtSelected={params.district}
          year={searchParams.get("year")}
          score_one={searchParams.get("score_one")}
          score_two={searchParams.get("score_two")}
        />
      )}
    </div>
  );
}
