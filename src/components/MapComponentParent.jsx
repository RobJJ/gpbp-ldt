"use client";
import Link from "next/link";
const unidecode = require("unidecode");
// ** note :: make this component a server component that receives the needed props and fetches data that is then passed down to the client component to use

import { useParams } from "next/navigation";
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
  gedDataProvince,
  countrySelected,
  provinceSelected,
  districtSelected,
  year,
  score_one,
  score_two,
}) {
  // we have everything we need here and it updates based on URL params + searchParams

  return (
    <section className="w-full h-full bg-yellow-300 flex flex-col">
      <span>Click the province on this map page bitch :</span>
      <span>
        Year:{year}....Score_One:{score_one}... Score_Two:{score_two}
      </span>
      <span>
        Country:{countrySelected}...province:{provinceSelected}... district:
        {districtSelected}
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
          pathname: `/dashboard/${countrySelected}/${provinceSelected}/${unidecode(
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
