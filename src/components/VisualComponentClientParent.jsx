"use client";

import { useParams, useSearchParams } from "next/navigation";
import MapComponentParent from "./MapComponentParent";
import ScatterComponentParent from "./ScatterComponentParent";
import { useAtom } from "jotai";
import { visualTypeSelected } from "@/lib/atoms";

export default function VisualComponentClientParent({
  geojsonDataProvince,
  gedDataProvince,
}) {
  console.log("[VisualComponentClientParent] : rendered");
  const params = useParams();
  const searchParams = useSearchParams();
  const [visualType, setVisualType] = useAtom(visualTypeSelected);

  return (
    <div className="w-full h-full">
      {visualType === "map" && (
        <MapComponentParent
          geojsonDataProvince={geojsonDataProvince}
          gedDataProvince={gedDataProvince}
          provinceSelected={params.province}
          countrySelected={params.country}
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
