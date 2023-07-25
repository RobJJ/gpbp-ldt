// ** note ** this is a dynamic server comp. Can fetch params and data here

import CountryPageListComponent from "@/components/CountryPageListComponent";
import LoadingSpinner from "@/components/LoadingComponent";
import { getAllProvincesInSelectedCountry } from "@/lib/provinceData";
import { Suspense } from "react";

export default async function CountryPage({ params, searchParams }) {
  console.log("[CountryPage] : rendered : server");
  // console.log("[CountryPage] : rendered : searchParams : ", searchParams);

  return (
    <div className="w-full h-full bg-purple-300 flex flex-col p-2 pb-0 gap-2 overflow-auto">
      <section className="w-full h-1/2 bg-purple-100 text-2xl font-bold ">
        [COUNTRY LEVEL] : SHOW CARDS HERE <br />
        ** fetch data in this{" "}
        <span className="text-red-500">async server component</span> based on
        country **
      </section>
      {/* this should be a click component as it needs to do NAV!*/}
      <section className="w-full h-1/2 bg-purple-100 overflow-auto scrollbar-none ">
        <Suspense fallback={<LoadingSpinner />}>
          <CountryPageListComponent
            country={params.country}
            searchParams={searchParams}
          />
        </Suspense>
      </section>
    </div>
  );
}
