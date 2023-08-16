"use client";

import { useSearchParams } from "next/navigation";
// import FilterNavbarExpChild from "./FilterNavbarExp-child";
import SwitchComponent from "./MapScatterToggle";
import ScatterTypeToggle from "./ScatterTypeToggle";
import FilterButtonYear from "./FilterButtonYear";
import FilterButtonScoreOne from "./FilterButtonScoreOne";
import FilterButtonScoreTwo from "./FilterButtonScoreTwo";
import LayerToggle from "./LayerToggle";
import refreshIcon from "../../public/refresh-line.png";
import Image from "next/image";

export default function FilterNavbarExp({}) {
  const searchParams = useSearchParams();

  let yearParam = searchParams.get("year");

  //   console.log("[FilterNavbarExp] : searchParams passed through?", searchParams);

  return (
    <div className="w-full bg-pink-500 flex gap-5 items-center p-2">
      <div className="flex-none ">
        <SwitchComponent />
      </div>
      <div className="flex-1 flex gap-4  justify-center">
        <FilterButtonYear />
        <FilterButtonScoreOne />
        <FilterButtonScoreTwo />
        <LayerToggle />
      </div>
      <div className="text-[#4345AA] flex-none  px-4 flex gap-2">
        <Image src={refreshIcon} alt="refresh-icon" />
        <span className="font-bold">Reset Filters</span>
      </div>
    </div>
  );
}

// OLD child control of toggles
// {
//   /* maybe move the params etc to the actual component? */
// }
// <FilterNavbarExpChild
//   yearParam={yearParam}
//   scoreOneParam={searchParams.get("score_one")}
//   scoreTwoParam={searchParams.get("score_two")}
// />;

// OLD province-districts toggle
//  {
//    /* adding this for changing toggle for scatter type */
//  }
//  <ScatterTypeToggle />;
