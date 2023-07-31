// ** note ** this is a dynamic server comp. Can fetch params and data here

import LoadingSpinner from "@/components/LoadingComponent";
import ProvincePageListComponent from "@/components/ProvincePageListComponent";
import Link from "next/link";
import { Suspense } from "react";

// ok we have access to the params and searchParams because this is page.js and dynamic
export default function ProvincePage({ params, searchParams }) {
  // fetch data here for the chosen Province!!
  console.log("[ProvincePage] : rendered : server");
  // console.log("[ProvincePage] : rendered : searchParams : ", searchParams);
  return (
    <div className="w-full h-full bg-orange-200 flex flex-col p-2 gap-2">
      <section className="w-full h-1/2 bg-orange-100 rounded text-2xl font-bold">
        [PROVINCE LEVEL] : SHOW highcharts HERE <br />
        ** fetch data in this{" "}
        <span className="text-red-500">async server component</span> based on
        province selected - feed data to the highcharts component **
      </section>
      <section className="w-full h-1/2 bg-purple-100 overflow-auto scrollbar-none ">
        <Suspense fallback={<LoadingSpinner />}>
          <ProvincePageListComponent
            country={params.country}
            province={params.province}
            searchParams={searchParams}
          />
        </Suspense>
      </section>
    </div>
  );
}
