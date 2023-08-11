"use client";
import dynamic from "next/dynamic";
import { useParams, useSearchParams } from "next/navigation";
import ScatterComponentParent from "./ScatterComponentParent";
import { useAtom } from "jotai";
import { scatterViewType, visualTypeSelected } from "@/lib/atoms";
import { useQuery } from "react-query";
import { getProvinceId } from "@/lib/utils";
import { cache, useEffect, useState } from "react";
import { useGedData } from "@/lib/hooks/getGedDataQuery";
import LoadingSpinner from "./LoadingComponent";
import ScatterComponentParentV2 from "./ScatterComponentParentV2";
import ScatterComponentParentDistricts from "./ScatterComponentParentDistricts";

// const MapComponentParentProvince = dynamic(
//   () => import("./MapComponentParentProvince"),
//   {
//     ssr: false,
//   }
// );
// const MapComponentParentDistrict = dynamic(
//   () => import("./MapComponentParentDistrict"),
//   {
//     ssr: false,
//   }
// );
const MapComponentParentAlpha = dynamic(
  () => import("./MapComponentParentAlpha"),
  {
    ssr: false,
  }
);

// this component receives initial data from server (geoprovince, and gedprovince data)
// it also determines which visual to show, map or scatter based on the visualType from atom

export default function VisualComponentClientParentV2({
  provinceGeoData,
  districtGeoData,
  gedDataDistrict,
  gedDataProvince,
  country,
  mapbox_url,
}) {
  // console.log("[VisualComponentClientParent] : rendered");
  //   const params = useParams();
  //   const searchParams = useSearchParams();
  const [visualType] = useAtom(visualTypeSelected);
  const [scatterType] = useAtom(scatterViewType);

  return (
    <div className="w-full h-full">
      {visualType === "map" && (
        <MapComponentParentAlpha
          country={country}
          provinceGeoData={provinceGeoData}
          districtGeoData={districtGeoData}
          gedDataProvince={gedDataProvince}
          gedDataDistrict={gedDataDistrict}
          mapbox_url={mapbox_url}
        />
      )}
      {visualType === "scatter" && scatterType === "provinces" && (
        <ScatterComponentParentV2
          gedDataProvince={gedDataProvince}
          gedDataDistrict={gedDataDistrict}
          country={country}
        />
      )}
      {/* this is the districts only component -> shows all districts at country level */}
      {visualType === "scatter" && scatterType === "districts" && (
        <ScatterComponentParentDistricts
          gedDataProvince={gedDataProvince}
          gedDataDistrict={gedDataDistrict}
          country={country}
        />
      )}
    </div>
  );
}

// ** note :: if we need a scatterplot that renders all districts.. maybe we just create a new instance of the current one and edit it to have only district functionality... 'districts' vs 'provinces' selection
// all districts in countr -> click -> highlites and shows district view
// route.push() will include its province name... updating url and then breadcrumbs responds
// from breadcrumbs.. if you click the province, it will toggle the 'provinces' selection and take you to that province, showing its districts... meaning it will trigger then other scatter version, and then it should update based on the params set...
//

// ** note:double map approach based on visual type. Causing map to flash when changing instances.
//         Could also increase API hits..
// {
//   visualType === "map" && scatterType === "provinces" && (
//     <MapComponentParentProvince
//       country={country}
//       provinceGeoData={provinceGeoData}
//       districtGeoData={districtGeoData}
//       gedDataProvince={gedDataProvince}
//       gedDataDistrict={gedDataDistrict}
//       mapbox_url={mapbox_url}
//     />
//   );
// }
// {
//   visualType === "map" && scatterType === "districts" && (
//     <MapComponentParentDistrict
//       country={country}
//       provinceGeoData={provinceGeoData}
//       districtGeoData={districtGeoData}
//       gedDataProvince={gedDataProvince}
//       gedDataDistrict={gedDataDistrict}
//       mapbox_url={mapbox_url}
//     />
//   );
// }
