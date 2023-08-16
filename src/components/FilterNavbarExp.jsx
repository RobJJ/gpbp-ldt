"use client";

import { useSearchParams } from "next/navigation";
import FilterNavbarExpChild from "./FilterNavbarExp-child";
import SwitchComponent from "./MapScatterToggle";
import ScatterTypeToggle from "./ScatterTypeToggle";
import FilterButtonYear from "./FilterButtonYear";
import FilterButtonScoreOne from "./FilterButtonScoreOne";
import FilterButtonScoreTwo from "./FilterButtonScoreTwo";

export default function FilterNavbarExp({}) {
  const searchParams = useSearchParams();

  let yearParam = searchParams.get("year");

  //   console.log("[FilterNavbarExp] : searchParams passed through?", searchParams);

  return (
    <div className="w-full bg-pink-500 flex gap-5 items-center p-2">
      <SwitchComponent />

      {/* adding this for changing toggle for scatter type */}
      <ScatterTypeToggle />
      {/* maybe move the params etc to the actual component? */}
      <FilterNavbarExpChild
        yearParam={yearParam}
        scoreOneParam={searchParams.get("score_one")}
        scoreTwoParam={searchParams.get("score_two")}
      />
      <FilterButtonYear />
      <FilterButtonScoreOne />
      <FilterButtonScoreTwo />
    </div>
  );
}
