"use client";
import Link from "next/link";
const unidecode = require("unidecode");
// ** note :: make this component a server component that receives the needed props and fetches data that is then passed down to the client component to use

import { useParams } from "next/navigation";
import { useState } from "react";

// ** this is the actual map component
// ** setdefault state to province,, and then hold state here...
// ** if params changes, this component will be rerendered by its parent

export default function MapComponentParent({
  geojsonDataProvince,
  gedDataProvince,
  provinceSelected,
  countrySelected,
  year,
  score_one,
  score_two,
}) {
  const [currentGeoData, setCurrentGeoData] = useState(geojsonDataProvince);
  console.log("[MapComponentParent] : rendered ");
  // this component gets immediate access to the province geodata and geddata through parent props on server
  // this component needs to now listen to the params and take that data and mutate it...
  // if a province is clicked the params will change and trigger reload.. we must then fetch the province-districts data for the geodata and the geddata

  return (
    <section className="w-full h-full bg-yellow-300 flex flex-col">
      <span>Click the province on this map page bitch :</span>
      <span>
        Year:{year}....Score_One:{score_one}... Score_Two:{score_two}
      </span>
      <Link
        href={{
          pathname: `/dashboard/${countrySelected}/${unidecode("Đakovica")}`,
          // can spread the searchParams!!!! *******
          query: { year, score_one, score_two },
        }}
        className="bg-blue-200"
      >
        You can navigate to a district from here
      </Link>
    </section>
  );
}
