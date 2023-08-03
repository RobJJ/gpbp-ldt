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
import ScatterComponentParentV2 from "./ScatterComponentParentV2";

// this component receives initial data from server (geoprovince, and gedprovince data)
// it also determines which visual to show, map or scatter based on the visualType from atom

export default function VisualComponentClientParentV2({
  gedDataDistrict,
  geojsonDataProvince,
  gedDataProvince,
}) {
  // console.log("[VisualComponentClientParent] : rendered");
  const params = useParams();
  const searchParams = useSearchParams();
  const [visualType] = useAtom(visualTypeSelected);

  let year = searchParams.get("year");
  let score_one = searchParams.get("score_one");
  let score_two = searchParams.get("score_two");

  // this data fetch info based on if province is selected or not... we dont need to fetch new data here instead write a function that runs when province changes to update the data... filter off the GED data that has been passed through the props.... we dont need to make another query to server - rather just filter based on year and province
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
          year={year}
          score_one={score_one}
          score_two={score_two}
        />
      )}
      {visualType === "scatter" && (
        <ScatterComponentParentV2
          data={data}
          year={year}
          score_one={score_one}
          score_two={score_two}
        />
      )}
    </div>
  );
}

// old version here -> still works
{
  /*<ScatterComponentParent
          // going to leave this out and handle above based on query params
          // gedDataProvince={gedDataProvince}
          data={data}
          year={year}
          score_one={score_one}
          score_two={score_two}
          // countrySelected={params.country}
          // provinceSelected={params.province}
          // districtSelected={params.district}
          // year={searchParams.get("year")}
          // score_one={searchParams.get("score_one")}
          // score_two={searchParams.get("score_two")}
      />*/
}
