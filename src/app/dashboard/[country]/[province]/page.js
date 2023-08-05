// ** note ** this is a dynamic server comp. Can fetch params and data here

import LoadingSpinner from "@/components/LoadingComponent";
import ProvincePageListComponent from "@/components/ProvincePageListComponent";
import ProvincePageVisual from "@/components/ProvincePageVisual";

import { Suspense } from "react";

// ok we have access to the params and searchParams because this is page.js and dynamic
export default async function ProvincePage({ params, searchParams }) {
  // fetch data here for the chosen Province!! This comp gets new params passed through
  // Goal:: show the province data
  //1. Need data based on [country] and [province_name]

  return (
    <div className="w-full h-full bg-orange-200 flex flex-col p-2 gap-2 overflow-auto">
      <section className="w-full h-3/5 flex flex-col bg-orange-100 rounded">
        {/* header */}
        <div className="w-full flex justify-between items-center bg-orange-300">
          <span className="font-bold text-xl">
            {decodeURIComponent(params.province)} Performance
          </span>
          <span className="text-blue-500 underline">
            Download Data | Methodology
          </span>
        </div>
        {/* main */}
        <Suspense fallback={<LoadingSpinner />}>
          <ProvincePageVisual
            country={params.country}
            province={params.province}
            searchParams={searchParams}
          />
        </Suspense>
      </section>
      <section className="w-full h-2/5 bg-purple-100 overflow-auto scrollbar-none ">
        {/* this component is fetching data inside */}
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
