"use client";

import { useSearchParams } from "next/navigation";
import FilterButtonYear from "./FilterButtonYear";
import { useCallback } from "react";
import FilterButtonScoreOne from "./FilterButtonScoreOne";
import FilterButtonScoreTwo from "./FilterButtonScoreTwo";

// start as server component -> not sure if needs to rather be client... lets see
// this buttons purpose is the change the search params

export default function FilterNavbar({}) {
  const searchParams = useSearchParams();
  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="w-full bg-blue-300 flex justify-center p-2 gap-5">
      <FilterButtonYear
        paramYear={searchParams.get("year")}
        createQueryString={createQueryString}
      />
      <FilterButtonScoreOne
        paramScoreOne={searchParams.get("score_one")}
        createQueryString={createQueryString}
      />
      <FilterButtonScoreTwo
        paramScoreTwo={searchParams.get("score_two")}
        createQueryString={createQueryString}
      />

      {/* test to hide if map/scatter searchParam */}
      {searchParams.has("visual") && (
        <span>score_two: {searchParams.get("score_two")}</span>
      )}
    </div>
  );
}

// Display the key/value pairs
// for (const [key, value] of searchParams.entries()) {
//   console.log(`${key}, ${value}`);
// }
