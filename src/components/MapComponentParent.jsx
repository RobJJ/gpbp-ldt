"use client";

import Link from "next/link";

import { useParams } from "next/navigation";
import { useState } from "react";

// ** this is the actual map component
// ** setdefault state to province,, and then hold state here...
// ** if params changes, this component will be rerendered by its parent and it will receive new params to search by
// GEO
// ** if (provinceSelected) becomes true is true, then it needs to grab geodata districts that match province_id
// GED
// ** this data changes based on year, and score_one..

function getProvinceId(data, province_name) {
  const provinceObject = data.find(
    (item) => item.PROVINCE === decodeURIComponent(province_name)
  );
  return provinceObject ? provinceObject.PROVINCE_ID : null;
}

export default function MapComponentParent({
  geojsonDataProvince,
  geojsonDataDistrict,
  gedDataProvince,
  countrySelected,
  provinceSelected,
  districtSelected,
  year,
  score_one,
  score_two,
}) {
  // console.log("[MapComponentParent] : rendered");
  // default is the province geo layers
  const [currentGeoLayers, setCurrentGeoLayers] = useState(geojsonDataProvince);

  // when this component renders again,, we will check if province is true! if it is.. then we spread the districts into the currentGeoLayers state! this will show the districts inside!
  if (provinceSelected) {
    const provinceId = getProvinceId(gedDataProvince, provinceSelected);
    // console.log(
    //   "hey the province is true and the id of province is :: ",
    //   provinceId
    // );

    const districtsInSelectedProvince = geojsonDataDistrict[0].features.filter(
      (feature) => {
        return feature.properties.GID_1 === provinceId;
      }
    );
    // console.log(
    //   "districts found in selected province::",
    //   districtsInSelectedProvince
    // );
  }

  return (
    <section className="w-full h-full bg-yellow-300 flex flex-col text-lg gap-2">
      <span>Click the province on this map page bitch :</span>
      <span>
        Year:{year}....Score_One:{score_one}... Score_Two:{score_two}
      </span>
      <span>
        Country:{countrySelected}...province:
        {decodeURIComponent(provinceSelected)}... district:
        {decodeURIComponent(districtSelected)}
      </span>
      {/*mimic a province click.. we need to pull in the district geodata here.. when clicked, it will trigger the rerender */}
      <Link
        href={{
          pathname: `/dashboard/${countrySelected}/Đakovica`,
          // can spread the searchParams!!!! *******
          query: { year, score_one, score_two },
        }}
        className="bg-blue-200"
      >
        You can navigate to a [PROVINCE] from here
      </Link>
      <Link
        href={{
          pathname: `/dashboard/${countrySelected}/${provinceSelected}/${decodeURIComponent(
            "Dečani"
          )}`,
          // can spread the searchParams!!!! *******
          query: { year, score_one, score_two },
        }}
        className="bg-blue-200"
      >
        You can navigate to a [DISTRICT] from here
      </Link>
    </section>
  );
}

// this component needs geo data and also GED data... the GED data starts off as province data, but when we click a province, we will fetch the geo districts inside that province and show it,, but we also need those districts information
