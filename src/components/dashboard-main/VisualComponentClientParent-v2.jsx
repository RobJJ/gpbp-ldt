"use client";
import dynamic from "next/dynamic";
import { useAtom } from "jotai";
import { scatterViewType, visualTypeSelected } from "@/lib/atoms";
import ScatterComponentParentProvinces from "./ScatterComponentParentProvinces";
import ScatterComponentParentDistricts from "./ScatterComponentParentDistricts";

const MapComponentParentAlpha = dynamic(
  () => import("./MapComponentParentAlpha"),
  {
    ssr: false,
  }
);

// Receives data .. determines which visual to show

export default function VisualComponentClientParentV2({
  gedDataDistrict,
  gedDataProvince,
  country,
  mapbox_url,
}) {
  //
  const [visualType] = useAtom(visualTypeSelected);
  const [scatterType] = useAtom(scatterViewType);

  return (
    <div className="w-full h-full">
      {/* Map  */}
      {visualType === "map" && (
        <MapComponentParentAlpha
          country={country}
          gedDataProvince={gedDataProvince}
          gedDataDistrict={gedDataDistrict}
          mapbox_url={mapbox_url}
        />
      )}
      {/* Scatter : Province */}
      {visualType === "scatter" && scatterType === "provinces" && (
        <ScatterComponentParentProvinces
          gedDataProvince={gedDataProvince}
          gedDataDistrict={gedDataDistrict}
          country={country}
        />
      )}
      {/* Scatter : District */}
      {visualType === "scatter" && scatterType === "districts" && (
        <ScatterComponentParentDistricts
          gedDataDistrict={gedDataDistrict}
          country={country}
        />
      )}
    </div>
  );
}
