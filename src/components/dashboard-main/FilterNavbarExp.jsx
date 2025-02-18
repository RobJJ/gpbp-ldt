import SwitchComponent from "./MapScatterToggle";

import FilterButtonYear from "./FilterButtonYear";
import FilterButtonScoreOne from "./FilterButtonScoreOne";
import FilterButtonScoreTwo from "./FilterButtonScoreTwo";
import LayerToggle from "./LayerToggle";

import ResetFiltersButton from "./ResetFiltersButton";

export default function FilterNavbarExp({ country }) {
  return (
    <div className="w-full bg-[#ECECEC] flex gap-5 items-center p-2 ">
      <div className="flex-none ">
        <SwitchComponent country={country} />
      </div>
      <div className="flex-1 flex gap-4  justify-center ">
        <FilterButtonYear country={country} />
        <FilterButtonScoreOne />
        <FilterButtonScoreTwo />
        <LayerToggle country={country} />
      </div>
      <div className=" flex-none mr-6 ">
        <ResetFiltersButton />
      </div>
    </div>
  );
}
