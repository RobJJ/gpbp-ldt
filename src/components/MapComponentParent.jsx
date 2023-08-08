"use client";

import { getProvinceId } from "@/lib/utils";
import Link from "next/link";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

// ** this is the actual map component
// ** setdefault state to province,, and then hold state here...
// ** if params changes, this component will be rerendered by its parent and it will receive new params to search by
// GEO
// ** if (provinceSelected) becomes true is true, then it needs to grab geodata districts that match province_id
// GED
// ** this data changes based on year, and score_one..

export default function MapComponentParent({
  geojsonDataProvince,
  geojsonDataDistrict,
  gedDataProvince,
}) {
  const [currentGeoLayers, setCurrentGeoLayers] = useState(geojsonDataProvince);
  const router = useRouter();

  return (
    <section className="w-full h-full bg-yellow-300 flex flex-col text-lg gap-2">
      qwdqwd
    </section>
  );
}

// this component needs geo data and also GED data... the GED data starts off as province data, but when we click a province, we will fetch the geo districts inside that province and show it,, but we also need those districts information
