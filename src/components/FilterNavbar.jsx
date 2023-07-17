"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FilterButtonYear from "./FilterButtonYear";
import { useCallback, useEffect, useState } from "react";
import FilterButtonScoreOne from "./FilterButtonScoreOne";
import FilterButtonScoreTwo from "./FilterButtonScoreTwo";

// start as server component -> not sure if needs to rather be client... lets see
// this buttons purpose is the change the search params

export default function FilterNavbar({}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // default Map() state reads off the search params... so if reset it will realign itself to the searchParams in url
  const [filterState, setFilterState] = useState(
    new Map([
      ["year", searchParams.get("year")],
      ["score_one", searchParams.get("score_one")],
      ["score_two", searchParams.get("score_two")],
    ])
  );

  // console.log("[FilterNavbar] : state : ", filterState);
  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  // const createQueryString = useCallback(
  //   (name, value) => {
  //     const params = new URLSearchParams(searchParams);
  //     params.set(name, value);

  //     return params.toString();
  //   },
  //   [searchParams]
  // );

  const handleFilterExplore = (e) => {
    // const choice = e.target.dataset.tag;

    // setYear(choice);
    // ** duplicating shit ** meh
    // router.push(
    //   pathname +
    //     "?" +
    //     createQueryString("year", filterState.get("year")) +
    //     "&" +
    //     createQueryString("score_one", filterState.get("score_one")) +
    //     "&" +
    //     createQueryString("score_two", filterState.get("score_two"))
    // );
    // ** new approach
    router.push(
      pathname +
        "?" +
        "year=" +
        filterState.get("year") +
        "&" +
        "score_one=" +
        filterState.get("score_one") +
        "&" +
        "score_two=" +
        filterState.get("score_two")
    );
    // createQueryString("year", choice);
    // setIsOpen(!isOpen);
  };

  useEffect(() => {
    router.push(
      pathname +
        "?" +
        "year=" +
        searchParams.get("year") +
        "&" +
        "score_one=" +
        searchParams.get("score_one") +
        "&" +
        "score_two=" +
        searchParams.get("score_two")
    );
    filterState.set("year", searchParams.get("year"));
    filterState.set("score_one", searchParams.get("score_one"));
    filterState.set("score_two", searchParams.get("score_two"));
  }, [searchParams, pathname]);

  return (
    <div className="w-full bg-blue-300 flex justify-center p-2 gap-5">
      <FilterButtonYear filterState={filterState} />
      <FilterButtonScoreOne filterState={filterState} />
      {/* this second score filter must only be shown if visual searchparam is = scatter */}
      <FilterButtonScoreTwo filterState={filterState} />
      <button
        onClick={handleFilterExplore}
        className="bg-blue-600 px-1 rounded-lg text-white font-bold"
      >
        Go
      </button>

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
