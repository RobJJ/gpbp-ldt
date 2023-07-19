"use client";

import { useSearchParams } from "next/navigation";
import FilterNavbarExpChild from "./FilterNavbarExp-child";

export default function FilterNavbarExp({}) {
  const searchParams = useSearchParams();

//   console.log("[FilterNavbarExp] : searchParams passed through?", searchParams);

  return (
    <FilterNavbarExpChild
      yearParam={searchParams.get("year")}
      scoreOneParam={searchParams.get("score_one")}
    />
  );
}
