import SwitchComponent from "./MapScatterToggle";
// import ScatterTypeToggle from "./ScatterTypeToggle";
import FilterButtonYear from "./FilterButtonYear";
import FilterButtonScoreOne from "./FilterButtonScoreOne";
import FilterButtonScoreTwo from "./FilterButtonScoreTwo";
import LayerToggle from "./LayerToggle";

import ResetFiltersButton from "./ResetFiltersButton";

export default function FilterNavbarExp({}) {
  return (
    <div className="w-full bg-[#ECECEC] flex gap-5 items-center p-2">
      <div className="flex-none ">
        <SwitchComponent />
      </div>
      <div className="flex-1 flex gap-4  justify-center">
        <FilterButtonYear />
        <FilterButtonScoreOne />
        <FilterButtonScoreTwo />
        <LayerToggle />
      </div>
      <div className=" flex-none mr-6 ">
        <ResetFiltersButton />
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
